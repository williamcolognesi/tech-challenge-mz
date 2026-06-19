import { Sidebar } from "@no-bolso/ui/src/layout/sidebar"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Toaster } from "sonner"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "No Bolso",
  description:
    "Controle financeiro descomplicado. Organize suas finanças em minutos e veja sua vida mudar de verdade.",
}

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <div className="bg-gray-50 min-h-screen">
          <Sidebar />
          <main className="hidden md:block md:ml-60 p-6">{children}</main>
          <main className="md:hidden pt-20 px-4 pb-6">{children}</main>
        </div>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
