import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../utils/firebase';

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const segments = useSegments();
  const router = useRouter();

  // 🔐 Écoute l'état de connexion Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 🔁 Logique de redirection en fonction du statut utilisateur
  useEffect(() => {
    const isPublic = segments[0] === null || segments[0] === 'login' || segments[0] === 'register';

    if (!loading) {
      if (!user && !isPublic) {
        setTimeout(() => router.replace('/'), 0); // redirige vers Welcome
      }

      if (user && isPublic) {
        setTimeout(() => router.replace('/home'), 0); // redirige vers Home connecté
      }
    }
  }, [user, segments, loading]);

  if (loading) return null;

  return <Slot />;
}
