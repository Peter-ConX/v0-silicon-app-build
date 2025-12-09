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

    const body = await request.json()
    const { userId: followingId } = body

    if (!followingId || followingId === session.user.id) {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400 }
      )
    }

    // Check if already following
    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: session.user.id,
          followingId,
        },
      },
    })

    if (existingFollow) {
      // Unfollow
      await prisma.$transaction([
        prisma.follow.delete({
          where: { id: existingFollow.id },
        }),
        prisma.user.update({
          where: { id: session.user.id },
          data: { following: { decrement: 1 } },
        }),
        prisma.user.update({
          where: { id: followingId },
          data: { followers: { decrement: 1 } },
        }),
      ])

      return NextResponse.json({ following: false })
    } else {
      // Follow
      await prisma.$transaction([
        prisma.follow.create({
          data: {
            followerId: session.user.id,
            followingId,
          },
        }),
        prisma.user.update({
          where: { id: session.user.id },
          data: { following: { increment: 1 } },
        }),
        prisma.user.update({
          where: { id: followingId },
          data: { followers: { increment: 1 } },
        }),
      ])

      return NextResponse.json({ following: true })
    }
  } catch (error) {
    console.error('Error toggling follow:', error)
    return NextResponse.json(
      { error: 'Failed to toggle follow' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    const type = searchParams.get('type') || 'followers' // followers or following

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const follows = await prisma.follow.findMany({
      where:
        type === 'followers'
          ? { followingId: userId }
          : { followerId: userId },
      include: {
        follower:
          type === 'followers'
            ? {
                select: {
                  id: true,
                  name: true,
                  username: true,
                  image: true,
                },
              }
            : undefined,
        following:
          type === 'following'
            ? {
                select: {
                  id: true,
                  name: true,
                  username: true,
                  image: true,
                },
              }
            : undefined,
      },
    })

    return NextResponse.json({ follows })
  } catch (error) {
    console.error('Error fetching follows:', error)
    return NextResponse.json(
      { error: 'Failed to fetch follows' },
      { status: 500 }
    )
  }
}

