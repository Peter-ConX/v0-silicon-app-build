import { MainNav } from '@/components/layout/MainNav'
import { Card, CardContent } from '@/components/ui/card'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Card>
          <CardContent className="p-8">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            
            <div className="prose max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                <p className="text-gray-700 leading-relaxed">
                  At Proconnect, we take your privacy seriously. This Privacy Policy explains how we collect, 
                  use, disclose, and safeguard your information when you use our platform. We are committed to 
                  protecting your personal data and ensuring your privacy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Account information (name, email, password)</li>
                  <li>Profile information (bio, skills, work experience)</li>
                  <li>Content you post (zeets, projects, messages)</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
                <p className="text-gray-700 leading-relaxed">
                  We use your information to:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700">
                  <li>Provide and improve our services</li>
                  <li>Personalize your experience</li>
                  <li>Send you important updates and notifications</li>
                  <li>Detect and prevent fraud or abuse</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
                <p className="text-gray-700 leading-relaxed">
                  We implement industry-standard security measures to protect your data:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700">
                  <li>End-to-end encryption for sensitive data</li>
                  <li>Regular security audits and updates</li>
                  <li>Secure data storage with redundancy</li>
                  <li>Access controls and authentication</li>
                  <li>Regular backups to prevent data loss</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Data Sharing</h2>
                <p className="text-gray-700 leading-relaxed">
                  We do not sell your personal information. We may share your data only in the following circumstances:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700">
                  <li>With your explicit consent</li>
                  <li>To comply with legal requirements</li>
                  <li>To protect our rights and safety</li>
                  <li>With service providers who assist in operating our platform (under strict confidentiality agreements)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
                <p className="text-gray-700 leading-relaxed">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your data</li>
                  <li>Export your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Cookies and Tracking</h2>
                <p className="text-gray-700 leading-relaxed">
                  We use cookies and similar technologies to enhance your experience, analyze usage, and 
                  personalize content. You can control cookie preferences through your browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
                <p className="text-gray-700 leading-relaxed">
                  Proconnect is not intended for users under 18 years of age. We do not knowingly collect 
                  personal information from children.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">9. International Data Transfers</h2>
                <p className="text-gray-700 leading-relaxed">
                  Your information may be transferred to and processed in countries other than your own. 
                  We ensure appropriate safeguards are in place to protect your data in accordance with 
                  this Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">10. Changes to This Policy</h2>
                <p className="text-gray-700 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes 
                  by posting the new policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
                <p className="text-gray-700 leading-relaxed">
                  If you have questions about this Privacy Policy or our data practices, please contact us at:
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  <strong>Email:</strong> privacy@proconnect.com<br />
                  <strong>Address:</strong> Proconnect Privacy Team<br />
                  We respond to all privacy inquiries within 30 days.
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

