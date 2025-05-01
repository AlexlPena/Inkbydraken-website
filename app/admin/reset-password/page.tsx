"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Lock } from "lucide-react"
import { createBrowserClient } from "@/lib/supabase"

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Check if we have a session when the component mounts
  useEffect(() => {
    const checkSession = async () => {
      const supabase = createBrowserClient()
      const { data } = await supabase.auth.getSession()

      // If no session, this page was accessed directly without a reset link
      if (!data.session) {
        setError("Invalid or expired password reset link. Please try again.")
      }
    }

    checkSession()
  }, [])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    // Validate passwords
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match")
      setIsLoading(false)
      return
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long")
      setIsLoading(false)
      return
    }

    try {
      const supabase = createBrowserClient()

      // Update the password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (updateError) {
        throw updateError
      }

      setSuccess("Password updated successfully")

      // Redirect after a delay
      setTimeout(() => {
        router.push("/admin")
      }, 2000)
    } catch (err: any) {
      console.error("Error resetting password:", err)
      setError(err.message || "Failed to reset password")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-gold/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="font-bold text-xl text-gold tracking-wider">
            INK<span className="text-white">BY</span>DRAKEN <span className="text-sm font-normal ml-2">Admin</span>
          </Link>
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-8">
          <Link href="/admin/login" className="flex items-center gap-2 text-gold hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back to Login
          </Link>
        </div>

        <div className="max-w-md mx-auto mt-12">
          <div className="border-2 border-gold p-8 bg-secondary/50">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-full bg-gold/20 border border-gold flex items-center justify-center">
                <Lock className="h-8 w-8 text-gold" />
              </div>
            </div>

            <h1 className="text-2xl font-bold mb-6 text-center">
              <span className="text-white">Reset</span> <span className="text-gold">Password</span>
            </h1>

            {error && (
              <div className="bg-red-900/20 border border-red-500/50 p-4 mb-6 text-red-300 text-sm">{error}</div>
            )}

            {success && (
              <div className="bg-green-900/20 border border-green-500/50 p-4 mb-6 text-green-300 text-sm">
                {success}
              </div>
            )}

            <form onSubmit={handleResetPassword} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="new-password" className="text-sm font-medium">
                  New Password
                </label>
                <input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="flex h-10 w-full rounded-none border border-gold/50 bg-black px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="confirm-password" className="text-sm font-medium">
                  Confirm New Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="flex h-10 w-full rounded-none border border-gold/50 bg-black px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gold text-black hover:bg-gold/80 border border-gold"
              >
                {isLoading ? "Updating..." : "Reset Password"}
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
