import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import signinImage from '../assets/images/sign-in.jpg';

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
      <body className={montserrat.className}><div
      style={ {
        backgroundImage: `url(${signinImage.src})`,
        backgroundSize: 'cover',
        height: '100vh',
    
        backgroundRepeat: 'no-repeat',
        backgroundPositionY: 'bottom',
      } }
    >{children}</div></body>
    </html>
  )
}
