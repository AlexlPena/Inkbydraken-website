import { NextResponse } from "next/server"
import { Pool } from "pg"
import { cookies } from "next/headers"
import { createClient } from "@supabase/supabase-js"

// Create a PostgreSQL pool
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

export async function GET() {
  try {
    // Get the session cookie to verify authentication
    const cookieStore = cookies()
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Missing Supabase environment variables")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    // First check if the user is authenticated
    const authClient = createClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set() {
          /* This is not used in this context */
        },
        remove() {
          /* This is not used in this context */
        },
      },
    })

    const {
      data: { session },
    } = await authClient.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Direct database query using pg
    const client = await pool.connect()
    try {
      const result = await client.query("SELECT * FROM appointments ORDER BY created_at DESC")
      return NextResponse.json(result.rows)
    } finally {
      client.release()
    }
  } catch (error: any) {
    console.error("Error in direct-appointments API:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
