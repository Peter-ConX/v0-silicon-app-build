import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// This endpoint would be called when a video is played to get ads
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const videoId = searchParams.get('videoId')
    const shortId = searchParams.get('shortId')
    const storyId = searchParams.get('storyId')
    const adType = searchParams.get('type') || 'pre_roll' // pre_roll, mid_roll, post_roll

    if (!videoId && !shortId && !storyId) {
      return NextResponse.json({ error: 'Content ID required' }, { status: 400 })
    }

    // Get active ad campaigns that match targeting
    const activeCampaigns = await prisma.adCampaign.findMany({
      where: {
        status: 'active',
        complianceStatus: 'approved',
        budget: { gt: prisma.adCampaign.fields.spent },
      },
      take: 1, // Get one ad for now
      orderBy: { createdAt: 'desc' },
    })

    if (activeCampaigns.length === 0) {
      return NextResponse.json({ ads: [] })
    }

    const campaign = activeCampaigns[0]

    // Create ad placement
    const placement = await prisma.adPlacement.create({
      data: {
        adType,
        videoId: videoId || null,
        shortId: shortId || null,
        storyId: storyId || null,
        campaignId: campaign.id,
      },
    })

    // Update campaign impressions
    await prisma.adCampaign.update({
      where: { id: campaign.id },
      data: {
        impressions: { increment: 1 },
      },
    })

    return NextResponse.json({
      ads: [
        {
          id: placement.id,
          videoUrl: campaign.adVideoUrl,
          duration: campaign.duration,
          skippableAfter: 5, // Ads are skippable after 5 seconds
        },
      ],
    })
  } catch (error) {
    console.error('Error fetching ad placements:', error)
    return NextResponse.json(
      { error: 'Failed to fetch ads' },
      { status: 500 }
    )
  }
}

// Track ad interactions
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { placementId, action } = body // action: 'click', 'watch_complete', 'skip'

    const placement = await prisma.adPlacement.findUnique({
      where: { id: placementId },
      include: { campaign: true },
    })

    if (!placement) {
      return NextResponse.json({ error: 'Placement not found' }, { status: 404 })
    }

    if (action === 'click') {
      await prisma.adCampaign.update({
        where: { id: placement.campaignId },
        data: {
          clicks: { increment: 1 },
        },
      })
    } else if (action === 'watch_complete') {
      await prisma.adCampaign.update({
        where: { id: placement.campaignId },
        data: {
          watchThroughRate: {
            // Calculate new watch-through rate
            // This is simplified - in production, track individual ad views
          },
        },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking ad interaction:', error)
    return NextResponse.json(
      { error: 'Failed to track interaction' },
      { status: 500 }
    )
  }
}
