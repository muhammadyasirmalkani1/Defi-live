"use client"

import type React from "react"

import { useAuth } from "@/contexts/AuthContext"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock } from "lucide-react"

interface PermissionGateProps {
  permission: string
  children: React.ReactNode
  fallback?: React.ReactNode
  showError?: boolean
}

const PermissionGate: React.FC<PermissionGateProps> = ({ permission, children, fallback, showError = true }) => {
  const { hasPermission, user } = useAuth()

  if (!hasPermission(permission)) {
    if (fallback) {
      return <>{fallback}</>
    }

    if (showError) {
      return (
        <Alert className="border-crypto-orange/50 bg-crypto-orange/10">
          <Lock className="h-4 w-4" />
          <AlertDescription className="text-crypto-orange">
            <div className="space-y-1">
              <p className="font-semibold">Premium Feature</p>
              <p className="text-sm">
                This feature requires {permission} permission.
                {user?.role === "user" && " Upgrade to Premium to access advanced features."}
              </p>
            </div>
          </AlertDescription>
        </Alert>
      )
    }

    return null
  }

  return <>{children}</>
}

export default PermissionGate
