// screens/RegisterScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';

export default function RegisterScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.replace('Accueil');
    } catch (err) {
      setError('Erreur lors de la création du compte.');
    }
  };

  return (
    <View>
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} />
      <Text>Mot de passe</Text>
      <TextInput secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Créer mon compte" onPress={handleRegister} />
      {error ? <Text>{error}</Text> : null}
    </View>
  );
}
