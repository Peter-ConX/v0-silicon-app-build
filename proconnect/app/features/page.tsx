import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, MessageSquare, Sparkles, Code, BookOpen, Shield, Zap } from 'lucide-react'

export default function FeaturesPage() {
  const features = [
    {
      icon: Users,
      title: 'Smart Networking',
      description: 'AI-powered connection suggestions based on your skills, interests, and goals. Find the right people to connect with.',
    },
    {
      icon: MessageSquare,
      title: 'Real-time Chat',
      description: 'Built-in chat system with typing indicators, read receipts, file sharing, and group conversations.',
    },
    {
      icon: Sparkles,
      title: 'AI Assistant',
      description: 'AI-generated bios, connection suggestions, chat summarization, and personalized career advice.',
    },
    {
      icon: Code,
      title: 'Developer Tools',
      description: 'Code sharing, markdown support, project showcase, API testing console, and task boards.',
    },
    {
      icon: BookOpen,
      title: 'Library & Learning',
      description: 'Track what you\'re reading, discover books from your network, and share insights.',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Enterprise-grade security with 2FA, encrypted communications, and privacy controls.',
    },
    {
      icon: Zap,
      title: 'Real-time Presence',
      description: 'See who\'s online, get instant notifications, and stay connected with your network.',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-2xl font-bold text-primary-foreground">P</span>
          </div>
          <span className="text-2xl font-bold text-primary">ProConnect</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/signup">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Features</h1>
            <p className="text-xl text-muted-foreground">
              Everything you need to network, collaborate, and grow in tech
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <div key={i} className="p-6 rounded-lg border bg-card hover:border-primary/50 transition-colors">
                  <Icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              )
            })}
          </div>

          <div className="text-center pt-8">
            <Link href="/signup">
              <Button size="lg" className="text-lg px-8">
                Start Using ProConnect
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

