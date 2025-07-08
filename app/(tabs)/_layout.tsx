// app/(tabs)/_layout.tsx
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs, useNavigation } from 'expo-router';
import * as React from 'react';
import { Platform, useColorScheme } from 'react-native';

import { HapticTab } from '../../components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '../../components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const state = navigation?.getState?.();
  const currentRoute = state?.routes?.[state.index]?.name ?? '';

  // hide the tab bar on these routes
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
      : {
          backgroundColor: 'rgb(30, 58, 66)', // set your color here !!
          borderTopWidth: 0,
          position: Platform.OS === 'ios' ? 'absolute' : 'relative',
        },
  }}
>
      {/* Explore Tab */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => (
            <IconSymbol  name="compass" size={28} color={color} />
          ),
        }}
      />








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






      {/* Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />








        {/* Messages Tab */}
        <Tabs.Screen
          name="messages"
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
  );
}
