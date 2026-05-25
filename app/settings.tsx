import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, List, useTheme, Divider, Card, Switch } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { useState } from 'react';
import { useThemeMode } from './_layout';

export default function SettingsScreen() {
  const theme = useTheme();
  const systemColorScheme = useColorScheme();
  const { themeMode, setThemeMode } = useThemeMode();

  const [vibrateOnTap, setVibrateOnTap] = useState(true);
  const [showBeatNumber, setShowBeatNumber] = useState(true);

  const getThemeDisplay = () => {
    if (themeMode === 'auto') {
      return `System (${systemColorScheme === 'dark' ? 'Dark' : 'Light'})`;
    }
    return themeMode === 'dark' ? 'Dark' : 'Light';
  };

  const toggleTheme = () => {
    if (themeMode === 'auto') setThemeMode('dark');
    else if (themeMode === 'dark') setThemeMode('light');
    else setThemeMode('auto');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 48 }}
        showsVerticalScrollIndicator={true}
      >
        {/* Audio Section */}
        <View style={{ paddingHorizontal: 24, paddingTop: 32, paddingBottom: 16 }}>
          <Text
            variant="titleLarge"
            style={{
              fontWeight: '900',
              letterSpacing: -0.5,
              color: theme.colors.onBackground,
            }}
          >
            Audio
          </Text>
        </View>

        <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
          <Card
            style={{
              backgroundColor: theme.colors.surface,
              elevation: 0,
            }}
          >
            <List.Item
              title="Click Volume"
              description="100% - Maximum"
              left={(props) => <List.Icon {...props} icon="volume-high" />}
              titleStyle={{ fontWeight: '600', marginTop: 4 }}
              descriptionStyle={{ marginTop: 2, color: theme.colors.primary, fontWeight: '600' }}
              style={{ paddingVertical: 12, paddingHorizontal: 20 }}
            />
          </Card>
        </View>

        {/* Appearance Section */}
        <View style={{ paddingHorizontal: 24, paddingBottom: 16 }}>
          <Text
            variant="titleLarge"
            style={{
              fontWeight: '900',
              letterSpacing: -0.5,
              color: theme.colors.onBackground,
            }}
          >
            Appearance
          </Text>
        </View>

        <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
          <Card
            style={{
              backgroundColor: theme.colors.surface,
              elevation: 0,
            }}
          >
            <List.Item
              title="Theme"
              description={getThemeDisplay()}
              left={(props) => <List.Icon {...props} icon="palette" />}
              right={(props) => (
                <Text
                  style={{
                    color: theme.colors.primary,
                    fontWeight: '600',
                    marginRight: 12,
                  }}
                >
                  ⟨›
                </Text>
              )}
              onPress={toggleTheme}
              titleStyle={{ fontWeight: '600', marginTop: 4 }}
              descriptionStyle={{ marginTop: 2, color: theme.colors.primary, fontWeight: '600' }}
              style={{ paddingVertical: 12, paddingHorizontal: 20 }}
            />
          </Card>
        </View>

        {/* Feedback Section */}
        <View style={{ paddingHorizontal: 24, paddingBottom: 16 }}>
          <Text
            variant="titleLarge"
            style={{
              fontWeight: '900',
              letterSpacing: -0.5,
              color: theme.colors.onBackground,
            }}
          >
            Feedback
          </Text>
        </View>

        <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
          <Card
            style={{
              backgroundColor: theme.colors.surface,
              elevation: 0,
            }}
          >
            <List.Item
              title="Vibrate on Tap"
              description="Haptic feedback when tapping"
              left={(props) => <List.Icon {...props} icon="vibrate" />}
              right={(props) => (
                <Switch
                  value={vibrateOnTap}
                  onValueChange={setVibrateOnTap}
                  color={theme.colors.primary}
                />
              )}
              onPress={() => setVibrateOnTap(!vibrateOnTap)}
              titleStyle={{ fontWeight: '600', marginTop: 4 }}
              descriptionStyle={{ marginTop: 2 }}
              style={{ paddingVertical: 12, paddingHorizontal: 20 }}
            />
            <Divider style={{ marginHorizontal: 20 }} />
            <List.Item
              title="Show Beat Numbers"
              description="Display beat indicator"
              left={(props) => <List.Icon {...props} icon="numeric" />}
              right={(props) => (
                <Switch
                  value={showBeatNumber}
                  onValueChange={setShowBeatNumber}
                  color={theme.colors.primary}
                />
              )}
              onPress={() => setShowBeatNumber(!showBeatNumber)}
              titleStyle={{ fontWeight: '600', marginTop: 4 }}
              descriptionStyle={{ marginTop: 2 }}
              style={{ paddingVertical: 12, paddingHorizontal: 20 }}
            />
          </Card>
        </View>

        {/* Info Section */}
        <View style={{ paddingHorizontal: 24, paddingBottom: 16 }}>
          <Text
            variant="titleLarge"
            style={{
              fontWeight: '900',
              letterSpacing: -0.5,
              color: theme.colors.onBackground,
            }}
          >
            Info
          </Text>
        </View>

        <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
          <Card
            style={{
              backgroundColor: theme.colors.surface,
              elevation: 0,
            }}
          >
            <List.Item
              title="Version"
              description="1.0.0"
              left={(props) => <List.Icon {...props} icon="information" />}
              titleStyle={{ fontWeight: '600', marginTop: 4 }}
              descriptionStyle={{ marginTop: 2 }}
              style={{ paddingVertical: 12, paddingHorizontal: 20 }}
            />
            <Divider style={{ marginHorizontal: 20 }} />
            <List.Item
              title="Framework"
              description="React Native + Expo"
              left={(props) => <List.Icon {...props} icon="react" />}
              titleStyle={{ fontWeight: '600', marginTop: 4 }}
              descriptionStyle={{ marginTop: 2 }}
              style={{ paddingVertical: 12, paddingHorizontal: 20 }}
            />
            <Divider style={{ marginHorizontal: 20 }} />
            <List.Item
              title="BPM Range"
              description="40 – 240 BPM"
              left={(props) => <List.Icon {...props} icon="speedometer" />}
              titleStyle={{ fontWeight: '600', marginTop: 4 }}
              descriptionStyle={{ marginTop: 2 }}
              style={{ paddingVertical: 12, paddingHorizontal: 20 }}
            />
          </Card>
        </View>

        {/* Footer */}
        <View style={{ paddingHorizontal: 24, marginTop: 12, marginBottom: 32 }}>
          <Text
            variant="bodySmall"
            style={{
              color: theme.colors.onBackground,
              opacity: 0.45,
              textAlign: 'center',
              fontWeight: '500',
              lineHeight: 22,
            }}
          >
            Premium metronome with precise timing{'\n'}via look-ahead scheduling
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
