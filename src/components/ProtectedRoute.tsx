"use client"

import type React from "react"

import { useAuth } from "@/contexts/AuthContext"
import AuthForm from "@/components/AuthForm"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredPermission?: string
  fallback?: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredPermission, fallback }) => {
  const { isAuthenticated, hasPermission, user } = useAuth()

  // If not authenticated, show login form
  if (!isAuthenticated) {
    return fallback || <AuthForm />
  }

  // If specific permission is required and user doesn't have it
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
        <div className="max-w-md w-full">
          <Alert className="border-crypto-red/50 bg-crypto-red/10">
            <Lock className="h-4 w-4" />
            <AlertDescription className="text-crypto-red">
              <div className="space-y-2">
                <p className="font-semibold">Access Denied</p>
                <p>You don't have permission to access this feature.</p>
                <p className="text-sm">
                  Current role: <span className="font-medium capitalize">{user?.role}</span>
                </p>
                <p className="text-sm">
                  Required permission: <span className="font-medium">{requiredPermission}</span>
                </p>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default ProtectedRoute
