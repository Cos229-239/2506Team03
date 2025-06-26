import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Chip } from 'react-native-paper';

console.log("✅ Home screen is loaded");

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Skill Swap</Text>

      <Text style={styles.name}>John Smith</Text>
      <Image
        source={require('../../assets/images/profile.jpg')} // replace with actual image
        style={styles.image}
      />
      <Text style={styles.role}>Carpenter</Text>
      <Text style={styles.location}>Seattle, WA</Text>

      <Text style={styles.sectionTitle}>Bio</Text>
      <View style={styles.box}>
        <Text>
          I’m John - carpenter of 15+ years and proud Seattle local. I specialize in custom
          furniture, home repairs, and teaching beginner woodworking.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>My Skills</Text>
      <View style={styles.box}>
        {['Carpentry', 'Digital Art', 'Woodworking', 'Furniture Repair'].map((skill) => (
          <Chip key={skill} style={styles.chip}>{skill}</Chip>
        ))}
      </View>

      <Text style={styles.sectionTitle}>My Interests</Text>
      <View style={styles.box}>
        {['Programming', 'Drawing', 'Fitness', 'Car Repair'].map((interest) => (
          <Chip key={interest} style={styles.chip}>{interest}</Chip>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  name: { fontSize: 20, textAlign: 'center', marginTop: 8 },
  image: { width: 120, height: 120, borderRadius: 60, alignSelf: 'center', margin: 10 },
  role: { fontStyle: 'italic', textAlign: 'center' },
  location: { textAlign: 'center', marginBottom: 10 },
  sectionTitle: { marginTop: 10, fontWeight: 'bold' },
  box: { backgroundColor: '#b8e0d2', padding: 10, borderRadius: 10, marginTop: 4 },
  chip: { margin: 4, alignSelf: 'flex-start' },
});