export type ClinicType = 'dental' | 'dermatology' | 'skin' | 'multispeciality';

export interface ClinicColors {
  primaryGold: string;
  richGold: string;
  clinicGreen: string;
  deepGreen: string;
  softIvory: string;
  charcoal: string;
}

export interface ClinicService {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  defaultDurationMinutes: number;
  popular?: boolean;
}

export interface ClinicContact {
  address: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  displayPhone: string;
  whatsappPhone: string;
  displayWhatsApp: string;
  email?: string;
  mapsUrl?: string;
}

export interface ClinicHours {
  days: string;
  timing: string;
  isClosed?: boolean;
}

export interface ClinicVoiceAgentConfig {
  assistantName: string;
  role: string;
  primaryLanguages: ('ta-IN' | 'en-IN')[];
  greetingMessage: string;
  tamilGreetingMessage?: string;
  vapiAssistantId?: string;
  personality: {
    traits: string[];
    rules: string[];
  };
  approvedKnowledge: {
    canConfirmBooking: false;
    canDiagnose: false;
    canQuoteFixedPricing: false;
    responseForUnknowns: string;
  };
  disallowedTopics: string[];
  callTimeoutSeconds: number;
}

export interface ClinicDemoSettings {
  isDemoMode: boolean;
  disclosureNotice: string;
  testDataNotice: string;
}

export interface ClinicConfig {
  key: string;
  name: string;
  tagline: string;
  subtitle: string;
  type: ClinicType;
  brand: {
    logoUrl: string;
    colors: ClinicColors;
  };
  contact: ClinicContact;
  hours: ClinicHours[];
  services: ClinicService[];
  voiceAgent: ClinicVoiceAgentConfig;
  demoSettings: ClinicDemoSettings;
}
