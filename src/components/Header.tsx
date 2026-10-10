'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, MessageCircle } from 'lucide-react';
import { kurusDentalClinicConfig } from '@/config/clinics/kurus-dental';

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFFDF6]/90 backdrop-blur-md border-b border-[#C9A227]/20 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-12 h-12 rounded-xl bg-white p-1 border border-[#C9A227]/30 shadow-xs group-hover:border-[#C9A227] transition-colors flex items-center justify-center shrink-0">
              <Image
                src={kurusDentalClinicConfig.brand.logoUrl}
                alt={kurusDentalClinicConfig.name}
                width={44}
                height={44}
                className="object-contain"
                style={{ width: 'auto', height: 'auto' }}
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#1E1E1E] group-hover:text-[#A77912] transition-colors leading-tight">
                KURU&apos;S DENTAL CLINIC
              </span>
              <span className="text-[11px] font-medium tracking-widest text-[#2F6B1F] uppercase">
                Woraiyur, Tiruchirappalli
              </span>
            </div>
          </Link>

          {/* Action CTAs (Call & WhatsApp) */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Direct Call Button */}
            <a
              href={`tel:${kurusDentalClinicConfig.contact.phone}`}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white text-zinc-800 text-xs font-semibold border border-zinc-200 hover:border-[#C9A227] hover:text-[#A77912] transition-colors shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 text-[#2F6B1F]" />
              <span className="hidden sm:inline">Call: {kurusDentalClinicConfig.contact.displayPhone}</span>
              <span className="sm:hidden">Call</span>
            </a>

            {/* WhatsApp Button */}
            <a
              href={`https://wa.me/${kurusDentalClinicConfig.contact.whatsappPhone.replace('+', '')}?text=Hello%20Kuru's%20Dental%20Clinic,%20I%20would%20like%20to%20inquire%20about%20an%20appointment`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 sm:py-2.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 hover:bg-emerald-100 transition-colors shadow-xs"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-[#2F6B1F]" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
