import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const conversations = await prisma.conversation.findMany({
      where: {
        participants: {
          some: {
            userId: session.user.id,
          },
        },
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    })

    const formatted = conversations.map((conv) => ({
      id: conv.id,
      type: conv.type,
      name: conv.name || conv.participants.find((p) => p.userId !== session.user.id)?.user.name || 'Conversation',
      lastMessage: conv.messages[0] || null,
      participants: conv.participants.map((p) => ({
        id: p.user.id,
        name: p.user.name,
        image: p.user.image,
      })),
    }))

    return NextResponse.json(formatted)
  } catch (error) {
    console.error('Get conversations error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
