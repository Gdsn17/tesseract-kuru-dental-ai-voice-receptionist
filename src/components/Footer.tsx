'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, MapPin, Sparkles, Shield } from 'lucide-react';
import { kurusDentalClinicConfig } from '@/config/clinics/kurus-dental';

export function Footer() {
  return (
    <footer className="bg-[#1E1E1E] text-zinc-300 pt-16 pb-12 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-800">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white p-1 border border-[#C9A227]/40 shadow-xs flex items-center justify-center shrink-0">
                <Image
                  src={kurusDentalClinicConfig.brand.logoUrl}
                  alt={kurusDentalClinicConfig.name}
                  width={36}
                  height={36}
                  className="object-contain"
                  style={{ width: 'auto', height: 'auto' }}
                />
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-white tracking-wide block">
                  KURU&apos;S DENTAL CLINIC
                </span>
                <span className="text-[11px] text-[#C9A227] font-semibold tracking-wider uppercase">
                  Healthy Teeth, Confident You
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mb-6">
              Premier dental clinic and implant center in Woraiyur, Tiruchirappalli. Delivering painless endodontics, invisible aligners, and aesthetic smile rehabilitation.
            </p>

            <div className="text-xs space-y-2 text-zinc-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                <span>{kurusDentalClinicConfig.contact.address}, {kurusDentalClinicConfig.contact.city} - {kurusDentalClinicConfig.contact.pincode}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C9A227] shrink-0" />
                <a href={`tel:${kurusDentalClinicConfig.contact.phone}`} className="hover:text-white transition-colors">
                  {kurusDentalClinicConfig.contact.displayPhone}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Treatments
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              {kurusDentalClinicConfig.services.map((s) => (
                <li key={s.id}>
                  <Link href="#services" className="hover:text-[#C9A227] transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinic Hours */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Timings
            </h4>
            <div className="space-y-2 text-xs text-zinc-400">
              {kurusDentalClinicConfig.hours.map((h, i) => (
                <div key={i}>
                  <p className="text-zinc-200 font-semibold">{h.days}</p>
                  <p className="text-zinc-400">{h.timing}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Demonstration Access */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Demo Access
            </h4>
            <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs space-y-2">
              <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Tester Portal</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-snug">
                Review live appointment requests submitted by the voice receptionist.
              </p>
              <Link
                href="/demo/notifications"
                className="inline-block mt-1 text-[11px] font-bold text-[#C9A227] hover:underline"
              >
                Open Notification Panel →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <p>© {new Date().getFullYear()} Kuru&apos;s Dental Clinic. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-zinc-400" />
            <span>AI Voice Receptionist Technology demonstrated by Tesseract</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
