import { useNavigation, useRoute } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Chip } from 'react-native-paper';
import { auth, db } from '../../src/firebaseConfig';

const UserProfile = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { userId } = (route.params || {}) as { userId?: string };

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        let uid = userId;

        // Handle 'me' or undefined by falling back to auth.currentUser
        if (!uid || uid === 'me') {
          const currentUser = auth.currentUser;
          if (!currentUser) {
            console.warn('No user signed in');
            setLoading(false);
            return;
          }
          uid = currentUser.uid;
        }

        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUser(docSnap.data());
        } else {
          console.warn('User not found');
        }
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  if (loading) {
    return (
      <View style={styles.root}>
        <Text style={{ paddingTop: 80, textAlign: 'center' }}>Loading user...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.root}>
        <Text style={{ paddingTop: 80, textAlign: 'center' }}>User not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <View style={styles.closeIconContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bannerWrapper}>
        <View style={styles.banner} />
        <View style={styles.avatarWrapper}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.avatarSpacer} />
        <Text style={styles.name}>{user.name}</Text>

        <View style={styles.roleLocationRow}>
          <Text style={styles.role}>{user.profession}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.location}>{user.location}</Text>
        </View>

        <View style={styles.buttonRow}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Follow</Text>
          </View>
          <View style={[styles.button, styles.messageButton]}>
            <Text style={styles.buttonText}>Message</Text>
          </View>
        </View>

        <View style={styles.sectionDivider} />
        <Text style={styles.sectionTitle}>Bio</Text>
        <View style={styles.box}>
          <Text style={styles.boxText}>{user.bio}</Text>
        </View>

        <View style={styles.sectionDivider} />
        <Text style={styles.sectionTitle}>My Skills</Text>
        <View style={styles.box}>
          {user.skills?.map((skill: string) => (
            <Chip key={skill} style={styles.chip}>
              <Text style={styles.chipText}>{skill}</Text>
            </Chip>
          ))}
        </View>

        <View style={styles.sectionDivider} />
        <Text style={styles.sectionTitle}>My Interests</Text>
        <View style={styles.box}>
          {user.interests?.map((interest: string) => (
            <Chip key={interest} style={styles.chip}>
              <Text style={styles.chipText}>{interest}</Text>
            </Chip>
          ))}
        </View>
      </View>
    </View>
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
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
    overflow: 'visible',
  },
  banner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'android' ? 180 : 170,
    backgroundColor: '#77615E',
    zIndex: -1,
  },
  bannerWrapper: {
    position: 'relative',
    height: Platform.OS === 'android' ? 180 : 170,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#77615E',
  },
  avatarWrapper: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 110 : 90,
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
  avatarSpacer: {
    height: Platform.OS === 'android' ? 60 : 60,
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
  closeIconContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    right: 20,
    zIndex: 20,
  },
  closeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default UserProfile;
