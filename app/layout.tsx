import React from "react"
import Script from "next/script";
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { GOATCOUNTER_ENDPOINT } from "@/content/analytics";
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'Norwegian Singles - Hardloop Trainingsmethode',
    template: '%s | Norwegian Singles',
  },
  description: 'Leer de Norwegian Singles trainingsmethode en bereken je persoonlijke tempo\'s. Effectieve intervaltraining voor hardlopers van elk niveau.',
  keywords: ['hardlopen', 'norwegian singles', 'intervaltraining', 'tempo calculator', 'duurloop', 'trainingsschema'],
  generator: 'v0.app',
  icons: {
    icon: {
      url: '/icon.svg',
      type: 'image/svg+xml',
    },
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Norwegian Singles - Hardloop Trainingsmethode',
    description: 'Leer de Norwegian Singles trainingsmethode en bereken je persoonlijke tempo\'s.',
    type: 'website',
    locale: 'nl_NL',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1f1f1f' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nl">
      <body className="font-sans antialiased">
        <Script
          async
          data-goatcounter={GOATCOUNTER_ENDPOINT}
          src="https://gc.zgo.at/count.js"
        />
        <Navbar />
        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
