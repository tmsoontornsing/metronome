import { Button } from 'react-native-paper';
import { Pressable } from 'react-native';
import { useState } from 'react';

interface PlayButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
  primaryColor: string;
}

export function PlayButton({ isPlaying, onToggle, primaryColor }: PlayButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      onPress={onToggle}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={{
        overflow: 'hidden',
        borderRadius: 16,
        opacity: isPressed ? 0.8 : 1,
      }}
    >
      <Button
        mode="contained"
        onPress={onToggle}
        icon={isPlaying ? 'pause' : 'play'}
        style={{
          paddingVertical: 10,
          borderRadius: 16,
        }}
        labelStyle={{
          fontSize: 16,
          fontWeight: '800',
          letterSpacing: 0.8,
        }}
        contentStyle={{
          paddingVertical: 8,
        }}
        buttonColor={primaryColor}
      >
        {isPlaying ? 'PAUSE' : 'START'}
      </Button>
    </Pressable>
  );
}
