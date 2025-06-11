import React from 'react';
import { ScrollView, View, StyleSheet, useColorScheme } from 'react-native';

type Props = {
  headerImage: React.ReactNode;
  children: React.ReactNode;
  headerBackgroundColor?: {
    light: string;
    dark: string;
  };
};

export default function ParallaxScrollView({
  headerImage,
  children,
  headerBackgroundColor = { light: '#FFF', dark: '#000' }, // default fallback
}: Props) {
  const colorScheme = useColorScheme();
  const backgroundColor = headerBackgroundColor[colorScheme ?? 'light'];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[styles.header, { backgroundColor }]}>
        {headerImage}
      </View>
      <View style={styles.content}>{children}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 120 },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 24,
    zIndex: 1,
  },
  content: { paddingHorizontal: 16 },
});
export { ParallaxScrollView };