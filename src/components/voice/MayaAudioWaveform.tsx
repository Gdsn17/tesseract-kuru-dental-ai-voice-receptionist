'use client';

import React from 'react';
import { CallState } from '@/context/MayaVoiceContext';

interface MayaAudioWaveformProps {
  callState: CallState;
  volumeLevel: number; // 0 to 1 (Maya)
  userVolumeLevel: number; // 0 to 1 (User)
}

export function MayaAudioWaveform({
  callState,
  volumeLevel,
  userVolumeLevel,
}: MayaAudioWaveformProps) {
  // Determine dominant volume based on state
  const isSpeaking = callState === 'speaking';
  const isListening = callState === 'listening';
  const isConnecting = callState === 'connecting';
  const isIdle = callState === 'idle' || callState === 'ended';

  // Number of waveform bars
  const barCount = 7;

  // Base heights or scaled factors for each bar to create a natural acoustic wave shape
  const waveFactors = [0.45, 0.75, 1.0, 0.85, 0.95, 0.65, 0.4];

  return (
    <div
      className="flex items-center justify-center gap-1.5 h-16 w-full px-4 py-2 select-none"
      role="img"
      aria-label={`Audio waveform visualizer: ${callState}`}
    >
      {Array.from({ length: barCount }).map((_, index) => {
        const factor = waveFactors[index % waveFactors.length];

        let barHeight = 8; // minimum height in px
        let barColor = 'bg-zinc-300';
        let glowClass = '';

        if (isSpeaking) {
          // Assistant Maya is speaking
          // Map volumeLevel (0..1) to dynamic height between 12px and 48px
          const dynamicMultiplier = Math.max(0.2, Math.min(volumeLevel * 2.5, 1));
          barHeight = Math.max(10, Math.round(48 * factor * dynamicMultiplier));
          barColor = 'bg-gradient-to-t from-[#A77912] via-[#C9A227] to-[#2F6B1F]';
          glowClass = 'shadow-[0_0_12px_rgba(201,162,39,0.5)]';
        } else if (isListening) {
          // Listening to caller
          const dynamicMultiplier = Math.max(0.25, Math.min(userVolumeLevel * 2.2, 1));
          barHeight = Math.max(8, Math.round(42 * factor * dynamicMultiplier));
          barColor = 'bg-gradient-to-t from-[#174414] via-[#2F6B1F] to-emerald-400';
          glowClass = 'shadow-[0_0_10px_rgba(47,107,31,0.45)]';
        } else if (isConnecting) {
          // Scanning wave during connection
          barHeight = 12 + ((index % 3) + 1) * 8;
          barColor = 'bg-[#C9A227]';
          glowClass = 'animate-pulse';
        } else if (isIdle) {
          // Subtle resting breathing wave
          barHeight = 6 + factor * 6;
          barColor = 'bg-[#C9A227]/40';
        }

        return (
          <div
            key={index}
            className={`w-1.5 rounded-full transition-all duration-150 ease-out ${barColor} ${glowClass}`}
            style={{
              height: `${Math.max(6, Math.min(barHeight, 52))}px`,
              transitionProperty: 'height, background-color, box-shadow',
            }}
          />
        );
      })}
    </div>
  );
}
