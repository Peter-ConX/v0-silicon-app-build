import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('video') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Check file size (max 500MB for videos)
    const maxSize = 500 * 1024 * 1024 // 500MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds 500MB limit' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Cloudinary
    const result = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'video',
          folder: 'silicon-videos',
          public_id: `${session.user.id}-${Date.now()}`,
          eager: [
            // Generate thumbnail
            { width: 1280, height: 720, crop: 'limit', format: 'jpg' },
          ],
          eager_async: false,
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error)
            reject(error)
          } else {
            resolve(result)
          }
        }
      )

      uploadStream.end(buffer)
    })

    // Extract video URL and thumbnail
    const videoUrl = result.secure_url
    const thumbnailUrl = result.eager?.[0]?.secure_url || result.thumbnail_url
    const duration = result.duration || 0

    return NextResponse.json({
      videoUrl,
      thumbnailUrl,
      duration: Math.round(duration),
      publicId: result.public_id,
    })
  } catch (error: any) {
    console.error('Upload error:', error)
    
    // Provide helpful error messages
    if (error.message?.includes('Invalid API Key')) {
      return NextResponse.json(
        { error: 'Cloudinary not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your .env file' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: error.message || 'Failed to upload video' },
      { status: 500 }
    )
  }
}
