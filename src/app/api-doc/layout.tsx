import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';
import './api-doc.css';

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Movie App',
  description: '',
}

export default function ApiDocLayout({
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
