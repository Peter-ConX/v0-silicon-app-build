import { MainNav } from '@/components/layout/MainNav'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, MessageCircle, UserPlus, Star } from 'lucide-react'

const mockMentors = [
  {
    id: '1',
    name: 'Okafor Chidera',
    title: 'Founder, C.E.O of Proconnect',
    rating: 4.9,
    reviews: 24,
    skills: ['Leadership', 'Product Strategy', 'Business Development'],
    experience: '10+ years',
    availability: '10 hours/week',
    rate: 'Free',
  },
  {
    id: '2',
    name: 'Alex Morgan',
    title: 'Senior UX Designer',
    rating: 4.8,
    reviews: 36,
    skills: ['UI/UX Design', 'Design Systems', 'User Research'],
    experience: '8 years',
    availability: '5 hours/week',
    rate: '$75/hour',
  },
  {
    id: '3',
    name: 'Sarah Chen',
    title: 'Frontend Architect',
    rating: 4.7,
    reviews: 29,
    skills: ['React', 'TypeScript', 'Performance Optimization'],
    experience: '7 years',
    availability: '8 hours/week',
    rate: '$85/hour',
  },
  {
    id: '4',
    name: 'David Kim',
    title: 'Product Manager',
    rating: 4.9,
    reviews: 42,
    skills: ['Product Strategy', 'Agile', 'Go-to-Market'],
    experience: '9 years',
    availability: '6 hours/week',
    rate: '$90/hour',
  },
]

export default async function MentorshipPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Mentorship</h1>
        <p className="text-gray-600 mb-8">
          Connect with industry experts to accelerate your professional growth
        </p>

        <div className="flex space-x-4 mb-6">
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium">
            Find a Mentor
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            Programs
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            My Mentorships
          </button>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search mentors by name, role, or expertise..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg">
            <option>All Expertise</option>
          </select>
          <Button variant="outline">More Filters</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockMentors.map((mentor) => (
            <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-orange-500 flex items-center justify-center text-white font-semibold text-lg">
                    {mentor.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-lg">{mentor.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{mentor.title}</p>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-semibold">{mentor.rating}</span>
                      <span className="text-gray-500 text-sm">({mentor.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {mentor.skills.map((skill, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-gray-500">Experience</p>
                    <p className="font-semibold">{mentor.experience}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Availability</p>
                    <p className="font-semibold">{mentor.availability}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500">Rate</p>
                    <p className="font-semibold text-orange-500">{mentor.rate}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Message
                  </Button>
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Request Mentorship
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
