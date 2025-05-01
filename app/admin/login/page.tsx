"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Lock } from "lucide-react"
import { createBrowserClient } from "@supabase/ssr"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingSession, setIsCheckingSession] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirectedFrom") || "/admin"

  // Check if already authenticated
  useEffect(() => {
    async function checkSession() {
      try {
        // Check if Supabase environment variables are available
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

        if (!supabaseUrl || !supabaseAnonKey) {
          console.error("Missing Supabase environment variables:", {
            url: supabaseUrl ? "✓" : "✗",
            key: supabaseAnonKey ? "✓" : "✗",
          })
          setError("Missing Supabase configuration. Please check your environment variables.")
          setIsCheckingSession(false)
          return
        }

        const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error("Error checking session:", error)
          setError(`Authentication error: ${error.message}`)
          setIsCheckingSession(false)
          return
        }

        if (data.session) {
          console.log("Session found, redirecting to:", redirectTo)
          // Use window.location for hard navigation
          window.location.href = redirectTo
          return
        }

        console.log("No session found, showing login form")
        setIsCheckingSession(false)
      } catch (err: any) {
        console.error("Error checking session:", err)
        setError(`Failed to check authentication: ${err.message}`)
        setIsCheckingSession(false)
      }
    }

    // Add a small delay to avoid race conditions with middleware
    const timer = setTimeout(() => {
      checkSession()
    }, 500)

    return () => clearTimeout(timer)
  }, [redirectTo])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Check if Supabase environment variables are available
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error("Missing Supabase environment variables")
      }

      console.log("Attempting login with:", { email })
      const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error("Login error:", error)
        throw error
      }

      if (data.session) {
        console.log("Login successful, redirecting to:", redirectTo)
        // Force a hard navigation instead of client-side navigation
        window.location.href = redirectTo
        return
      } else {
        throw new Error("No session returned after login")
      }
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.message || "Failed to sign in. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address first")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Check if Supabase environment variables are available
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error("Missing Supabase environment variables")
      }

      const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      })

      if (error) throw error

      alert("Password reset link sent to your email")
    } catch (err: any) {
      console.error("Error sending reset email:", err)
      setError(err.message || "Failed to send reset email")
    } finally {
      setIsLoading(false)
    }
  }

  if (isCheckingSession) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gold border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mb-4"></div>
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    )
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
          <Link href="/" className="flex items-center gap-2 text-gold hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back to Home
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
              <span className="text-white">Admin</span> <span className="text-gold">Login</span>
            </h1>

            {error && (
              <div className="bg-red-900/20 border border-red-500/50 p-4 mb-6 text-red-300 text-sm">{error}</div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex h-10 w-full rounded-none border border-gold/50 bg-black px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="admin@example.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="flex h-10 w-full rounded-none border border-gold/50 bg-black px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter your password"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gold text-black hover:bg-gold/80 border border-gold"
              >
                {isLoading ? "Signing in..." : "Login"}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <button type="button" onClick={handleForgotPassword} className="text-gold hover:underline text-sm">
                Forgot password?
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
