import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get("Authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error("No valid authorization header")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Extract the token
    const token = authHeader.split(" ")[1]

    // Create Supabase client
    const supabase = createServerClient()

    // Verify the token by getting the user
    const { data: userData, error: userError } = await supabase.auth.getUser(token)

    if (userError || !userData.user) {
      console.error("Invalid token:", userError)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get the user's email
    const userEmail = userData.user.email

    if (!userEmail) {
      console.error("User has no email")
      return NextResponse.json({ error: "Unauthorized - Invalid user" }, { status: 401 })
    }

    // Verify the user is an admin by checking the user_roles table
    const { data: adminData, error: adminError } = await supabase
      .from("user_roles")
      .select("*")
      .eq("user_id", userData.user.id)
      .single()

    if (adminError || !adminData || !adminData.is_admin) {
      console.error("User is not an admin:", adminError || "No admin role found")
      return NextResponse.json({ error: "Unauthorized - Not an admin" }, { status: 403 })
    }

    // Get the request body
    const { id, status } = await request.json()

    if (!id || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Update the appointment status
    const { error } = await supabase.from("appointments").update({ status }).eq("id", id)

    if (error) {
      console.error("Error updating appointment status:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error in update-status API:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
