import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logo}>
        <Text style={styles.logoIcon}>🔃</Text>
        <Text style={styles.title}>Skill Swap</Text>
        <Text style={styles.subtitle}>For users, by users.</Text>
      </View>

      {/* Welcome Screen */}
      {!showLogin && (
        <TouchableOpacity style={styles.loginButton} onPress={() => setShowLogin(true)}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      )}

      {/* Login Form */}
      {showLogin && (
        <View style={styles.loginBox}>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Email:</Text>
            <TouchableOpacity onPress={() => console.log('Navigate to create account')}>
              <Text style={styles.link}>Create Account</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
          />

          <View style={styles.inputRow}>
            <Text style={styles.label}>Password:</Text>
            <TouchableOpacity onPress={() => console.log('Navigate to forgot password')}>
              <Text style={styles.link}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
          />

          <TouchableOpacity style={styles.loginButton} onPress={() => console.log('Login')}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoIcon: {
    fontSize: 64,
    marginBottom: 12,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#4a4a4a',
    marginTop: 4,
  },
  loginBox: {
    padding: 16,
    backgroundColor: '#dce6f7',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  link: {
    color: '#3a8ddf',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    marginBottom: 16,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  loginButton: {
    backgroundColor: '#90e0a4',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2e7d32',
    marginTop: 8,
  },
  loginButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
});
