"use client"

import { MainNav } from "@/components/layout/MainNav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Video, Users, Award, ArrowRight, Clock, User, Star } from "lucide-react"

export default function LearningPage() {
  const courses = [
    {
      id: 1,
      title: "Building Web Applications with Next.js",
      instructor: "Sarah Chen",
      level: "Intermediate",
      duration: "8 weeks",
      students: 2543,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=300&fit=crop",
      tags: ["Next.js", "React", "Web Dev"],
    },
    {
      id: 2,
      title: "Full-Stack Development Masterclass",
      instructor: "Alex Kumar",
      level: "Advanced",
      duration: "12 weeks",
      students: 1856,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
      tags: ["Full-Stack", "Backend", "Frontend"],
    },
    {
      id: 3,
      title: "Machine Learning Fundamentals",
      instructor: "Dr. Priya Singh",
      level: "Beginner",
      duration: "10 weeks",
      students: 3214,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=400&h=300&fit=crop",
      tags: ["ML", "Python", "AI"],
    },
    {
      id: 4,
      title: "Cloud Architecture with AWS",
      instructor: "Mike Johnson",
      level: "Advanced",
      duration: "6 weeks",
      students: 1543,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
      tags: ["AWS", "Cloud", "DevOps"],
    },
  ]

  const resources = [
    { icon: Video, title: "Video Tutorials", count: "200+", color: "text-red-500" },
    { icon: BookOpen, title: "Learning Guides", count: "150+", color: "text-blue-500" },
    { icon: Users, title: "Study Groups", count: "50+", color: "text-green-500" },
    { icon: Award, title: "Certifications", count: "25+", color: "text-purple-500" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <MainNav />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">Learning</Badge>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
            Learn & Grow
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Access world-class courses and resources from industry experts. Master new skills and advance your career.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-16">
          {resources.map((resource) => {
            const Icon = resource.icon
            return (
              <Card key={resource.title}>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Icon className={`h-10 w-10 mx-auto mb-2 ${resource.color}`} />
                    <p className="text-3xl font-bold mb-1">{resource.count}</p>
                    <p className="text-gray-600">{resource.title}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Featured Courses */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Featured Courses</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative w-full h-48 bg-gray-200">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2">{course.level}</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                  <CardDescription className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{course.instructor}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">{course.students.toLocaleString()} students enrolled</p>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-orange-500 text-white">
                    Enroll Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Level Up?</h2>
          <p className="text-lg mb-6 opacity-90">Start learning from the best mentors in the tech industry today.</p>
          <Button className="bg-white text-blue-600 hover:bg-gray-100">
            Explore All Courses
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
