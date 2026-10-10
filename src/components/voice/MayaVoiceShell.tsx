'use client';

import React, { ReactNode } from 'react';
import { MayaVoiceProvider } from '@/context/MayaVoiceContext';
import { MayaVoiceReceptionist } from './MayaVoiceReceptionist';

interface MayaVoiceShellProps {
  children: ReactNode;
}

export function MayaVoiceShell({ children }: MayaVoiceShellProps) {
  return (
    <MayaVoiceProvider>
      {children}
      <MayaVoiceReceptionist />
    </MayaVoiceProvider>
  );
}
