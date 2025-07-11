import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper'; // Paper icon button

const AllMessagesScreen = () => {
  const router = useRouter();
  const messages: any[] = [];

  const handleBack = () => {
    router.back();
  };

  const handleNewMessage = () => {
    console.log('📨 New Message button pressed');
  };

  return (
    <View style={styles.container}>
      {/* Back Button (Left) */}
      <IconButton
        icon="chevron-left"
        size={32}
        onPress={handleBack}
        style={styles.backButton}
      />

      {/* New Message Button (Right) */}
      <IconButton
        icon="square-edit-outline"
        size={28}
        onPress={handleNewMessage}
        style={styles.newMessageButton}
      />

      <View style={styles.content}>
        {messages.length === 0 ? (
          <Text style={styles.placeholder}>You have no new messages</Text>
        ) : (
          <Text style={styles.placeholder}>[Messages will be shown here]</Text>
        )}
      </View>
    </View>
  );
};

export default AllMessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 45,
    left: 10,
    zIndex: 10,
  },
  newMessageButton: {
    position: 'absolute',
    top: 45,
    right: 10,
    zIndex: 10,
  },
  content: {
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    fontSize: 18,
    color: '#555',
  },
});