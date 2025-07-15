// screens/LoginScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // navigation.replace('Accueil'); // plus nécessaire si géré dans _layout.tsx
    } catch (err) {
      setError('Connexion échouée. Vérifie tes informations.');
      Alert.alert('Erreur', 'Email ou mot de passe incorrect.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Connexion à StayLegal</Text>

        <TextInput
          placeholder="Adresse email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <TextInput
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  innerContainer: {
    padding: 24,
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#0066cc',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginTop: 8,
    textAlign: 'center',
  },
});
