import React from 'react';
import { View, StyleSheet } from 'react-native';

export const ThemedView = ({ style, children }: { style?: object; children: React.ReactNode }) => {
  return <View style={[styles.default, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  default: { padding: 8 },
});
export default ThemedView;