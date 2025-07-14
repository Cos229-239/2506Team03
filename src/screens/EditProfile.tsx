import { useRouter } from 'expo-router';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import SkillSelectorModal from '../../components/SkillSelectorModal';
import { useUser } from '../../src/contexts/UserContext';
import { db } from '../../src/firebaseConfig';

export default function EditProfile() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [skills, setSkills] = useState<string[]>(user?.skills || []);
  const [interests, setInterests] = useState<string[]>(user?.interests || []);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showInterestModal, setShowInterestModal] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    role: user?.role || '',
    location: user?.location || '',
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSave = async () => {
    try {
      if (!user?.uid) throw new Error('User ID is missing');

      const updatedProfile = {
        name: form.name,
        bio: form.bio,
        role: form.role,
        location: form.location,
        skills,
        interests,
      };

      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, updatedProfile);

      const updatedUser = { ...user, ...updatedProfile };
      await setUser(updatedUser);

      Alert.alert('Success', 'Your profile has been updated!');
      router.replace('/(tabs)/profile');
    } catch (err: any) {
      console.error('❌ Failed to update profile:', err.message);
      Alert.alert('Error', err.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      {(['name', 'bio', 'role', 'location'] as const).map((key) => (
        <TextInput
          key={key}
          placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
          value={form[key]}
          multiline={key === 'bio'}
          onChangeText={(val) => handleChange(key, val)}
          style={styles.input}
        />
      ))}

      <Pressable onPress={() => setShowSkillModal(true)} style={styles.selectBox}>
        <Text style={styles.selectText}>
          {skills.length > 0 ? skills.join(', ') : 'Select your skills'}
        </Text>
      </Pressable>

      <Pressable onPress={() => setShowInterestModal(true)} style={styles.selectBox}>
        <Text style={styles.selectText}>
          {interests.length > 0 ? interests.join(', ') : 'Select your interests'}
        </Text>
      </Pressable>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>

      <SkillSelectorModal
        visible={showSkillModal}
        onClose={() => setShowSkillModal(false)}
        mode="skills"
        initialSelected={skills}
        onSave={(selected) => {
          setSkills(selected);
          setShowSkillModal(false);
        }}
      />

      <SkillSelectorModal
        visible={showInterestModal}
        onClose={() => setShowInterestModal(false)}
        mode="interests"
        initialSelected={interests}
        onSave={(selected) => {
          setInterests(selected);
          setShowInterestModal(false);
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#9DD4B6',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#222',
    marginTop: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  selectBox: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectText: {
    fontSize: 15,
    fontWeight: 'normal',
    color: '#201f1fff',
  },
});
