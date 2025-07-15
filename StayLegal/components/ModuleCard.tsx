// components/ModuleCard.tsx
import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

type Props = {
  title: string;
  content: string[]; // liste de points
};

export default function ModuleCard({ title, content }: Props) {
  return (
    <Card style={styles.card}>
      <Card.Title title={title} />
      <Card.Content>
        {content.map((item, index) => (
          <Text key={index} variant="bodyMedium" style={styles.text}>
            • {item}
          </Text>
        ))}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    marginHorizontal: 16,
  },
  text: {
    marginBottom: 6,
  },
});
