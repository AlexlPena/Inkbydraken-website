"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { confirmPayment } from "@/app/actions/payment"

export default function PaymentSuccessPage() {
  const [isProcessing, setIsProcessing] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    async function handlePaymentSuccess() {
      try {
        const paymentIntentId = searchParams.get("payment_intent_id")

        if (!paymentIntentId) {
          setError(
            "Payment information is missing. Your payment may have been processed, but please contact us to confirm your booking.",
          )
          setIsProcessing(false)
          return
        }

        // Call our server action to update the booking status
        await confirmPayment(paymentIntentId)

        // If we reach here without redirecting, something went wrong
        setError(
          "Your payment was successful, but we couldn't update your booking status. Please contact us to confirm your booking.",
        )
      } catch (err) {
        console.error("Error confirming payment:", err)
        setError("Your payment was successful, but we encountered an error. Please contact us to confirm your booking.")
      } finally {
        setIsProcessing(false)
      }
    }

    handlePaymentSuccess()
  }, [searchParams])

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gold border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mb-4"></div>
          <p className="text-muted-foreground">Confirming your payment...</p>
        </div>
      </div>
    )
  }

  if (error) {
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
          <div className="max-w-md mx-auto bg-secondary/50 border-2 border-gold p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">
              <span className="text-white">Payment</span> <span className="text-gold">Received</span>
            </h1>
            <p className="text-gray-300 mb-6">{error}</p>
            <Button asChild className="bg-gold text-black hover:bg-gold/80 border border-gold">
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  // This should not be reached as confirmPayment should redirect
  return null
}
