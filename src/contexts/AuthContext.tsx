"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: "user" | "admin" | "premium"
  isVerified: boolean
  createdAt: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, userData: { firstName: string; lastName: string }) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  hasPermission: (permission: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("cryptodefi_user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Failed to parse saved user:", error)
        localStorage.removeItem("cryptodefi_user")
      }
    }
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      // Simulate API call - replace with actual authentication
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Demo users for testing
      const demoUsers: Record<string, User> = {
        "admin@cryptodefi.com": {
          id: "1",
          email: "admin@cryptodefi.com",
          firstName: "Admin",
          lastName: "User",
          role: "admin",
          isVerified: true,
          createdAt: new Date().toISOString(),
        },
        "user@cryptodefi.com": {
          id: "2",
          email: "user@cryptodefi.com",
          firstName: "Regular",
          lastName: "User",
          role: "user",
          isVerified: true,
          createdAt: new Date().toISOString(),
        },
        "premium@cryptodefi.com": {
          id: "3",
          email: "premium@cryptodefi.com",
          firstName: "Premium",
          lastName: "User",
          role: "premium",
          isVerified: true,
          createdAt: new Date().toISOString(),
        },
      }

      const authenticatedUser = demoUsers[email]

      if (!authenticatedUser || password !== "password123") {
        throw new Error("Invalid email or password")
      }

      setUser(authenticatedUser)
      localStorage.setItem("cryptodefi_user", JSON.stringify(authenticatedUser))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const signup = async (email: string, password: string, userData: { firstName: string; lastName: string }) => {
    setLoading(true)
    setError(null)

    try {
      // Simulate API call - replace with actual registration
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Check if user already exists (demo)
      const existingUsers = ["admin@cryptodefi.com", "user@cryptodefi.com", "premium@cryptodefi.com"]
      if (existingUsers.includes(email)) {
        throw new Error("User with this email already exists")
      }

      const newUser: User = {
        id: Date.now().toString(),
        email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: "user",
        isVerified: false,
        createdAt: new Date().toISOString(),
      }

      setUser(newUser)
      localStorage.setItem("cryptodefi_user", JSON.stringify(newUser))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("cryptodefi_user")
    setError(null)
  }

  const hasPermission = (permission: string): boolean => {
    if (!user) return false

    const permissions: Record<string, string[]> = {
      admin: ["read", "write", "delete", "admin", "trading", "analytics", "wallet"],
      premium: ["read", "write", "trading", "analytics", "wallet", "advanced_charts"],
      user: ["read", "trading", "wallet"],
    }

    return permissions[user.role]?.includes(permission) || false
  }

  const value: AuthContextType = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    hasPermission,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
