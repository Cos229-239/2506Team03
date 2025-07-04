import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Skill Swap</Text>
      <View style={styles.underline} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 36 : 30,
    paddingHorizontal: 16,
    paddingBottom: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  underline: {
  height: 1,
  backgroundColor: '#ccc',
  marginTop: 12,
  marginBottom: 12,
  width: '100%',
  alignSelf: 'center',
},
});