"use client"

import { MainNav } from "@/components/layout/MainNav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, Clock, User, MessageSquare, Flag, ArrowRight } from "lucide-react"

export default function ReportPage() {
  const reportTypes = [
    {
      icon: AlertTriangle,
      title: "Inappropriate Content",
      description: "Report content that violates community guidelines",
      color: "text-red-500",
    },
    {
      icon: User,
      title: "Fake Account",
      description: "Report accounts impersonating or using false identity",
      color: "text-orange-500",
    },
    {
      icon: Flag,
      title: "Harassment",
      description: "Report abusive, threatening, or harassing behavior",
      color: "text-purple-500",
    },
    {
      icon: MessageSquare,
      title: "Misinformation",
      description: "Report false or misleading information",
      color: "text-blue-500",
    },
  ]

  const recentReports = [
    {
      id: 1,
      type: "Inappropriate Content",
      status: "Resolved",
      date: "2 days ago",
      description: "Reported offensive post in AI Builders Cave",
      action: "Content removed",
    },
    {
      id: 2,
      type: "Fake Account",
      status: "Under Review",
      date: "5 hours ago",
      description: "Account impersonating famous tech creator",
      action: "Being investigated",
    },
    {
      id: 3,
      type: "Harassment",
      status: "Resolved",
      date: "1 week ago",
      description: "User sending threatening messages",
      action: "Account suspended",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <MainNav />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-red-100 text-red-700 hover:bg-red-100">Safety</Badge>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
            Report & Safety
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Help us keep our community safe. Report inappropriate content, fake accounts, harassment, and
            misinformation.
          </p>
        </div>

        {/* Report Types */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {reportTypes.map((type) => {
            const Icon = type.icon
            return (
              <Card key={type.title} className="hover:shadow-lg transition-shadow cursor-pointer hover:border-blue-500">
                <CardContent className="pt-6">
                  <Icon className={`h-12 w-12 ${type.color} mb-4`} />
                  <h3 className="font-semibold text-lg mb-2">{type.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{type.description}</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Report
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Report Form */}
        <div className="max-w-2xl mx-auto mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Submit a Report</CardTitle>
              <CardDescription>
                Help us understand what happened. The more details, the better we can assist.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Report Type *</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Select a report type</option>
                  <option>Inappropriate Content</option>
                  <option>Fake Account</option>
                  <option>Harassment</option>
                  <option>Misinformation</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">What happened? *</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the issue in detail..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Link to content (if applicable)</label>
                <input
                  type="url"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                />
              </div>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-orange-500 text-white">
                Submit Report
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Your Reports */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Your Reports</h2>
          <div className="space-y-4">
            {recentReports.map((report) => (
              <Card key={report.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-lg">{report.type}</h3>
                        <Badge
                          variant={report.status === "Resolved" ? "default" : "outline"}
                          className={
                            report.status === "Resolved"
                              ? "bg-green-100 text-green-700 border-0"
                              : "bg-yellow-100 text-yellow-700"
                          }
                        >
                          {report.status === "Resolved" ? (
                            <>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              {report.status}
                            </>
                          ) : (
                            <>
                              <Clock className="h-3 w-3 mr-1" />
                              {report.status}
                            </>
                          )}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-2">{report.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Reported {report.date}</span>
                        <span>•</span>
                        <span>{report.action}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Community Guidelines */}
        <div className="bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Community Guidelines</h2>
          <p className="text-lg mb-6 opacity-90">
            Learn about our policies and how we keep ProConnect safe for everyone.
          </p>
          <Button className="bg-white text-blue-600 hover:bg-gray-100">
            Read Guidelines
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
