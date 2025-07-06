import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../firebaseConfig';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please enter both email and password');
      return;
    }
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('✅ Login successful', userCredential.user.email);
      Alert.alert('Login Successful', `Welcome back, ${userCredential.user.email}!`);
      router.replace('/');
    } catch (error: any) {
      console.error(error);
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logoIcon}>🤝</Text>
        <Text style={styles.title}>SkillSwap</Text>
        <Text style={styles.subtitle}>For users, by users.</Text>
      </View>

      <View style={styles.loginBox}>
        {/* create account link above email */}
        <View style={styles.linkRow}>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text style={styles.link}>Create an account</Text>
          </TouchableOpacity>
        </View>

        {/* email input */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        {/* forgot password link above password */}
        <View style={styles.linkRow}>
          <TouchableOpacity onPress={() => router.push('/+not-found')}>
            <Text style={styles.link}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        {/* password input */}
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* login button */}
        <TouchableOpacity
          style={[styles.loginButton, loading && { opacity: 0.6 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>{loading ? 'Logging in...' : 'Login'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  logo: { alignItems: 'center', marginBottom: 40 },
  logoIcon: { fontSize: 64, marginBottom: 12 },
  title: { fontSize: 36, fontWeight: 'bold' },
  subtitle: { fontSize: 16, color: '#4a4a4a', marginTop: 4 },
  loginBox: {
    backgroundColor: '#dce6f7',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  label: { fontWeight: 'bold', fontSize: 14, marginBottom: 4 },
  input: {
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  loginButton: {
    backgroundColor: '#90e0a4',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2e7d32',
  },
  loginButtonText: { fontWeight: 'bold', fontSize: 16, color: '#000' },
 link: {
  color: '#3a8ddf',
  fontSize: 12,
  textDecorationLine: 'underline',
},
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,     // <-- pushes the link further down
    marginBottom: -10,

  },
});
