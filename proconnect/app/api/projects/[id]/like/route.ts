import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const projectId = params.id

    // For now, we'll use a simple approach: store likes in a JSON field or use Activity model
    // In production, you'd want a ProjectLike model similar to ZeetLike
    // For MVP, we'll track this via Activity model with type 'project_liked'
    
    // Check if user already liked this project
    const existingLike = await prisma.activity.findFirst({
      where: {
        userId: session.user.id,
        type: 'project_liked',
        metadata: projectId, // Store project ID in metadata
      },
    })

    if (existingLike) {
      // Unlike - remove the activity
      await prisma.activity.delete({
        where: { id: existingLike.id },
      })
      return NextResponse.json({ liked: false, message: 'Project unendorsed' })
    } else {
      // Like - create activity
      await prisma.activity.create({
        data: {
          userId: session.user.id,
          type: 'project_liked',
          title: 'Project Endorsed',
          description: `Endorsed project: ${projectId}`,
          metadata: projectId,
        },
      })
      return NextResponse.json({ liked: true, message: 'Project endorsed' })
    }
  } catch (error) {
    console.error('Like project error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
