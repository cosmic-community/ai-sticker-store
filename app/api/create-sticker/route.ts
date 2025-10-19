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
    let imageResponse: AIImageResponse
    try {
      imageResponse = await cosmic.ai.generateImage({
        prompt: `${body.prompt}, sticker design, high quality, detailed illustration, white background, professional product photo`,
        folder: 'ai-generated-stickers',
        alt_text: `AI-generated sticker: ${body.name}`
      }) as AIImageResponse
    } catch (aiError) {
      console.error('AI image generation error:', aiError)
      return NextResponse.json(
        { 
          success: false, 
          error: aiError instanceof Error ? `AI generation failed: ${aiError.message}` : 'Failed to generate AI image. Please try again.' 
        },
        { status: 500 }
      )
    }

    if (!imageResponse?.media?.imgix_url) {
      console.error('Invalid AI response:', imageResponse)
      return NextResponse.json(
        { success: false, error: 'AI image generation returned invalid response' },
        { status: 500 }
      )
    }

    // Create sticker object in Cosmic
    let sticker
    try {
      sticker = await createSticker(
        body,
        imageResponse.media.url,
        imageResponse.media.imgix_url
      )
    } catch (createError) {
      console.error('Sticker creation error:', createError)
      return NextResponse.json(
        { 
          success: false, 
          error: createError instanceof Error ? `Failed to save sticker: ${createError.message}` : 'Failed to create sticker in database' 
        },
        { status: 500 }
      )
    }

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