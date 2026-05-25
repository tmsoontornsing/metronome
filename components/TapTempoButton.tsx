import { useRef, useCallback } from 'react';
import { Button } from 'react-native-paper';
import * as Haptics from 'expo-haptics';

interface TapTempoButtonProps {
  onBpmChange: (bpm: number) => void;
}

const TAP_HISTORY_SIZE = 8;

export function TapTempoButton({ onBpmChange }: TapTempoButtonProps) {
  const tapTimestamps = useRef<number[]>([]);

  const handleTap = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});

    const now = Date.now();
    tapTimestamps.current.push(now);

    tapTimestamps.current = tapTimestamps.current
      .filter((t) => now - t < 3000)
      .slice(-TAP_HISTORY_SIZE);

    if (tapTimestamps.current.length < 2) return;

    const intervals: number[] = [];
    for (let i = 1; i < tapTimestamps.current.length; i++) {
      intervals.push(tapTimestamps.current[i] - tapTimestamps.current[i - 1]);
    }
    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const detectedBpm = Math.round(60000 / avgInterval);

    onBpmChange(Math.max(40, Math.min(240, detectedBpm)));
  }, [onBpmChange]);

  return (
    <Button
      mode="outlined"
      onPress={handleTap}
      style={{
        paddingVertical: 10,
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: '#30C878',
      }}
      labelStyle={{
        fontSize: 14,
        fontWeight: '800',
        letterSpacing: 0.8,
        color: '#30C878',
      }}
      contentStyle={{
        paddingVertical: 6,
      }}
    >
      TAP TEMPO
    </Button>
  );
}
