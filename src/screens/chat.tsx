import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Avatar, Chip, Menu, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SkillSelectorModal from '../../components/SkillSelectorModal';

const following = [
  { id: '1', name: 'Jane Doe', role: 'Tutor', interests: ['Art', 'Cooking'] },
  { id: '2', name: 'Michael Smith', role: 'Language Coach', interests: ['Languages', 'Travel'] },
  { id: '3', name: 'Alice Johnson', role: 'Career Mentor', interests: ['Career', 'Networking'] },
  { id: '4', name: 'Leo Knight', role: 'Fitness Instructor', interests: ['Fitness', 'Health'] },
];

const dialogueOptions = [
  "Hi! I'm excited to learn from you.",
  'What days are best for your lessons?',
  'Do you offer sessions virtually or in-person?',
  'Can you tell me more about your experience?',
];

const ChatScreen = () => {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const params = useLocalSearchParams();
  const [selectedUser, setSelectedUser] = useState<any>(
    params.user ? JSON.parse(params.user as string) : null
  );
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [tagModalVisible, setTagModalVisible] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleSelectUser = (user: any) => {
    setSelectedUser(user);
    setChatMessages([]);
  };

  const handleSendMessage = (message: string) => {
    setChatMessages((prev) => {
      const updated = [...prev, message];
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50);
      return updated;
    });
  };

  const renderHeader = () => {
    if (selectedUser) {
      return (
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => router.replace('/(tabs)/messages')}>
              <Icon name="chevron-left" size={32} color="#000" />
            </TouchableOpacity>
            <View style={styles.userInfo}>
              <Avatar.Text
                size={36}
                label={selectedUser.name
                  .split(' ')
                  .map((n: string) => n[0])
                  .join('')
                  .slice(0, 2)}
                style={styles.avatar}
                labelStyle={{ fontSize: 16 }}
              />
              <Text style={styles.headerText}>{selectedUser.name}</Text>
            </View>
          </View>

          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <TouchableOpacity onPress={() => setMenuVisible(true)}>
                <Icon name="cog" size={24} color="#000" />
              </TouchableOpacity>
            }
          >
            <Menu.Item onPress={() => {}} title="Notifications Settings" />
            <Menu.Item onPress={() => {}} title="Block" />
            <Menu.Item onPress={() => {}} title="Close Chat" />
            <Menu.Item onPress={() => {}} title="Report" />
          </Menu>
        </View>
      );
    } else {
      return (
        <View style={styles.headerLeftOnly}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="chevron-left" size={32} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Favorites</Text>
        </View>
      );
    }
  };

  const suggestedUsers = selectedTags.length === 0 ? [] : following.filter((user) =>
    user.interests?.some((tag) => selectedTags.includes(tag))
  );

  return (
    <Provider>
      <View style={styles.container}>
        {renderHeader()}

        {!selectedUser ? (
          <ScrollView>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.followingList}
            >
              {following.map((user) => (
                <TouchableOpacity
                  key={user.id}
                  onPress={() => handleSelectUser(user)}
                  style={styles.followingItem}
                >
                  <Avatar.Text
                    size={64}
                    label={user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)}
                    style={styles.avatar}
                  />
                  <Text style={styles.name}>{user.name}</Text>
                  <Text style={styles.role}>{user.role}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={{ marginTop: 24 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>Filter by Topic</Text>
              <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
                <TouchableOpacity
                  style={styles.tagButton}
                  onPress={() => setTagModalVisible(true)}
                >
                  <Text style={styles.tagButtonText}>
                    {selectedTags.length > 0 ? 'Edit Tags' : '+ Select Tags'}
                  </Text>
                </TouchableOpacity>
                {selectedTags.length > 0 && (
                  <TouchableOpacity
                    style={[styles.tagButton, { backgroundColor: '#b1b1b1ff' }]}
                    onPress={() => setSelectedTags([])}
                  >
                    <Text style={styles.tagButtonText}>Clear All</Text>
                  </TouchableOpacity>
                )}
              </View>

              {selectedTags.length > 0 && (
                <ScrollView
                  horizontal
                  style={{ maxHeight: 80, marginBottom: 16 }}
                  contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
                  showsHorizontalScrollIndicator={false}
                >
                  {selectedTags.map((tag, index) => (
                    <Chip
                      key={index}
                      style={styles.chip}
                      textStyle={styles.chipText}
                      onClose={() =>
                        setSelectedTags((prev) => prev.filter((t) => t !== tag))
                      }
                    >
                      {tag}
                    </Chip>
                  ))}
                </ScrollView>
              )}

              {selectedTags.length > 0 && (
                <>
                  <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 12 }}>Suggested Users</Text>
                  {suggestedUsers.length > 0 ? (
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                      {suggestedUsers.map((user) => (
                        <TouchableOpacity
                          key={user.id}
                          onPress={() => handleSelectUser(user)}
                          style={{ alignItems: 'center', marginRight: 16, marginBottom: 16, width: 80 }}
                        >
                          <Avatar.Text
                            size={64}
                            label={user.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                              .slice(0, 2)}
                            style={styles.avatar}
                          />
                          <Text style={styles.name}>{user.name}</Text>
                          <Text style={styles.role}>{user.role}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ) : (
                    <Text style={{ textAlign: 'center', color: 'gray' }}>
                      No suggested users
                    </Text>
                  )}
                </>
              )}
            </View>

            <SkillSelectorModal
              visible={tagModalVisible}
              mode="interests"
              initialSelected={selectedTags}
              onClose={() => setTagModalVisible(false)}
              onSave={(tags) => {
                setSelectedTags(tags);
                setTagModalVisible(false);
              }}
            />
          </ScrollView>
        ) : (
          <>
            <ScrollView ref={scrollRef} style={styles.chatArea}>
              {chatMessages.map((msg, index) => (
                <View key={index} style={styles.messageBubble}>
                  <Text style={styles.bubbleText}>{msg}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.optionsArea}>
              {dialogueOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.optionButton}
                  onPress={() => handleSendMessage(option)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </View>
    </Provider>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLeftOnly: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatar: {
    backgroundColor: '#A0837F',
    marginRight: 8,
  },
  followingList: {
    paddingBottom: 20,
  },
  followingItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 80,
  },
  name: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  role: {
    fontSize: 11,
    color: 'gray',
    textAlign: 'center',
  },
  chatArea: {
    flex: 1,
    marginBottom: 16,
  },
  messageBubble: {
    backgroundColor: '#9DD4B6',
    padding: 12,
    borderRadius: 16,
    alignSelf: 'flex-end',
    marginBottom: 8,
    maxWidth: '80%',
  },
  bubbleText: {
    color: '#000',
    fontSize: 14,
  },
  optionsArea: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 12,
  },
  optionButton: {
    backgroundColor: '#98ADD4',
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  optionText: {
    fontSize: 14,
    color: '#000',
  },
  tagButton: {
    backgroundColor: '#CBA16B',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  tagButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  chip: {
    backgroundColor: '#CAD4E8',
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    color: '#192232',
    fontWeight: '500',
  },
});