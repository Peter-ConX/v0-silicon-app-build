import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { extractKeywords } from '@/lib/utils'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id

    // If no user, return trending videos
    if (!userId) {
      const trendingVideos = await prisma.video.findMany({
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
        orderBy: { views: 'desc' },
        take: 10,
      })

      return NextResponse.json({ recommendations: trendingVideos })
    }

    // Get user's search queries and watch history
    const [searchQueries, watchHistory] = await Promise.all([
      prisma.searchQuery.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 20,
      }),
      prisma.watchHistory.findMany({
        where: { userId },
        include: {
          video: {
            include: {
              user: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: 50,
      }),
    ])

    // Extract keywords from search queries
    const allKeywords = new Set<string>()
    searchQueries.forEach(query => {
      const keywords = query.keywords
        ? JSON.parse(query.keywords)
        : extractKeywords(query.query)
      keywords.forEach((kw: string) => allKeywords.add(kw))
    })

    // Get categories from watched videos
    const watchedCategories = new Set<string>()
    watchHistory.forEach(history => {
      if (history.video?.category) {
        watchedCategories.add(history.video.category)
      }
    })

    // Get liked videos to find similar content
    const likedVideos = await prisma.like.findMany({
      where: { userId, videoId: { not: null } },
      include: {
        video: true,
      },
      take: 20,
    })

    const likedCategories = new Set<string>()
    likedVideos.forEach(like => {
      if (like.video?.category) {
        likedCategories.add(like.video.category)
      }
    })

    // Find similar users (collaborative filtering)
    const userLikes = await prisma.like.findMany({
      where: { userId },
      select: { videoId: true, shortId: true },
    })

    const likedVideoIds = userLikes
      .map(l => l.videoId)
      .filter(Boolean) as string[]

    const similarUsers = await prisma.like.findMany({
      where: {
        videoId: { in: likedVideoIds },
        userId: { not: userId },
      },
      select: { userId: true },
      distinct: ['userId'],
      take: 10,
    })

    const similarUserIds = similarUsers.map(s => s.userId)

    // Build recommendation query
    const whereConditions: any[] = [
      { isPublic: true },
      { id: { notIn: watchHistory.map(h => h.videoId).filter(Boolean) } },
    ]

    if (Array.from(allKeywords).length > 0) {
      // Search in title, description, tags
      whereConditions.push({
        OR: [
          { title: { contains: Array.from(allKeywords)[0], mode: 'insensitive' } },
          { description: { contains: Array.from(allKeywords)[0], mode: 'insensitive' } },
        ],
      })
    }

    if (Array.from(watchedCategories).length > 0) {
      whereConditions.push({
        category: { in: Array.from(watchedCategories) },
      })
    }

    // Get candidate videos
    const candidateVideos = await prisma.video.findMany({
      where: {
        AND: whereConditions,
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
        likeUsers: {
          where: { userId: { in: similarUserIds } },
        },
      },
      take: 50,
    })

    // Calculate scores
    const scoredVideos = candidateVideos.map(video => {
      let score = 0

      // Keyword match (w1 = 0.4)
      const titleLower = video.title.toLowerCase()
      const descLower = (video.description || '').toLowerCase()
      const keywordMatches = Array.from(allKeywords).filter(kw =>
        titleLower.includes(kw) || descLower.includes(kw)
      ).length
      score += (keywordMatches / Math.max(allKeywords.size, 1)) * 0.4

      // Watch history overlap (w2 = 0.3)
      const categoryMatch = watchedCategories.has(video.category || '')
      score += (categoryMatch ? 1 : 0) * 0.3

      // Engagement rate (w3 = 0.2)
      const engagementRate = video.views > 0
        ? (video.likes + video.comments) / video.views
        : 0
      score += Math.min(engagementRate * 10, 1) * 0.2

      // Trending boost (w4 = 0.1)
      const trendingScore = Math.min(video.views / 100000, 1)
      score += trendingScore * 0.1

      // Collaborative filtering boost
      if (video.likeUsers.length > 0) {
        score += 0.15
      }

      return { ...video, score }
    })

    // Sort by score and return top 10
    const recommendations = scoredVideos
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map(({ score, likeUsers, ...video }) => video)

    // Save recommendations
    await Promise.all(
      recommendations.map(rec =>
        prisma.recommendation.create({
          data: {
            userId,
            videoId: rec.id,
            score: scoredVideos.find(v => v.id === rec.id)?.score || 0,
          },
        }).catch(() => {}) // Ignore duplicates
      )
    )

    return NextResponse.json({ recommendations })
  } catch (error) {
    console.error('Error generating recommendations:', error)
    return NextResponse.json(
      { error: 'Failed to generate recommendations' },
      { status: 500 }
    )
  }
}
