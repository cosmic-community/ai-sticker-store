'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold gradient-text">
            🎨 AI Sticker Store
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-secondary-700 hover:text-primary-600 transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-secondary-700 hover:text-primary-600 transition-colors">
              All Stickers
            </Link>
            <Link href="/collections" className="text-secondary-700 hover:text-primary-600 transition-colors">
              Collections
            </Link>
            <Link href="/reviews" className="text-secondary-700 hover:text-primary-600 transition-colors">
              Reviews
            </Link>
            <Link href="/about" className="text-secondary-700 hover:text-primary-600 transition-colors">
              About
            </Link>
            <Link href="/create" className="btn-primary">
              Create Sticker
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-secondary-700 hover:text-primary-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link 
              href="/" 
              className="block text-secondary-700 hover:text-primary-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className="block text-secondary-700 hover:text-primary-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              All Stickers
            </Link>
            <Link 
              href="/collections" 
              className="block text-secondary-700 hover:text-primary-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Collections
            </Link>
            <Link 
              href="/reviews" 
              className="block text-secondary-700 hover:text-primary-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Reviews
            </Link>
            <Link 
              href="/about" 
              className="block text-secondary-700 hover:text-primary-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/create" 
              className="block btn-primary text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Create Sticker
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}