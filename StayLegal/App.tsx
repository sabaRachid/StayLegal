// App.tsx
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './utils/firebase';
import AppNavigator from './navigation/AppNavigator';
import LoginScreen from './screens/LoginScreen';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe(); // nettoyage
  }, []);

  return user ? <AppNavigator /> : <LoginScreen />;
}

//TODO : Lancement de l’app toujours bloqué sur l’écran Welcome/Explore d’Expo malgré : 
// Suppression du cache (.expo, .expo-shared), Ajout éventuel de entryPoint dans app.json, Redémarrage avec 'npx expo start -c'