'use client';

import React from 'react';
import { MayaFloatingLauncher } from './MayaFloatingLauncher';
import { MayaVoicePanel } from './MayaVoicePanel';

export function MayaVoiceReceptionist() {
  return (
    <>
      <MayaFloatingLauncher />
      <MayaVoicePanel />
    </>
  );
}
