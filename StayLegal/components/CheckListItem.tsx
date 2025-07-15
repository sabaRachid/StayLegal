// components/ChecklistItem.tsx
import React, { useState } from 'react';
import { Checkbox } from 'react-native-paper';

type Props = {
  label: string;
  defaultChecked?: boolean;
  onToggle?: (checked: boolean) => void;
};

export default function ChecklistItem({ label, defaultChecked = false, onToggle }: Props) {
  const [checked, setChecked] = useState(defaultChecked);

  const handlePress = () => {
    const newValue = !checked;
    setChecked(newValue);
    onToggle?.(newValue); // callback optionnel
  };

  return (
    <Checkbox.Item
      label={label}
      status={checked ? 'checked' : 'unchecked'}
      onPress={handlePress}
    />
  );
}
