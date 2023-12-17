import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Providers } from './Providers'
import Toast from '@/components/Toast'
import ReduxProvider from '@/app/ReduxProvider'

const inter = DM_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'Biops',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ReduxProvider>
            {/* <Loader /> */}
            <Toast />
            <Header />
            {children}
            <Footer />
          </ReduxProvider>
        </Providers>
      </body>
    </html>
  )
}
