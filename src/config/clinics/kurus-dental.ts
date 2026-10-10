import { ClinicConfig } from '@/lib/clinics/types';

export const kurusDentalClinicConfig: ClinicConfig = {
  key: 'kurus-dental',
  name: "Kuru's Dental Clinic",
  tagline: 'Healthy Teeth, Confident You',
  subtitle: 'Advanced Multispeciality Dental Care & Implant Center in Woraiyur, Trichy',
  type: 'dental',

  brand: {
    logoUrl: '/brand/kurus-dental-logo.png',
    colors: {
      primaryGold: '#C9A227',
      richGold: '#A77912',
      clinicGreen: '#2F6B1F',
      deepGreen: '#174414',
      softIvory: '#FFFDF6',
      charcoal: '#1E1E1E',
    },
  },

  contact: {
    address: '21, Walaja Rd, Woraiyur',
    landmark: 'Near Nachiar Kovil',
    city: 'Tiruchirappalli',
    state: 'Tamil Nadu',
    pincode: '620003',
    phone: '+919443100000',
    displayPhone: '+91 94431 00000',
    whatsappPhone: '+919443100000',
    displayWhatsApp: '+91 94431 00000',
    email: 'care@kurusdental.com',
    mapsUrl: 'https://maps.google.com/?q=21+Walaja+Rd+Woraiyur+Tiruchirappalli+Tamil+Nadu+620003',
  },

  hours: [
    { days: 'Monday – Saturday', timing: '9:30 AM – 8:30 PM' },
    { days: 'Sunday', timing: '10:00 AM – 1:30 PM (By Prior Request)' },
  ],

  services: [
    {
      id: 'dental-implants',
      name: 'Dental Implants',
      tagline: 'Permanent, Natural-Looking Tooth Replacement',
      description: 'Precision titanium & zirconia implants with computer-guided surgical placement for lasting stability and natural bite restoration.',
      category: 'Implantology',
      defaultDurationMinutes: 45,
      popular: true,
    },
    {
      id: 'aligners',
      name: 'Clear Aligners',
      tagline: 'Invisible Orthodontic Smile Alignment',
      description: 'Custom-molded transparent aligners designed to gently straighten teeth without traditional metal brackets or dietary restrictions.',
      category: 'Orthodontics',
      defaultDurationMinutes: 30,
      popular: true,
    },
    {
      id: 'root-canal',
      name: 'Root Canal Treatment',
      tagline: 'Single-Visit Pain-Free Endodontics',
      description: 'Advanced rotary endodontic therapy preserving your natural tooth structure with microscopic precision and gentle local anesthesia.',
      category: 'Endodontics',
      defaultDurationMinutes: 60,
      popular: true,
    },
    {
      id: 'restoration',
      name: 'Dental Restoration',
      tagline: 'Tooth-Colored Fillings & Ceramic Crowns',
      description: 'Aesthetic composite restorations, inlays, onlays, and CAD/CAM ceramic crowns matching your natural tooth shade seamlessly.',
      category: 'Restorative',
      defaultDurationMinutes: 40,
    },
    {
      id: 'laser-dentistry',
      name: 'Laser Dentistry',
      tagline: 'Minimally Invasive Soft-Tissue Care',
      description: 'Advanced dental laser therapy for painless gum contouring, disinfection, apthous ulcer treatment, and expedited healing.',
      category: 'Advanced Tech',
      defaultDurationMinutes: 30,
    },
    {
      id: 'tooth-extraction',
      name: 'Tooth Extraction & Impaction',
      tagline: 'Gentle, Atraumatic Wisdom Tooth Removal',
      description: 'Careful surgical and non-surgical extractions performed under sterile clinical protocols with rapid post-operative recovery guidance.',
      category: 'Oral Surgery',
      defaultDurationMinutes: 45,
    },
  ],

  voiceAgent: {
    assistantName: 'Maya',
    role: "Professional AI receptionist for Kuru's Dental Clinic",
    primaryLanguages: ['ta-IN', 'en-IN'],
    greetingMessage: "Vanakkam! Kuru's Dental Clinic AI receptionist pesuren. Ungalukku eppadi help pannalam?",
    tamilGreetingMessage: "வணக்கம்! நான் மாயா. சொல்லுங்க, என்ன உதவி வேணும்?",
    vapiAssistantId: '61c2af86-4b22-4623-9bd7-5bc953ef654b',
    personality: {
      traits: ['Warm', 'Professional', 'Natural', 'Concise', 'Patient'],
      rules: [
        'Ask one question at a time.',
        'Keep responses short and conversational.',
        'Allow the caller to interrupt at any point.',
        'Do not repeatedly ask for information already supplied.',
        'Confirm caller details (Name, Phone, Service, Date, Time) explicitly before submitting.',
        'Repeat phone numbers clearly in Tamil or English as preferred by the caller.',
        'Clarify ambiguous dates (e.g., tomorrow, next Monday) and convert to exact calendar dates.',
        'Remind caller that this is an appointment REQUEST, not an immediate confirmed booking.',
        'Never invent consultation fees, doctor qualifications, or promise guaranteed appointment slots.',
      ],
    },
    approvedKnowledge: {
      canConfirmBooking: false,
      canDiagnose: false,
      canQuoteFixedPricing: false,
      responseForUnknowns: "I don't have confirmed information about that. The clinic team will assist you with the specific details during consultation.",
    },
    disallowedTopics: [
      'Medical diagnosis or prescribing medications',
      'Definitive treatment cost guarantees without clinical examination',
      'Confirming immediate slot availability on doctor calendar',
      'Insurance claim approval guarantees',
    ],
    callTimeoutSeconds: 300,
  },

  demoSettings: {
    isDemoMode: true,
    disclosureNotice: 'You are speaking with an AI receptionist. This is a demonstration. Please use fictional patient details.',
    testDataNotice: 'Demo Mode: All captured contact numbers and patient names are flagged as demonstration records.',
  },
};
