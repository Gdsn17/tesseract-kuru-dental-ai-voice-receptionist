'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  X,
  Mic,
  MicOff,
  PhoneOff,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  RotateCcw,
  Volume2,
  Settings,
  Headphones,
  CheckCircle2,
} from 'lucide-react';
import { useMayaVoice } from '@/context/MayaVoiceContext';
import { MayaAudioWaveform } from './MayaAudioWaveform';
import { kurusDentalClinicConfig } from '@/config/clinics/kurus-dental';

export function MayaVoicePanel() {
  const {
    isOpen,
    closeMaya,
    callState,
    volumeLevel,
    userVolumeLevel,
    duration,
    transcripts,
    currentPartial,
    isMuted,
    errorMessage,
    isConfigured,
    startCall,
    endCall,
    toggleMute,
    clearError,
  } = useMayaVoice();

  const transcriptEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll transcript to bottom
  useEffect(() => {
    if (transcriptEndRef.current) {
      transcriptEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [transcripts, currentPartial]);

  // Handle keyboard Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeMaya();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeMaya]);

  if (!isOpen) return null;

  const formatDuration = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isCallActive =
    callState === 'connecting' ||
    callState === 'connected' ||
    callState === 'speaking' ||
    callState === 'listening' ||
    callState === 'ending';

  return (
    <aside
      aria-label="Maya Voice Receptionist Interface"
      className="fixed bottom-20 sm:bottom-24 right-3 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[390px] max-w-[400px] max-h-[calc(100vh-6rem)] sm:max-h-[640px] flex flex-col bg-[#FFFDF6] rounded-3xl shadow-2xl border border-[#C9A227]/35 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
    >
      {/* Top Gold Gradient Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#A77912] via-[#C9A227] to-[#2F6B1F]" />

      {/* Panel Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-[#C9A227]/15 bg-white/70 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          {/* Maya Avatar with Gold Ring & Live Pulse Indicator */}
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#174414] via-[#2F6B1F] to-[#A77912] p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#FFFDF6] flex items-center justify-center overflow-hidden">
                <Image
                  src={kurusDentalClinicConfig.brand.logoUrl}
                  alt={kurusDentalClinicConfig.name}
                  width={28}
                  height={28}
                  className="object-contain"
                  style={{ width: 'auto', height: 'auto' }}
                />
              </div>
            </div>
            {/* Live Indicator Dot */}
            <span
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                isCallActive
                  ? 'bg-emerald-500 animate-pulse'
                  : 'bg-emerald-400'
              }`}
              title={isCallActive ? 'Call active' : 'Maya ready'}
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="font-serif text-base font-bold text-[#1E1E1E] leading-none">
                Maya
              </h2>
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#C9A227]/15 text-[#A77912] text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="w-2.5 h-2.5" />
                AI Receptionist
              </span>
            </div>
            <p className="text-xs text-zinc-500 font-medium mt-0.5">
              {kurusDentalClinicConfig.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Tamil & English Badge */}
          <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-semibold border border-emerald-200/60">
            தமிழ் • English
          </span>

          {/* Close Panel Button */}
          <button
            onClick={closeMaya}
            className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
            aria-label="Close Maya conversation panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Configuration Guidance (shown when public key is placeholder or missing) */}
      {!isConfigured && (
        <div className="mx-4 mt-3 p-3 rounded-2xl bg-amber-50/90 border border-amber-200 text-xs text-amber-900 leading-relaxed shadow-xs">
          <div className="flex items-start gap-2">
            <Settings className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-950">
                Setup Required for Real Calls
              </p>
              <p className="text-[11px] text-amber-800 mt-0.5">
                Add your Vapi public key to <code className="bg-amber-100 px-1 py-0.5 rounded text-amber-950 font-mono text-[10px]">.env.local</code> as <code className="bg-amber-100 px-1 py-0.5 rounded text-amber-950 font-mono text-[10px]">NEXT_PUBLIC_VAPI_PUBLIC_KEY</code> to enable live conversations.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-0 text-[#1E1E1E]">
        {/* Natural Tamil Greeting Card */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-50/70 via-white to-emerald-50/40 border border-[#C9A227]/25 shadow-xs">
          <div className="flex items-center justify-between text-[11px] font-bold text-[#A77912] mb-1">
            <span className="flex items-center gap-1">
              <Headphones className="w-3 h-3 text-[#2F6B1F]" />
              வரவேற்புச் செய்தி (Tamil Greeting)
            </span>
            <span className="text-[10px] text-zinc-500 font-normal">
              Bilingual Tamil/English
            </span>
          </div>
          <p className="text-sm font-semibold text-[#174414] leading-relaxed">
            &ldquo;வணக்கம்! நான் மாயா. சொல்லுங்க, என்ன உதவி வேணும்?&rdquo;
          </p>
          <p className="text-[11px] text-zinc-500 italic mt-1 leading-snug">
            &ldquo;Vanakkam! I am Maya. How can I assist you with appointments or dental care today?&rdquo;
          </p>
        </div>

        {/* Live Audio Visualizer & Call State Indicator */}
        <div className="py-2 px-3 rounded-2xl bg-white border border-[#C9A227]/20 shadow-xs flex flex-col items-center justify-center text-center">
          {/* Animated Waveform Bars */}
          <MayaAudioWaveform
            callState={callState}
            volumeLevel={volumeLevel}
            userVolumeLevel={userVolumeLevel}
          />

          {/* Call Status Label */}
          <div className="min-h-[24px] flex items-center justify-center mt-1">
            {callState === 'idle' && (
              <span className="text-xs font-medium text-zinc-600 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Maya is ready • Click &ldquo;Start Talking&rdquo; below
              </span>
            )}
            {callState === 'connecting' && (
              <span className="text-xs font-semibold text-[#A77912] flex items-center gap-1.5 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-[#C9A227]" />
                Connecting to Maya&apos;s Voice Desk...
              </span>
            )}
            {callState === 'connected' && (
              <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Connected • Say &ldquo;Vanakkam&rdquo; to start speaking
              </span>
            )}
            {callState === 'speaking' && (
              <span className="text-xs font-bold text-[#174414] flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-[#2F6B1F] animate-bounce" />
                Maya is speaking...
              </span>
            )}
            {callState === 'listening' && (
              <span className="text-xs font-bold text-[#2F6B1F] flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                Listening to you... Speak in Tamil or English
              </span>
            )}
            {callState === 'ending' && (
              <span className="text-xs font-medium text-zinc-500 flex items-center gap-1.5">
                Ending conversation...
              </span>
            )}
            {callState === 'ended' && (
              <span className="text-xs font-medium text-zinc-600 flex items-center gap-1.5">
                Call ended • Tap below to start another conversation
              </span>
            )}
            {callState === 'error' && (
              <span className="text-xs font-medium text-red-600 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>Call connection interrupted</span>
              </span>
            )}
          </div>

          {/* Active Call Timer */}
          {isCallActive && duration > 0 && (
            <div className="text-[11px] font-mono font-semibold text-zinc-500 mt-1">
              Call Duration: {formatDuration(duration)}
            </div>
          )}
        </div>

        {/* Error Alert Box (if present) */}
        {errorMessage && (
          <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-800 space-y-1.5 shadow-xs">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <p className="leading-snug">{errorMessage}</p>
            </div>
            <button
              onClick={clearError}
              className="text-[11px] font-bold text-red-700 hover:text-red-900 flex items-center gap-1 ml-6 underline"
            >
              <RotateCcw className="w-3 h-3" /> Dismiss &amp; Try Again
            </button>
          </div>
        )}

        {/* Real-time Transcripts Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-500 px-1">
            <span>Conversation Transcript</span>
            {transcripts.length > 0 && (
              <span className="text-[10px] text-zinc-400">
                {transcripts.length} {transcripts.length === 1 ? 'message' : 'messages'}
              </span>
            )}
          </div>

          <div
            className="w-full max-h-44 sm:max-h-52 overflow-y-auto p-3 rounded-2xl bg-white/80 border border-[#C9A227]/15 space-y-2.5 text-xs shadow-inner"
            role="log"
            aria-live="polite"
          >
            {transcripts.length === 0 && !currentPartial && (
              <p className="text-center text-zinc-400 py-4 italic text-[11px]">
                {isCallActive
                  ? 'Transcripts will appear here in real time as you speak...'
                  : 'Start talking to view real-time Tamil & English speech transcription.'}
              </p>
            )}

            {/* Past Transcripts */}
            {transcripts.map((item) => (
              <div
                key={item.id}
                className={`flex flex-col ${
                  item.role === 'assistant' ? 'items-start' : 'items-end'
                }`}
              >
                <span className="text-[10px] font-semibold text-zinc-500 mb-0.5 px-1">
                  {item.role === 'assistant' ? 'Maya (AI)' : 'You'}
                </span>
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-2xl leading-relaxed text-xs ${
                    item.role === 'assistant'
                      ? 'bg-[#FFFDF6] border border-[#C9A227]/30 text-[#174414] shadow-xs'
                      : 'bg-[#174414] text-white shadow-xs'
                  }`}
                >
                  {item.text}
                </div>
              </div>
            ))}

            {/* Current Streaming Partial Transcript */}
            {currentPartial && (
              <div
                className={`flex flex-col ${
                  currentPartial.role === 'assistant'
                    ? 'items-start'
                    : 'items-end'
                }`}
              >
                <span className="text-[10px] font-semibold text-zinc-500 mb-0.5 px-1">
                  {currentPartial.role === 'assistant' ? 'Maya (Speaking...)' : 'You (Speaking...)'}
                </span>
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-2xl leading-relaxed text-xs italic opacity-90 ${
                    currentPartial.role === 'assistant'
                      ? 'bg-amber-50/90 border border-amber-300 text-[#174414]'
                      : 'bg-emerald-900/90 text-white'
                  }`}
                >
                  {currentPartial.text}
                  <span className="inline-block w-1.5 h-3 ml-1 bg-current animate-pulse" />
                </div>
              </div>
            )}

            <div ref={transcriptEndRef} />
          </div>
        </div>
      </div>

      {/* Panel Footer & Controls */}
      <div className="p-4 bg-gradient-to-t from-[#F8F5EB] to-[#FFFDF6] border-t border-[#C9A227]/20 space-y-2.5">
        {!isCallActive ? (
          /* Primary "Start Talking" Button */
          <button
            onClick={startCall}
            className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#174414] via-[#1E4D1A] to-[#2F6B1F] text-white font-semibold text-sm shadow-lg shadow-[#174414]/20 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 border border-[#C9A227]/40 cursor-pointer disabled:opacity-60"
            aria-label="Start voice conversation with Maya"
          >
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <Mic className="w-4 h-4 text-[#C9A227]" />
            </div>
            <div className="text-left">
              <span className="block text-sm font-bold leading-tight">
                Start Talking
              </span>
              <span className="block text-[10px] text-[#E5C358] font-normal">
                குரல் வழியே பேச தொடங்குங்கள்
              </span>
            </div>
          </button>
        ) : (
          /* Active Call Controls: Mute + End Conversation */
          <div className="flex items-center gap-2.5">
            {/* Mute Microphone Button */}
            <button
              onClick={toggleMute}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-center ${
                isMuted
                  ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-inner'
                  : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50 shadow-xs'
              }`}
              title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
              aria-label={isMuted ? 'Unmute microphone' : 'Mute microphone'}
            >
              {isMuted ? (
                <MicOff className="w-5 h-5 text-amber-800" />
              ) : (
                <Mic className="w-5 h-5 text-zinc-700" />
              )}
            </button>

            {/* Prominent "End Conversation" Button */}
            <button
              onClick={endCall}
              disabled={callState === 'ending'}
              className="flex-1 py-3.5 px-4 rounded-2xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              aria-label="End conversation with Maya"
            >
              <PhoneOff className="w-4 h-4" />
              <span>
                {callState === 'ending' ? 'Ending...' : 'End Conversation'}
              </span>
            </button>
          </div>
        )}

        {/* Safe Demo Disclosure Banner */}
        <div className="flex items-start gap-1.5 px-1 text-[10px] text-zinc-500 leading-tight">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2F6B1F] shrink-0 mt-0.5" />
          <span>
            AI-powered demo. Appointments are not confirmed. Speak freely in தமிழ், Tanglish or English.
          </span>
        </div>
      </div>
    </aside>
  );
}
