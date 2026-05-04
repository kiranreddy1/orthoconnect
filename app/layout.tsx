import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://orthoconnect.care'),
  title: {
    default: 'OrthoConnect — Your pain has a pattern',
    template: '%s · OrthoConnect',
  },
  description:
    'A free, structured awareness tool for athletes — built by an aspiring orthopedic surgeon. OrthoConnect helps athletes recognize pain patterns earlier and have better-informed conversations with healthcare providers.',
  applicationName: 'OrthoConnect',
  authors: [{ name: 'Aarush Nibbaragandla' }],
  creator: 'Aarush Nibbaragandla',
  keywords: [
    'sports medicine',
    'youth athletes',
    'pain assessment',
    'injury prevention',
    'orthopedic',
    'pain literacy',
  ],
  openGraph: {
    title: 'OrthoConnect — Your pain has a pattern',
    description:
      'A free, structured awareness tool for athletes — built by an aspiring orthopedic surgeon.',
    url: 'https://orthoconnect.care',
    siteName: 'OrthoConnect',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#fbf7f2',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
