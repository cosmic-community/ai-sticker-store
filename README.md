# AI Sticker Store

![App Preview](https://imgix.cosmicjs.com/d34387b0-a988-11f0-8dcc-651091f6a7c0-photo-1518791841217-8f162f1e1131-1760506556477.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive e-commerce web application showcasing AI-generated stickers with complete product catalog, collections browsing, and customer reviews. Built with Next.js 15 and powered by Cosmic CMS.

## Features

- 🎨 **Product Showcase**: Beautiful display of AI-generated stickers with high-quality images
- 📦 **Collection Browsing**: Organized collections (Cute Animals, Space & Astronomy, Tech & Gaming)
- ⭐ **Customer Reviews**: Authentic reviews with ratings, photos, and verified purchase indicators
- 📱 **Responsive Design**: Mobile-first design that works on all devices
- 🔍 **Search & Filtering**: Find products by collections, tags, and material types
- 💰 **Dynamic Pricing**: Multiple size options with corresponding prices
- 🌊 **Modern UI**: Clean design with gradients and smooth animations
- 🚀 **Performance Optimized**: Built with Next.js 15 App Router and optimized images

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=68ef31deb3841ba59d149326&clone_repository=68ef343cb3841ba59d149352)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Design a content model for an AI generated sticker e-commerce store with products, collections, and customer reviews"

### Code Generation Prompt

> "Based on the content model I created for "Design a content model for an AI generated sticker e-commerce store with products, collections, and customer reviews", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom theme
- **CMS**: Cosmic CMS
- **Language**: TypeScript
- **Font**: Inter
- **Package Manager**: Bun
- **Deployment**: Vercel/Netlify ready

## Getting Started

### Prerequisites

- Node.js 18+
- Bun (recommended) or npm
- A Cosmic bucket with the sticker e-commerce content model

### Installation

1. Clone this repository
2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching Products with Collections
```typescript
const products = await cosmic.objects
  .find({ type: 'stickers' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Getting Product Reviews
```typescript
const reviews = await cosmic.objects
  .find({ 
    type: 'reviews',
    'metadata.product_reviewed': productId 
  })
  .depth(1)
```

## Cosmic CMS Integration

This application uses three main object types:

- **Stickers**: Product catalog with images, pricing, and specifications
- **Collections**: Grouped products (Cute Animals, Space & Astronomy, Tech & Gaming)
- **Reviews**: Customer feedback with ratings, photos, and verified purchases

All content is dynamically loaded from Cosmic CMS using the SDK with depth queries to include connected objects like product reviews and collection associations.

## Deployment Options

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Netlify
1. Connect your GitHub repository to Netlify
2. Add environment variables in Netlify dashboard
3. Set build command: `bun run build`
4. Set publish directory: `.next`

Make sure to configure your environment variables (`COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`) in your deployment platform.
<!-- README_END -->