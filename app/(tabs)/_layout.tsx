import { Tabs, useNavigation } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from './../components/HapticTab';
import { IconSymbol } from './../components/ui/IconSymbol';
import TabBarBackground from './../components/ui/TabBarBackground';
import { Colors } from './../constants/Colors';
import { useColorScheme } from './../hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const state = navigation?.getState?.();
  const currentRoute = state?.routes?.[state.index]?.name ?? '';

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
      <Tabs.Screen
        name="ProfileScreen"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="compass" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

