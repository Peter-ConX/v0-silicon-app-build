import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { extractKeywords } from '@/lib/utils'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')

    if (!query) {
      return NextResponse.json({ error: 'Query required' }, { status: 400 })
    }

    const session = await getServerSession(authOptions)
    const userId = session?.user?.id

    // Save search query if user is authenticated
    if (userId) {
      const keywords = extractKeywords(query)
      await prisma.searchQuery.create({
        data: {
          userId,
          query,
          keywords: JSON.stringify(keywords),
        },
      })
    }

    // Search videos
    const videos = await prisma.video.findMany({
      where: {
        isPublic: true,
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
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
      orderBy: [
        { views: 'desc' },
        { createdAt: 'desc' },
      ],
      take: 20,
    })

    return NextResponse.json({ videos, query })
  } catch (error) {
    console.error('Error searching:', error)
    return NextResponse.json(
      { error: 'Failed to search' },
      { status: 500 }
    )
  }
}
