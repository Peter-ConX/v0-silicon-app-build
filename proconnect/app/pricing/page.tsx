import { MainNav } from '@/components/layout/MainNav'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Star, Users, Video, Calendar, Wrench } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '₦0',
    period: '/month',
    description: 'Basic access to networking and profile creation',
    features: [
      'Profile creation',
      'Basic networking',
      'Limited messaging (10/month)',
      'View showcases',
      'Community support',
    ],
    buttonText: 'Get Started',
    popular: false,
    icon: Users,
  },
  {
    name: 'Creator+',
    price: '₦9,000',
    period: '/month',
    description: 'Upload video content and get analytics',
    features: [
      'Everything in Free',
      'Unlimited video uploads',
      'Advanced analytics',
      'Creator rewards',
      'Priority support',
      'Custom branding',
    ],
    buttonText: 'Subscribe',
    popular: false,
    icon: Video,
  },
  {
    name: 'Mentor Pass',
    price: '₦12,000',
    period: '/month',
    description: 'Verified mentor badge and marketplace access',
    features: [
      'Everything in Creator+',
      'Verified mentor badge',
      'Mentorship marketplace',
      'Calendar booking',
      'Student management',
      'Revenue sharing',
    ],
    buttonText: 'Subscribe',
    popular: true,
    icon: Star,
  },
  {
    name: 'Builder Pro',
    price: '₦10,000',
    period: '/month',
    description: 'Full access to Build tab and team tools',
    features: [
      'Everything in Creator+',
      'Full Build tab access',
      'Team collaboration tools',
      'Project management',
      'File sharing & storage',
      'Advanced permissions',
    ],
    buttonText: 'Subscribe',
    popular: false,
    icon: Wrench,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Choose Your Path on Proconnect</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Whether you're building, mentoring, hiring, or creating — there's a plan for you.
          </p>
        </div>

        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4 bg-white p-1 rounded-lg border border-gray-200">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium">
              Monthly
            </button>
            <button className="px-6 py-2 text-gray-600 hover:text-blue-600">
              Yearly
              <Badge className="ml-2 bg-orange-500">Save 20%</Badge>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon
            return (
              <Card
                key={plan.name}
                className={`relative hover:shadow-xl transition-shadow ${
                  plan.popular ? 'border-2 border-orange-500' : ''
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    </div>
                  </div>
                  <div className="flex items-baseline space-x-1 mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-500">{plan.period}</span>
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? 'bg-orange-500 hover:bg-orange-600'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">All plans include secure payment processing</p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <span>✓ Secure payments</span>
            <span>✓ Cancel anytime</span>
            <span>✓ 30-day money-back guarantee</span>
          </div>
        </div>
      </div>
    </div>
  )
}
