'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { CreateStickerRequest, CreateStickerResponse } from '@/types'

export default function CreateStickerPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<CreateStickerRequest>({
    name: '',
    prompt: '',
    description: '',
    price: 4.99,
    tags: '',
    materialType: 'vinyl',
    waterproof: true
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/create-sticker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data: CreateStickerResponse = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Failed to create sticker')
      }

      // Redirect to the new sticker page
      if (data.sticker) {
        router.push(`/products/${data.sticker.slug}`)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
            Create Your <span className="gradient-text">AI Sticker</span>
          </h1>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Use AI to generate your own unique sticker design. Describe what you want, and we'll create it for you!
          </p>
        </div>

        {/* Form */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-secondary-900 mb-2">
                Sticker Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., Cosmic Dragon"
              />
            </div>

            {/* AI Prompt */}
            <div>
              <label htmlFor="prompt" className="block text-sm font-medium text-secondary-900 mb-2">
                AI Image Prompt *
              </label>
              <textarea
                id="prompt"
                name="prompt"
                required
                value={formData.prompt}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., a cute dragon with sparkles, kawaii style, pastel colors, detailed illustration"
              />
              <p className="text-sm text-secondary-500 mt-1">
                Describe the image you want to generate. Be specific about style, colors, and details.
              </p>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-secondary-900 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="A magical dragon design perfect for fantasy lovers..."
              />
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-secondary-900 mb-2">
                Price (USD) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                required
                min="0"
                max="100"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-secondary-900 mb-2">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., dragon, fantasy, cute, kawaii"
              />
              <p className="text-sm text-secondary-500 mt-1">
                Comma-separated tags to help people find your sticker
              </p>
            </div>

            {/* Material Type */}
            <div>
              <label htmlFor="materialType" className="block text-sm font-medium text-secondary-900 mb-2">
                Material Type *
              </label>
              <select
                id="materialType"
                name="materialType"
                required
                value={formData.materialType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="vinyl">Vinyl</option>
                <option value="holographic">Holographic</option>
                <option value="paper">Paper</option>
                <option value="transparent">Transparent</option>
              </select>
            </div>

            {/* Waterproof */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="waterproof"
                name="waterproof"
                checked={formData.waterproof}
                onChange={handleChange}
                className="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="waterproof" className="ml-2 text-sm font-medium text-secondary-900">
                Waterproof
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Sticker...
                  </span>
                ) : (
                  'Create Sticker with AI'
                )}
              </button>
              
              <button
                type="button"
                onClick={() => router.push('/products')}
                className="btn-secondary"
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>

            {/* Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm">
                <strong>Note:</strong> AI image generation may take 10-30 seconds. Your sticker will be created and added to the store once the image is ready.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}