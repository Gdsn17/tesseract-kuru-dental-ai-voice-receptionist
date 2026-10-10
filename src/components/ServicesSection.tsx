'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';
import { kurusDentalClinicConfig } from '@/config/clinics/kurus-dental';

export function ServicesSection() {
  // Service photographic references matching luxury dental clinic imagery
  const serviceImages: Record<string, string> = {
    'dental-implants': 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
    'aligners': 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
    'root-canal': 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    'restoration': 'https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=800&q=80',
    'laser-dentistry': 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    'tooth-extraction': 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
  };

  return (
    <section id="services" className="py-24 bg-[#FFFDF6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#C9A227]/40 shadow-xs mb-4">
            <Sparkles className="w-4 h-4 text-[#C9A227]" />
            <span className="text-xs font-semibold tracking-wider uppercase text-[#174414]">
              Comprehensive Dental Treatments
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1E1E] leading-tight mb-4">
            Select Your <span className="gold-gradient-text">Treatment</span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-600">
            With years of hands-on clinical experience across multiple dental specialties, we bring industry-leading care to Woraiyur, Trichy.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {kurusDentalClinicConfig.services.map((service) => (
            <div
              key={service.id}
              className="group relative bg-white rounded-3xl overflow-hidden border border-[#C9A227]/20 shadow-sm hover:shadow-xl hover:border-[#C9A227]/60 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card Image */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-zinc-100" style={{ position: 'relative' }}>
                <Image
                  src={serviceImages[service.id] || serviceImages['dental-implants']}
                  alt={service.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#174414] border border-[#C9A227]/30 shadow-xs">
                  {service.category}
                </div>

                {service.popular && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-[#A77912] to-[#C9A227] text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase shadow-xs">
                    Popular
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1E1E1E] group-hover:text-[#A77912] transition-colors mb-2">
                    {service.name}
                  </h3>

                  <p className="text-xs font-semibold text-[#2F6B1F] mb-3">
                    {service.tagline}
                  </p>

                  <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                  <span className="text-xs text-zinc-500 flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#C9A227]" />
                    ~{service.defaultDurationMinutes} mins
                  </span>

                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#174414] group-hover:text-[#A77912] transition-colors"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
