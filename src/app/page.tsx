'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { AboutSection } from '@/components/AboutSection';
import { ServicesSection } from '@/components/ServicesSection';
import { ResultsSection } from '@/components/ResultsSection';
import { TechnologySection } from '@/components/TechnologySection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { useMayaVoice } from '@/context/MayaVoiceContext';

export default function Home() {
  const { openMaya } = useMayaVoice();

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF6] text-[#1E1E1E]">
      {/* Sticky Header with Brand & Navigation */}
      <Header />

      <main className="flex-1">
        {/* Hero Section with exclusive Try AI Voice Receptionist CTA */}
        <Hero onOpenVoiceModal={openMaya} />

        {/* Services Section */}
        <ServicesSection />

        {/* About Clinic Section */}
        <AboutSection />

        {/* Clinical Transformations (Before & After) */}
        <ResultsSection />

        {/* Technology & Clinical Standards */}
        <TechnologySection />

        {/* Clinic Location & Google Map */}
        <ContactSection />
      </main>

      {/* Clinic Footer */}
      <Footer />
    </div>
  );
}
