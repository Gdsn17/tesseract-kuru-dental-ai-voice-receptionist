'use client';

import React from 'react';
import { Mic, PhoneOff, Sparkles, Volume2 } from 'lucide-react';
import { useMayaVoice } from '@/context/MayaVoiceContext';

export function MayaFloatingLauncher() {
  const { isOpen, toggleMaya, openMaya, callState, duration, endCall } =
    useMayaVoice();

  // If the panel is already open, the launcher does not need to duplicate controls,
  // but can remain or smoothly tuck away. Hiding it when the panel is open keeps the viewport clean.
  if (isOpen) return null;

  const isCallActive =
    callState === 'connecting' ||
    callState === 'connected' ||
    callState === 'speaking' ||
    callState === 'listening' ||
    callState === 'ending';

  const formatDuration = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 flex items-center select-none">
      {/* If Call is Active while panel is closed: Show Active Call Pill with Quick End */}
      {isCallActive ? (
        <div className="flex items-center gap-1.5 p-1.5 pl-3.5 bg-gradient-to-r from-[#174414] via-[#1E4D1A] to-[#2F6B1F] rounded-full shadow-2xl border border-[#C9A227] text-white animate-pulse">
          {/* Tap to expand panel */}
          <button
            onClick={openMaya}
            className="flex items-center gap-2 cursor-pointer text-left focus:outline-none"
            aria-label="Expand Maya voice conversation"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <div className="pr-1">
              <div className="flex items-center gap-1 text-xs font-bold leading-tight">
                <span>Maya on Call</span>
                <Volume2 className="w-3 h-3 text-[#C9A227]" />
              </div>
              <span className="text-[10px] font-mono text-[#E5C358]">
                {formatDuration(duration)} • Tap to view
              </span>
            </div>
          </button>

          {/* Quick End Call Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              endCall();
            }}
            className="p-2 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors cursor-pointer shadow-sm"
            title="End Conversation"
            aria-label="End conversation with Maya"
          >
            <PhoneOff className="w-4 h-4" />
          </button>
        </div>
      ) : (
        /* Idle / Ready Floating Launcher */
        <button
          onClick={toggleMaya}
          className="group relative flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-gradient-to-r from-[#174414] via-[#1E4D1A] to-[#2F6B1F] text-white shadow-xl shadow-[#174414]/30 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border border-[#C9A227]/50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:ring-offset-2"
          aria-label="Open Maya AI Receptionist"
        >
          {/* Subtle outer breathing glow aura */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#C9A227]/30 via-[#2F6B1F]/30 to-[#C9A227]/30 blur-sm opacity-70 group-hover:opacity-100 transition duration-700 animate-pulse pointer-events-none" />

          {/* Icon with Gold Ring Accent */}
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 border border-[#C9A227]/40 flex items-center justify-center shrink-0 group-hover:bg-[#C9A227]/20 transition-colors">
            <Mic className="w-5 h-5 text-[#C9A227] group-hover:scale-110 transition-transform" />
            {/* Tiny Sparkle Indicator */}
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#C9A227] flex items-center justify-center text-[8px] text-[#174414] font-bold">
              ✦
            </span>
          </div>

          {/* Text Labels: Desktop */}
          <div className="hidden sm:flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-sm tracking-wide text-white group-hover:text-[#FFFDF6]">
                Talk to Maya
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/15 text-[#E5C358] font-bold">
                தமிழ்
              </span>
            </div>
            <span className="text-[11px] text-[#E5C358] font-medium flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              AI Receptionist
            </span>
          </div>

          {/* Text Labels: Mobile Compact */}
          <div className="flex sm:hidden flex-col text-left">
            <span className="font-semibold text-xs text-white">
              Talk to Maya
            </span>
            <span className="text-[10px] text-[#E5C358] font-medium">
              AI Voice Desk
            </span>
          </div>
        </button>
      )}
    </div>
  );
}
