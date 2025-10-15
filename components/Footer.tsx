import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary-900 text-secondary-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-xl font-bold text-white mb-4"
            >
              <span className="text-2xl">🏷️</span>
              <span>AI Sticker Store</span>
            </Link>
            <p className="text-secondary-400 max-w-md mb-6">
              Discover unique AI-generated stickers for all your personalization needs. 
              Quality designs that stand out and stick around.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.cosmicjs.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-secondary-400 hover:text-white transition-colors duration-200"
              >
                <span className="sr-only">Built with Cosmic</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm0 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/products" 
                  className="text-secondary-400 hover:text-white transition-colors duration-200"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link 
                  href="/collections" 
                  className="text-secondary-400 hover:text-white transition-colors duration-200"
                >
                  Collections
                </Link>
              </li>
                <li>
                  <Link 
                    href="/reviews" 
                    className="text-secondary-400 hover:text-white transition-colors duration-200"
                  >
                    Customer Reviews
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/about" 
                    className="text-secondary-400 hover:text-white transition-colors duration-200"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

          {/* Collections */}
          <div>
            <h3 className="text-white font-semibold mb-4">Collections</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/collections/cute-animals" 
                  className="text-secondary-400 hover:text-white transition-colors duration-200"
                >
                  Cute Animals
                </Link>
              </li>
              <li>
                <Link 
                  href="/collections/space-astronomy" 
                  className="text-secondary-400 hover:text-white transition-colors duration-200"
                >
                  Space & Astronomy
                </Link>
              </li>
              <li>
                <Link 
                  href="/collections/tech-gaming" 
                  className="text-secondary-400 hover:text-white transition-colors duration-200"
                >
                  Tech & Gaming
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-secondary-400 text-sm">
            © {currentYear} AI Sticker Store. All rights reserved.
          </p>
          <p className="text-secondary-400 text-sm mt-4 md:mt-0">
            Powered by{' '}
            <a 
              href="https://www.cosmicjs.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 transition-colors duration-200"
            >
              Cosmic CMS
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}