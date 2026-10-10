'use client';

import React from 'react';
import { HeartHandshake, Microscope, Coffee, Sparkles } from 'lucide-react';

export function TechnologySection() {
  const pillars = [
    {
      icon: HeartHandshake,
      title: 'Personal Attention',
      subtitle: 'Patient-Centered Dentistry',
      description:
        'A dedicated team that listens attentively, explains clearly, and makes you the active co-creator of every care decision.',
    },
    {
      icon: Microscope,
      title: 'Modern Precision',
      subtitle: 'Digital 3D & Laser Tech',
      description:
        'Advanced computer-guided surgery and high-resolution imaging bring surgical accuracy and speed to every visit.',
    },
    {
      icon: Coffee,
      title: 'Calm Comfort',
      subtitle: 'Zero Dental Anxiety',
      description:
        'A soothing, stress-free clinical environment designed to help you feel tranquil before, during, and after care.',
    },
  ];

  return (
    <section id="technology" className="py-20 bg-[#FFFDF6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#C9A227]/40 shadow-xs mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
            <span className="text-xs font-semibold tracking-wider uppercase text-[#174414]">
              Our Clinical Standards
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1E1E] leading-tight mb-4">
            Modern Technology. <br />
            <span className="gold-gradient-text">Better Experiences.</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-600">
            From the moment you connect to your final post-care follow up, every touchpoint is engineered for safety, precision, and ease.
          </p>
        </div>

        {/* 3 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-[#C9A227]/20 shadow-xs hover:shadow-xl hover:border-[#C9A227]/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 text-[#A77912] border border-amber-200/60 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#1E1E1E] mb-1">
                    {p.title}
                  </h3>

                  <p className="text-xs font-semibold text-[#2F6B1F] mb-4">
                    {p.subtitle}
                  </p>

                  <p className="text-sm text-zinc-600 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-zinc-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    Standard 0{idx + 1}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[#C9A227]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
