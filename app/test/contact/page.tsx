"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Instagram, Mail, Phone, MapPin, ArrowLeft, AlertCircle } from "lucide-react"

export default function TestContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle form submission for test environment
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Simulate form submission delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success message
      setFormSubmitted(true)
    } catch (err: any) {
      console.error("Error submitting form:", err)
      setError(err.message || "An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // If form is submitted, show confirmation
  if (formSubmitted) {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b border-gold/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/test" className="font-bold text-xl text-gold tracking-wider">
                INK<span className="text-white">BY</span>DRAKEN
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded">TEST MODE</span>
              </Link>
            </div>
            <nav className="hidden md:flex gap-6">
              <Link href="/test" className="text-sm font-medium text-white hover:text-gold transition-colors">
                Home
              </Link>
              <Link href="/test/contact" className="text-sm font-medium text-gold transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center">
          <div className="container max-w-3xl py-16">
            <div className="bg-secondary/50 border-2 border-gold p-8 md:p-12 text-center">
              <div className="flex justify-center mb-6">
                <div className="h-20 w-20 rounded-full bg-green-900/20 border border-green-500/50 flex items-center justify-center">
                  <AlertCircle className="h-10 w-10 text-green-500" />
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-white">Test</span> <span className="text-gold">Submission</span>
              </h1>

              <p className="text-xl text-gray-300 mb-6">This is a test submission - no data was saved!</p>

              <div className="bg-black/50 border border-gold/30 p-6 mb-8 max-w-xl mx-auto">
                <p className="text-gray-300 mb-4">
                  In a real submission, your data would be saved to the database and you would be redirected to the
                  payment page.
                </p>
                <p className="text-gray-300">
                  This is just a test environment to try out the form without affecting real data.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="outline" className="border-gold text-gold hover:bg-gold/10">
                  <Link href="/test" className="flex items-center gap-2">
                    Return to Test Home
                  </Link>
                </Button>
                <Button asChild className="bg-gold text-black hover:bg-gold/80 border border-gold">
                  <Link href="/test/contact" className="flex items-center gap-2">
                    Try Again
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gold/30 py-6 bg-black">
          <div className="container text-center">
            <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} InkByDraken. All rights reserved.</p>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gold/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/test" className="font-bold text-xl text-gold tracking-wider">
              INK<span className="text-white">BY</span>DRAKEN
              <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded">TEST MODE</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/test" className="text-sm font-medium text-white hover:text-gold transition-colors">
              Home
            </Link>
            <Link href="/test/contact" className="text-sm font-medium text-gold transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button asChild className="bg-gold text-black hover:bg-gold/80 border border-gold">
              <Link href="/test/contact">Book Now</Link>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full md:hidden border-gold text-gold">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Contact Header */}
        <section className="py-12 bg-black border-b border-gold/30">
          <div className="container">
            <div className="flex flex-col items-center text-center">
              <Link href="/test" className="flex items-center gap-2 text-gold mb-6 hover:underline">
                <ArrowLeft className="h-4 w-4" /> Back to Test Home
              </Link>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                <span className="text-gold gold-glow">TEST</span> <span className="text-white">BOOKING FORM</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                This is a test booking form. Submissions here won't affect the real database.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">
                    <span className="text-white">TEST</span> <span className="text-gold">ENVIRONMENT</span>
                  </h2>
                  <p className="text-gray-300">
                    This is a test environment for the booking form. You can try out the form without affecting the real
                    database.
                  </p>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-gold" />
                    <p>Boston, MA 02108</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gold" />
                    <p>(555) 123-4567</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gold" />
                    <Link href="mailto:inkbydraken@outlook.com" className="hover:text-gold transition-colors">
                      inkbydraken@outlook.com
                    </Link>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-gold text-gold hover:bg-gold/10"
                    asChild
                  >
                    <Link href="https://www.instagram.com/inkbydraken/" target="_blank" rel="noopener noreferrer">
                      <Instagram className="h-5 w-5" />
                      <span className="sr-only">Instagram</span>
                    </Link>
                  </Button>
                </div>
              </div>

              <div>
                <form onSubmit={handleSubmit} className="space-y-6 border-2 border-gold p-6 bg-secondary/50">
                  <h2 className="text-2xl font-bold text-gold mb-6">Test Booking Request</h2>

                  {/* Form status message */}
                  {error && (
                    <div className="p-4 mb-4 flex items-start gap-3 bg-red-900/20 border border-red-500/50">
                      <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                      <p className="text-red-300">{error}</p>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="first-name" className="text-sm font-medium">
                        First Name
                      </label>
                      <input
                        id="first-name"
                        name="first-name"
                        required
                        className="flex h-10 w-full rounded-none border border-gold/50 bg-black px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="last-name" className="text-sm font-medium">
                        Last Name
                      </label>
                      <input
                        id="last-name"
                        name="last-name"
                        required
                        className="flex h-10 w-full rounded-none border border-gold/50 bg-black px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="flex h-10 w-full rounded-none border border-gold/50 bg-black px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="john.doe@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                      Phone Number <span className="text-xs text-muted-foreground">(Optional)</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="flex h-10 w-full rounded-none border border-gold/50 bg-black px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="(555) 123-4567"
                    />
                    <p className="text-xs text-muted-foreground">US format: (555) 123-4567 or 555-123-4567</p>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="tattoo-type" className="text-sm font-medium">
                      Tattoo Type
                    </label>
                    <select
                      id="tattoo-type"
                      name="tattoo-type"
                      required
                      defaultValue=""
                      className="flex h-10 w-full rounded-none border border-gold/50 bg-black px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="" disabled>
                        Select tattoo type
                      </option>
                      <option value="custom">Custom Design</option>
                      <option value="flash">Flash Design</option>
                      <option value="cover-up">Cover-Up</option>
                      <option value="consultation">Consultation Only</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">
                      Tattoo Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      required
                      className="flex min-h-[120px] w-full rounded-none border border-gold/50 bg-black px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Please describe your tattoo idea, size, placement, and any reference images you have."
                    ></textarea>
                  </div>

                  <div className="bg-black/50 border border-gold/30 p-4 text-sm text-gray-400">
                    <p className="mb-2">
                      <span className="text-gold font-medium">Test Mode:</span> This is a test form. No actual booking
                      or payment will be processed.
                    </p>
                    <p>In the real form, a $25 deposit would be required to secure your appointment.</p>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-gold text-black hover:bg-gold/80 border border-gold disabled:opacity-50"
                  >
                    {isSubmitting ? "Processing..." : "Submit Test Booking"}
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    This is a test form. No data will be saved to the database.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gold/30 py-8 bg-black">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start">
              <Link href="/test" className="font-bold text-xl text-gold tracking-wider">
                INK<span className="text-white">BY</span>DRAKEN
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded">TEST</span>
              </Link>
              <p className="text-gray-400 text-sm text-center md:text-left">
                Test environment - Changes here won't affect the production site.
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-gold text-gold hover:bg-gold/10"
                asChild
              >
                <Link href="https://www.instagram.com/inkbydraken/" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </Button>
            </div>
          </div>

          <div className="border-t border-gold/20 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} InkByDraken. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
