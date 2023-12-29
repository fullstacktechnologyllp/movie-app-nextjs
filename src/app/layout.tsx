/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
const montserrat = Montserrat({ subsets: [ 'latin' ] })
import 'react-toastify/dist/ReactToastify.css';

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
      <head>
        <link
          href='https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
          rel='stylesheet'
        />
      </head>
      <body className={ montserrat.className }>
        { children }
        <ToastContainer position="bottom-left"
          autoClose={ 3000 }
          hideProgressBar={ true }
          rtl={ false }
          pauseOnFocusLoss={ false }
          theme="dark"
        />
      </body>
    </html>
  )
}
