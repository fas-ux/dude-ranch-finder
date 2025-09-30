import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://duderanchretreats.com'),
  title: {
    default: 'Dude Ranch Retreats | Discover America\'s Best Western Ranch Vacations',
    template: '%s | Dude Ranch Retreats'
  },
  description: 'Find your perfect dude ranch vacation with authentic Western experiences, horseback riding, and family adventures at America\'s premier ranches.',
  keywords: ['dude ranch', 'western vacation', 'horseback riding', 'family ranch', 'ranch vacation', 'western adventure'],
  authors: [{ name: 'Dude Ranch Retreats' }],
  creator: 'Dude Ranch Retreats',
  publisher: 'Dude Ranch Retreats',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://duderanchretreats.com',
    siteName: 'Dude Ranch Retreats',
    title: 'Dude Ranch Retreats | Discover America\'s Best Western Ranch Vacations',
    description: 'Find your perfect dude ranch vacation with authentic Western experiences, horseback riding, and family adventures.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dude Ranch Retreats - Western Adventures',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dude Ranch Retreats | Discover America\'s Best Western Ranch Vacations',
    description: 'Find your perfect dude ranch vacation with authentic Western experiences, horseback riding, and family adventures.',
    images: ['/images/og-image.jpg'],
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
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}