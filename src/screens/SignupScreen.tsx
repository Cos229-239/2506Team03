import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
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
  TouchableOpacity,
  View,
} from 'react-native';
import groupedCities from '../../assets/data/groupedCities';
import SkillSelectorModal from '../../components/SkillSelectorModal';
import { useUser } from '../../src/contexts/UserContext';
import { auth, db } from '../firebaseConfig';


console.log('✅ Signup screen is loaded');


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
    latitude: 0,
    longitude: 0,
    bio: '',
    skills: [],
    interests: [],
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


      <TouchableOpacity
        style={[styles.button, { opacity: form.location ? 1 : 0.5 }]}
        disabled={!form.location}
        onPress={handleSignup}
      >
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
