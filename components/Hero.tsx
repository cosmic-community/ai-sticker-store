import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          {/* Hero Content */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance">
            Unique AI-Generated{' '}
            <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              Stickers
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto text-balance">
            Discover amazing sticker designs created by artificial intelligence. 
            Perfect for laptops, water bottles, notebooks, and more!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/products" 
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg"
            >
              Shop All Stickers
            </Link>
            <Link 
              href="/collections" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-200"
            >
              Browse Collections
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">AI-Generated Designs</h3>
              <p className="text-blue-100">Unique artwork created by advanced AI technology</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌊</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Waterproof Quality</h3>
              <p className="text-blue-100">Durable materials that withstand daily use</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Multiple Sizes</h3>
              <p className="text-blue-100">Choose from small, medium, or large options</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black opacity-10 pointer-events-none"></div>
    </section>
  )
}