import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Avatar, Text } from 'react-native-paper';

const messages = [
  {
    id: '1',
    name: 'Amber Edison',
    text: 'Thanks for your help! Can’t wait to plan...',
  },
  {
    id: '2',
    name: 'Enzo Bartolli',
    text: "Sunday looks good. I'll send the Zoom...",
  },
  {
    id: '3',
    name: 'Robert Campbell',
    text: 'Looking forward to the skill swap - let...',
  },
];

const following = [
  { id: '1', name: 'Rosalia T.', role: 'Trainer' },
  { id: '2', name: 'Robert C.', role: 'Car Mechanic' },
  { id: '3', name: 'Amber E.', role: 'Baker' },
  { id: '4', name: 'Thalia V.', role: 'Gardener' },
  { id: '5', name: 'Enzo B.', role: 'Language Tutor' },
  { id: '6', name: 'John S.', role: 'Carpenter' },
];

const MessageScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Messages Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Messages</Text>
        <Text style={styles.seeAll}>See all...</Text>
      </View>

      {/* Messages List */}
      {messages.map((msg) => (
        <View key={msg.id} style={styles.messageCard}>
          <Avatar.Text
            size={48}
            label={msg.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            style={styles.messageAvatar}
            labelStyle={{ fontSize: 18 }}
          />
          <View style={styles.messageContent}>
            <Text style={styles.messageName}>{msg.name}</Text>
            <Text style={styles.messageText} numberOfLines={1}>{msg.text}</Text>
          </View>
        </View>
      ))}

      {/* Following Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Following</Text>
        <Text style={styles.seeAll}>See all...</Text>
      </View>

      {/* Following Grid (3 per row) */}
      <FlatList
        data={following}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 24 }}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={styles.followingItem}>
            <Avatar.Text
              size={80}
              label={item.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              style={styles.followAvatar}
              labelStyle={{ fontSize: 24 }}
            />
            <Text style={styles.followName}>{item.name}</Text>
            <Text style={styles.followRole}>{item.role}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 100,
    backgroundColor: '#fff',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 24,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  seeAll: {
    color: '#2E7D32',
    fontWeight: '600',
    fontSize: 14,
  },
  messageCard: {
    flexDirection: 'row',
    backgroundColor: '#d8e7ff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  messageAvatar: {
    backgroundColor: '#bbdefb',
  },
  messageContent: {
    marginLeft: 12,
    flex: 1,
  },
  messageName: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  messageText: {
    fontSize: 14,
  },
  followingItem: {
    width: '30%',
    alignItems: 'center',
  },
  followAvatar: {
    backgroundColor: '#cfd8dc',
    marginBottom: 4,
  },
  followName: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  followRole: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
  },
});

export default MessageScreen;