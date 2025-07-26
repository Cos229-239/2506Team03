

import { useRouter } from 'expo-router';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import {
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
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
import { db } from '../../src/firebaseConfig';

console.log("✅ Edit Profile screen is loaded");


export default function EditProfile() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [skills, setSkills] = useState<string[]>(user?.skills || []);
  const [interests, setInterests] = useState<string[]>(user?.interests || []);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [showCityModal, setShowCityModal] = useState(false);
  const [collapsedStates, setCollapsedStates] = useState<string[]>(Object.keys(groupedCities));

  const [form, setForm] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    role: user?.role || '',
    location: user?.location || '',

    latitude: user?.latitude || 0,
    longitude: user?.longitude || 0,
    skills: (user?.skills || []).join(', '),
    interests: (user?.interests || []).join(', '),

  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const selectCity = (key: string) => {
    const city = Object.values(groupedCities).flat().find((c) => c.key === key);
    if (city) {
      setForm({
        ...form,
        location: city.name,
        latitude: city.latitude,
        longitude: city.longitude,
      });
      setShowCityModal(false);
    }
  };

  const handleSave = async () => {
    try {
      if (!user?.uid) throw new Error('User ID is missing');
      if (!form.location) throw new Error('Please select a valid city.');

      const updatedProfile = {
        name: form.name,
        bio: form.bio,
        role: form.role,
        location: form.location,

        latitude: form.latitude,
        longitude: form.longitude,
        skills: form.skills.split(',').map((s) => s.trim()),
        interests: form.interests.split(',').map((i) => i.trim()),

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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>✕</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Edit Profile</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput
          placeholder="Name"
          value={form.name}
          onChangeText={(val) => handleChange('name', val)}
          style={styles.input}
        />

        <Text style={styles.label}>Role</Text>
        <TextInput
          placeholder="Role"
          value={form.role}
          onChangeText={(val) => handleChange('role', val)}
          style={styles.input}
        />

        <Text style={styles.label}>Location</Text>
        <Pressable onPress={() => setShowCityModal(true)} style={styles.selectBox}>
          <Text style={styles.selectText}>
            {form.location ? form.location.split(',')[0] : 'Select a city'}
          </Text>
        </Pressable>

        <Text style={styles.label}>Short Bio</Text>
        <TextInput
          placeholder="Short Bio"
          value={form.bio}
          onChangeText={(val) => handleChange('bio', val)}
          multiline
          style={styles.input}
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
            setForm({ ...form, skills: selected.join(', ') });
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
            setForm({ ...form, interests: selected.join(', ') });
            setShowInterestModal(false);
          }}
        />

        <Text style={{ marginTop: 8, fontStyle: 'italic', fontSize: 12, color: 'gray' }}>
          You must select a city from the dropdown in order to appear on the Explore map.
        </Text>

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
                    <TouchableOpacity onPress={() => setCollapsedStates(prev =>
                      prev.includes(state)
                        ? prev.filter(s => s !== state)
                        : [...prev, state]
                    )} style={{ paddingHorizontal: 16 }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                        {collapsedStates.includes(state) ? '▶' : '▼'} {state}
                      </Text>
                    </TouchableOpacity>

                    {!collapsedStates.includes(state) && (
                      <View style={{ paddingLeft: 32, paddingTop: 4 }}>
                        {cities.map((city: { key: string; name: string; latitude: number; longitude: number }) => (
                          <TouchableOpacity
                            key={city.key}
                            onPress={() => selectCity(city.key)}
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
    </SafeAreaView>
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
    fontSize: 16,
    color: '#201f1fff',
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
  backButton: {
    marginTop: 28,
    marginBottom: 4,
    marginLeft: 10,
  },
  backButtonText: {
    fontSize: 25,
    color: '#333',
    fontWeight: 'bold',
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
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
});