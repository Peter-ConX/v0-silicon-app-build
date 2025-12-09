import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { userId } = await request.json()

    if (session.user.id === userId) {
      return NextResponse.json(
        { error: 'Cannot follow yourself' },
        { status: 400 }
      )
    }

    // Check if already following
    const existing = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: session.user.id,
          followingId: userId,
        },
      },
    })

    if (existing) {
      return NextResponse.json({ message: 'Already following' }, { status: 200 })
    }

    // Create follow relationship
    await prisma.follow.create({
      data: {
        followerId: session.user.id,
        followingId: userId,
      },
    })

    // Create notification
    await prisma.notification.create({
      data: {
        userId,
        type: 'follow',
        title: 'New Follower',
        message: `${session.user.name || 'Someone'} started following you`,
        link: `/profile/${session.user.id}`,
      },
    })

    return NextResponse.json({ message: 'Followed successfully' }, { status: 200 })
  } catch (error) {
    console.error('Follow error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
