import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateBio } from '@/lib/ai'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
    })

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    const bio = await generateBio(
      profile.skills || [],
      profile.techStack || [],
      profile.currentRole || undefined
    )

    // Update profile with AI-generated bio
    await prisma.profile.update({
      where: { userId: session.user.id },
      data: { bioAI: bio },
    })

    return NextResponse.json({ bio })
  } catch (error) {
    console.error('Generate bio error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
