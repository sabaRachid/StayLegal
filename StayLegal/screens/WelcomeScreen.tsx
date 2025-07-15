// screens/WelcomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur StayLegal 🇨🇦</Text>
      <Text style={styles.subtitle}>
        Simplifie toutes tes démarches administratives au Québec
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/login' as const)}
      >
        <Text style={styles.buttonText}>Connexion</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.registerButton]}
        onPress={() => router.push('/register' as const)}
      >
        <Text style={styles.buttonText}>Créer un compte</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0077cc',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  registerButton: {
    backgroundColor: '#00aa77',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
