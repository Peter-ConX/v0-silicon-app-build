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

    // In production, integrate with Paystack, Stripe, etc.
    // For now, we'll create a pending transaction
    const wallet = await prisma.wallet.findUnique({
      where: { userId: session.user.id },
    })

    if (!wallet) {
      await prisma.wallet.create({
        data: { userId: session.user.id },
      })
    }

    const transaction = await prisma.transaction.create({
      data: {
        walletId: wallet?.id || (await prisma.wallet.findUnique({
          where: { userId: session.user.id },
        }))!.id,
        type: 'deposit',
        amount,
        status: 'pending', // In production, update after payment confirmation
        paymentMethod,
        paymentDetails: paymentDetails ? JSON.stringify(paymentDetails) : null,
        description: `Deposit of $${amount}`,
      },
    })

    // In production, after payment confirmation:
    // await prisma.$transaction([
    //   prisma.transaction.update({
    //     where: { id: transaction.id },
    //     data: { status: 'completed' },
    //   }),
    //   prisma.wallet.update({
    //     where: { userId: session.user.id },
    //     data: { balance: { increment: amount } },
    //   }),
    // ])

    return NextResponse.json({
      transaction,
      paymentUrl: `https://paystack.com/pay/${transaction.id}`, // Mock payment URL
    })
  } catch (error) {
    console.error('Error processing deposit:', error)
    return NextResponse.json(
      { error: 'Failed to process deposit' },
      { status: 500 }
    )
  }
}

