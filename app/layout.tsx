import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import {siteConfig} from "@/config/site";
import {ThemeProvider} from "@/components/provider/theme-provider";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`, // %s is the page title
  },
  description: siteConfig.description,
  icons: [
    {
      url: '/logo.svg',
      href: '/logo.svg',
    }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
      >
          {children}
      </ThemeProvider>
      </body>
    </html>
  )
}
