import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { MayaVoiceShell } from "@/components/voice/MayaVoiceShell";

const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const serifFont = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kuru's Dental Clinic — Advanced Multispeciality Dental & Implant Center | Woraiyur, Trichy",
  description: "Experience premium dental care at Kuru's Dental Clinic in Woraiyur, Tiruchirappalli. Precision dental implants, clear aligners, laser dentistry, and voice AI appointment desk.",
  icons: {
    icon: "/brand/kurus-dental-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sansFont.variable} ${serifFont.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FFFDF6] text-[#1E1E1E] selection:bg-[#C9A227]/20 selection:text-[#174414]">
        <MayaVoiceShell>{children}</MayaVoiceShell>
      </body>
    </html>
  );
}
