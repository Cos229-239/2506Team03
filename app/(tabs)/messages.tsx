import { useRouter } from 'expo-router';
import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Message = {
  id: string;
  name: string;
  text: string;
};

const messages: Message[] = [];

const Messages = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity onPress={() => router.push('/message/chat')}>
          <Icon name="square-edit-outline" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Messages List */}
      {messages.length > 0 ? (
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.messageCard} onPress={() => {}}>
              <Avatar.Text
                size={48}
                label={item.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)}
                style={styles.avatar}
                labelStyle={{ fontSize: 18 }}
              />
              <View style={styles.messageInfo}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.text} numberOfLines={1}>
                  {item.text}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>You have no messages.</Text>
      )}
    </SafeAreaView>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  messageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#98ADD4',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
  },
  avatar: {
    backgroundColor: '#A0837F',
  },
  messageInfo: {
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  text: {
    fontSize: 14,
    color: '#000',
  },
  emptyText: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginVertical: 20,
    fontSize: 14,
    color: '#555',
  },
});