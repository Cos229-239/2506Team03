import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs, useNavigation } from 'expo-router';
import React, { createContext, useContext, useState } from 'react';
import { Platform, useColorScheme } from 'react-native';
import { HapticTab } from '../components/HapticTab';
import { IconSymbol } from '../components/ui/IconSymbol';
import TabBarBackground from '../components/ui/TabBarBackground';
import { Colors } from '../constants/Colors';

// 1. Create Context
export const DarkModeContext = createContext<{
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}>({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

// 2. Export custom hook
export const useDarkMode = () => useContext(DarkModeContext);

export default function TabLayout() {
  const systemScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemScheme === 'dark');

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);
  const theme = isDarkMode ? Colors.dark : Colors.light;

  const navigation = useNavigation();
  const state = navigation?.getState?.();
  const currentRoute = state?.routes?.[state.index]?.name ?? '';
  const hideTabBarRoutes = ['login', 'index'];
  const shouldHideTabBar = hideTabBarRoutes.includes(currentRoute);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.tint,
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
        <Tabs.Screen
          name="message"
          options={{
            title: 'Message',
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="message" size={24} color={color} />
            ),
          }}
        />
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
    </DarkModeContext.Provider>
  );
}

