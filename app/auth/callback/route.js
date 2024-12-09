import { createClient } from '@/libs/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  if (code) {
    const supabase = createClient()
    
    try {
      // Exchange the code for a session
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('Auth callback error:', error)
        return NextResponse.redirect(`${origin}/signin?error=Authentication failed`)
      }

      // Successful authentication
      return NextResponse.redirect(`${origin}/dashboard`)
    } catch (error) {
      console.error('Auth callback error:', error)
      return NextResponse.redirect(`${origin}/signin?error=Authentication failed`)
    }
  }

  // No code present, redirect to home page
  return NextResponse.redirect(origin)
} 