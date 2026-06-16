"use client"

import { useState, useEffect } from "react" // <-- Adicione o useEffect
// Remova o import do usePathname do next/navigation!

import {
  Wallet,
  LayoutDashboard,
  ArrowLeftRight,
  LogOut,
  Menu,
} from "lucide-react"
import { cn } from "../lib/utils"
import { Button } from "../components/button"
import { Separator } from "../components/separator"
import { Sheet, SheetContent, SheetTrigger } from "../components/sheet"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Transações",
    href: "/transactions", // Confirme se no seu basePath está /transactions ou /transacoes
    icon: ArrowLeftRight,
  },
]

export function Sidebar() {
  const [open, setOpen] = useState(false)
  const [currentPath, setCurrentPath] = useState("")

  // useEffect garante que só vamos ler a URL no navegador do usuário (evita erro de SSR)
  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  const isActive = (href: string) => {
    if (!currentPath) return false
    return currentPath === href || currentPath.startsWith(href + "/")
  }

  const SidebarContent = () => (
    <>
      {/* Logo Section */}
      <div className="mb-8">
        <a href="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
            <Wallet className="w-6 h-6" />
          </div>
          <p className="font-bold text-base">No Bolso.</p>
        </a>
      </div>

      {/* Profile Section */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <p className="font-semibold text-sm text-gray-900">Acme Inc</p>
        <p className="text-xs text-gray-600 mt-1">usuario@email.com</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)

          return (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block"
            >
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 transition-colors",
                  active && "bg-blue-50 text-blue-600 hover:bg-blue-50",
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{item.title}</span>
              </Button>
            </a>
          )
        })}
      </nav>

      {/* Separator */}
      <Separator className="my-4" />

      {/* Logout Button */}
      <div className="space-y-1">
        <a href="/" onClick={() => setOpen(false)} className="block">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">Sair</span>
          </Button>
        </a>
      </div>
    </>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-60 bg-white border-r border-gray-200 p-6 flex-col z-50">
        <SidebarContent />
      </aside>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center px-4 z-40">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-60 p-0">
            <div className="h-full flex flex-col p-6">
              <SidebarContent />
            </div>
          </SheetContent>
        </Sheet>
        <p className="font-semibold text-gray-900">No Bolso.</p>
      </div>
    </>
  )
}
