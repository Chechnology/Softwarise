import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { GeistSans } from "geist/font/sans"
import './globals.css';
import { Providers } from './providers';
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});


const geistSans = GeistSans;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://softwarise.io'),
  title: {
    default: 'Softwarise — Where Software Becomes Opportunity',
    template: '%s | Softwarise',
  },
  description:
    'The premier software economy platform. Buy software, sell software, raise capital, build technology, and monetize digital assets. Africa\'s leading marketplace for software businesses.',
  keywords: [
    'software marketplace',
    'buy software business',
    'sell SaaS',
    'software investment',
    'startup funding Africa',
    'software development marketplace',
    'digital asset acquisition',
    'software monetization',
  ],
  authors: [{ name: 'Softwarise', url: 'https://softwarise.io' }],
  creator: 'Softwarise',
  publisher: 'Softwarise',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://softwarise.io',
    siteName: 'Softwarise',
    title: 'Softwarise — Where Software Becomes Opportunity',
    description:
      'Buy, sell, fund, build, and monetize software. The premier software economy platform.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Softwarise — Software Economy Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Softwarise — Where Software Becomes Opportunity',
    description: 'The premier software economy platform. Buy, sell, fund, build, and monetize software.',
    images: ['/og-image.jpg'],
    creator: '@softwarise',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#0B0B0D',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${geistSans.variable}`}>
      <body className="bg-[#0B0B0D] text-white antialiased">
        <Providers>
          {children}
          <Toaster
            theme="dark"
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#111214',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#FFFFFF',
                borderRadius: '10px',
              },
              classNames: {
                success: 'border-l-4 border-l-emerald-500',
                error: 'border-l-4 border-l-red-500',
                warning: 'border-l-4 border-l-yellow-500',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
