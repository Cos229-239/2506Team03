import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MessageScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>📩 This is the Message screen </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});

export default MessageScreen;