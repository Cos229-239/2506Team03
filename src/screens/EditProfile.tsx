import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { useUser } from '../../src/contexts/UserContext';
import { db } from '../../src/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
console.log("✅ Edit Profile screen is loaded");
export default function EditProfile() {
  const { user, setUser } = useUser();
  const router = useRouter();

  const [form, setForm] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    role: user?.role || '',
    location: user?.location || '',
    skills: (user?.skills || []).join(', '),
    interests: (user?.interests || []).join(', '),
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
        skills: form.skills.split(',').map((s) => s.trim()),
        interests: form.interests.split(',').map((i) => i.trim()),
      };

      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, updatedProfile);

      const updatedUser = { ...user, ...updatedProfile };
      setUser(updatedUser);
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));

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

      {Object.entries(form).map(([key, value]) => (
        <TextInput
          key={key}
          placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
          value={value}
          multiline={key === 'bio'}
          onChangeText={(val) => handleChange(key, val)}
          style={styles.input}
        />
      ))}

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
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
    backgroundColor: '#90e0a4',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2e7d32',
    marginTop: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
