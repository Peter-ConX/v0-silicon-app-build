"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, BookOpen, Users, Clock, Star, Play } from "lucide-react"

export default function LearningPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const courses = [
    {
      id: 1,
      title: "Content Creation Mastery",
      instructor: "Sarah Chen",
      duration: "8 weeks",
      rating: 4.9,
      students: "45.2K",
      category: "content-creation",
      image: "from-purple-600 to-pink-600",
      lessons: 32,
    },
    {
      id: 2,
      title: "Video Editing Pro",
      instructor: "Marcus Williams",
      duration: "6 weeks",
      rating: 4.8,
      students: "38.9K",
      category: "video-editing",
      image: "from-blue-600 to-cyan-600",
      lessons: 28,
    },
    {
      id: 3,
      title: "Monetization Strategies",
      instructor: "Lisa Anderson",
      duration: "4 weeks",
      rating: 4.7,
      students: "52.1K",
      category: "monetization",
      image: "from-green-600 to-emerald-600",
      lessons: 18,
    },
    {
      id: 4,
      title: "Audio Production Basics",
      instructor: "James Rodriguez",
      duration: "5 weeks",
      rating: 4.8,
      students: "31.4K",
      category: "audio",
      image: "from-orange-600 to-red-600",
      lessons: 24,
    },
    {
      id: 5,
      title: "Audience Growth Hacks",
      instructor: "Emma Thompson",
      duration: "3 weeks",
      rating: 4.9,
      students: "67.8K",
      category: "growth",
      image: "from-pink-600 to-rose-600",
      lessons: 15,
    },
    {
      id: 6,
      title: "Branding for Creators",
      instructor: "David Park",
      duration: "6 weeks",
      rating: 4.7,
      students: "29.5K",
      category: "branding",
      image: "from-indigo-600 to-purple-600",
      lessons: 26,
    },
  ]

  const categories = [
    { id: "all", name: "All Courses" },
    { id: "content-creation", name: "Content Creation" },
    { id: "video-editing", name: "Video Editing" },
    { id: "monetization", name: "Monetization" },
    { id: "audio", name: "Audio" },
    { id: "growth", name: "Growth" },
    { id: "branding", name: "Branding" },
  ]

  const filteredCourses = selectedCategory === "all" ? courses : courses.filter((c) => c.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black">
      {/* Header */}
      <div className="border-b border-purple-900/30 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-purple-900/30 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-purple-400" />
          </Link>
          <h1 className="text-2xl font-bold text-white">Learning Center</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="mb-12">
          <h2 className="text-5xl font-bold text-white mb-4">Master Your Craft</h2>
          <p className="text-xl text-purple-300 mb-8">
            Learn from industry experts and level up your content creation skills
          </p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-purple-300">
              <BookOpen className="w-5 h-5 text-purple-400" />
              <span>{courses.length} Courses</span>
            </div>
            <div className="flex items-center gap-2 text-purple-300">
              <Users className="w-5 h-5 text-pink-400" />
              <span>Expert Instructors</span>
            </div>
            <div className="flex items-center gap-2 text-purple-300">
              <Clock className="w-5 h-5 text-blue-400" />
              <span>Learn at Your Pace</span>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === cat.id
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "bg-purple-900/30 text-purple-300 hover:bg-purple-900/50 border border-purple-900/50"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredCourses.map((course) => (
            <div key={course.id} className="group cursor-pointer">
              <div
                className={`bg-gradient-to-br ${course.image} rounded-xl h-40 mb-4 flex items-center justify-center relative overflow-hidden`}
              >
                <Play className="w-12 h-12 text-white opacity-70 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                {course.title}
              </h3>
              <p className="text-purple-400 text-sm mb-3">{course.instructor}</p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sm text-purple-300">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-semibold text-white">{course.rating}</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-purple-900/30">
                <span className="text-xs text-purple-400">{course.lessons} lessons</span>
                <span className="text-xs text-purple-400">{course.students} students</span>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Section */}
        <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-900/30 rounded-2xl p-12">
          <h3 className="text-3xl font-bold text-white mb-6">Why Take Our Courses?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Instructors",
                description: "Learn from creators with millions of followers and years of experience",
              },
              {
                title: "Practical Projects",
                description: "Apply what you learn with hands-on assignments and real-world projects",
              },
              {
                title: "Community Support",
                description: "Join a thriving community of creators and get feedback on your work",
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                <p className="text-purple-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
