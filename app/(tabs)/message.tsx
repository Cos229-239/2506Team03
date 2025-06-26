import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Avatar, Text, TouchableRipple } from 'react-native-paper';

const messages = [
  { id: '1', name: 'Amber Edison', text: 'Thanks for your help! Can’t wait to plan...' },
  { id: '2', name: 'Enzo Bartolli', text: "Sunday looks good. I'll send the Zoom..." },
  { id: '3', name: 'Robert Campbell', text: 'Looking forward to the skill swap - let...' },
];

const following = [
  { id: '1', name: 'Rosalia T.', role: 'Trainer' },
  { id: '2', name: 'Robert C.', role: 'Car Mechanic' },
  { id: '3', name: 'Amber E.', role: 'Baker' },
  { id: '4', name: 'Thalia V.', role: 'Gardener' },
  { id: '5', name: 'Enzo B.', role: 'Language Tutor' },
  { id: '6', name: 'John S.', role: 'Carpenter' },
  { id: '7', name: 'Lana M.', role: 'Yoga Instructor' },
  { id: '8', name: 'Miguel H.', role: 'Photographer' },
  { id: '9', name: 'Chloe K.', role: 'Designer' },
  { id: '10', name: 'Sam R.', role: 'Mechanic' },
  { id: '11', name: 'Ava G.', role: 'Makeup Artist' },
  { id: '12', name: 'Derek L.', role: 'Cycling Coach' },
];

const MessageScreen = () => {
  return (
    <View style={styles.container}>
      {/* Messages Section */}
      <View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Messages</Text>
          <TouchableRipple onPress={() => {}} borderless>
            <View style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See all...</Text>
            </View>
          </TouchableRipple>
        </View>

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
      </View>

      {/* Following Section */}
      <View style={styles.followingWrapper}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Following</Text>
          <TouchableRipple onPress={() => {}} borderless>
            <View style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See all...</Text>
            </View>
          </TouchableRipple>
        </View>

        <FlatList
          data={following}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={{ paddingBottom: 40 }}
          columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 24 }}
          showsVerticalScrollIndicator={true}
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
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
  seeAllButton: {
    backgroundColor: '#9DD4B6',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  seeAllText: {
    color: 'black',
    fontSize: 13,
    fontWeight: '600',
  },
  messageCard: {
    flexDirection: 'row',
    backgroundColor: '#98ADD4',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  messageAvatar: {
    backgroundColor: '#A0837F',
  },
  messageContent: {
    marginLeft: 12,
    flex: 1,
  },
  messageName: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#000',
  },
  messageText: {
    fontSize: 14,
    color: '#000',
  },
  followingWrapper: {
    flex: 1,
    marginTop: 16,
  },
  followingItem: {
    width: '30%',
    alignItems: 'center',
  },
  followAvatar: {
    backgroundColor: '#A0837F',
    marginBottom: 4,
  },
  followName: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    color: '#000',
  },
  followRole: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
  },
});

export default MessageScreen;
