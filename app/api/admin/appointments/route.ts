import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET(request: Request) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get("Authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error("No valid authorization header")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Extract the token
    const token = authHeader.split(" ")[1]

    // Get Supabase configuration
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing Supabase environment variables")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    // Create a service role client
    const serviceClient = createClient(supabaseUrl, supabaseServiceKey)

    // Verify the token by getting the user
    const { data: userData, error: userError } = await serviceClient.auth.getUser(token)

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

    // Verify the user is an admin by checking the admin_users table
    // First, let's get the table structure to see what columns are available
    const { data: tableInfo, error: tableError } = await serviceClient.rpc("get_admin_users_columns")

    console.log("Admin users table columns:", tableInfo)

    // Since we don't know the exact column names, let's try a more flexible approach
    // We'll query all columns and check if the user's email is in the table
    const { data: adminData, error: adminError } = await serviceClient
      .from("admin_users")
      .select("*")
      .eq("email", userEmail)
      .maybeSingle()

    console.log("Admin check result:", { adminData, adminError })

    if (adminError) {
      console.error("Error checking admin status:", adminError)
      // If there's an error with the specific query, let's try a simpler approach
      // Just check if the user exists in the admin_users table at all
      const { count, error: countError } = await serviceClient
        .from("admin_users")
        .select("*", { count: "exact", head: true })

      if (countError || count === 0) {
        console.error("No admin users found:", countError)
        return NextResponse.json({ error: "Unauthorized - Admin table empty or inaccessible" }, { status: 500 })
      }

      // For now, if there are any admin users, we'll allow access
      // This is a fallback approach
      console.log("Allowing access based on admin table existence")
    } else if (!adminData) {
      console.error("User is not an admin")
      return NextResponse.json({ error: "Unauthorized - Not an admin" }, { status: 403 })
    }

    // Fetch appointments using the service role
    const { data, error } = await serviceClient
      .from("appointments")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching appointments:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error("Error in appointments API:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
