import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    const videoId = params.id
    const body = await request.json()
    const { watchTime, completed } = body

    // Update video views (no auth required)
    await prisma.video.update({
      where: { id: videoId },
      data: {
        views: { increment: 1 },
        watchTime: { increment: watchTime || 0 },
      },
    })

    // Save watch history if authenticated
    if (session?.user?.id) {
      const existingHistory = await prisma.watchHistory.findUnique({
        where: {
          userId_videoId: {
            userId: session.user.id,
            videoId,
          },
        },
      })

      if (existingHistory) {
        await prisma.watchHistory.update({
          where: { id: existingHistory.id },
          data: {
            watchTime: watchTime || 0,
            completed: completed || false,
          },
        })
      } else {
        await prisma.watchHistory.create({
          data: {
            userId: session.user.id,
            videoId,
            watchTime: watchTime || 0,
            completed: completed || false,
          },
        })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error recording watch:', error)
    return NextResponse.json(
      { error: 'Failed to record watch' },
      { status: 500 }
    )
  }
}
