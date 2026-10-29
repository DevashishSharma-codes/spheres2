import type { Metadata } from "next";
import { Geist, Caveat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-cursive",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "21Spheres — Next-Gen Software Architecture & Product Studio",
  description: "21Spheres is a niche engineering studio architecting autonomous AI agents, high-frequency digital platforms, and resilient software infrastructure.",
  keywords: [
    "21Spheres",
    "Software Architecture",
    "Product Studio",
    "Autonomous AI Agents",
    "Next.js Engineering",
    "Digital Platforms",
    "InsurTech",
    "Fintech",
  ],
  openGraph: {
    title: "21Spheres — Next-Gen Software Architecture & Product Studio",
    description: "Niche engineering studio architecting autonomous AI agents and high-scale software platforms.",
    siteName: "21Spheres",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/logo-square.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${caveat.variable} scroll-smooth`}>
      <body className="min-h-screen bg-white text-[#2A2A2E] font-sans selection:bg-[#7057D9]/15 selection:text-[#7057D9] flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
