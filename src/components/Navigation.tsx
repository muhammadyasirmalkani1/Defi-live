"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Menu, X, TrendingUp, BarChart3, Wallet, Home, Users, Activity, HelpCircle } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import UserMenu from "@/components/UserMenu"

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/trading", label: "Trading", icon: TrendingUp },
    { href: "/portfolio", label: "Portfolio", icon: BarChart3 },
    { href: "/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/wallet", label: "Wallet", icon: Wallet },
    { href: "/community", label: "Community", icon: Users },
    { href: "/trends", label: "Trends", icon: Activity },
    { href: "/support", label: "Support", icon: HelpCircle },
  ]

  const isActive = (href: string) => location.pathname === href

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">CryptoDeFi</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                to={href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                  isActive(href)
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* User Menu or Connect Wallet */}
          <div className="hidden md:block">
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <Button variant="outline" className="bg-gradient-card border-primary/20 hover:bg-primary/10">
                Connect Wallet
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-2">
              {navLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  to={href}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive(href)
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Link>
              ))}
              <div className="mt-4">
                {isAuthenticated ? (
                  <UserMenu />
                ) : (
                  <Button variant="outline" className="w-full bg-gradient-card border-primary/20">
                    Connect Wallet
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
