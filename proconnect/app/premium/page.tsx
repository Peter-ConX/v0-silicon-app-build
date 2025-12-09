"use client"

import { MainNav } from "@/components/layout/MainNav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap, Crown, Gift, Flame } from "lucide-react"

export default function PremiumPage() {
  const plans = [
    {
      name: "Pro",
      price: "$9.99",
      period: "/month",
      description: "Perfect for individual developers",
      features: [
        "Advanced analytics",
        "Priority support",
        "Unlimited projects",
        "Custom profile branding",
        "Badge showcase",
      ],
      icon: Star,
      popular: false,
    },
    {
      name: "Premium Plus",
      price: "$19.99",
      period: "/month",
      description: "For serious creators and founders",
      features: [
        "Everything in Pro",
        "Monetization tools",
        "Advanced analytics",
        "Direct messaging priority",
        "Creator dashboard",
        "Revenue sharing (10%)",
      ],
      icon: Crown,
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For organizations and teams",
      features: [
        "Everything in Premium Plus",
        "Team management",
        "Custom branding",
        "API access",
        "Dedicated support",
        "Custom integrations",
      ],
      icon: Zap,
      popular: false,
    },
  ]

  const perks = [
    {
      icon: Gift,
      title: "Exclusive Content",
      description: "Access premium-only content, tutorials, and resources",
    },
    {
      icon: Flame,
      title: "Featured Profile",
      description: "Get featured on trending creators page",
    },
    {
      icon: Star,
      title: "Early Access",
      description: "Be first to try new features",
    },
    {
      icon: Crown,
      title: "VIP Community",
      description: "Join exclusive community with other premium members",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <MainNav />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">Premium</Badge>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
            Upgrade to Premium
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock exclusive features, monetization tools, and join an elite community of creators and professionals.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => {
            const Icon = plan.icon
            return (
              <Card
                key={plan.name}
                className={`relative overflow-hidden transition-all hover:shadow-xl ${
                  plan.popular ? "md:scale-105 border-blue-500 border-2 shadow-lg" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-orange-500 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon className="h-6 w-6 text-blue-600" />
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-blue-600 to-orange-500 text-white hover:shadow-lg"
                        : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                    }`}
                  >
                    Get Started
                  </Button>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Perks */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Premium Perks</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {perks.map((perk, i) => {
              const Icon = perk.icon
              return (
                <Card key={i} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">{perk.title}</h3>
                    <p className="text-gray-600 text-sm">{perk.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "Can I cancel anytime?",
                a: "Yes, you can cancel your subscription at any time. No questions asked.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, PayPal, and Apple Pay.",
              },
              { q: "Is there a free trial?", a: "Yes, we offer a 7-day free trial for new users." },
              { q: "Do you offer refunds?", a: "We offer a 30-day money-back guarantee if you're not satisfied." },
            ].map((item, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-lg">{item.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
