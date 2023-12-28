import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import signinImage from '../assets/images/sign-in.jpg';

const montserrat = Montserrat({ subsets: [ 'latin' ] })

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
      <body suppressHydrationWarning={ true } className={ montserrat.className }><div
        style={ {
          backgroundImage: `url(${signinImage.src})`,
          backgroundSize: '100%',
          height: '100%',
          minHeight: '100vh',
          backgroundColor: '#083544',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom',
        } }>
          { children }
      </div></body>
    </html>
  )
}
