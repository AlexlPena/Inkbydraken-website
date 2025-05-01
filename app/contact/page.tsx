"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Instagram, Mail, Phone, MapPin, ArrowLeft, AlertCircle } from "lucide-react"
import { createPaymentIntent } from "../actions/payment"

export default function ContactPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle form submission with payment
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const formData = new FormData(e.currentTarget)
      const result = await createPaymentIntent(formData)

      if (!result.success) {
        setError(result.message || "Failed to process booking. Please try again.")
        return
      }

      // Redirect to payment page with client secret
      router.push(
        `/payment?client_secret=${result.clientSecret}&payment_intent_id=${result.paymentIntentId}&amount=${result.depositAmount}`,
      )
    } catch (err: any) {
      console.error("Error submitting form:", err)
      setError(err.message || "An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gold/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-bold text-xl text-gold tracking-wider">
              INK<span className="text-white">BY</span>DRAKEN
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium text-white hover:text-gold transition-colors">
              Home
            </Link>
            <Link href="/contact" className="text-sm font-medium text-gold transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button asChild className="bg-gold text-black hover:bg-gold/80 border border-gold">
              <Link href="/contact">Book Now</Link>
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
              <Link href="/" className="flex items-center gap-2 text-gold mb-6 hover:underline">
                <ArrowLeft className="h-4 w-4" /> Back to Home
              </Link>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                <span className="text-gold gold-glow">BOOK</span> <span className="text-white">YOUR SESSION</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                Ready to bring your tattoo vision to life? Fill out the form below to request a consultation or
                appointment.
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
                    <span className="text-white">GET IN</span> <span className="text-gold">TOUCH</span>
                  </h2>
                  <p className="text-gray-300">
                    Have questions or ready to schedule your tattoo session? I'm here to help you create a design that's
                    perfect for you.
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
                  <h2 className="text-2xl font-bold text-gold mb-6">Booking Request</h2>

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
                      <span className="text-gold font-medium">Booking Deposit:</span> A non-refundable deposit of $25 is
                      required to secure your appointment.
                    </p>
                    <p>
                      This deposit will be applied to the final cost of your tattoo. The remaining balance will be due
                      on the day of your appointment.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-gold text-black hover:bg-gold/80 border border-gold disabled:opacity-50"
                  >
                    {isSubmitting ? "Processing..." : "Book & Pay $25 Deposit"}
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-black border-t border-gold/30">
          <div className="container">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                <span className="text-white">FREQUENTLY</span> <span className="text-gold">ASKED QUESTIONS</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Have questions about getting a tattoo? Find answers to common questions below.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  question: "What is your tattoo style?",
                  answer:
                    "I specialize in black and white line work with a modern, elegant aesthetic. My style focuses on clean lines, bold contrasts, and thoughtful negative space.",
                },
                {
                  question: "How much does a tattoo cost?",
                  answer:
                    "Pricing varies based on size, complexity, and placement. I charge an hourly rate for larger pieces and have minimum charges for smaller work. A detailed quote will be provided during your consultation.",
                },
                {
                  question: "Do I need to make a deposit?",
                  answer:
                    "Yes, a non-refundable deposit of $25 is required to secure your appointment. This deposit is applied to the final cost of your tattoo.",
                },
                {
                  question: "How should I prepare for my tattoo session?",
                  answer:
                    "Get a good night's sleep, eat a meal before your appointment, stay hydrated, and wear comfortable clothing that provides easy access to the tattoo area.",
                },
                {
                  question: "What is your aftercare process?",
                  answer:
                    "I'll provide detailed aftercare instructions after your session. Generally, it involves keeping the area clean, applying recommended ointment, avoiding sun exposure, and not submerging in water for 2-3 weeks.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="border border-gold/50 hover:border-gold transition-all duration-300 p-6 bg-secondary/30"
                >
                  <h3 className="text-lg font-medium text-gold mb-2">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gold/30 py-8 bg-black">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start">
              <Link href="/" className="font-bold text-xl text-gold tracking-wider mb-2">
                INK<span className="text-white">BY</span>DRAKEN
              </Link>
              <p className="text-gray-400 text-sm text-center md:text-left">
                Modern black & white line tattoos with elegance and precision.
              </p>
            </div>

            <div className="flex gap-8">
              <div className="space-y-2">
                <h3 className="font-bold text-gold">Links</h3>
                <ul className="space-y-1">
                  <li>
                    <Link href="/" className="text-gray-400 hover:text-gold transition-colors text-sm">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-gray-400 hover:text-gold transition-colors text-sm">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-gold">Contact</h3>
                <ul className="space-y-1">
                  <li className="text-gray-400 text-sm">
                    <Link href="mailto:inkbydraken@outlook.com" className="hover:text-gold transition-colors">
                      inkbydraken@outlook.com
                    </Link>
                  </li>
                  <li className="text-gray-400 text-sm">Boston, MA 02108</li>
                </ul>
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

          <div className="border-t border-gold/20 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} InkByDraken. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
