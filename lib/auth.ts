import { createBrowserClient } from "@supabase/ssr"

// Sign in with email and password
export async function signInWithEmail(email: string, password: string) {
  const supabase = createBrowserClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  // Log the response for debugging
  console.log("Auth response:", { data, error })

  return { data, error }
}

// Sign out
export async function signOut() {
  const supabase = createBrowserClient()

  const { error } = await supabase.auth.signOut()

  return { error }
}

// Get current session
export async function getSession() {
  const supabase = createBrowserClient()

  const { data, error } = await supabase.auth.getSession()

  // Log the session for debugging
  console.log("Session data:", data)

  return { session: data.session, error }
}

// Get current user
export async function getUser() {
  const supabase = createBrowserClient()

  const { data, error } = await supabase.auth.getUser()

  return { user: data.user, error }
}
