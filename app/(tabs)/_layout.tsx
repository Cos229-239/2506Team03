import { Tabs, useNavigation } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '../components/HapticTab';
import { IconSymbol } from '../components/ui/IconSymbol';
import TabBarBackground from '../components/ui/TabBarBackground';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';

import Ionicons from '@expo/vector-icons/Ionicons'; // ✅ New import for settings icon
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const state = navigation?.getState?.();
  const currentRoute = state?.routes?.[state.index]?.name ?? '';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle:
          currentRoute === 'index'
            ? { display: 'none' }
            : Platform.select({
                ios: { position: 'absolute' },
                default: {},
              }),
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="home" color={color} />
          ),
        }}
      />

      {/* Explore Tab */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="compass" color={color} />
          ),
        }}
      />

      {/* Message Tab */}
      <Tabs.Screen
        name="message"
        options={{
          title: 'Message',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="message" size={24} color={color} />
          ),
        }}
      />

      {/* Settings Tab (Updated Icon) */}
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings-sharp" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}