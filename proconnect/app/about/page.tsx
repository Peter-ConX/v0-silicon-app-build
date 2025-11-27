import { MainNav } from '@/components/layout/MainNav'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">About Proconnect</h1>
            <p className="text-xl text-gray-600">
              The ultimate networking platform for tech professionals
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                Proconnect is built specifically for tech-savvy individuals including software engineers, 
                founders, AI/ML researchers, data scientists, designers, product managers, DevOps engineers, 
                security analysts, and creators. We believe in connecting like-minded professionals to 
                foster collaboration, knowledge sharing, and career growth.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold mb-4">Key Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-lg border bg-white">
                  <h3 className="text-xl font-semibold mb-2">Professional Networking</h3>
                  <p className="text-gray-600">
                    Connect with professionals in your field through our intelligent matching system.
                  </p>
                </div>
                <div className="p-6 rounded-lg border bg-white">
                  <h3 className="text-xl font-semibold mb-2">Skill Building</h3>
                  <p className="text-gray-600">
                    Complete missions, earn badges, and track your professional growth.
                  </p>
                </div>
                <div className="p-6 rounded-lg border bg-white">
                  <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
                  <p className="text-gray-600">
                    Work on projects together through our Co-Lab and Build features.
                  </p>
                </div>
                <div className="p-6 rounded-lg border bg-white">
                  <h3 className="text-xl font-semibold mb-2">Mentorship</h3>
                  <p className="text-gray-600">
                    Find mentors or become one to accelerate career growth.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center pt-8">
            <Link href="/signup">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Join Proconnect
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
