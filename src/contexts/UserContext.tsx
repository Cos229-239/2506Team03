import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

// ✅ Default avatar fallback
const DEFAULT_AVATAR =
  'https://firebasestorage.googleapis.com/v0/b/xskill-swapx.firebasestorage.app/o/profile.jpg?alt=media&token=d6ec896d-257e-4fb5-838a-e145d9f07aad';

export type UserProfile = {
  uid: string;
  name: string;
  email: string;
  role?: string;
  bio?: string;
  skills?: string[];
  interests?: string[];
  avatar?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
};

type UserContextType = {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  loadingUser: boolean;
  loginComplete: boolean;
  setLoginComplete: (val: boolean) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => { },
  loadingUser: true,
  loginComplete: false,
  setLoginComplete: () => { },
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<UserProfile | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loginComplete, setLoginComplete] = useState(false);

  // ✅ Load user from AsyncStorage on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('user');
        if (jsonValue != null) {
          const savedUser = JSON.parse(jsonValue);
          const userWithAvatar = {
            ...savedUser,
            avatar: savedUser.avatar || DEFAULT_AVATAR,
          };
          setUserState(userWithAvatar);
        }
      } catch (e) {
        console.error('❌ Failed to load user from storage:', e);
      } finally {
        setLoadingUser(false);
      }
    };
    loadUser();
  }, []);

  // ✅ Save user + fallback avatar + sync to AsyncStorage
  const setUser = async (newUser: UserProfile | null) => {
    try {
      if (newUser) {
        const userToStore = {
          ...newUser,
          avatar: newUser.avatar || DEFAULT_AVATAR,
        };
        await AsyncStorage.setItem('user', JSON.stringify(userToStore));
        setUserState(userToStore);
      } else {
        await AsyncStorage.removeItem('user');
        setUserState(null);
      }
    } catch (e) {
      console.error('❌ Failed to persist user:', e);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, loadingUser, loginComplete, setLoginComplete }}>
      {children}
    </UserContext.Provider>
  );
};

export default DEFAULT_AVATAR;
