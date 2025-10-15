import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'AI Sticker Store - Unique AI-Generated Stickers',
  description: 'Discover amazing AI-generated stickers for laptops, water bottles, and more. Browse our collections of cute animals, space themes, and tech designs.',
  keywords: 'AI stickers, vinyl stickers, holographic stickers, cute animals, space stickers, gaming stickers',
  authors: [{ name: 'AI Sticker Store' }],
  creator: 'AI Sticker Store',
  publisher: 'AI Sticker Store',
  openGraph: {
    title: 'AI Sticker Store - Unique AI-Generated Stickers',
    description: 'Discover amazing AI-generated stickers for laptops, water bottles, and more.',
    url: 'https://ai-sticker-store.vercel.app',
    siteName: 'AI Sticker Store',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Sticker Store - Unique AI-Generated Stickers',
    description: 'Discover amazing AI-generated stickers for laptops, water bottles, and more.',
    creator: '@aistickers',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Access environment variable on server side
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        {/* Pass bucket slug as prop to client component */}
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}