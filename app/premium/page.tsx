"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Star, Zap, Users, BarChart3 } from "lucide-react"

export default function PremiumPage() {
  const [selectedPlan, setSelectedPlan] = useState("premium")

  const plans = [
    {
      id: "pro",
      name: "Pro",
      price: "$9.99",
      period: "/month",
      description: "Perfect for growing creators",
      features: ["Ad-free watching", "Video downloads", "HD streaming", "1 custom playlist", "Basic analytics"],
      color: "from-purple-600 to-pink-600",
    },
    {
      id: "premium",
      name: "Premium Plus",
      price: "$19.99",
      period: "/month",
      description: "For serious content creators",
      features: [
        "Everything in Pro",
        "Monetization tools",
        "Advanced analytics",
        "5 custom playlists",
        "Exclusive features",
        "Priority support",
        "50GB storage",
      ],
      color: "from-yellow-500 to-orange-500",
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For businesses and organizations",
      features: [
        "All Premium features",
        "Team collaboration",
        "Custom branding",
        "Unlimited storage",
        "API access",
        "Dedicated support",
        "Custom integrations",
      ],
      color: "from-blue-600 to-cyan-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black">
      {/* Header */}
      <div className="border-b border-purple-900/30 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-purple-900/30 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-purple-400" />
          </Link>
          <h1 className="text-2xl font-bold text-white">Silicon Premium</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">Unlock Premium Features</h2>
          <p className="text-xl text-purple-300 mb-8">
            Get access to exclusive tools, ad-free viewing, and monetization options
          </p>
          <div className="flex gap-4 justify-center">
            <div className="flex items-center gap-2 text-purple-300">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span>Advanced Features</span>
            </div>
            <div className="flex items-center gap-2 text-purple-300">
              <Users className="w-5 h-5 text-pink-400" />
              <span>Creator Tools</span>
            </div>
            <div className="flex items-center gap-2 text-purple-300">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              <span>Analytics</span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative rounded-2xl p-8 cursor-pointer transition-all duration-300 border ${
                plan.popular
                  ? "border-yellow-500/50 bg-gradient-to-br from-yellow-900/20 to-orange-900/20 scale-105 shadow-2xl shadow-yellow-500/20"
                  : "border-purple-900/30 bg-gradient-to-br from-purple-900/10 to-pink-900/10 hover:border-purple-700/50"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-purple-300 text-sm mb-4">{plan.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-purple-300 text-sm ml-2">{plan.period}</span>
              </div>

              <button
                className={`w-full py-3 rounded-lg font-bold mb-6 transition-all duration-300 ${
                  plan.popular
                    ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-black hover:shadow-lg hover:shadow-yellow-500/50"
                    : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/50"
                }`}
              >
                Get Started
              </button>

              <div className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-purple-200 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-900/30 rounded-2xl p-12">
          <h3 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                q: "Can I cancel anytime?",
                a: "Yes, you can cancel your subscription at any time. No hidden fees or long-term contracts.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, PayPal, Apple Pay, and Google Pay.",
              },
              {
                q: "Is there a free trial?",
                a: "Yes! Enjoy a 7-day free trial on any plan. No credit card required to start.",
              },
              {
                q: "Can I upgrade or downgrade?",
                a: "Change your plan anytime and we'll prorate the billing accordingly.",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-black/30 rounded-lg p-6 border border-purple-900/20">
                <h4 className="text-lg font-bold text-white mb-3">{item.q}</h4>
                <p className="text-purple-300">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
