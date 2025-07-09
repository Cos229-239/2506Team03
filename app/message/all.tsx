import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const AllMessagesScreen = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back(); // go back to the previous screen
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Text style={styles.backText}>{'<'}</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.placeholder}>
          This is the full messages screen (placeholder)
        </Text>
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
    top: 50,
    left: 20,
    zIndex: 10,
    padding: 10,
  },
  backText: {
    fontSize: 24,
    fontWeight: 'bold',
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