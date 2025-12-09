import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user || user.followers < 600) {
      return NextResponse.json(
        { error: 'You need at least 600 followers to enable monetization' },
        { status: 403 }
      )
    }

    // Create or update creator profile
    const creatorProfile = await prisma.creatorProfile.upsert({
      where: { userId: session.user.id },
      create: {
        userId: session.user.id,
        verificationStatus: 'pending',
      },
      update: {
        verificationStatus: 'pending',
      },
    })

    return NextResponse.json({
      message: 'Monetization request submitted',
      creatorProfile,
    })
  } catch (error) {
    console.error('Error enabling monetization:', error)
    return NextResponse.json(
      { error: 'Failed to enable monetization' },
      { status: 500 }
    )
  }
}

