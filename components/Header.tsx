'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b border-secondary-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-xl font-bold gradient-text"
          >
            <span className="text-2xl">🏷️</span>
            <span>AI Sticker Store</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/products" 
              className="text-secondary-700 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              Products
            </Link>
            <Link 
              href="/collections" 
              className="text-secondary-700 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              Collections
            </Link>
              <Link 
                href="/reviews" 
                className="text-secondary-700 hover:text-primary-600 font-medium transition-colors duration-200"
              >
                Reviews
              </Link>
              <Link 
                href="/about" 
                className="text-secondary-700 hover:text-primary-600 font-medium transition-colors duration-200"
              >
                About
              </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center px-2 py-1 text-secondary-500 hover:text-secondary-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-secondary-100 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/products" 
                className="text-secondary-700 hover:text-primary-600 font-medium transition-colors duration-200 px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                href="/collections" 
                className="text-secondary-700 hover:text-primary-600 font-medium transition-colors duration-200 px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Collections
              </Link>
              <Link 
                href="/reviews" 
                className="text-secondary-700 hover:text-primary-600 font-medium transition-colors duration-200 px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Reviews
              </Link>
              <Link 
                href="/about" 
                className="text-secondary-700 hover:text-primary-600 font-medium transition-colors duration-200 px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}