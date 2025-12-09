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
    const { amount, paymentMethod, paymentDetails } = body

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      )
    }

    const wallet = await prisma.wallet.findUnique({
      where: { userId: session.user.id },
    })

    if (!wallet) {
      return NextResponse.json(
        { error: 'Wallet not found' },
        { status: 404 }
      )
    }

    if (wallet.balance < amount) {
      return NextResponse.json(
        { error: 'Insufficient balance' },
        { status: 400 }
      )
    }

    // Create withdrawal transaction
    const transaction = await prisma.transaction.create({
      data: {
        walletId: wallet.id,
        type: 'withdrawal',
        amount,
        status: 'pending',
        paymentMethod,
        paymentDetails: paymentDetails ? JSON.stringify(paymentDetails) : null,
        description: `Withdrawal of $${amount}`,
      },
    })

    // Update wallet balance
    await prisma.$transaction([
      prisma.wallet.update({
        where: { id: wallet.id },
        data: {
          balance: { decrement: amount },
          totalWithdrawn: { increment: amount },
        },
      }),
      // In production, process withdrawal via payment gateway
      // After successful processing, update transaction status to 'completed'
    ])

    return NextResponse.json({
      transaction,
      message: 'Withdrawal request submitted',
    })
  } catch (error) {
    console.error('Error processing withdrawal:', error)
    return NextResponse.json(
      { error: 'Failed to process withdrawal' },
      { status: 500 }
    )
  }
}

