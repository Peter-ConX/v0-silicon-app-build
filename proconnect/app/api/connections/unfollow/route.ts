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

    await prisma.follow.deleteMany({
      where: {
        followerId: session.user.id,
        followingId: userId,
      },
    })

    return NextResponse.json({ message: 'Unfollowed successfully' }, { status: 200 })
  } catch (error) {
    console.error('Unfollow error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

