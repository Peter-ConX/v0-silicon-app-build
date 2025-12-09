import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from '@/components/ui/toaster'
import { PetrixChat } from '@/components/petrix/PetrixChat'
import { ThemeProvider } from '@/components/theme/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Proconnect - Professional Networking Platform',
  description: 'A world-class networking platform for software engineers, founders, AI/ML researchers, and tech creators',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Providers>
            {children}
            <PetrixChat />
            <Toaster />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
