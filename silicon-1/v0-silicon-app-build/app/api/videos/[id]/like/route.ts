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
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const videoId = params.id
    const userId = session.user.id

    // Check if already liked
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_videoId: {
          userId,
          videoId,
        },
      },
    })

    if (existingLike) {
      // Unlike
      await prisma.$transaction([
        prisma.like.delete({
          where: { id: existingLike.id },
        }),
        prisma.video.update({
          where: { id: videoId },
          data: { likes: { decrement: 1 } },
        }),
      ])

      return NextResponse.json({ liked: false })
    } else {
      // Like
      await prisma.$transaction([
        prisma.like.create({
          data: {
            userId,
            videoId,
          },
        }),
        prisma.video.update({
          where: { id: videoId },
          data: { likes: { increment: 1 } },
        }),
      ])

      return NextResponse.json({ liked: true })
    }
  } catch (error) {
    console.error('Error toggling like:', error)
    return NextResponse.json(
      { error: 'Failed to toggle like' },
      { status: 500 }
    )
  }
}
