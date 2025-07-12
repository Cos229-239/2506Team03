import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import * as React from 'react';
import { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import groupedCities from '../../assets/data/groupedCities'; // ✅ corrected import

import { useUser } from '../../src/contexts/UserContext';
import { auth, db } from '../firebaseConfig';

console.log('✅ Signup screen is loaded');

const DEFAULT_AVATAR =
  'https://firebasestorage.googleapis.com/v0/b/xskill-swapx.firebasestorage.app/o/profile.jpg?alt=media&token=827cee39-3e1e-4828-a070-0f8ff36fab86';

export default function SignUpScreen() {
  const router = useRouter();
  const { setUser } = useUser();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    location: '',
    latitude: 0,
    longitude: 0,
    bio: '',
    skills: '',
    interests: '',
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSignup = async () => {
    const {
      name,
      email,
      password,
      role,
      location,
      latitude,
      longitude,
      bio,
      skills,
      interests,
    } = form;

    if (!email || !password || !name) {
      Alert.alert('Missing Fields', 'Please fill in name, email, and password.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      const userData = {
        uid,
        name,
        email,
        role,
        location,
        latitude,
        longitude,
        bio,
        avatar: DEFAULT_AVATAR,
        skills: skills.split(',').map((s) => s.trim()),
        interests: interests.split(',').map((i) => i.trim()),
      };

      await setDoc(doc(db, 'users', uid), userData);

      setUser(userData);
      await AsyncStorage.setItem('user', JSON.stringify(userData));

      Alert.alert('Success', 'Account created successfully!');
      router.replace('/');

    } catch (error: any) {
      console.error('❌ Signup failed:', error);
      Alert.alert('Signup failed', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={form.name}
        onChangeText={(val) => handleChange('name', val)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={form.email}
        autoCapitalize="none"
        onChangeText={(val) => handleChange('email', val)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={form.password}
        onChangeText={(val) => handleChange('password', val)}
      />
      <TextInput
        style={styles.input}
        placeholder="Role (e.g. Carpenter, Designer)"
        value={form.role}
        onChangeText={(val) => handleChange('role', val)}
      />

      <Text style={{ marginBottom: 8, fontWeight: 'bold' }}>Select Your City</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={form.location}
          onValueChange={(key: string) => {
            const city = Object.values(groupedCities)
              .flat()
              .find((c) => c.key === key);
            if (city) {
              setForm({
                ...form,
                location: city.name,
                latitude: city.latitude,
                longitude: city.longitude,
              });
            }
          }}
          style={styles.picker}
        >
          <Picker.Item label="Select a City" value="" />
          {Object.values(groupedCities)
            .flat()
            .map((city) => (
              <Picker.Item key={city.key} label={city.name} value={city.key} />
            ))}
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Short Bio"
        value={form.bio}
        onChangeText={(val) => handleChange('bio', val)}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Skills (comma separated)"
        value={form.skills}
        onChangeText={(val) => handleChange('skills', val)}
      />
      <TextInput
        style={styles.input}
        placeholder="Interests (comma separated)"
        value={form.interests}
        onChangeText={(val) => handleChange('interests', val)}
      />

      <TouchableOpacity
        style={[styles.button, { opacity: form.location ? 1 : 0.5 }]}
        disabled={!form.location}
        onPress={handleSignup}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
    backgroundColor: '#f2f2f2',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  button: {
    backgroundColor: '#9DD4B6',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
