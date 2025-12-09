import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createZeetSchema = z.object({
  content: z.string().min(1).max(5000),
  imageUrl: z.string().url().optional(),
  videoUrl: z.string().url().optional(),
  codeBlock: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

export async function GET() {
  try {
    const zeets = await prisma.zeet.findMany({
      include: {
        author: {
          include: {
            profile: true,
          },
        },
        likes: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        _count: {
          select: {
            replies: true,
            likes: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
    })

    return NextResponse.json(zeets)
  } catch (error) {
    console.error('Get zeets error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const data = createZeetSchema.parse(body)

    // Extract hashtags from content
    const hashtags = data.content.match(/#\w+/g)?.map(tag => tag.slice(1)) || []
    const allTags = [...hashtags, ...(data.tags || [])]

    const zeet = await prisma.zeet.create({
      data: {
        authorId: session.user.id,
        content: data.content,
        imageUrl: data.imageUrl,
        videoUrl: data.videoUrl,
        codeBlock: data.codeBlock,
        tags: allTags,
      },
      include: {
        author: {
          include: {
            profile: true,
          },
        },
        _count: {
          select: {
            replies: true,
            likes: true,
          },
        },
      },
    })

    return NextResponse.json(zeet, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Create zeet error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
