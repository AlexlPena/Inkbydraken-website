import { createClient } from "@supabase/supabase-js"
import { createBrowserClient as createSSRBrowserClient } from "@supabase/ssr"

// Create a single supabase client for the browser
export const createBrowserClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase environment variables. Check your .env file or Vercel environment variables.", {
      url: supabaseUrl ? "✓" : "✗",
      key: supabaseAnonKey ? "✓" : "✗",
    })
    throw new Error("Missing Supabase environment variables")
  }

  // Log for debugging
  console.log("Creating browser client with URL:", supabaseUrl ? "URL exists" : "URL missing")

  // Use the SSR browser client for better compatibility
  return createSSRBrowserClient(supabaseUrl, supabaseAnonKey)
}

// Create a single supabase client for server components
export const createServerClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error(
      "Missing Supabase environment variables for server client. Check your .env file or Vercel environment variables.",
      {
        url: supabaseUrl ? "✓" : "✗",
        key: supabaseServiceKey ? "✓" : "✗",
      },
    )
    throw new Error("Missing Supabase environment variables for server client")
  }

  // Log for debugging
  console.log("Creating server client with URL:", supabaseUrl ? "URL exists" : "URL missing")

  return createClient(supabaseUrl, supabaseServiceKey)
}
