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
    const { governmentId, phoneNumber, payoutMethod, payoutDetails } = body

    if (!governmentId || !phoneNumber || !payoutMethod) {
      return NextResponse.json(
        { error: 'Missing required verification information' },
        { status: 400 }
      )
    }

    // In production, you would:
    // 1. Upload government ID to secure storage
    // 2. Verify phone number via SMS
    // 3. Validate payout details

    const creatorProfile = await prisma.creatorProfile.update({
      where: { userId: session.user.id },
      data: {
        governmentId, // In production, store encrypted or file path
        phoneNumber,
        phoneVerified: false, // Set to true after SMS verification
        payoutMethod,
        payoutDetails: payoutDetails ? JSON.stringify(payoutDetails) : null,
        verificationStatus: 'pending',
      },
    })

    return NextResponse.json({
      message: 'Verification submitted. Your documents are under review.',
      creatorProfile,
    })
  } catch (error) {
    console.error('Error submitting verification:', error)
    return NextResponse.json(
      { error: 'Failed to submit verification' },
      { status: 500 }
    )
  }
}
