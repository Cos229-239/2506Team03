export type RootStackParamList = {
  Signup: undefined;
  Login: undefined;
  Home: undefined;
  explore: { mode: 'Learn' | 'Teach' };
  Profile: undefined;
  userProfile: { userId: string };
};