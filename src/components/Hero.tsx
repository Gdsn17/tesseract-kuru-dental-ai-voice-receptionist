'use client';

import React from 'react';
import Image from 'next/image';
import { Mic, Phone, MessageCircle, Star, Sparkles, Award } from 'lucide-react';
import { kurusDentalClinicConfig } from '@/config/clinics/kurus-dental';

interface HeroProps {
  onOpenVoiceModal: () => void;
}

export function Hero({ onOpenVoiceModal }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Decorative ambient background gradients */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-[#C9A227]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-32 left-10 -z-10 w-80 h-80 bg-[#2F6B1F]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Clinic Headline & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#C9A227]/40 shadow-xs mb-6">
              <Sparkles className="w-4 h-4 text-[#C9A227]" />
              <span className="text-xs font-semibold tracking-wider uppercase text-[#174414]">
                Advanced Dental Care &amp; Implant Center
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1E1E1E] leading-[1.15] mb-6">
              A Healthier, <br className="hidden sm:inline" />
              <span className="gold-gradient-text">Confident Smile</span> Starts Here.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl mb-8">
              Experience gentle, personalized dentistry combining precision 3D implants, invisible aligners, and pain-free treatments in Woraiyur, Tiruchirappalli. Designed around your utmost comfort.
            </p>

            {/* Primary Action Buttons */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
              {/* Voice AI Receptionist Button */}
              <button
                onClick={onOpenVoiceModal}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-gradient-to-r from-[#174414] to-[#2F6B1F] text-white font-semibold text-sm sm:text-base shadow-xl shadow-[#174414]/25 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all border border-[#C9A227]/50 cursor-pointer"
              >
                <Mic className="w-5 h-5 text-[#C9A227] animate-pulse" />
                <span>🎙️ Try AI Voice Receptionist</span>
              </button>
            </div>

            {/* Phone & WhatsApp Fast Contacts */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-zinc-600 mb-8">
              <a
                href={`tel:${kurusDentalClinicConfig.contact.phone}`}
                className="inline-flex items-center gap-1.5 hover:text-[#174414] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#2F6B1F]" />
                <span>Call Clinic: {kurusDentalClinicConfig.contact.displayPhone}</span>
              </a>
              <span className="text-zinc-300">•</span>
              <a
                href={`https://wa.me/${kurusDentalClinicConfig.contact.whatsappPhone.replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-800 hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#2F6B1F]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Patient Ratings Social Proof */}
            <div className="flex items-center gap-3 pt-4 border-t border-zinc-200/80 w-full sm:w-auto">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm font-semibold text-zinc-800">
                4.9 / 5.0 Rating <span className="font-normal text-zinc-500">(Trusted by 2,500+ Patients in Trichy)</span>
              </p>
            </div>
          </div>

          {/* Right Column: Hero Visual inspired by Dentalio Framer Template */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Golden Border Accent */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-[#C9A227]/40 via-[#2F6B1F]/30 to-[#C9A227]/20 blur-sm" />

              {/* Card Container */}
              <div className="relative rounded-3xl overflow-hidden bg-white shadow-2xl border border-[#C9A227]/30">
                <div className="relative h-96 sm:h-[430px] w-full" style={{ position: 'relative' }}>
                  <Image
                    src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80"
                    alt="Radiant healthy smile at Kuru's Dental Clinic"
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover object-center"
                    priority
                  />
                  {/* Subtle bottom vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Floating Micro Badge: Clinic Emblem */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-lg border border-[#C9A227]/30 flex items-center gap-2.5">
                    <div className="w-8 h-8 flex items-center justify-center shrink-0">
                      <Image
                        src={kurusDentalClinicConfig.brand.logoUrl}
                        alt="Kuru's Dental"
                        width={32}
                        height={32}
                        className="object-contain"
                        style={{ width: 'auto', height: 'auto' }}
                      />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-[#1E1E1E] leading-tight">KURU&apos;S DENTAL</p>
                      <p className="text-[9px] text-[#2F6B1F] font-semibold">WORAIYUR, TRICHY</p>
                    </div>
                  </div>

                  {/* Floating AI Receptionist Live Badge */}
                  <div 
                    onClick={onOpenVoiceModal}
                    className="absolute top-4 right-4 bg-gradient-to-r from-[#174414] to-[#2F6B1F] text-white rounded-2xl px-3 py-2 shadow-lg border border-[#C9A227]/40 flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[11px] font-bold">AI Voice Desk Online</span>
                  </div>

                  {/* Bottom Overlay Card */}
                  <div className="absolute bottom-4 left-4 right-4 bg-[#FFFDF6]/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-[#C9A227]/25">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-[#174414] uppercase tracking-wider">
                          Certified Implantology &amp; Care
                        </p>
                        <p className="text-sm font-semibold text-[#1E1E1E]">
                          Painless &amp; Gentle Procedures
                        </p>
                      </div>
                      <div className="p-2 rounded-xl bg-amber-50 text-[#A77912] border border-amber-200">
                        <Award className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Strip directly below Hero (from Dentalio reference) */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-[#C9A227]/20 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center sm:text-left">
          <div className="flex flex-col">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1E1E]">2,500+</span>
            <span className="text-xs sm:text-sm font-medium text-zinc-500 mt-1">Happy Smiles Restored</span>
          </div>

          <div className="flex flex-col">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1E1E]">15+ Years</span>
            <span className="text-xs sm:text-sm font-medium text-zinc-500 mt-1">Clinical Excellence</span>
          </div>

          <div className="flex flex-col">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1E1E]">4.9 / 5.0</span>
            <span className="text-xs sm:text-sm font-medium text-zinc-500 mt-1">Patient Satisfaction</span>
          </div>

          <div className="flex flex-col">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1E1E]">Digital 3D</span>
            <span className="text-xs sm:text-sm font-medium text-zinc-500 mt-1">Advanced Laser &amp; Guided Tech</span>
          </div>
        </div>
      </div>
    </section>
  );
}
