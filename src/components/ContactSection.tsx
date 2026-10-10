'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Phone, Clock, MessageCircle, Navigation, ExternalLink } from 'lucide-react';
import { kurusDentalClinicConfig } from '@/config/clinics/kurus-dental';

export function ContactSection() {
  // Google Maps embed URL for Kuru's Dental Clinic, Woraiyur, Tiruchirappalli
  const mapEmbedUrl =
    'https://maps.google.com/maps?q=21+Walaja+Rd,+Woraiyur,+Tiruchirappalli,+Tamil+Nadu+620003&t=&z=16&ie=UTF8&iwloc=&output=embed';

  return (
    <section id="contact" className="py-24 bg-white border-t border-[#C9A227]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Left Column: Clinic Contact Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span className="text-xs font-bold tracking-wider uppercase text-[#174414]">
                  Clinic Location &amp; Hours
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1E1E] leading-tight mb-4">
                Visit Us in <span className="gold-gradient-text">Woraiyur, Trichy</span>
              </h2>

              <p className="text-sm sm:text-base text-zinc-600 mb-8 leading-relaxed">
                Located centrally near Nachiar Kovil on Walaja Road. Ample parking and ground-floor accessibility for all patients.
              </p>

              {/* Info Cards */}
              <div className="space-y-4">
                {/* Address Card */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FFFDF6] border border-[#C9A227]/25 shadow-xs">
                  <div className="p-3 rounded-xl bg-amber-50 text-[#A77912] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1E1E1E]">Clinic Address</h4>
                    <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                      {kurusDentalClinicConfig.contact.address}, {kurusDentalClinicConfig.contact.city}, {kurusDentalClinicConfig.contact.state} - {kurusDentalClinicConfig.contact.pincode}
                    </p>
                    <a
                      href={kurusDentalClinicConfig.contact.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-[#2F6B1F] hover:text-[#174414] hover:underline"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Get Directions on Google Maps</span>
                    </a>
                  </div>
                </div>

                {/* Working Hours Card */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FFFDF6] border border-[#C9A227]/25 shadow-xs">
                  <div className="p-3 rounded-xl bg-emerald-50 text-[#2F6B1F] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="w-full">
                    <h4 className="text-sm font-bold text-[#1E1E1E] mb-1">Consultation Hours</h4>
                    {kurusDentalClinicConfig.hours.map((h, i) => (
                      <div key={i} className="flex items-center justify-between text-xs py-0.5">
                        <span className="text-zinc-700 font-medium">{h.days}:</span>
                        <span className="text-zinc-900 font-semibold">{h.timing}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Contact Card */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FFFDF6] border border-[#C9A227]/25 shadow-xs">
                  <div className="p-3 rounded-xl bg-amber-50 text-[#A77912] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1E1E1E]">Reception Desk</h4>
                    <p className="text-xs text-zinc-600 mt-1">
                      Direct Line: <a href={`tel:${kurusDentalClinicConfig.contact.phone}`} className="font-semibold text-zinc-900 hover:text-[#2F6B1F]">{kurusDentalClinicConfig.contact.displayPhone}</a>
                    </p>
                    <div className="mt-3 flex items-center gap-2.5">
                      <a
                        href={`tel:${kurusDentalClinicConfig.contact.phone}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-zinc-200 text-zinc-800 text-xs font-semibold hover:border-[#C9A227] hover:text-[#A77912] transition-colors shadow-xs"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#2F6B1F]" />
                        <span>Call Reception</span>
                      </a>
                      <a
                        href={`https://wa.me/${kurusDentalClinicConfig.contact.whatsappPhone.replace('+', '')}?text=Hello%20Kuru's%20Dental%20Clinic,%20I%20would%20like%20to%20inquire%20about%20an%20appointment`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-semibold hover:bg-emerald-200 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps Location Embed */}
          <div className="lg:col-span-7 flex flex-col">
            <div 
              className="relative w-full h-[450px] sm:h-[520px] lg:h-full min-h-[450px] rounded-3xl overflow-hidden border border-[#C9A227]/30 shadow-2xl bg-zinc-100"
              style={{ position: 'relative' }}
            >
              {/* Google Map iframe */}
              <iframe
                title="Kuru's Dental Clinic Location Map"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[0.15] contrast-[1.05]"
              />

              {/* Floating Top Card: Clinic Map Pin Overlay */}
              <div className="absolute top-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-[#FFFDF6]/95 backdrop-blur-md p-4 rounded-2xl border border-[#C9A227]/30 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white p-1 border border-[#C9A227]/30 shadow-xs flex items-center justify-center shrink-0">
                    <Image
                      src={kurusDentalClinicConfig.brand.logoUrl}
                      alt={kurusDentalClinicConfig.name}
                      width={28}
                      height={28}
                      className="object-contain"
                      style={{ width: 'auto', height: 'auto' }}
                    />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#1E1E1E] leading-tight">
                      KURU&apos;S DENTAL CLINIC
                    </h5>
                    <p className="text-[10px] text-[#2F6B1F] font-semibold mt-0.5">
                      21, Walaja Rd, Woraiyur, Trichy
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-zinc-200/80 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Open Today: 9:30 AM
                  </span>
                  <a
                    href={kurusDentalClinicConfig.contact.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#A77912] hover:text-[#C9A227] hover:underline"
                  >
                    <span>View Map</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Floating Bottom Navigation Bar */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 bg-white/95 backdrop-blur-md rounded-2xl border border-zinc-200/80 shadow-lg">
                <div className="flex items-center gap-2 text-xs text-zinc-700 font-medium">
                  <MapPin className="w-4 h-4 text-[#C9A227]" />
                  <span className="hidden sm:inline">Landmark:</span>
                  <span className="font-semibold text-zinc-900">Near Nachiar Kovil, Woraiyur</span>
                </div>

                <a
                  href={kurusDentalClinicConfig.contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#174414] to-[#2F6B1F] text-white text-xs font-semibold shadow-xs hover:shadow-md hover:scale-105 active:scale-95 transition-all"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span>Navigate Here</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
