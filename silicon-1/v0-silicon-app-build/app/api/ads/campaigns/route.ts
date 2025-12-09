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

    const campaigns = await prisma.adCampaign.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ campaigns })
  } catch (error) {
    console.error('Error fetching campaigns:', error)
    return NextResponse.json(
      { error: 'Failed to fetch campaigns' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      title,
      description,
      adVideoUrl,
      thumbnailUrl,
      duration,
      budget,
      targetDemographics,
      targetInterests,
      targetCategories,
    } = body

    // Validate duration and budget
    if (duration !== 15 && duration !== 30) {
      return NextResponse.json(
        { error: 'Ad duration must be 15 or 30 seconds' },
        { status: 400 }
      )
    }

    if (duration === 15 && budget < 10) {
      return NextResponse.json(
        { error: 'Minimum payment for 15-second ad is $10' },
        { status: 400 }
      )
    }

    if (duration === 30 && budget < 20) {
      return NextResponse.json(
        { error: 'Minimum payment for 30-second ad is $20' },
        { status: 400 }
      )
    }

    // Create campaign
    const campaign = await prisma.adCampaign.create({
      data: {
        title,
        description,
        adVideoUrl,
        thumbnailUrl,
        duration,
        budget,
        targetDemographics: targetDemographics
          ? JSON.stringify(targetDemographics)
          : null,
        targetInterests: targetInterests ? JSON.stringify(targetInterests) : null,
        targetCategories: targetCategories ? JSON.stringify(targetCategories) : null,
        userId: session.user.id,
        status: 'pending',
        complianceStatus: 'pending',
      },
    })

    // In production, process payment and update status
    // For now, we'll leave it as pending

    return NextResponse.json(campaign, { status: 201 })
  } catch (error) {
    console.error('Error creating campaign:', error)
    return NextResponse.json(
      { error: 'Failed to create campaign' },
      { status: 500 }
    )
  }
}

