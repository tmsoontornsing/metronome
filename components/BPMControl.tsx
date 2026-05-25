import { View, Text as RNText } from 'react-native';
import { IconButton, useTheme, Text } from 'react-native-paper';
import Slider from '@react-native-community/slider';

interface BPMControlProps {
  bpm: number;
  onBpmChange: (value: number) => void;
  primaryColor: string;
  textColor: string;
}

export function BPMControl({ bpm, onBpmChange, primaryColor, textColor }: BPMControlProps) {
  const theme = useTheme();

  return (
    <View style={{ alignItems: 'center', gap: 28 }}>
      {/* BPM Number */}
      <View style={{ alignItems: 'center', gap: 8 }}>
        <RNText
          style={{
            fontSize: 72,
            fontFamily: 'RobotoMono_700Bold',
            color: primaryColor,
            fontWeight: '800',
            letterSpacing: -1,
          }}
        >
          {bpm}
        </RNText>
        <Text
          variant="labelMedium"
          style={{
            color: textColor,
            opacity: 0.55,
            fontWeight: '600',
            letterSpacing: 0.4,
          }}
        >
          BPM
        </Text>
      </View>

      {/* Slider with Controls */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          gap: 16,
        }}
      >
        <IconButton
          icon="minus"
          size={20}
          onPress={() => onBpmChange(bpm - 1)}
          iconColor={primaryColor}
          style={{
            backgroundColor: 'transparent',
            margin: 0,
          }}
        />

        <View
          style={{
            flex: 1,
            height: 44,
            justifyContent: 'center',
          }}
        >
          <Slider
            style={{ flex: 1 }}
            value={bpm}
            onValueChange={onBpmChange}
            minimumValue={40}
            maximumValue={240}
            step={1}
            minimumTrackTintColor={primaryColor}
            maximumTrackTintColor={theme.colors.surfaceVariant}
            thumbTintColor={primaryColor}
          />
        </View>

        <IconButton
          icon="plus"
          size={20}
          onPress={() => onBpmChange(bpm + 1)}
          iconColor={primaryColor}
          style={{
            backgroundColor: 'transparent',
            margin: 0,
          }}
        />
      </View>

      {/* Range Labels */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Text variant="labelSmall" style={{ color: textColor, opacity: 0.35, fontWeight: '500' }}>
          40
        </Text>
        <Text variant="labelSmall" style={{ color: textColor, opacity: 0.35, fontWeight: '500' }}>
          240
        </Text>
      </View>
    </View>
  );
}
