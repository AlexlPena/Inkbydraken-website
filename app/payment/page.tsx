"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import PaymentForm from "./payment-form"

// Load Stripe outside of component render to avoid recreating Stripe object on each render
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

export default function PaymentPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null)
  const [depositAmount, setDepositAmount] = useState<number>(25) // Default to $25
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    // Get the client secret, payment intent ID, and deposit amount from URL params
    const secret = searchParams.get("client_secret")
    const intentId = searchParams.get("payment_intent_id")
    const amount = searchParams.get("amount")

    if (!secret || !intentId) {
      setError("Invalid payment information. Please try booking again.")
      return
    }

    setClientSecret(secret)
    setPaymentIntentId(intentId)

    // If amount is provided, use it, otherwise default to $25
    if (amount) {
      setDepositAmount(Number.parseFloat(amount))
    }
  }, [searchParams])

  // If there's an error or no client secret, show an error message
  if (error || !clientSecret) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full border-b border-gold/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/" className="font-bold text-xl text-gold tracking-wider">
                INK<span className="text-white">BY</span>DRAKEN
              </Link>
            </div>
          </div>
        </header>

        <main className="container py-12">
          <div className="mb-8">
            <Link href="/contact" className="flex items-center gap-2 text-gold hover:underline">
              <ArrowLeft className="h-4 w-4" /> Back to Booking
            </Link>
          </div>

          <div className="max-w-md mx-auto bg-secondary/50 border-2 border-gold p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">
              <span className="text-white">Payment</span> <span className="text-gold">Error</span>
            </h1>
            <p className="text-gray-300 mb-6">{error || "Something went wrong with the payment setup."}</p>
            <Button asChild className="bg-gold text-black hover:bg-gold/80 border border-gold">
              <Link href="/contact">Return to Booking</Link>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-gold/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-bold text-xl text-gold tracking-wider">
              INK<span className="text-white">BY</span>DRAKEN
            </Link>
          </div>
        </div>
      </header>

      <main className="container py-12">
        <div className="mb-8">
          <Link href="/contact" className="flex items-center gap-2 text-gold hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back to Booking
          </Link>
        </div>

        <div className="max-w-md mx-auto">
          <div className="bg-secondary/50 border-2 border-gold p-8">
            <h1 className="text-2xl font-bold mb-6 text-center">
              <span className="text-white">Booking</span> <span className="text-gold">Deposit</span>
            </h1>

            <div className="mb-8">
              <p className="text-gray-300 mb-4">
                To secure your tattoo appointment, a non-refundable deposit of{" "}
                <span className="text-gold font-semibold">${depositAmount.toFixed(2)}</span> is required.
              </p>
              <p className="text-gray-300 mb-4">
                This deposit will be applied to the final cost of your tattoo. The remaining balance will be due on the
                day of your appointment.
              </p>
              <div className="bg-black/50 border border-gold/30 p-4 text-sm text-gray-400">
                <p>
                  <span className="text-gold">Note:</span> Deposits are non-refundable but can be transferred to a
                  rescheduled appointment with at least 48 hours notice.
                </p>
              </div>
            </div>

            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: "night",
                  variables: {
                    colorPrimary: "#AB8D3F",
                    colorBackground: "#121212",
                    colorText: "#ffffff",
                    colorDanger: "#ff4444",
                    fontFamily: "Inter, system-ui, sans-serif",
                    borderRadius: "4px",
                  },
                },
              }}
            >
              <PaymentForm paymentIntentId={paymentIntentId} />
            </Elements>
          </div>
        </div>
      </main>
    </div>
  )
}
