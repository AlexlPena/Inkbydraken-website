import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function middleware(request: NextRequest) {
  // Create a response object that we'll use to handle cookies
  const response = NextResponse.next()

  // Check if we're already in a redirection loop
  const redirectCount = Number.parseInt(request.headers.get("x-redirect-count") || "0")
  if (redirectCount > 2) {
    console.error("Detected redirection loop, breaking out")
    return NextResponse.next()
  }

  // Check if Supabase environment variables are available
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase environment variables in middleware:", {
      url: supabaseUrl ? "✓" : "✗",
      key: supabaseAnonKey ? "✓" : "✗",
    })
    // If we can't check auth, just let the request through
    // The client-side code will handle the error
    return response
  }

  // Create a Supabase client configured to use cookies
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        // This is used for setting cookies in the response
        response.cookies.set(name, value, options)
      },
      remove(name: string, options: any) {
        // This is used for removing cookies in the response
        response.cookies.delete(name, options)
      },
    },
  })

  // Get the session from the request
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Log for debugging
  console.log("Middleware session check:", !!session, "Path:", request.nextUrl.pathname)

  // If there's no session and the request is for the admin page, redirect to login
  if (
    !session &&
    request.nextUrl.pathname.startsWith("/admin") &&
    !request.nextUrl.pathname.startsWith("/admin/login") &&
    !request.nextUrl.pathname.startsWith("/admin/reset-password")
  ) {
    const redirectUrl = new URL("/admin/login", request.url)
    redirectUrl.searchParams.set("redirectedFrom", request.nextUrl.pathname)

    // Add a header to track redirection count
    const redirectResponse = NextResponse.redirect(redirectUrl)
    redirectResponse.headers.set("x-redirect-count", (redirectCount + 1).toString())

    return redirectResponse
  }

  // If there is a session and the request is for the login page, redirect to admin
  if (session && request.nextUrl.pathname.startsWith("/admin/login")) {
    const redirectResponse = NextResponse.redirect(new URL("/admin", request.url))
    redirectResponse.headers.set("x-redirect-count", (redirectCount + 1).toString())
    return redirectResponse
  }

  return response
}

// Specify which routes this middleware should run on
export const config = {
  matcher: ["/admin/:path*"],
}
