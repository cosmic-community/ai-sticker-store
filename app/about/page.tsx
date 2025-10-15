import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - AI Sticker Store',
  description: 'Learn about AI Sticker Store and our mission to bring unique, AI-generated sticker designs to creative people everywhere.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
            About <span className="gradient-text">AI Sticker Store</span>
          </h1>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Bringing unique, AI-generated sticker designs to creative people everywhere
          </p>
        </div>

        {/* Our Story */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">📖</span>
              <h2 className="text-3xl font-bold text-secondary-900">Our Story</h2>
            </div>
            <div className="prose prose-lg max-w-none text-secondary-700 space-y-4">
              <p>
                AI Sticker Store was born from a simple idea: what if we could combine the endless creativity 
                of artificial intelligence with the timeless appeal of stickers? In a world where personalization 
                matters more than ever, we wanted to create something truly unique.
              </p>
              <p>
                Using cutting-edge AI technology, we generate one-of-a-kind sticker designs that you won't find 
                anywhere else. Each design is carefully crafted through AI algorithms trained on countless artistic 
                styles, ensuring every sticker is both beautiful and distinctive.
              </p>
              <p>
                Whether you're decorating your laptop, water bottle, notebook, or any other surface, our stickers 
                help you express your personality in ways that mass-produced designs simply can't match.
              </p>
            </div>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              What Makes Us <span className="gradient-text">Different</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🎨</span>
                <div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">AI-Generated Designs</h3>
                  <p className="text-secondary-700">
                    Every sticker is created using advanced AI algorithms, resulting in unique designs 
                    that blend artistic creativity with technological innovation.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <span className="text-3xl">💎</span>
                <div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">Premium Quality</h3>
                  <p className="text-secondary-700">
                    We use high-quality vinyl materials with weather-resistant properties, ensuring your 
                    stickers look great and last long.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🌈</span>
                <div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">Endless Variety</h3>
                  <p className="text-secondary-700">
                    From cute animals to space themes, tech designs to abstract art - our collections 
                    offer something for every style and interest.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <span className="text-3xl">⚡</span>
                <div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">Fast & Reliable</h3>
                  <p className="text-secondary-700">
                    Quick processing and shipping means you'll be personalizing your favorite items 
                    in no time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="mb-16">
          <div className="bg-hero-gradient rounded-2xl p-8 md:p-12 text-white text-center">
            <span className="text-5xl mb-4 block">🚀</span>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              To empower creative expression through innovative, AI-generated designs that help people 
              personalize their world. We believe everyone deserves access to unique, high-quality art 
              that reflects their individual style.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              Ready to Explore Our Designs?
            </h2>
            <p className="text-secondary-600 mb-6">
              Browse our complete collection of AI-generated stickers and find the perfect designs 
              to express your unique style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/products" 
                className="btn-primary inline-block"
              >
                Shop All Products
              </a>
              <a 
                href="/collections" 
                className="bg-secondary-100 text-secondary-900 px-8 py-3 rounded-lg font-semibold hover:bg-secondary-200 transition-colors duration-200 inline-block"
              >
                Browse Collections
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}