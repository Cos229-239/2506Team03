import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { auth } from '../firebaseConfig';

export default function SignUpScreen() {
  const router = useRouter();
  const db = getFirestore();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    location: '',
    bio: '',
    skills: '',
    interests: '',
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSignup = async () => {
    const { name, email, password, role, location, bio, skills, interests } = form;

    if (!email || !password || !name) {
      Alert.alert('Missing Fields', 'Please fill in name, email, and password.');
      return;
    }

    try {
      // create user in Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      await updateProfile(userCredential.user, {
        displayName: name, // name is already pulled from your form
      });

      // store extra fields in Firestore under users/{uid}
      await setDoc(doc(db, 'users', userId), {
        name,
        email,
        role,
        location,
        bio,
        skills: skills.split(',').map((s) => s.trim()),
        interests: interests.split(',').map((i) => i.trim()),
      });

      Alert.alert('Success', 'Account created successfully!');
      router.replace('/(tabs)'); // after signup, go to home

    } catch (error: any) {
      console.error(error);
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

      <TextInput
        style={styles.input}
        placeholder="Location"
        value={form.location}
        onChangeText={(val) => handleChange('location', val)}
      />

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

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
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
