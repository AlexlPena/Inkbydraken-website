"use client"

import type React from "react"

import { useState } from "react"
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { confirmPayment } from "../actions/payment"

export default function PaymentForm({ paymentIntentId }: { paymentIntentId: string | null }) {
  const stripe = useStripe()
  const elements = useElements()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements || !paymentIntentId) {
      return
    }

    setIsProcessing(true)

    // Confirm the payment with Stripe.js
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment/success?payment_intent_id=${paymentIntentId}`,
      },
      redirect: "if_required",
    })

    if (error) {
      setErrorMessage(error.message || "An unexpected error occurred.")
      setIsProcessing(false)
      return
    }

    // If we get here, the payment succeeded but didn't require redirect
    // Call our server action to update the booking status
    await confirmPayment(paymentIntentId)
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement className="mb-6" />
      {errorMessage && (
        <div className="bg-red-900/20 border border-red-500/50 p-4 mb-6 text-red-300 text-sm">{errorMessage}</div>
      )}
      <Button
        type="submit"
        disabled={!stripe || !elements || isProcessing}
        className="w-full bg-gold text-black hover:bg-gold/80 border border-gold"
      >
        {isProcessing ? "Processing..." : "Pay Deposit"}
      </Button>
    </form>
  )
}
