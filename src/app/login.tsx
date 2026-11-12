import { auth, isFirebaseConfigured } from '@/lib/firebase';
import { useStore } from '@/store/useStore';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const login = useStore((state) => state.login);

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter your email and password');
      return;
    }
    setIsBusy(true);
    try {
      if (isFirebaseConfigured && auth) {
        const credentials = isRegistering
          ? await createUserWithEmailAndPassword(auth, email.trim(), password)
          : await signInWithEmailAndPassword(auth, email.trim(), password);
        login(credentials.user.email || email.trim());
      } else {
        login(email.trim());
      }
      router.replace('/(tabs)');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Unable to authenticate');
    } finally {
      setIsBusy(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email || !isFirebaseConfigured || !auth) {
      alert('Enter your email after configuring Firebase to reset your password.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email.trim());
      alert('Password reset email sent.');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Unable to send reset email');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.content}>
          <Text style={styles.title}>{isRegistering ? 'Create Account' : 'Welcome Back!'}</Text>
          <Text style={styles.subtitle}>{isRegistering ? 'Create your BoardLK account' : 'Please enter your details to sign in'}</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                returnKeyType="done"
                onSubmitEditing={() => Keyboard.dismiss()}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Feather name={showPassword ? "eye-off" : "eye"} size={20} color="#8E8E93" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.forgotPassword} onPress={handleResetPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>{isBusy ? 'Please wait...' : isRegistering ? 'Create Account' : 'Log In'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modeButton} onPress={() => setIsRegistering((current) => !current)}>
            <Text style={styles.modeButtonText}>{isRegistering ? 'Already have an account? Log in' : 'Need an account? Create one'}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 40,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 32,
  },
  forgotPasswordText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
  loginButton: {
    backgroundColor: '#0F0F0F',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modeButton: {
    alignItems: 'center',
    paddingVertical: 18,
  },
  modeButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
  },
});
