'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

export function ResultsSection() {
  const cases = [
    {
      title: 'Full Arch Dental Implant Restoration',
      tagline: 'Permanent Titanium Implant & Zirconia Crown',
      resultTag: 'Complete Bite Restoration | Natural Aesthetics',
      beforeImg: 'https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=600&q=80',
      afterImg: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Clear Aligner Smile Correction',
      tagline: 'Invisible Orthodontic Realignment',
      resultTag: '12 Months Treatment | Zero Metal Brackets',
      beforeImg: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
      afterImg: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <section id="results" className="py-20 bg-[#1E1E1E] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
            <span className="text-xs font-semibold tracking-wider uppercase text-amber-200">
              Clinical Transformations
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Real Results. <span className="gold-gradient-text">Real Confidence.</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-400">
            See the transformative difference precision dentistry makes. Restoring dental function, aesthetics, and everyday confidence.
          </p>
        </div>

        {/* 2 Case Comparison Cards inspired by Dentalio Framer Template */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {cases.map((c, i) => (
            <div
              key={i}
              className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-[#C9A227]/50 transition-all p-5 flex flex-col justify-between shadow-xl"
            >
              <div className="grid grid-cols-2 gap-3 mb-4">
                {/* Before Image */}
                <div className="relative h-44 rounded-2xl overflow-hidden bg-zinc-800" style={{ position: 'relative' }}>
                  <Image
                    src={c.beforeImg}
                    alt={`${c.title} Before`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/70 text-[10px] font-bold tracking-wider uppercase text-zinc-300 backdrop-blur-xs">
                    Initial Case
                  </span>
                </div>

                {/* After Image */}
                <div className="relative h-44 rounded-2xl overflow-hidden bg-zinc-800 border border-[#C9A227]/40" style={{ position: 'relative' }}>
                  <Image
                    src={c.afterImg}
                    alt={`${c.title} After`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-[#174414]/90 text-[10px] font-bold tracking-wider uppercase text-emerald-300 backdrop-blur-xs">
                    Result
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-lg font-bold text-white mb-1">{c.title}</h3>
                <p className="text-xs text-[#C9A227] font-semibold mb-2">{c.tagline}</p>
                <div className="inline-block px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs">
                  {c.resultTag}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
