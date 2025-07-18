import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableWithoutFeedback,
  View,
  useColorScheme,
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { useUser } from '../../src/contexts/UserContext';
import { db } from '../../src/firebaseConfig';

console.log("✅ Settings screen is loaded");

const SettingsScreen = () => {
  const systemScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemScheme === 'dark');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const theme = isDarkMode ? Colors.dark : Colors.light;
  const { user } = useUser();

  useEffect(() => {
    const loadNotificationSetting = async () => {
      if (!user?.uid) return;
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setNotificationsEnabled(data.notificationsEnabled || false);
        }
      } catch (error) {
        console.error('Failed to fetch notifications setting:', error);
      }
    };
    loadNotificationSetting();
  }, [user]);

  const toggleNotifications = async (value: boolean) => {
    setNotificationsEnabled(value);
    if (!user?.uid) return;
    try {
      await setDoc(doc(db, 'users', user.uid), { notificationsEnabled: value }, { merge: true });
    } catch (error) {
      console.error('Failed to update notifications setting:', error);
    }
  };

  const colors = {
    background: theme.background,
    sectionText: '#888888',
    text: theme.text,
    border: '#EEEEEE',
    iconBlue: '#98ADD4',
    iconMauve: '#A0837F',
    iconGold: '#CBA16B',
    pressHighlight: isDarkMode ? '#2a2a2a' : '#f0f0f0',
  };

  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.sectionTitle, { color: colors.sectionText }]}>GENERAL</Text>

      <SettingsItem
        icon={<Ionicons name="person-circle-outline" size={24} color={colors.iconBlue} />}
        label="Account"
        textColor={colors.text}
        borderColor={colors.border}
        pressColor={colors.pressHighlight}
      />
      <SettingsItem
        icon={<Feather name="settings" size={24} color={colors.iconBlue} />}
        label="User Settings"
        textColor={colors.text}
        borderColor={colors.border}
        pressColor={colors.pressHighlight}
      />
      <SettingsItem
        icon={<MaterialCommunityIcons name="book-outline" size={24} color={colors.iconBlue} />}
        label="Preferences"
        textColor={colors.text}
        borderColor={colors.border}
        pressColor={colors.pressHighlight}
      />

      <View style={[styles.toggleContainer, { borderColor: colors.border }]}>
        <View style={styles.itemLeft}>
          <Ionicons name="notifications-outline" size={24} color={colors.iconBlue} />
          <Text style={[styles.toggleLabel, { color: colors.text, marginLeft: 15 }]}>Enable Notifications</Text>
        </View>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
          trackColor={{ false: '#ccc', true: '#4CAF50' }}
          thumbColor={notificationsEnabled ? '#fff' : '#fff'}
        />
      </View>

      <SettingsItem
        icon={<MaterialCommunityIcons name="logout" size={24} color={colors.iconMauve} />}
        label="Logout"
        textColor={colors.text}
        borderColor={colors.border}
        pressColor={colors.pressHighlight}
        onPress={() => {
          console.log('Logout successful ❌');
          router.replace('/login');
        }}
      />

      <Text style={[styles.sectionTitle, { color: colors.sectionText }]}>FEEDBACK</Text>

      <SettingsItem
        icon={<Feather name="alert-circle" size={24} color={colors.iconGold} />}
        label="Report a Bug"
        textColor={colors.text}
        borderColor={colors.border}
        pressColor={colors.pressHighlight}
      />
      <SettingsItem
        icon={<Feather name="message-square" size={24} color={colors.iconGold} />}
        label="Send Feedback"
        textColor={colors.text}
        borderColor={colors.border}
        pressColor={colors.pressHighlight}
      />

      <Text style={[styles.sectionTitle, { color: colors.sectionText }]}>APPEARANCE</Text>
      <View style={[styles.toggleContainer, { borderColor: colors.border }]}>
        <Text style={[styles.toggleLabel, { color: colors.text }]}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
          trackColor={{ false: '#ccc', true: '#666' }}
          thumbColor={isDarkMode ? '#fff' : '#fff'}
        />
      </View>
    </ScrollView>
  );
};

const SettingsItem = ({
  icon,
  label,
  textColor,
  borderColor,
  pressColor,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  textColor: string;
  borderColor: string;
  pressColor: string;
  onPress?: () => void;
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setIsPressed(false);
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <View
        style={[
          styles.item,
          {
            borderBottomColor: borderColor,
            backgroundColor: isPressed ? pressColor : 'transparent',
          },
        ]}
      >
        <Animated.View style={{ transform: [{ scale }] }}>
          <View style={styles.itemContent}>
            <View style={styles.itemLeft}>
              {icon}
              <Text style={[styles.itemLabel, { color: textColor }]}>{label}</Text>
            </View>
            <Feather name="chevron-right" size={20} color={textColor} />
          </View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
  },
  item: {
    borderBottomWidth: 1,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemLabel: {
    fontSize: 16,
    marginLeft: 15,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    marginTop: 10,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SettingsScreen;
