import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const [shorts, total] = await Promise.all([
      prisma.short.findMany({
        where: { isPublic: true },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              username: true,
              image: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.short.count({ where: { isPublic: true } }),
    ])

    return NextResponse.json({
      shorts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching shorts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch shorts' },
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
    const { title, description, videoUrl, thumbnailUrl, duration, category, tags } = body

    if (!title || !videoUrl) {
      return NextResponse.json(
        { error: 'Title and video URL are required' },
        { status: 400 }
      )
    }

    if (duration && duration > 60) {
      return NextResponse.json(
        { error: 'Shorts must be 60 seconds or less' },
        { status: 400 }
      )
    }

    const short = await prisma.short.create({
      data: {
        title,
        description,
        videoUrl,
        thumbnailUrl,
        duration: duration || 0,
        category,
        tags: tags ? JSON.stringify(tags) : null,
        userId: session.user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
      },
    })

    return NextResponse.json(short, { status: 201 })
  } catch (error) {
    console.error('Error creating short:', error)
    return NextResponse.json(
      { error: 'Failed to create short' },
      { status: 500 }
    )
  }
}

