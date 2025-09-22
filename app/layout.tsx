import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Manrope } from "next/font/google"
import { SWRConfig } from "swr"
import { getTeamForUser, getUser } from "@/lib/db/queries"

export const metadata: Metadata = {
  title: "Next.js SaaS Starter",
  description: "My web app",
}

export const viewport: Viewport = {
  maximumScale: 1,
}

const manrope = Manrope({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`bg-white text-black dark:bg-gray-950 dark:text-white ${manrope.className}`}>
      <body className="min-h-[100dvh] bg-gray-50">
        <SWRConfig
          value={{
            fallback: {
              // We do NOT await here
              // Only components that read this data will suspend
              "/api/user": getUser(),
              "/api/team": getTeamForUser(),
            },
          }}
        >
          {children}
        </SWRConfig>
      </body>
    </html>
  )
}
