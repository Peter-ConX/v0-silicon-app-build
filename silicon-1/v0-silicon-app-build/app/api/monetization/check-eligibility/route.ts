import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        creatorProfile: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const isEligible = user.followers >= 600
    const isMonetized = user.creatorProfile?.isMonetized || false
    const isVerified = user.creatorProfile?.isVerified || false

    return NextResponse.json({
      eligible: isEligible,
      monetized: isMonetized,
      verified: isVerified,
      followers: user.followers,
      requiredFollowers: 600,
      creatorProfile: user.creatorProfile,
    })
  } catch (error) {
    console.error('Error checking monetization eligibility:', error)
    return NextResponse.json(
      { error: 'Failed to check eligibility' },
      { status: 500 }
    )
  }
}

