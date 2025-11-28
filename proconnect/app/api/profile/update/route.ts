import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const updateProfileSchema = z.object({
  bio: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  company: z.string().optional(),
  currentRole: z.string().optional(),
  goals: z.string().optional(),
  skills: z.array(z.string()).optional(),
  techStack: z.array(z.string()).optional(),
  interests: z.array(z.string()).optional(),
  github: z.string().url().optional().or(z.literal('')),
  twitter: z.string().url().optional().or(z.literal('')),
  linkedin: z.string().url().optional().or(z.literal('')),
  image: z.string().optional(), // Base64 image string
})

export async function PUT(request: Request) {
  return handleUpdate(request)
}

export async function POST(request: Request) {
  return handleUpdate(request)
}

async function handleUpdate(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const data = updateProfileSchema.parse(body)

    // Handle image update separately (update User model)
    if (data.image) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { image: data.image },
      })
    }

    // Clean up empty strings and remove image from profile data
    const { image, ...profileData } = data
    const cleanedData = Object.fromEntries(
      Object.entries(profileData).filter(([_, v]) => v !== '')
    )

    const profile = await prisma.profile.update({
      where: { userId: session.user.id },
      data: cleanedData,
    })

    return NextResponse.json(profile)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Update profile error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

