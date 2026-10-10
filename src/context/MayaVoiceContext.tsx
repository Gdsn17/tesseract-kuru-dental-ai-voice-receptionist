'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
} from 'react';
import Vapi from '@vapi-ai/web';

export type CallState =
  | 'idle'
  | 'connecting'
  | 'connected'
  | 'speaking'
  | 'listening'
  | 'ending'
  | 'error'
  | 'ended';

export interface TranscriptItem {
  id: string;
  role: 'assistant' | 'user';
  text: string;
  isFinal: boolean;
  timestamp: Date;
}

export interface MayaVoiceContextType {
  isOpen: boolean;
  openMaya: () => void;
  closeMaya: () => void;
  toggleMaya: () => void;
  callState: CallState;
  volumeLevel: number;
  userVolumeLevel: number;
  duration: number;
  transcripts: TranscriptItem[];
  currentPartial: { role: 'assistant' | 'user'; text: string } | null;
  isMuted: boolean;
  errorMessage: string | null;
  isConfigured: boolean;
  startCall: () => Promise<void>;
  endCall: () => Promise<void>;
  toggleMute: () => void;
  clearError: () => void;
}

const MayaVoiceContext = createContext<MayaVoiceContextType | null>(null);

const DEFAULT_ASSISTANT_ID = '61c2af86-4b22-4623-9bd7-5bc953ef654b';

interface MayaVoiceProviderProps {
  children: ReactNode;
}

export function MayaVoiceProvider({ children }: MayaVoiceProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [callState, setCallState] = useState<CallState>('idle');
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [userVolumeLevel, setUserVolumeLevel] = useState(0);
  const [duration, setDuration] = useState(0);
  const [transcripts, setTranscripts] = useState<TranscriptItem[]>([]);
  const [currentPartial, setCurrentPartial] = useState<{
    role: 'assistant' | 'user';
    text: string;
  } | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const vapiRef = useRef<Vapi | null>(null);
  const isStartingRef = useRef(false);
  const isEndingRef = useRef(false);
  const durationTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Check if real Vapi credentials are configured
  const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || '';
  const assistantId =
    process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || DEFAULT_ASSISTANT_ID;
  const isConfigured = Boolean(
    publicKey &&
      publicKey.trim().length > 0 &&
      publicKey !== 'your_vapi_public_key'
  );

  // Parse error messages into user-friendly descriptions
  const parseVapiError = useCallback((err: unknown): string => {
    if (!err) return 'An unexpected error occurred. Please try again.';
    const str =
      typeof err === 'string'
        ? err
        : (err as { message?: string })?.message || JSON.stringify(err);

    if (
      str.includes('NotAllowedError') ||
      str.includes('Permission denied') ||
      str.includes('PermissionDeniedError')
    ) {
      return 'Microphone permission was denied. Please allow microphone access in your browser settings to speak with Maya.';
    }
    if (
      str.includes('NotFoundError') ||
      str.includes('DevicesNotFoundError')
    ) {
      return 'No microphone was found. Please connect an audio input device.';
    }
    if (
      str.includes('credit') ||
      str.includes('balance') ||
      str.includes('payment')
    ) {
      return 'Vapi voice service credit limit reached. Please check your account balance.';
    }
    if (str.includes('assistant') && str.includes('not found')) {
      return 'Maya assistant configuration was not found. Please verify NEXT_PUBLIC_VAPI_ASSISTANT_ID.';
    }
    if (
      str.includes('network') ||
      str.includes('failed to fetch') ||
      str.includes('WebSocket') ||
      str.includes('meeting')
    ) {
      return 'Network connection issue. Please check your internet connection and retry.';
    }

    return (err as { message?: string })?.message || 'Unable to connect to Maya. Please try again.';
  }, []);

  // Safe initialize or retrieve existing Vapi Web SDK instance
  const getOrCreateVapi = useCallback((): Vapi | null => {
    if (typeof window === 'undefined') return null;

    if (vapiRef.current) {
      return vapiRef.current;
    }

    if (!publicKey || publicKey === 'your_vapi_public_key') {
      return null;
    }

    try {
      const vapi = new Vapi(publicKey);

      vapi.on('call-start', () => {
        setDuration(0);
        setCallState('connected');
        setErrorMessage(null);
        isStartingRef.current = false;
      });

      vapi.on('call-end', () => {
        setCallState('ended');
        isStartingRef.current = false;
        isEndingRef.current = false;
        // Reset to idle after brief completed animation
        setTimeout(() => {
          setCallState((current) => (current === 'ended' ? 'idle' : current));
        }, 1800);
      });

      vapi.on('speech-start', () => {
        setCallState('speaking');
      });

      vapi.on('speech-end', () => {
        setCallState('listening');
      });

      vapi.on('volume-level', (vol: number) => {
        setVolumeLevel(vol);
      });

      vapi.on('local-volume-level', (vol: number) => {
        setUserVolumeLevel(vol);
      });

      vapi.on('message', (message: unknown) => {
        if (!message || typeof message !== 'object') return;
        const msg = message as {
          type?: string;
          role?: 'assistant' | 'user';
          transcript?: string;
          text?: string;
          transcriptType?: 'partial' | 'final';
        };

        if (msg.type === 'transcript') {
          const role = msg.role === 'assistant' ? 'assistant' : 'user';
          const text = (msg.transcript || msg.text || '').trim();
          if (!text) return;

          if (msg.transcriptType === 'final') {
            setCurrentPartial(null);
            setTranscripts((prev) => [
              ...prev,
              {
                id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
                role,
                text,
                isFinal: true,
                timestamp: new Date(),
              },
            ]);
          } else {
            setCurrentPartial({ role, text });
          }
        }
      });

      vapi.on('error', (err: unknown) => {
        console.error('[Vapi Event Error]:', err);
        isStartingRef.current = false;
        isEndingRef.current = false;
        setErrorMessage(parseVapiError(err));
        setCallState('error');
      });

      vapiRef.current = vapi;
      return vapi;
    } catch (err) {
      console.error('[Vapi Initialization Error]:', err);
      setErrorMessage(parseVapiError(err));
      setCallState('error');
      return null;
    }
  }, [publicKey, parseVapiError]);

  // Duration timer
  useEffect(() => {
    if (
      callState === 'connected' ||
      callState === 'speaking' ||
      callState === 'listening'
    ) {
      durationTimerRef.current = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (durationTimerRef.current) {
        clearInterval(durationTimerRef.current);
        durationTimerRef.current = null;
      }
    }

    return () => {
      if (durationTimerRef.current) {
        clearInterval(durationTimerRef.current);
        durationTimerRef.current = null;
      }
    };
  }, [callState]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (durationTimerRef.current) {
        clearInterval(durationTimerRef.current);
      }
      if (vapiRef.current) {
        try {
          vapiRef.current.stop();
          vapiRef.current.removeAllListeners();
        } catch (e) {
          console.warn('[Vapi Cleanup Error]:', e);
        }
        vapiRef.current = null;
      }
    };
  }, []);

  const startCall = useCallback(async () => {
    // Prevent duplicate calls if already connecting or active
    if (
      isStartingRef.current ||
      callState === 'connecting' ||
      callState === 'connected' ||
      callState === 'speaking' ||
      callState === 'listening' ||
      callState === 'ending'
    ) {
      return;
    }

    setErrorMessage(null);

    // Validate environment variables
    if (!publicKey || publicKey === 'your_vapi_public_key' || !publicKey.trim()) {
      setErrorMessage(
        'Vapi Public Key is missing. Please set NEXT_PUBLIC_VAPI_PUBLIC_KEY in your .env.local file to connect to Maya.'
      );
      setCallState('error');
      return;
    }

    // Check browser mediaDevices support
    if (
      typeof navigator === 'undefined' ||
      !navigator.mediaDevices?.getUserMedia
    ) {
      setErrorMessage(
        'Microphone is not supported in this browser. Please use Chrome, Safari, Edge, or Firefox.'
      );
      setCallState('error');
      return;
    }

    isStartingRef.current = true;
    setCallState('connecting');

    try {
      // Intentionally request microphone permission upon user click
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Stop probe tracks immediately so Vapi Daily WebRTC can manage the audio hardware cleanly
      stream.getTracks().forEach((track) => track.stop());

      const vapi = getOrCreateVapi();
      if (!vapi) {
        throw new Error('Failed to initialize Vapi instance.');
      }

      // Start the call using the published Assistant ID
      // Do not override prompt, voice, model or transcriber
      await vapi.start(assistantId);
    } catch (err: unknown) {
      console.error('[Vapi Start Call Error]:', err);
      isStartingRef.current = false;
      setErrorMessage(parseVapiError(err));
      setCallState('error');
    }
  }, [callState, publicKey, assistantId, getOrCreateVapi, parseVapiError]);

  const endCall = useCallback(async () => {
    if (isEndingRef.current || callState === 'idle' || callState === 'ended') {
      return;
    }

    isEndingRef.current = true;
    setCallState('ending');

    try {
      if (vapiRef.current) {
        await vapiRef.current.stop();
      }
    } catch (err) {
      console.error('[Vapi Stop Call Error]:', err);
    } finally {
      isStartingRef.current = false;
      isEndingRef.current = false;
      setCallState('idle');
      setIsMuted(false);
    }
  }, [callState]);

  const toggleMute = useCallback(() => {
    if (!vapiRef.current || callState === 'idle') return;
    const nextMuted = !isMuted;
    try {
      vapiRef.current.setMuted(nextMuted);
      setIsMuted(nextMuted);
    } catch (e) {
      console.warn('[Vapi Mute Error]:', e);
    }
  }, [isMuted, callState]);

  const clearError = useCallback(() => {
    setErrorMessage(null);
    if (callState === 'error') {
      setCallState('idle');
    }
  }, [callState]);

  const openMaya = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeMaya = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleMaya = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <MayaVoiceContext.Provider
      value={{
        isOpen,
        openMaya,
        closeMaya,
        toggleMaya,
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
      }}
    >
      {children}
    </MayaVoiceContext.Provider>
  );
}

export function useMayaVoice(): MayaVoiceContextType {
  const context = useContext(MayaVoiceContext);
  if (!context) {
    throw new Error('useMayaVoice must be used within a MayaVoiceProvider');
  }
  return context;
}
