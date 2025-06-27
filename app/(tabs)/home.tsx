import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { users } from '../../assets/data/mockUsers';
import Header from '../components/Header';

const Home = () => {
  return (
    <ScrollView style={styles.container}>
      <Header />
      {/* Welcome Message */}
      <Text style={styles.welcome}>Welcome back, Sarah! 🎉</Text>

      {/* Button Grid */}
      <View style={styles.buttonGrid}>
        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Request Skills</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Offer Skills</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Browse Skills</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>View Swaps</Text></TouchableOpacity>
      </View>

      {/* Featured Matches */}
      <Text style={styles.sectionTitle}>Featured Matches</Text>
      <View style={styles.featuredRow}>
        {[users.denver, users.seattle2, users.newyork2].map((user, index) => (
          <View key={user.name} style={styles.matchContainer}>
            <Image source={user.avatar} style={styles.avatar} />
            <Text style={styles.matchName}>{user.name}</Text>
            <Text style={styles.matchRole}>{user.profession}</Text>
            <TouchableOpacity style={styles.swapButton}>
              <Text style={styles.swapButtonText}>Request Swap</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Upcoming Swaps */}
      <Text style={styles.sectionTitle}>Upcoming Swaps</Text>
      <View style={styles.upcomingRow}>
        {[
          {
            name: 'Italian Lessons w/ Enzo B.',
            date: '6/22/2025 — 4:00pm EST',
            location: 'Remote: Zoom',
            avatar: require('../../assets/images/avatar-enzo.png'),
          },
          {
            name: 'Oil Changes w/ Robert C.',
            date: '6/29/2025 — 2:00pm EST',
            location: 'Local: Seattle, WA',
            avatar: require('../../assets/images/avatar-robert.png'),
          },
        ].map((swap, index) => (
          <View key={index} style={styles.upcomingCard}>
            <Image source={swap.avatar} style={styles.upcomingAvatar} />
            <View style={styles.upcomingInfo}>
              <Text style={styles.upcomingTitle}>{swap.name}</Text>
              <Text style={styles.upcomingText}>{swap.date}</Text>
              <Text style={styles.upcomingText}>{swap.location}</Text>
            </View>
          </View>
        ))}
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
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 28,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 20,
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
    fontSize: 18,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  matchName: {
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  matchRole: {
    fontStyle: 'italic',
    fontSize: 14,
    color: '#000',
    marginBottom: 6,
  },
  swapButton: {
    backgroundColor: '#ACC3EE',
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderRadius: 8,
    borderWidth: 2,
  },
  swapButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  featuredRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#000',
    marginBottom: 6,
  },
  matchContainer: {
    alignItems: 'center',
    marginRight: 20,
  },
  upcomingRow: {
    flexDirection: 'column',
    gap: 20,
    marginTop: 5,
  },
  upcomingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CBA16B',
    padding: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    width: '100%',
    position: 'relative',
    marginBottom: 1,
  },
  avatarWrapper: {
    position: 'absolute',
    top: -28,
    left: 15,
    zIndex: 1,
    borderRadius: 40,
  },
  upcomingAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    marginRight: 12,
    resizeMode: 'cover',
  },
  upcomingTitle: {
    fontWeight: '700',
    fontSize: 18,
    marginTop: 4,
    marginBottom: 4,
    color: '#000',
  },
  upcomingText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  upcomingInfo: {
    flexShrink: 1,
  }
});

export default Home;