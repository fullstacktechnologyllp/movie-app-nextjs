import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Movie App',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  )
}
