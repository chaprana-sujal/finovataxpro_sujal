// import '../styles/globals.css'
// import NavBar from '../components/NavBar'

// export const metadata = {
//   title: 'MRS & Co. - Business Services',
//   description: 'Company formation, GST, Trademark and more',
// }

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         <NavBar />
//         {children}
//       </body>
//     </html>
//   )
// }
import type { Metadata } from 'next'
import './global.css'
import Header from '../components/layout/header'
import Footer from '../components/layout/Footer'

// Option 1: Use Google Fonts with fallback (recommended if you have internet)
import { Inter } from 'next/font/google'
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif']
})

// Option 2: Use local font (if you have the font file downloaded)
// import localFont from 'next/font/local'
// const inter = localFont({
//   src: './fonts/Inter-VariableFont.ttf',
//   variable: '--font-inter',
//   fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
//   display: 'swap',
// })

// Option 3: Use system fonts only (no external dependencies)
// const inter = {
//   className: 'font-sans',
//   variable: '--font-inter'
// }

export const metadata: Metadata = {
  title: 'FinovaTaxPro',
  description: 'FinovaTaxPro - Tax, compliance and business registration services'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} flex flex-col min-h-screen`} suppressHydrationWarning>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}