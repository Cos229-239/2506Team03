import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import * as Yup from 'yup';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getAuth } from 'firebase/auth';

// Define the route names for your stack
type RootStackParamList = {
  Signup: undefined;
  Login: undefined;
  Home: undefined;
};

// Type for the navigation prop
type SignUpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Signup'>;

type Props = {
  navigation: SignUpScreenNavigationProp;
};

// Proper functional component declaration
const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const auth = getAuth();

  const SignUpSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Too Short!').required('Required'),
  });

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">Create an Account</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 0,
    backgroundColor: '#fff',
  },
});

export default SignUpScreen;
