import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

const SettingsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>

        <Button mode="contained" style={styles.button} labelStyle={styles.buttonLabel} onPress={() => {}}>
          Teaching Preferences
        </Button>

        <Button mode="contained" style={styles.button} labelStyle={styles.buttonLabel} onPress={() => {}}>
          Learning Preferences
        </Button>

        <Button mode="contained" style={styles.button} labelStyle={styles.buttonLabel} onPress={() => {}}>
          Notifications
        </Button>

        <Button mode="contained" style={styles.button} labelStyle={styles.buttonLabel} onPress={() => {}}>
          User Settings
        </Button>

        <Button mode="contained" style={styles.button} labelStyle={styles.buttonLabel} onPress={() => {}}>
          Logout
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#cfdfff',
    borderRadius: 12,
    marginBottom: 16,
    paddingVertical: 8,
  },
  buttonLabel: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SettingsScreen;