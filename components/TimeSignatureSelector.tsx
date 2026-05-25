import { View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { TimeSignature } from '@/hooks/useMetronome';

interface TimeSignatureSelectorProps {
  value: TimeSignature;
  onChange: (ts: TimeSignature) => void;
}

export function TimeSignatureSelector({ value, onChange }: TimeSignatureSelectorProps) {
  const theme = useTheme();
  const options: TimeSignature[] = ['2/4', '3/4', '4/4', '5/4', '6/8'];

  return (
    <View style={{ width: '100%', gap: 12 }}>
      {options.map((ts) => (
        <Button
          key={ts}
          mode={value === ts ? 'contained' : 'outlined'}
          onPress={() => onChange(ts)}
          style={{
            borderRadius: 8,
          }}
          buttonColor={value === ts ? theme.colors.primary : undefined}
          labelStyle={{
            fontSize: 14,
            fontWeight: '600',
          }}
        >
          {ts}
        </Button>
      ))}
    </View>
  );
}
