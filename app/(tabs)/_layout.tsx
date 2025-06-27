import { Tabs, useNavigation } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { useColorScheme } from 'react-native';
import { HapticTab } from '../components/HapticTab';
import { IconSymbol } from '../components/ui/IconSymbol';
import TabBarBackground from '../components/ui/TabBarBackground';
import { Colors } from '../constants/Colors';

import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const state = navigation?.getState?.();
  const currentRoute = state?.routes?.[state.index]?.name ?? '';

  // Hide tab bar on specific routes
  const hideTabBarRoutes = ['login', 'index'];
  const shouldHideTabBar = hideTabBarRoutes.includes(currentRoute);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: shouldHideTabBar
          ? { display: 'none' }
          : Platform.select({
            ios: { position: 'absolute' },
            default: {},
          }),
      }}
    >
   {/* Explore Tab */}
<Tabs.Screen
  name="explore"
  options={{
    href: "/explore",
    title: 'Explore',
    tabBarIcon: ({ color }) => (
      <IconSymbol size={28} name="compass" color={color} />
    ),
  }}
/>

{/* Profile Tab */}
<Tabs.Screen
  name="profile"
  options={{
    href: "/profile",
    title: 'Profile',
    tabBarIcon: ({ color }) => (
      <Ionicons name="person" size={24} color={color} />
    ),
  }}
/>

{/* Home Tab (center default) */}
<Tabs.Screen
  name="home"
  options={{
    href: "/home",
    title: 'Home',
    tabBarIcon: ({ color }) => (
      <IconSymbol size={28} name="home" color={color} />
    ),
  }}
/>

{/* Message Tab */}
<Tabs.Screen
  name="message"
  options={{
    title: 'Messages',
    tabBarIcon: ({ color }) => (
      <MaterialIcons name="message" size={24} color={color} />
    ),
  }}
/>

{/* Settings Tab */}
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
)};