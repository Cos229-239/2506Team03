import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import * as React from 'react';
import { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

import groupedCities from '../../assets/data/groupedCities.js';
import SkillSelectorModal from '../../components/SkillSelectorModal';
import { useUser } from '../../src/contexts/UserContext';
import { auth, db } from '../firebaseConfig';

const DEFAULT_AVATAR =
  'https://firebasestorage.googleapis.com/v0/b/xskill-swapx.firebasestorage.app/o/profile.jpg?alt=media&token=827cee39-3e1e-4828-a070-0f8ff36fab86';


export default function SignUpScreen() {
  const router = useRouter();
  const { setUser } = useUser();
  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showInterestModal, setShowInterestModal] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    location: '',
    bio: '',
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSignup = async () => {
    const { name, email, password, role, location, bio } = form;

    if (!email || !password || !name) {
      Alert.alert('Missing Fields', 'Please fill in name, email, and password.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      const flatCities = Object.values(groupedCities).flat();
      const baseCity = location.split(',')[0].trim();
      const cityInfo = flatCities.find(c => c.name.split(',')[0] === baseCity);

      const userData = {
        uid,
        name,
        email,
        role,
        location,
        latitude: cityInfo?.latitude ?? 0,
        longitude: cityInfo?.longitude ?? 0,
        bio,
        avatar: DEFAULT_AVATAR,
        skills,
        interests,
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

      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
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


      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
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
    fontSize: 20,
  },
  backButton: {
    marginTop: 16,
    marginBottom: 4,
    marginLeft: 4,
  },
  backButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
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
    color: '#646161ff',
    fontWeight: 'normal',
  },
});
