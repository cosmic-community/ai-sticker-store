import { NextRequest, NextResponse } from 'next/server'
import { cosmic, createSticker } from '@/lib/cosmic'
import type { CreateStickerRequest, CreateStickerResponse, AIImageResponse } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body: CreateStickerRequest = await request.json()
    
    // Validate required fields
    if (!body.name || !body.prompt || !body.description || !body.price) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate price
    if (body.price < 0 || body.price > 100) {
      return NextResponse.json(
        { success: false, error: 'Price must be between $0 and $100' },
        { status: 400 }
      )
    }

    // Generate AI image using Cosmic AI
    const imageResponse = await cosmic.ai.generateImage({
      prompt: `${body.prompt}, sticker design, high quality, detailed illustration, white background, professional product photo`,
      folder: 'ai-generated-stickers',
      alt_text: `AI-generated sticker: ${body.name}`
    }) as AIImageResponse

    if (!imageResponse.media || !imageResponse.media.imgix_url) {
      return NextResponse.json(
        { success: false, error: 'Failed to generate image' },
        { status: 500 }
      )
    }

    // Create sticker object in Cosmic
    const sticker = await createSticker(
      body,
      imageResponse.media.url,
      imageResponse.media.imgix_url
    )

    const response: CreateStickerResponse = {
      success: true,
      sticker
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error('Error creating sticker:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create sticker' 
      },
      { status: 500 }
    )
  }
}