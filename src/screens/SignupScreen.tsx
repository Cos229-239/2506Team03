import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import * as React from 'react';
import { useState } from 'react';
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
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
  const [expandedStates, setExpandedStates] = useState<{ [key: string]: boolean }>({});
  const [showCityModal, setShowCityModal] = useState(false);
  const [collapsedStates, setCollapsedStates] = useState<string[]>(Object.keys(groupedCities));
  const toggleState = (state: string) => {
    setExpandedStates((prev) => ({
      ...prev,
      [state]: !prev[state],
    }));
  };

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    location: '',
    latitude: 0,
    longitude: 0,
    bio: '',
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

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={form.name}
        onChangeText={(val) => handleChange('name', val)}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={form.email}
        autoCapitalize="none"
        onChangeText={(val) => handleChange('email', val)}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={form.password}
        onChangeText={(val) => handleChange('password', val)}
      />

      <Text style={styles.label}>Role (e.g. Carpenter, Designer)</Text>
      <TextInput
        style={styles.input}
        placeholder="Role (e.g. Carpenter, Designer)"
        value={form.role}
        onChangeText={(val) => handleChange('role', val)}
      />

      <Text style={styles.label}>Location</Text>
      <Pressable onPress={() => setShowCityModal(true)} style={styles.selectBox}>
        <Text style={styles.selectText}>
          {form.location ? form.location : 'Select your city'}
        </Text>
      </Pressable>

      <Text style={styles.label}>Short Bio</Text>
      <TextInput
        style={styles.input}
        placeholder="Short Bio"
        value={form.bio}
        onChangeText={(val) => handleChange('bio', val)}
        multiline
      />

      <Text style={styles.label}>Skills I Can Offer</Text>
      <Pressable onPress={() => setShowSkillModal(true)} style={styles.selectBox}>
        <Text style={styles.selectText}>
          {skills.length > 0 ? skills.join(', ') : 'Select your skills'}
        </Text>
      </Pressable>

      <Text style={styles.label}>Skills I Want to Learn</Text>
      <Pressable onPress={() => setShowInterestModal(true)} style={styles.selectBox}>
        <Text style={styles.selectText}>
          {interests.length > 0 ? interests.join(', ') : 'Select your interests'}
        </Text>
      </Pressable>

      <View style={{ paddingHorizontal: 20, paddingBottom: 24 }}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: form.location ? '#9DD4B6' : '#d6eadf',
              borderColor: '#222',
              borderWidth: 2,
            }
          ]}
          disabled={!form.location}
          onPress={handleSignup}
        >
          <Text style={[styles.buttonText, { color: '#000' }]}>Sign Up</Text>
        </TouchableOpacity>
      </View>

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

      <Modal transparent visible={showCityModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalBoxLargeBase, { height: '80%' }]}>
            <TouchableOpacity onPress={() => setShowCityModal(false)} style={styles.closeIcon}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Select City</Text>
            <View style={styles.cityModalAccentBar} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 12 }}>
              <TouchableOpacity
                onPress={() => setCollapsedStates(Object.keys(groupedCities))}
                style={{ flex: 1, backgroundColor: '#50403e', padding: 8, borderRadius: 6, marginRight: 6 }}
              >
                <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>Collapse All</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setCollapsedStates([])}
                style={{ flex: 1, backgroundColor: '#445f50', padding: 8, borderRadius: 6, marginLeft: 6 }}
              >
                <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>Expand All</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 16 }}
              overScrollMode="never"
              bounces={false}
              style={{ flex: 1, width: '100%' }}
            >
              {Object.entries(groupedCities).map(([state, cities]) => (
                <View key={state} style={{ marginBottom: 16 }}>
                  <TouchableOpacity
                    onPress={() =>
                      setCollapsedStates((prev) =>
                        prev.includes(state) ? prev.filter((s) => s !== state) : [...prev, state]
                      )
                    }
                    style={{ paddingHorizontal: 16 }}
                  >
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                      {collapsedStates.includes(state) ? '▶' : '▼'} {state}
                    </Text>
                  </TouchableOpacity>

                  {!collapsedStates.includes(state) && (
                    <View style={{ paddingLeft: 32, paddingTop: 4 }}>
                      {cities.map((city: { key: string; name: string; latitude: number; longitude: number }) => (
                        <TouchableOpacity
                          key={city.key}
                          onPress={() => {
                            setForm({
                              ...form,
                              location: city.name,
                              latitude: city.latitude,
                              longitude: city.longitude,
                            });
                            setShowCityModal(false);
                          }}
                          style={{ paddingVertical: 4 }}
                        >
                          <Text style={{ fontSize: 15 }}>{city.name.split(',')[0]}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    paddingTop: 10,
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
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBoxLargeBase: {
    width: '92%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    alignSelf: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  cityModalAccentBar: {
    height: 6,
    width: '85%',
    backgroundColor: '#CBA16B',
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  closeIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
  },
  closeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
