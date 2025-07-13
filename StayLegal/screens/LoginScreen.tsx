// screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace('Accueil'); // redirige vers l'accueil
    } catch (err) {
      setError('Connexion échouée. Vérifie tes informations.');
    }
  };

  return (
    <View>
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} />
      <Text>Mot de passe</Text>
      <TextInput secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Connexion" onPress={handleLogin} />
      {error ? <Text>{error}</Text> : null}
    </View>
  );
}
