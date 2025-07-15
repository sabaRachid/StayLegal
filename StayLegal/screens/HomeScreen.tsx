// screens/HomeScreen.tsx

import React from 'react';
import { View, Text } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { Button } from 'react-native-paper';

export default function HomeScreen() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // App.tsx redirigera automatiquement vers LoginScreen
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ marginBottom: 20, fontSize: 18 }}>
        Bienvenue sur StayLegal 🎓
      </Text>
      <Button mode="contained" onPress={handleLogout}>
        Déconnexion
      </Button>
    </View>
  );
}
