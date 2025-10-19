import { NextRequest, NextResponse } from 'next/server'
import { cosmic, createSticker } from '@/lib/cosmic'
import type { CreateStickerRequest, CreateStickerResponse, AIImageResponse } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body: CreateStickerRequest = await request.json()
    console.log('📥 Received sticker creation request:', {
      name: body.name,
      prompt: body.prompt,
      price: body.price,
      materialType: body.materialType
    })
    
    // Validate required fields
    if (!body.name || !body.prompt || !body.description || !body.price) {
      console.error('❌ Validation failed: Missing required fields')
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate price
    if (body.price < 0 || body.price > 100) {
      console.error('❌ Validation failed: Invalid price:', body.price)
      return NextResponse.json(
        { success: false, error: 'Price must be between $0 and $100' },
        { status: 400 }
      )
    }

    // Generate AI image using Cosmic AI
    console.log('🎨 Starting AI image generation...')
    console.log('Prompt:', body.prompt)
    
    let imageResponse: AIImageResponse
    try {
      imageResponse = await cosmic.ai.generateImage({
        prompt: `${body.prompt}, sticker design, high quality, detailed illustration, white background, professional product photo`,
        folder: 'ai-generated-stickers',
        alt_text: `AI-generated sticker: ${body.name}`
      }) as AIImageResponse
      
      console.log('✅ AI image generated successfully')
      console.log('Image response:', {
        mediaId: imageResponse.media?.id,
        mediaName: imageResponse.media?.name,
        originalName: imageResponse.media?.original_name,
        url: imageResponse.media?.url,
        imgixUrl: imageResponse.media?.imgix_url,
        revisedPrompt: imageResponse.revised_prompt
      })
    } catch (aiError) {
      console.error('❌ AI image generation error:', aiError)
      console.error('Error details:', {
        name: aiError instanceof Error ? aiError.name : 'Unknown',
        message: aiError instanceof Error ? aiError.message : String(aiError),
        stack: aiError instanceof Error ? aiError.stack : undefined
      })
      return NextResponse.json(
        { 
          success: false, 
          error: aiError instanceof Error ? `AI generation failed: ${aiError.message}` : 'Failed to generate AI image. Please try again.' 
        },
        { status: 500 }
      )
    }

    if (!imageResponse?.media?.imgix_url) {
      console.error('❌ Invalid AI response: Missing imgix_url')
      console.error('Response structure:', JSON.stringify(imageResponse, null, 2))
      return NextResponse.json(
        { success: false, error: 'AI image generation returned invalid response' },
        { status: 500 }
      )
    }

    // Extract just the filename from the media object
    const imageFileName = imageResponse.media.name
    console.log('📦 Using image filename:', imageFileName)

    // Create sticker object in Cosmic
    console.log('💾 Creating sticker in Cosmic...')
    let sticker
    try {
      sticker = await createSticker(
        body,
        imageFileName,
        imageResponse.media.imgix_url
      )
      
      console.log('✅ Sticker created successfully')
      console.log('Sticker details:', {
        id: sticker.id,
        slug: sticker.slug,
        title: sticker.title
      })
    } catch (createError) {
      console.error('❌ Sticker creation error:', createError)
      console.error('Error details:', {
        name: createError instanceof Error ? createError.name : 'Unknown',
        message: createError instanceof Error ? createError.message : String(createError),
        stack: createError instanceof Error ? createError.stack : undefined
      })
      console.error('Data being sent:', {
        requestData: body,
        imageFileName,
        imgixUrl: imageResponse.media.imgix_url
      })
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

    console.log('🎉 Sticker creation complete!')
    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error('❌ Unexpected error creating sticker:', error)
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    })
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create sticker' 
      },
      { status: 500 }
    )
  }
}