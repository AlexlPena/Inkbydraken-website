"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Lock } from "lucide-react"

export default function TestAdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Simulate login delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For test purposes, allow any login
      window.location.href = "/test/admin"
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.message || "Failed to sign in. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-gold/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/test" className="font-bold text-xl text-gold tracking-wider">
            INK<span className="text-white">BY</span>DRAKEN
            <span className="text-sm font-normal ml-2">Admin</span>
            <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded">TEST</span>
          </Link>
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-8">
          <Link href="/test" className="flex items-center gap-2 text-gold hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back to Test Home
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
              <span className="text-white">Test Admin</span> <span className="text-gold">Login</span>
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
                  placeholder="Enter any password for test"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gold text-black hover:bg-gold/80 border border-gold"
              >
                {isLoading ? "Signing in..." : "Test Login"}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                This is a test login page. Any email and password will work.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
