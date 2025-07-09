import { useRoute } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Chip } from 'react-native-paper';
import { users } from '../../assets/data/mockUsers';

type Params = { userId?: string };

const Profile = () => {
  const route = useRoute();
  const { userId } = (route.params || {}) as Params;
  const auth = getAuth();
  const db = getFirestore();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const docRef = doc(db, 'users', currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    };

    fetchUserData();
  }, []);

  const user = userId
    ? users[userId]
    : userData || {
      name: 'Sarah Lian',
      profession: 'Illustrator',
      locationText: 'Seattle, WA',
      avatar: require('../../assets/images/avatar-sarah.png'),
      bio: "I'm a freelance illustrator based in Seattle – looking to teach basic illustration and learn some cool new skills.... let's swap!",
      skills: ['Guitar', 'Digital Art', 'Graphic Design', 'Baking'],
      interests: ['Gardening', 'Photography', 'Fitness', 'Automotive Repair'],
    };

  const isOwnProfile = !userId || userId === 'me';

  return (
    <ScrollView contentContainerStyle={[styles.root, { paddingBottom: 40 }]}>
      <View style={styles.bannerWrapper}>
        <View style={styles.banner} />
        <View style={styles.avatarWrapper}>
          <Image
            source={
              typeof user.avatar === 'number'
                ? user.avatar
                : user.avatar
                  ? { uri: user.avatar }
                  : require('../../assets/images/avatar-default.png')
            }
            style={styles.avatar}
          />
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.avatarSpacer} />
        <Text style={styles.name}>{user.name || 'Unnamed User'}</Text>

        <View style={styles.roleLocationRow}>
          <Text style={styles.role}>
            {user.profession || (user as any).role || 'No role listed'}
          </Text>
          {(user.profession || (user as any).role) &&
            (user.locationText || (user as any).location) && (
              <Text style={styles.dot}>•</Text>
            )}
          <Text style={styles.location}>
            {user.locationText || (user as any).location || 'No location listed'}
          </Text>
        </View>

        {isOwnProfile ? (
          <View style={styles.editButtonRow}>
            <TouchableOpacity style={styles.editButton} onPress={() => { }}>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.buttonRow}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Follow</Text>
            </View>
            <View style={[styles.button, styles.messageButton]}>
              <Text style={styles.buttonText}>Message</Text>
            </View>
          </View>
        )}

        <View style={styles.sectionDivider} />
        <Text style={styles.sectionTitle}>Bio</Text>
        <View style={styles.box}>
          <Text style={styles.boxText}>{user.bio}</Text>
        </View>

        <View style={styles.sectionDivider} />
        <Text style={styles.sectionTitle}>My Skills</Text>
        <View style={styles.box}>
          {user.skills.sort().map((skill: string) => (
            <Chip key={skill} style={styles.chip}>
              <Text style={styles.chipText}>{skill}</Text>
            </Chip>
          ))}
        </View>

        <View style={styles.sectionDivider} />
        <Text style={styles.sectionTitle}>My Interests</Text>
        <View style={styles.box}>
          {user.interests?.sort().map((interest: string) => (
            <Chip key={interest} style={styles.chip}>
              <Text style={styles.chipText}>{interest}</Text>
            </Chip>
          ))}
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
    position: 'relative',
    backgroundColor: '#fff',
    overflow: 'visible',
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
  role: {
    fontSize: 18,
    color: '#333',
  },
  dot: {
    marginHorizontal: 6,
    fontSize: 18,
    color: '#333',
  },
  location: {
    fontSize: 18,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#32425b',
    paddingHorizontal: 20,
    paddingVertical: 8,
    alignItems: 'center',
    minWidth: 100,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#222',
  },
  messageButton: {
    backgroundColor: '#32425b',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  sectionDivider: {
    height: 2,
    backgroundColor: '#ccc',
    marginVertical: 8,
    borderRadius: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
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
  boxText: {
    fontSize: 16,
    lineHeight: 20,
    color: '#000',
  },
  chip: {
    margin: 4,
    backgroundColor: '#FFF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#000',
  },
  chipText: {
    fontWeight: 'bold',
  },
  avatarSpacer: {
    height: Platform.OS === 'android' ? 50 : 45,
  },
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
});

export default Profile;