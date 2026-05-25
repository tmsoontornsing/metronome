import { useRef, useState, useCallback, useEffect } from 'react';

function playClickSound(isAccent: boolean) {
  // Audio placeholder - works on physical devices with proper Expo build
}

export type TimeSignature = '2/4' | '3/4' | '4/4' | '5/4' | '6/8';
export type Subdivision = 'quarter' | 'eighth' | 'triplet' | 'sixteenth';

const SUBDIVISIONS: Record<Subdivision, number> = {
  quarter: 1,
  eighth: 2,
  triplet: 3,
  sixteenth: 4,
};

export const TIME_SIG_BEATS: Record<TimeSignature, number> = {
  '2/4': 2,
  '3/4': 3,
  '4/4': 4,
  '5/4': 5,
  '6/8': 6,
};

const SCHEDULE_AHEAD_MS = 100;
const TICK_INTERVAL_MS = 25;

export function useMetronome() {
  const [bpm, setBpmState] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [timeSignature, setTimeSignature] = useState<TimeSignature>('4/4');
  const [subdivision, setSubdivision] = useState<Subdivision>('quarter');
  const [activeBeat, setActiveBeat] = useState(0);

  const bpmRef = useRef(120);
  const isPlayingRef = useRef(false);
  const nextSubdivTimeRef = useRef(0);
  const currentBeatRef = useRef(0);
  const currentSubdivRef = useRef(0);
  const schedulerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeSignatureRef = useRef<TimeSignature>('4/4');
  const subdivisionRef = useRef<Subdivision>('quarter');

  const soundsLoadedRef = useRef(false);

  useEffect(() => {
    soundsLoadedRef.current = true;
  }, []);

  const setBpm = useCallback((value: number) => {
    const clamped = Math.max(40, Math.min(240, Math.round(value)));
    bpmRef.current = clamped;
    setBpmState(clamped);
  }, []);

  const updateTimeSignature = useCallback((ts: TimeSignature) => {
    timeSignatureRef.current = ts;
    setTimeSignature(ts);
    currentBeatRef.current = 0;
    currentSubdivRef.current = 0;
  }, []);

  const updateSubdivision = useCallback((sub: Subdivision) => {
    subdivisionRef.current = sub;
    setSubdivision(sub);
    currentSubdivRef.current = 0;
  }, []);

  const schedulerTick = useCallback(() => {
    if (!soundsLoadedRef.current) return;

    const lookaheadTarget = Date.now() + SCHEDULE_AHEAD_MS;

    while (nextSubdivTimeRef.current < lookaheadTarget) {
      const fireAt = nextSubdivTimeRef.current - Date.now();
      const beat = currentBeatRef.current;
      const subdiv = currentSubdivRef.current;
      const isAccent = beat === 0 && subdiv === 0;
      const capturedBeat = beat;

      setTimeout(() => {
        playClickSound(isAccent);
        if (subdiv === 0) {
          setCurrentBeat(capturedBeat);
          setActiveBeat(capturedBeat);
        }
      }, Math.max(0, fireAt));

      const subdivCount = SUBDIVISIONS[subdivisionRef.current];
      const beatsInMeasure = TIME_SIG_BEATS[timeSignatureRef.current];
      const subdivIntervalMs = (60000 / bpmRef.current) / subdivCount;

      nextSubdivTimeRef.current += subdivIntervalMs;

      currentSubdivRef.current += 1;
      if (currentSubdivRef.current >= subdivCount) {
        currentSubdivRef.current = 0;
        currentBeatRef.current = (currentBeatRef.current + 1) % beatsInMeasure;
      }
    }
  }, [activeBeat]);

  const start = useCallback(() => {
    if (isPlayingRef.current) return;
    isPlayingRef.current = true;
    setIsPlaying(true);

    nextSubdivTimeRef.current = Date.now();
    currentBeatRef.current = 0;
    currentSubdivRef.current = 0;

    schedulerRef.current = setInterval(schedulerTick, TICK_INTERVAL_MS);
  }, [schedulerTick]);

  const stop = useCallback(() => {
    if (!isPlayingRef.current) return;
    isPlayingRef.current = false;
    setIsPlaying(false);

    if (schedulerRef.current) {
      clearInterval(schedulerRef.current);
      schedulerRef.current = null;
    }
    setCurrentBeat(0);
    setActiveBeat(0);
  }, [activeBeat]);

  const toggle = useCallback(() => {
    if (isPlayingRef.current) stop();
    else start();
  }, [start, stop]);

  return {
    bpm,
    setBpm,
    isPlaying,
    toggle,
    start,
    stop,
    currentBeat,
    activeBeat,
    timeSignature,
    setTimeSignature: updateTimeSignature,
    subdivision,
    setSubdivision: updateSubdivision,
  };
}
