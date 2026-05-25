import React from 'react';
import { View } from 'react-native';

interface BeatIndicatorProps {
  totalBeats: number;
  activeBeat: number;
  primaryColor: string;
}

function BeatDot({ index, isActive, primaryColor }: { index: number; isActive: boolean; primaryColor: string }) {
  return (
    <View
      style={[
        {
          width: 16,
          height: 16,
          borderRadius: 8,
          backgroundColor: primaryColor,
          marginHorizontal: 8,
          opacity: isActive ? 1 : 0.3,
          transform: [
            {
              scale: isActive ? 1.4 : 1,
            },
          ],
        },
      ]}
    />
  );
}

export function BeatIndicator({ totalBeats, activeBeat, primaryColor }: BeatIndicatorProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingVertical: 16,
      }}
    >
      {Array.from({ length: totalBeats }).map((_, i) => (
        <BeatDot key={i} index={i} isActive={activeBeat === i} primaryColor={primaryColor} />
      ))}
    </View>
  );
}
