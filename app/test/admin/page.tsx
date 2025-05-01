"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, LogOut, RefreshCw } from "lucide-react"

type TestAppointment = {
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

// Sample test data
const sampleAppointments: TestAppointment[] = [
  {
    id: "1",
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    tattoo_type: "custom",
    description: "Small dragon design on upper arm",
    preferred_date: new Date().toISOString(),
    created_at: new Date().toISOString(),
    status: "pending",
  },
  {
    id: "2",
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
    phone: "(555) 987-6543",
    tattoo_type: "flash",
    description: "Rose design from flash sheet #3",
    preferred_date: new Date().toISOString(),
    created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    status: "confirmed",
  },
  {
    id: "3",
    first_name: "Alex",
    last_name: "Johnson",
    email: "alex.j@example.com",
    phone: "(555) 456-7890",
    tattoo_type: "cover-up",
    description: "Cover up old tribal tattoo on shoulder",
    preferred_date: new Date().toISOString(),
    created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    status: "cancelled",
  },
]

export default function TestAdminPage() {
  const [appointments, setAppointments] = useState<TestAppointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate loading appointments
    const loadAppointments = async () => {
      setLoading(true)
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setAppointments(sampleAppointments)
      } catch (err: any) {
        setError("Error loading test appointments")
      } finally {
        setLoading(false)
      }
    }

    loadAppointments()
  }, [])

  const updateStatus = (id: string, status: string) => {
    setAppointments(
      appointments.map((appointment) => (appointment.id === id ? { ...appointment, status } : appointment)),
    )
  }

  const handleLogout = () => {
    window.location.href = "/test/admin/login"
  }

  const handleRefresh = () => {
    setLoading(true)
    // Simulate refresh delay
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-gold/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/test" className="font-bold text-xl text-gold tracking-wider">
            INK<span className="text-white">BY</span>DRAKEN
            <span className="text-sm font-normal ml-2">Admin</span>
            <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded">TEST</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden md:inline-block">
              Logged in as: <span className="text-gold">test@example.com</span>
            </span>
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
          <Link href="/test" className="flex items-center gap-2 text-gold hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back to Test Home
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
          <span className="text-white">Test Appointment</span> <span className="text-gold">Requests</span>
        </h1>

        <div className="bg-black/50 border border-gold/30 p-4 mb-8">
          <p className="text-gray-300">
            This is a test admin panel with sample data. Changes you make here won't affect the real database.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gold border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-muted-foreground">Loading test appointments...</p>
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
            <p className="text-xl text-muted-foreground">No test appointment requests</p>
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
