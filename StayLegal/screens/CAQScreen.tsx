import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import ChecklistItem from '../components/CheckListItem';
import ModuleCard from '../components/ModuleCard';

const checklistItems = [
  "Lettre d’admission officielle",
  "Passeport (page avec photo et signature)",
  "Preuve de capacité financière (relevé bancaire, lettre de soutien parental ou attestation de bourse)",
  "Formulaire “Déclaration, engagements et autorisation”",
  "Paiement des frais : 128 $ CAD",
];

export default function CAQScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        📘 Certificat d’acceptation du Québec (CAQ)
      </Text>

      <Text variant="bodyMedium" style={styles.paragraph}>
        Le CAQ est obligatoire pour tout étudiant international qui souhaite étudier plus de 6 mois au Québec.
        Il doit être obtenu avant de demander ou renouveler un permis d’études.
      </Text>

      <Divider style={styles.divider} />

      <Text variant="titleMedium" style={styles.section}>
        📅 Quand faire la demande ?
      </Text>
      <Text variant="bodyMedium" style={styles.paragraph}>
        ➤ Idéalement 6 mois avant le début ou l’expiration de ton CAQ actuel, car les délais peuvent aller jusqu’à 8 semaines.
      </Text>

      <Divider style={styles.divider} />

      <Text variant="titleMedium" style={styles.section}>
        🧾 Checklist – Première demande
      </Text>
      {checklistItems.map((item, index) => (
        <ChecklistItem key={index} label={item} />
      ))}

      <Divider style={styles.divider} />

      <ModuleCard
        title="🔁 Renouvellement du CAQ"
        content={[
          "À faire si : prolongation d’études, changement de cycle, d’établissement, ou pause.",
          "Relevé de notes à jour",
          "Nouvelle lettre d’admission",
          "Nouvelle preuve financière",
        ]}
      />

      <ModuleCard
        title="⏳ Délais de traitement"
        content={[
          "En moyenne : 25 jours ouvrables",
          "Jusqu’à 6–8 semaines en période chargée (automne)",
        ]}
      />

      <ModuleCard
        title="🛑 Attention"
        content={[
          "Un CAQ expiré empêche de renouveler le permis d’études.",
          "Il n’est jamais renouvelé automatiquement.",
        ]}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: 10,
  },
  section: {
    marginTop: 20,
  },
  paragraph: {
    marginTop: 8,
    lineHeight: 22,
  },
  divider: {
    marginTop: 16,
    marginBottom: 10,
  },
});
