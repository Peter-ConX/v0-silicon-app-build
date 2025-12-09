import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { message } = await request.json()

    // OpenAI API integration
    const openaiApiKey = process.env.OPENAI_API_KEY
    if (!openaiApiKey) {
      // Fallback response if API key not configured
      return NextResponse.json({
        response: `I understand you're asking: "${message}". To provide personalized career guidance, please configure the OPENAI_API_KEY in your environment variables. For now, here's some general advice: Focus on building your skills, networking with professionals in your field, and showcasing your work through projects and missions.`,
      })
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are Petrix, a helpful AI career growth assistant for Proconnect, a professional networking platform. Provide personalized, actionable career advice, mission recommendations, and networking suggestions. Be concise, friendly, and professional.',
            },
            {
              role: 'user',
              content: message,
            },
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      })

      const data = await response.json()

      if (data.choices && data.choices[0]) {
        return NextResponse.json({
          response: data.choices[0].message.content,
        })
      }

      throw new Error('Invalid response from OpenAI API')
    } catch (apiError) {
      console.error('OpenAI API error:', apiError)
      return NextResponse.json({
        response: 'I apologize, but I\'m having trouble processing your request right now. Please try again in a moment.',
      })
    }
  } catch (error) {
    console.error('Petrix error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
