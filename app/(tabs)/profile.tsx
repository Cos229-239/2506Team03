import { useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Chip } from 'react-native-paper';
import { UserProfile, useUser } from '../../src/contexts/UserContext';
import { db } from '../../src/firebaseConfig';

const DEFAULT_AVATAR = 'https://firebasestorage.googleapis.com/v0/b/xskill-swapx.firebasestorage.app/o/profile.jpg?alt=media&token=827cee39-3e1e-4828-a070-0f8ff36fab86';

type Params = { userId?: string };

const Profile = () => {
  const route = useRoute();
  const { userId } = (route.params || {}) as Params;
  const { user: loggedInUser, setUser } = useUser();
  const router = useRouter();

  const isOwnProfile = !userId || userId === 'me';
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!isOwnProfile && userId) {
        try {
          const ref = doc(db, 'users', userId);
          const snap = await getDoc(ref);
          if (snap.exists()) {
            setProfile(snap.data());
          }
        } catch (err) {
          console.error('❌ Failed to load user:', err);
        }
      } else {
        setProfile(loggedInUser);
      }
    };

    fetchUser();
  }, [userId, loggedInUser]);

  const handleAvatarPress = () => {
    if (!isOwnProfile) return;

    Alert.alert('Update Profile Picture', 'Choose an option', [
      { text: 'Change Photo', onPress: handleChangePhoto },
      { text: 'Delete Photo', onPress: handleDeletePhoto, style: 'destructive' },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleChangePhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission denied', 'Camera roll access is required.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,

      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      const image = result.assets[0];
      const storage = getStorage();
      const imageRef = ref(storage, `avatar/${loggedInUser?.uid}.jpg`);

      try {
        const img = await fetch(image.uri);
        const blob = await img.blob();
        await uploadBytes(imageRef, blob);
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(doc(db, 'users', loggedInUser!.uid), { avatar: downloadURL });

        const updatedUser: UserProfile = {
  ...(loggedInUser as UserProfile),
  avatar: downloadURL,
};
        setProfile(updatedUser);
        setUser(updatedUser);
      } catch (err) {
        console.error('Failed to upload image:', err);
        Alert.alert('Upload failed', 'Could not upload profile image.');
      }
    }
  };

  const handleDeletePhoto = async () => {
    try {
      await updateDoc(doc(db, 'users', loggedInUser!.uid), { avatar: DEFAULT_AVATAR });

      const updatedUser: UserProfile = {
  ...(loggedInUser as UserProfile),
  avatar: DEFAULT_AVATAR,
};
      setProfile(updatedUser);
      setUser(updatedUser);
    } catch (err) {
      console.error('Failed to delete avatar:', err);
      Alert.alert('Error', 'Could not delete avatar.');
    }
  };

  if (!profile) {
    return (
      <View style={styles.root}>
        <Text style={{ textAlign: 'center', marginTop: 100 }}>Loading user profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <View style={styles.bannerWrapper}>
        <View style={styles.banner} />
        <View style={styles.avatarWrapper}>
          <TouchableOpacity onPress={handleAvatarPress}>
            <Image
              source={
                profile.avatar
                  ? { uri: profile.avatar }
                  : { uri: DEFAULT_AVATAR }
              }
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.avatarSpacer} />
        <Text style={styles.name}>{profile.name}</Text>

        {(profile.role || profile.location) && (
          <View style={styles.roleLocationRow}>
            {profile.role && <Text style={styles.role}>{profile.role}</Text>}
            {profile.role && profile.location && <Text style={styles.dot}>•</Text>}
            {profile.location && <Text style={styles.location}>{profile.location}</Text>}
          </View>
        )}

        {isOwnProfile && (
          <View style={styles.editButtonRow}>
            <TouchableOpacity style={styles.editButton} onPress={() => router.push('/editprofile' as any)}>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.sectionDivider} />
        <Text style={styles.sectionTitle}>Bio</Text>
        <View style={styles.box}>
          <Text style={styles.boxText}>{profile.bio || 'No bio provided.'}</Text>
        </View>

        <View style={styles.sectionDivider} />
        <Text style={styles.sectionTitle}>My Skills</Text>
        <View style={styles.box}>
          {profile.skills?.length ? profile.skills.sort().map((skill: string) => (
            <Chip key={skill} style={styles.chip}>
              <Text style={styles.chipText}>{skill}</Text>
            </Chip>
          )) : <Text style={styles.boxText}>No skills listed.</Text>}
        </View>

        <View style={styles.sectionDivider} />
        <Text style={styles.sectionTitle}>My Interests</Text>
        <View style={styles.box}>
          {profile.interests?.length ? profile.interests.sort().map((interest: string) => (
            <Chip key={interest} style={styles.chip}>
              <Text style={styles.chipText}>{interest}</Text>
            </Chip>
          )) : <Text style={styles.boxText}>No interests listed.</Text>}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: 'transparent',
  },
  root: {
    backgroundColor: '#fff',
    flexGrow: 1,
    position: 'relative',
  },
  banner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'android' ? 170 : 150,
    backgroundColor: '#CBA16B',
    zIndex: -1,
  },
  bannerWrapper: {
    position: 'relative',
    height: Platform.OS === 'android' ? 170 : 150,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#CBA16B',
  },
  avatarWrapper: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 90 : 70,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: '#222',
    elevation: 6,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },
  roleLocationRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  role: { fontSize: 18, color: '#333' },
  dot: { marginHorizontal: 6, fontSize: 18, color: '#333' },
  location: { fontSize: 18, color: '#333' },
  sectionDivider: {
    height: 2,
    backgroundColor: '#ccc',
    marginVertical: 8,
    borderRadius: 1,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  box: {
    backgroundColor: '#9DD4B6',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    flexWrap: 'wrap',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#000',
  },
  boxText: { fontSize: 16, lineHeight: 20, color: '#000' },
  chip: {
    margin: 4,
    backgroundColor: '#FFF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#000',
  },
  chipText: { fontWeight: 'bold' },
  avatarSpacer: { height: Platform.OS === 'android' ? 50 : 45 },
  editButtonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  editButton: {
    backgroundColor: '#32425b',
    paddingHorizontal: 20,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#222',
    minWidth: 160,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Profile;
