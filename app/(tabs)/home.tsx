import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../components/Header';

const Home = () => {
  return (
    <ScrollView style={styles.container}>
      <Header />
      {/* Welcome Message */}
      <Text style={styles.welcome}>Welcome back, Sarah!</Text>

      {/* Button Grid */}
      <View style={styles.buttonGrid}>
        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Request Skills</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Offer Skills</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Browse Skills</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>View Swaps</Text></TouchableOpacity>
      </View>

      {/* Featured Matches */}
      <Text style={styles.sectionTitle}>Featured Matches</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {[1, 2, 3].map((i) => (
          <View key={i} style={styles.matchCard}>
            <Text style={styles.matchName}>Person {i}</Text>
            <Text style={styles.matchRole}>Skill Title</Text>
            <TouchableOpacity style={styles.swapButton}><Text style={styles.swapButtonText}>Request Swap</Text></TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Upcoming Swaps */}
      <Text style={styles.sectionTitle}>Upcoming Swaps</Text>
      <View style={styles.upcomingCard}>
        <Text style={styles.upcomingTitle}>Italian Lessons w/ Enzo B.</Text>
        <Text style={styles.upcomingText}>6/22/2025 — 4:00pm EST</Text>
        <Text style={styles.upcomingText}>Remote: Zoom</Text>
      </View>
      <View style={styles.upcomingCard}>
        <Text style={styles.upcomingTitle}>Oil Changes w/ Robert C.</Text>
        <Text style={styles.upcomingText}>6/29/2025 — 2:00pm EST</Text>
        <Text style={styles.upcomingText}>Local: Seattle, WA</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 28,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#9DD4B6',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 12,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  horizontalScroll: {
    marginBottom: 30,
  },
  matchCard: {
    backgroundColor: '#F1F1F1',
    borderRadius: 12,
    padding: 10,
    marginRight: 5,
    alignItems: 'center',
    width: 120,
  },
  matchName: {
    fontWeight: '600',
  },
  matchRole: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  swapButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  swapButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  upcomingCard: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 15,
  },
  upcomingTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 5,
  },
  upcomingText: {
    color: '#ccc',
    fontSize: 13,
  },
});

export default Home;