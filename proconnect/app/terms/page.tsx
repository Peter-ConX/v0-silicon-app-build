import { MainNav } from '@/components/layout/MainNav'
import { Card, CardContent } from '@/components/ui/card'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Card>
          <CardContent className="p-8">
            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
            
            <div className="prose max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700 leading-relaxed">
                  By accessing and using Proconnect, you accept and agree to be bound by the terms and provision of this agreement. 
                  If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Data Security and Privacy</h2>
                <p className="text-gray-700 leading-relaxed">
                  We are committed to keeping your data safe and secure. Proconnect uses industry-standard encryption 
                  and security measures to protect your personal information. We do not sell your data to third parties, 
                  and we only share information as necessary to provide our services or as required by law.
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700">
                  <li>All user data is encrypted in transit and at rest</li>
                  <li>We regularly audit our security practices</li>
                  <li>You have full control over your data and can delete it at any time</li>
                  <li>We comply with GDPR and other data protection regulations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
                <p className="text-gray-700 leading-relaxed">
                  You are responsible for maintaining the confidentiality of your account and password. 
                  You agree to accept responsibility for all activities that occur under your account.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Content and Intellectual Property</h2>
                <p className="text-gray-700 leading-relaxed">
                  You retain ownership of all content you post on Proconnect. By posting content, you grant 
                  Proconnect a license to display and distribute that content on our platform. You agree not 
                  to post content that infringes on the intellectual property rights of others.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Prohibited Activities</h2>
                <p className="text-gray-700 leading-relaxed">
                  You agree not to use Proconnect to:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700">
                  <li>Violate any laws or regulations</li>
                  <li>Harass, abuse, or harm other users</li>
                  <li>Post false, misleading, or defamatory content</li>
                  <li>Spam or send unsolicited messages</li>
                  <li>Attempt to gain unauthorized access to the platform</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Account Termination</h2>
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to terminate or suspend your account at any time for violations of these 
                  terms or for any other reason we deem necessary to protect the platform and its users.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
                <p className="text-gray-700 leading-relaxed">
                  Proconnect is provided "as is" without warranties of any kind. We are not liable for any 
                  damages arising from your use of the platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to modify these terms at any time. We will notify users of significant 
                  changes via email or platform notifications.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
                <p className="text-gray-700 leading-relaxed">
                  If you have questions about these Terms of Service, please contact us at legal@proconnect.com
                </p>
              </section>

              <div className="mt-8 pt-8 border-t">
                <p className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
