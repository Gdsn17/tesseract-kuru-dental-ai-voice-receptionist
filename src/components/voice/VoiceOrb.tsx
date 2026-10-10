'use client';

import React from 'react';

interface VoiceOrbProps {
  state: 'idle' | 'connecting' | 'listening' | 'speaking' | 'error';
  audioLevel?: number; // 0 to 1
}

export function VoiceOrb({ state, audioLevel = 0 }: VoiceOrbProps) {
  // Compute dynamic scale based on audio level or state
  const dynamicScale = state === 'speaking' 
    ? 1 + Math.min(audioLevel * 0.4, 0.3)
    : state === 'listening'
    ? 1.05
    : 1;

  return (
    <div className="relative flex items-center justify-center w-48 h-48 my-4 select-none">
      {/* Outer ambient glow ring */}
      <div
        className={`absolute inset-0 rounded-full transition-all duration-700 ${
          state === 'speaking'
            ? 'bg-gradient-to-tr from-[#C9A227]/40 via-[#2F6B1F]/30 to-[#C9A227]/50 blur-2xl scale-125 animate-pulse'
            : state === 'listening'
            ? 'bg-gradient-to-tr from-[#2F6B1F]/30 via-[#C9A227]/25 to-[#174414]/40 blur-xl scale-110'
            : state === 'connecting'
            ? 'bg-[#C9A227]/20 blur-lg animate-ping'
            : 'bg-gradient-to-tr from-[#C9A227]/15 to-[#2F6B1F]/15 blur-lg'
        }`}
      />

      {/* Secondary pulsating ring */}
      <div
        className={`absolute w-40 h-40 rounded-full border border-[#C9A227]/30 transition-transform duration-500 ${
          state === 'speaking' || state === 'listening' ? 'scale-110 opacity-80' : 'scale-95 opacity-40'
        }`}
        style={{
          transform: `scale(${dynamicScale * 1.08})`,
        }}
      />

      {/* Main Core Orb */}
      <div
        className={`relative w-32 h-32 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          state === 'speaking'
            ? 'bg-gradient-to-br from-[#E5C358] via-[#C9A227] to-[#174414] shadow-[#C9A227]/50 voice-orb-active'
            : state === 'listening'
            ? 'bg-gradient-to-br from-[#2F6B1F] via-[#174414] to-[#C9A227] shadow-[#2F6B1F]/40 animate-pulse'
            : state === 'connecting'
            ? 'bg-gradient-to-br from-[#A77912] to-[#2F6B1F] opacity-80 animate-spin'
            : 'bg-gradient-to-br from-[#A77912] via-[#C9A227] to-[#174414] opacity-90'
        }`}
        style={{
          transform: `scale(${dynamicScale})`,
        }}
      >
        {/* Core highlight reflection */}
        <div className="absolute top-3 left-4 w-8 h-4 rounded-full bg-white/40 blur-[2px] transform -rotate-12" />

        {/* Center state indicator icon / pulse */}
        <div className="flex flex-col items-center justify-center text-white">
          {state === 'speaking' && (
            <div className="flex items-center gap-1">
              <span className="w-1 h-5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1 h-8 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1 h-6 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              <span className="w-1 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '450ms' }} />
            </div>
          )}

          {state === 'listening' && (
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-white rounded-full animate-ping" />
              <span className="text-xs font-semibold tracking-wider uppercase text-white/90">Listening</span>
            </div>
          )}

          {state === 'connecting' && (
            <span className="text-xs font-medium text-white/90">Connecting...</span>
          )}

          {state === 'idle' && (
            <div className="w-4 h-4 rounded-full bg-white/80 shadow-sm" />
          )}

          {state === 'error' && (
            <span className="text-xs font-bold text-red-200">!</span>
          )}
        </div>
      </div>
    </div>
  );
}
