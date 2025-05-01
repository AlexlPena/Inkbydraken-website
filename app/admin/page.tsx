"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, LogOut, RefreshCw } from "lucide-react"
import { createBrowserClient as createSupabaseClient } from "@supabase/ssr"

type Appointment = {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  tattoo_type: string
  description: string
  preferred_date: string
  created_at: string
  status: string
}

export default function AdminPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [accessToken, setAccessToken] = useState<string | null>(null)

  useEffect(() => {
    async function initialize() {
      try {
        // Add a small delay to avoid race conditions with middleware
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Check if Supabase environment variables are available
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

        if (!supabaseUrl || !supabaseAnonKey) {
          console.error("Missing Supabase environment variables:", {
            url: supabaseUrl ? "✓" : "✗",
            key: supabaseAnonKey ? "✓" : "✗",
          })
          setError("Missing Supabase configuration. Please check your environment variables.")
          setLoading(false)
          return
        }

        // Check if user is authenticated
        const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey)
        const { data, error: sessionError } = await supabase.auth.getSession()

        if (sessionError) {
          console.error("Session error:", sessionError)
          setError(`Authentication error: ${sessionError.message}`)
          setLoading(false)
          return
        }

        if (!data.session) {
          console.log("No session found, redirecting to login")
          window.location.href = "/admin/login"
          return
        }

        // Set user email and access token for API requests
        setUserEmail(data.session.user.email)
        setAccessToken(data.session.access_token)
        setIsAuthenticated(true)

        // Fetch appointments using API route only
        await fetchAppointments(data.session.access_token)
      } catch (err: any) {
        console.error("Error initializing admin page:", err)
        setError(`Failed to initialize admin page: ${err.message}`)
        setLoading(false)
      }
    }

    initialize()
  }, [])

  async function fetchAppointments(token: string | null = accessToken) {
    if (!token) {
      setError("No authentication token available")
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Skip direct fetch and use only the API route
      console.log("Using API route for appointments")
      const response = await fetch("/api/admin/simple-appointments", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache",
        },
      })

      if (!response.ok) {
        let errorMessage = `Failed to fetch appointments: ${response.status} ${response.statusText}`

        try {
          const errorData = await response.json()
          errorMessage += ` - ${JSON.stringify(errorData)}`
        } catch (e) {
          // If we can't parse the JSON, just use the status
        }

        throw new Error(errorMessage)
      }

      const data = await response.json()
      console.log("API route successful:", data.length, "appointments")
      setAppointments(data || [])
    } catch (err: any) {
      console.error("Error fetching appointments:", err)
      setError(`Failed to load appointments: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  async function updateStatus(id: string, status: string) {
    if (!accessToken) {
      setError("No authentication token available")
      return
    }

    try {
      // Update local state immediately for responsive UI
      setAppointments(
        appointments.map((appointment) => (appointment.id === id ? { ...appointment, status } : appointment)),
      )

      // Try direct update first
      try {
        console.log("Updating status directly in database")
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

        if (!supabaseUrl || !supabaseAnonKey) {
          throw new Error("Missing Supabase environment variables")
        }

        const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey)
        const { error } = await supabase.from("appointments").update({ status }).eq("id", id)

        if (error) throw error

        console.log("Direct update successful")
        return
      } catch (directError) {
        console.error("Direct update failed:", directError)
        // Fall back to API route
      }

      // If direct update fails, use the API route
      console.log("Falling back to API route for status update")
      const response = await fetch("/api/admin/update-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ id, status }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(`API update failed: ${response.status} ${JSON.stringify(errorData)}`)
      }

      console.log("API update successful")
    } catch (err: any) {
      console.error("Error updating appointment status:", err)
      setError(`Failed to update appointment status: ${err.message}`)

      // Revert the local state change since the update failed
      await fetchAppointments()
    }
  }

  const handleLogout = async () => {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error("Missing Supabase environment variables")
      }

      const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey)
      await supabase.auth.signOut()
      window.location.href = "/admin/login"
    } catch (err: any) {
      console.error("Error signing out:", err)
      setError(`Failed to sign out: ${err.message}`)
    }
  }

  const handleRefresh = () => {
    fetchAppointments()
  }

  // If not authenticated yet, show loading
  if (!isAuthenticated && loading) {
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
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="font-bold text-xl text-gold tracking-wider">
            INK<span className="text-white">BY</span>DRAKEN <span className="text-sm font-normal ml-2">Admin</span>
          </Link>
          <div className="flex items-center gap-4">
            {userEmail && (
              <span className="text-sm text-muted-foreground hidden md:inline-block">
                Logged in as: <span className="text-gold">{userEmail}</span>
              </span>
            )}
            <Button variant="outline" size="sm" asChild className="border-gold/50 text-gold hover:bg-gold/10">
              <Link href="/admin/change-password">Change Password</Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-gold/50 text-gold hover:bg-gold/10 flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-8 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-gold hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>

          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="border-gold/50 text-gold hover:bg-gold/10 flex items-center gap-2"
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
        </div>

        <h1 className="text-3xl font-bold mb-8">
          <span className="text-white">Appointment</span> <span className="text-gold">Requests</span>
        </h1>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gold border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-muted-foreground">Loading appointments...</p>
          </div>
        ) : error ? (
          <div className="bg-red-900/20 border border-red-500/50 p-4 rounded-md">
            <p className="text-red-300">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="mt-4 border-gold/50 text-gold hover:bg-gold/10"
            >
              Try Again
            </Button>
          </div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-12 border border-gold/30 bg-secondary/20">
            <p className="text-xl text-muted-foreground">No appointment requests yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gold/30">
                  <th className="py-3 px-4 text-left text-gold">Name</th>
                  <th className="py-3 px-4 text-left text-gold">Contact</th>
                  <th className="py-3 px-4 text-left text-gold">Tattoo Type</th>
                  <th className="py-3 px-4 text-left text-gold">Date</th>
                  <th className="py-3 px-4 text-left text-gold">Status</th>
                  <th className="py-3 px-4 text-left text-gold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="border-b border-gold/10 hover:bg-secondary/10">
                    <td className="py-4 px-4">
                      <div className="font-medium">
                        {appointment.first_name} {appointment.last_name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(appointment.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>{appointment.email}</div>
                      <div className="text-sm text-muted-foreground">{appointment.phone}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div>{appointment.tattoo_type}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div>{new Date(appointment.preferred_date).toLocaleDateString()}</div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          appointment.status === "confirmed"
                            ? "bg-green-900/30 text-green-300 border border-green-500/30"
                            : appointment.status === "cancelled"
                              ? "bg-red-900/30 text-red-300 border border-red-500/30"
                              : "bg-yellow-900/30 text-yellow-300 border border-yellow-500/30"
                        }`}
                      >
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-green-500/50 text-green-400 hover:bg-green-900/20 hover:text-green-300"
                          onClick={() => updateStatus(appointment.id, "confirmed")}
                          disabled={appointment.status === "confirmed"}
                        >
                          Confirm
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-500/50 text-red-400 hover:bg-red-900/20 hover:text-red-300"
                          onClick={() => updateStatus(appointment.id, "cancelled")}
                          disabled={appointment.status === "cancelled"}
                        >
                          Cancel
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
