
import { Picker } from '@react-native-picker/picker';
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
  TouchableOpacity,
  View
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>


      <TextInput
        placeholder="Name"
        value={form.name}
        onChangeText={(val) => handleChange('name', val)}
        style={styles.input}
      />

      <TextInput
        placeholder="Role"
        value={form.role}
        onChangeText={(val) => handleChange('role', val)}
        style={styles.input}
      />

      <Text style={{ marginBottom: 8, fontWeight: 'bold' }}>Select Your City</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={form.location}
          onValueChange={(key: string) => {
            const city = Object.values(groupedCities).flat().find((c) => c.key === key);
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
        placeholder="Short Bio"
        value={form.bio}
        onChangeText={(val) => handleChange('bio', val)}
        multiline
        style={styles.input}
      />

      <TextInput
        placeholder="Skills (comma separated)"
        value={form.skills}
        onChangeText={(val) => handleChange('skills', val)}
        style={styles.input}
      />

      <TextInput
        placeholder="Interests (comma separated)"
        value={form.interests}
        onChangeText={(val) => handleChange('interests', val)}
        style={styles.input}
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

      <Text style={{ marginTop: 8, fontStyle: 'italic', fontSize: 12, color: 'gray' }}>
        You must select a city from the dropdown in order to appear on the Explore map.
      </Text>

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
