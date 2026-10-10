'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, Mic, MicOff, PhoneOff, Volume2, Sparkles, ShieldCheck, AlertCircle } from 'lucide-react';
import { VoiceOrb } from './VoiceOrb';
import { kurusDentalClinicConfig } from '@/config/clinics/kurus-dental';

interface VoiceDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AgentStatus = 'idle' | 'connecting' | 'listening' | 'speaking' | 'error';

export function VoiceDemoModal({ isOpen, onClose }: VoiceDemoModalProps) {
  const [status, setStatus] = useState<AgentStatus>('idle');
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [transcript, setTranscript] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Call duration counter
  useEffect(() => {
    if (status === 'listening' || status === 'speaking') {
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartConversation = async () => {
    setErrorMessage(null);
    setStatus('connecting');

    try {
      // Check microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Stream is obtained successfully; release immediate stream track for voice SDK takeover
      stream.getTracks().forEach((track) => track.stop());

      // Simulate connection transition to greeting state
      setTimeout(() => {
        setStatus('speaking');
        setTranscript([
          {
            role: 'assistant',
            text: kurusDentalClinicConfig.voiceAgent.greetingMessage,
          },
        ]);

        // After greeting finishes, switch to listening
        setTimeout(() => {
          setStatus('listening');
        }, 3500);
      }, 1200);
    } catch (err: unknown) {
      console.error('Microphone access error:', err);
      setStatus('error');
      if (err instanceof Error && err.name === 'NotAllowedError') {
        setErrorMessage('Microphone access was denied. Please allow microphone permission in your browser.');
      } else {
        setErrorMessage('Unable to connect to audio hardware. Please verify your microphone settings.');
      }
    }
  };

  const handleEndCall = () => {
    setStatus('idle');
    setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fadeIn">
      {/* Modal Dialog Container */}
      <div 
        className="relative w-full max-w-lg bg-[#FFFDF6] rounded-3xl shadow-2xl border border-[#C9A227]/30 overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Gold Gradient Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-[#A77912] via-[#C9A227] to-[#2F6B1F]" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-white p-1 border border-[#C9A227]/20 shadow-sm flex items-center justify-center">
              <Image
                src={kurusDentalClinicConfig.brand.logoUrl}
                alt={kurusDentalClinicConfig.name}
                width={36}
                height={36}
                className="object-contain"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-wide text-[#1E1E1E] uppercase">
                {kurusDentalClinicConfig.name}
              </h3>
              <p className="text-xs text-[#2F6B1F] font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#C9A227]" />
                Kuru&apos;s AI Receptionist (Maya)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Disclosure Notice Banner */}
        <div className="mx-6 px-3.5 py-2 rounded-xl bg-amber-50/80 border border-amber-200/60 text-[11px] text-amber-900 leading-snug flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong>AI Demonstration:</strong> You are speaking with an AI receptionist. Please use fictional patient details during testing.
          </div>
        </div>

        {/* Center Orb & State Section */}
        <div className="flex flex-col items-center justify-center py-6 px-6 text-center">
          <VoiceOrb state={status} />

          {/* Status Label */}
          <div className="mt-2 min-h-[28px] flex items-center justify-center">
            {status === 'idle' && (
              <span className="text-sm font-medium text-zinc-600">
                Ready to assist with appointments & clinic inquiries
              </span>
            )}
            {status === 'connecting' && (
              <span className="text-sm font-medium text-[#A77912] flex items-center gap-1.5 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-[#C9A227]" />
                Connecting to Kuru&apos;s Dental Voice Desk...
              </span>
            )}
            {status === 'speaking' && (
              <span className="text-sm font-semibold text-[#174414] flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-[#2F6B1F] animate-bounce" />
                Maya is speaking...
              </span>
            )}
            {status === 'listening' && (
              <span className="text-sm font-semibold text-[#2F6B1F] flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                Listening to you... Speak in Tamil or English
              </span>
            )}
            {status === 'error' && (
              <span className="text-sm font-medium text-red-600 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-red-500" />
                {errorMessage || 'Connection interrupted. Please retry.'}
              </span>
            )}
          </div>

          {/* Call Timer */}
          {(status === 'listening' || status === 'speaking') && (
            <div className="mt-1 text-xs font-mono font-medium text-zinc-500 tracking-wider">
              {formatTime(callDuration)}
            </div>
          )}

          {/* Live Transcript Snippet */}
          {transcript.length > 0 && (
            <div className="mt-4 w-full max-h-28 overflow-y-auto px-4 py-3 rounded-2xl bg-white border border-[#C9A227]/15 text-left text-xs space-y-2 shadow-inner">
              {transcript.map((msg, idx) => (
                <div key={idx} className={msg.role === 'assistant' ? 'text-[#174414]' : 'text-zinc-800'}>
                  <span className="font-semibold">{msg.role === 'assistant' ? 'Maya: ' : 'You: '}</span>
                  <span className="italic">{msg.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="px-6 pb-6 pt-2 bg-gradient-to-t from-[#F8F5EB] to-transparent">
          {status === 'idle' || status === 'error' ? (
            <button
              onClick={handleStartConversation}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#174414] to-[#2F6B1F] text-white font-semibold text-base shadow-lg shadow-[#174414]/25 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 border border-[#C9A227]/40 cursor-pointer"
            >
              <Mic className="w-5 h-5 text-[#C9A227]" />
              Start Voice Conversation
            </button>
          ) : (
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={toggleMute}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isMuted 
                    ? 'bg-amber-100 border-amber-300 text-amber-900' 
                    : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                }`}
                title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <button
                onClick={handleEndCall}
                className="flex-1 py-4 px-6 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneOff className="w-5 h-5" />
                End Conversation
              </button>
            </div>
          )}

          <p className="mt-3 text-[11px] text-center text-zinc-400">
            Powered by Sarvam Voice AI • Tamil &amp; English Bilingual Support
          </p>
        </div>
      </div>
    </div>
  );
}
