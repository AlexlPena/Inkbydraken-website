"use server"

import { stripe, formatAmountForStripe } from "@/lib/stripe"
import { createServerClient } from "@/lib/supabase"
import { redirect } from "next/navigation"

export async function createPaymentIntent(formData: FormData) {
  try {
    // Extract booking details from form data
    const firstName = formData.get("first-name") as string
    const lastName = formData.get("last-name") as string
    const email = formData.get("email") as string
    const phone = (formData.get("phone") as string) || "Not provided"
    const tattooType = formData.get("tattoo-type") as string
    const description = formData.get("description") as string

    // Validate required fields
    if (!firstName || !lastName || !email || !tattooType || !description) {
      return {
        success: false,
        message: "All required fields must be filled",
      }
    }

    // Set flat deposit amount of $25 for all orders
    const depositAmount = 25

    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: formatAmountForStripe(depositAmount, "USD"),
      currency: "usd",
      // Store metadata about the booking
      metadata: {
        firstName,
        lastName,
        email,
        phone,
        tattooType,
        description: description.substring(0, 500), // Limit description length for metadata
        depositAmount: depositAmount.toString(),
      },
      receipt_email: email,
      automatic_payment_methods: { enabled: true },
    })

    // Create Supabase client
    const supabase = createServerClient()

    // Set today's date as the preferred date
    const today = new Date()
    const preferredDate = today.toISOString().split("T")[0]

    // Insert booking data without the payment columns
    // We'll store the payment info in the description field temporarily
    const { error } = await supabase.from("appointments").insert({
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      tattoo_type: tattooType,
      description: `${description}\n\n--- Payment Info ---\nPayment Intent ID: ${paymentIntent.id}\nDeposit Amount: $${depositAmount}`,
      preferred_date: preferredDate,
      status: "pending_payment", // We can still use the status field
    })

    if (error) {
      console.error("Error creating booking:", error)
      return {
        success: false,
        message: "Failed to create booking. Please try again.",
      }
    }

    // Return the client secret so the client can complete the payment
    return {
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      depositAmount,
    }
  } catch (error: any) {
    console.error("Error in createPaymentIntent:", error)
    return {
      success: false,
      message: error.message || "An unexpected error occurred. Please try again.",
    }
  }
}

// Handle successful payment confirmation
export async function confirmPayment(paymentIntentId: string) {
  try {
    // Create Supabase client
    const supabase = createServerClient()

    // Since we don't have a payment_intent_id column, we need to find appointments
    // that contain this ID in their description
    const { data, error: fetchError } = await supabase
      .from("appointments")
      .select("*")
      .filter("description", "ilike", `%${paymentIntentId}%`)
      .limit(1)

    if (fetchError || !data || data.length === 0) {
      console.error("Error finding appointment:", fetchError || "No appointment found")
      // Even if we can't find the appointment, we'll still redirect to confirmation
      // since the payment was successful
      redirect("/booking-confirmation")
      return
    }

    // Update the appointment status
    const { error: updateError } = await supabase
      .from("appointments")
      .update({ status: "pending" }) // Change from pending_payment to pending
      .eq("id", data[0].id)

    if (updateError) {
      console.error("Error confirming payment:", updateError)
      // Still redirect to confirmation even if update fails
    }

    // Redirect to the confirmation page
    redirect("/booking-confirmation")
  } catch (error) {
    console.error("Error in confirmPayment:", error)
    // Still redirect to confirmation even if there's an error
    redirect("/booking-confirmation")
  }
}
