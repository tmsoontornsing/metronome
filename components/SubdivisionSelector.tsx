import { View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { Subdivision } from '@/hooks/useMetronome';

interface SubdivisionSelectorProps {
  value: Subdivision;
  onChange: (sub: Subdivision) => void;
}

export function SubdivisionSelector({ value, onChange }: SubdivisionSelectorProps) {
  const theme = useTheme();
  const options: Array<{ value: Subdivision; label: string }> = [
    { value: 'quarter', label: '♩' },
    { value: 'eighth', label: '♪' },
    { value: 'triplet', label: '♪♪♪' },
    { value: 'sixteenth', label: '♬' },
  ];

  return (
    <View style={{ width: '100%', gap: 12 }}>
      {options.map((opt) => (
        <Button
          key={opt.value}
          mode={value === opt.value ? 'contained' : 'outlined'}
          onPress={() => onChange(opt.value)}
          style={{
            borderRadius: 8,
          }}
          buttonColor={value === opt.value ? theme.colors.primary : undefined}
          labelStyle={{
            fontSize: 14,
            fontWeight: '600',
          }}
        >
          {opt.label}
        </Button>
      ))}
    </View>
  );
}
