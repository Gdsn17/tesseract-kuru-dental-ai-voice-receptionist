'use client';

import React from 'react';
import Image from 'next/image';
import { CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export function AboutSection() {
  const highlights = [
    'Experienced Dental Surgeons & Implant Specialists',
    'Computer-Guided Surgical Dental Implants',
    'Pain-Managed Single-Visit Rotary Root Canals',
    'Custom Transparent Aligners (No Metal Braces)',
    'Hospital-Grade Multi-Stage Sterilization Protocols',
    'Transparent Diagnosis & Ethical Treatment Planning',
  ];

  return (
    <section id="about" className="py-20 bg-white border-y border-[#C9A227]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Clinical Operatory Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#C9A227]/25 h-[420px] sm:h-[480px]" style={{ position: 'relative' }}>
              <Image
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80"
                alt="Doctor consulting with patient at Kuru's Dental Clinic"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Floating Quality Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#FFFDF6]/95 backdrop-blur-md rounded-2xl p-4 border border-[#C9A227]/20 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-100 text-[#174414]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1E1E1E]">Sterile &amp; Safe Clinical Environment</p>
                    <p className="text-[11px] text-zinc-500">ISO-grade infection control standards in Woraiyur</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: About Narrative & Checklist */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200/60 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
              <span className="text-xs font-bold tracking-wider uppercase text-[#A77912]">
                About Our Clinic
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1E1E] leading-tight mb-6">
              Personalized Dentistry. <br />
              <span className="text-[#2F6B1F]">Exceptional Care in Trichy.</span>
            </h2>

            <p className="text-base text-zinc-600 leading-relaxed mb-6">
              At Kuru&apos;s Dental Clinic, clinical excellence is just the beginning. We pair thoughtful expertise with a gentle, patient-first approach so every visit feels calm, reassuring, and designed around your long-term oral health.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full mb-8">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#2F6B1F] shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-zinc-800 leading-snug">{item}</span>
                </div>
              ))}
            </div>

            {/* Metric Counters */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-zinc-200 w-full">
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1E1E]">15+</p>
                <p className="text-xs text-zinc-500 font-medium mt-1">Years of Excellence</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1E1E]">6+</p>
                <p className="text-xs text-zinc-500 font-medium mt-1">Core Specialties</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1E1E]">98%</p>
                <p className="text-xs text-zinc-500 font-medium mt-1">Patient Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
