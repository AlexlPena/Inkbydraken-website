"use server"

import { createServerClient } from "@/lib/supabase"

export type BookingFormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  tattooType: string
  description: string
}

export async function submitBooking(prevState: any, formData: FormData) {
  try {
    // Extract form data
    const firstName = formData.get("first-name") as string
    const lastName = formData.get("last-name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const tattooType = formData.get("tattoo-type") as string
    const description = formData.get("description") as string

    // Validate form data
    if (!firstName || !lastName || !email || !tattooType || !description) {
      return {
        success: false,
        message: "All required fields must be filled",
      }
    }

    // Validate phone number format if provided
    if (phone && phone.trim() !== "") {
      const phoneRegex = /^(\+1|1)?[-. ]?($$[0-9]{3}$$|[0-9]{3})[-. ]?[0-9]{3}[-. ]?[0-9]{4}$/
      if (!phoneRegex.test(phone)) {
        return {
          success: false,
          message: "Please enter a valid US phone number or leave it blank",
        }
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: "Please enter a valid email address",
      }
    }

    // Create Supabase client
    const supabase = createServerClient()

    // Set today's date as the preferred date
    const today = new Date()
    const preferredDate = today.toISOString().split("T")[0]

    // Insert data into the appointments table
    const { error, data } = await supabase
      .from("appointments")
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone: phone && phone.trim() !== "" ? phone : "Not provided", // Ensure a value is always provided
        tattoo_type: tattooType,
        description,
        preferred_date: preferredDate, // Use today's date as default
      })
      .select()

    if (error) {
      console.error("Error submitting booking:", error)
      return {
        success: false,
        message: "Failed to submit booking. Please try again.",
      }
    }

    // Log successful submission for debugging
    console.log("Booking submitted successfully:", data)

    // Return success state instead of redirecting
    return {
      success: true,
      message: "Booking submitted successfully!",
    }
  } catch (error) {
    console.error("Error in submitBooking:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    }
  }
}
