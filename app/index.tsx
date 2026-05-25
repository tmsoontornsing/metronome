import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton, useTheme, Text, Card } from 'react-native-paper';
import { router } from 'expo-router';
import { useMetronome } from '@/hooks/useMetronome';
import { BeatIndicator } from '@/components/BeatIndicator';
import { BPMControl } from '@/components/BPMControl';
import { TimeSignatureSelector } from '@/components/TimeSignatureSelector';
import { SubdivisionSelector } from '@/components/SubdivisionSelector';
import { TapTempoButton } from '@/components/TapTempoButton';
import { PlayButton } from '@/components/PlayButton';
import { TIME_SIG_BEATS } from '@/hooks/useMetronome';

export default function MetronomeScreen() {
  const theme = useTheme();
  const {
    bpm,
    setBpm,
    isPlaying,
    toggle,
    activeBeat,
    timeSignature,
    setTimeSignature,
    subdivision,
    setSubdivision,
  } = useMetronome();

  const beatsInMeasure = (TIME_SIG_BEATS as Record<string, number>)[timeSignature] || 4;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 48, flexGrow: 1 }}
        scrollEnabled={true}
        showsVerticalScrollIndicator={true}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 24,
            paddingTop: 20,
            paddingBottom: 40,
          }}
        >
          <Text
            variant="displaySmall"
            style={{
              fontWeight: '900',
              letterSpacing: -1.2,
              color: theme.colors.primary,
              fontSize: 40,
            }}
          >
            Metro
          </Text>
          <IconButton
            icon="cog-outline"
            size={24}
            iconColor={theme.colors.primary}
            onPress={() => router.push('/settings')}
            style={{ margin: -8 }}
          />
        </View>

        {/* Beat Indicator */}
        <View style={{ paddingHorizontal: 24, marginBottom: 40 }}>
          <BeatIndicator
            totalBeats={beatsInMeasure}
            activeBeat={activeBeat}
            primaryColor={theme.colors.primary}
          />
        </View>

        {/* BPM Control Card */}
        <View>
          <Card
            style={{
              marginHorizontal: 24,
              marginBottom: 32,
              backgroundColor: theme.colors.surface,
              elevation: 0,
            }}
          >
            <Card.Content style={{ paddingVertical: 40, paddingHorizontal: 28 }}>
              <BPMControl
                bpm={bpm}
                onBpmChange={setBpm}
                primaryColor={theme.colors.primary}
                textColor={theme.colors.onBackground}
              />
            </Card.Content>
          </Card>
        </View>

        {/* Time Signature Selector */}
        <View>
          <View style={{ marginHorizontal: 24, marginBottom: 32 }}>
            <Text
              variant="labelLarge"
              style={{
                color: theme.colors.onBackground,
                opacity: 0.65,
                marginBottom: 14,
                fontWeight: '700',
                letterSpacing: 0.5,
              }}
            >
              Time Signature
            </Text>
            <TimeSignatureSelector value={timeSignature} onChange={setTimeSignature} />
          </View>
        </View>

        {/* Subdivision Selector */}
        <View>
          <View style={{ marginHorizontal: 24, marginBottom: 36 }}>
            <Text
              variant="labelLarge"
              style={{
                color: theme.colors.onBackground,
                opacity: 0.65,
                marginBottom: 14,
                fontWeight: '700',
                letterSpacing: 0.5,
              }}
            >
              Note Division
            </Text>
            <SubdivisionSelector value={subdivision} onChange={setSubdivision} />
          </View>
        </View>

        {/* Action Buttons */}
        <View>
          <View style={{ marginHorizontal: 24, gap: 14 }}>
            <TapTempoButton onBpmChange={setBpm} />
            <PlayButton
              isPlaying={isPlaying}
              onToggle={toggle}
              primaryColor={theme.colors.primary}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
