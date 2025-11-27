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
})

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const data = updateProfileSchema.parse(body)

    // Clean up empty strings
    const cleanedData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== '')
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

