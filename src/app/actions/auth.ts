'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const next = formData.get('next') as string || '/profile'

  if (!email || !password) {
    return redirect(`/login?error=${encodeURIComponent("Email and password are required")}&next=${next}`)
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    let message = error.message
    if (message === 'Invalid login credentials') {
      message = 'Invalid email or password. Please try again.'
    }
    return redirect(`/login?error=${encodeURIComponent(message)}&next=${next}`)
  }

  revalidatePath('/', 'layout')
  redirect(next)
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string
  const fullName = formData.get('fullName') as string
  const next = formData.get('next') as string || '/profile'

  if (!email || !password || !confirmPassword || !fullName) {
    return redirect(`/signup?error=${encodeURIComponent("All fields are required")}&next=${next}`)
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return redirect(`/signup?error=${encodeURIComponent("Invalid email format")}&next=${next}`)
  }

  if (password !== confirmPassword) {
    return redirect(`/signup?error=${encodeURIComponent("Passwords do not match")}&next=${next}`)
  }

  if (password.length < 8) {
    return redirect(`/signup?error=${encodeURIComponent("Password must be at least 8 characters")}&next=${next}`)
  }

  const supabase = await createClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName
      }
    }
  })

  if (error) {
    let message = error.message
    if (message.includes('User already registered')) {
      message = 'An account with this email already exists.'
    }
    return redirect(`/signup?error=${encodeURIComponent(message)}&next=${next}`)
  }

  if (!data.session) {
    return redirect(`/signup?success=${encodeURIComponent("Please check your email to confirm your account.")}&next=${next}`)
  }

  revalidatePath('/', 'layout')
  redirect(next)
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}

export async function getProviderUrl(provider: 'google' | 'github', next: string = '/profile') {
  const supabase = await createClient()
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback?next=${encodeURIComponent(next)}`,
    },
  })

  if (error) {
    throw new Error(error.message)
  }

  if (data.url) {
    return data.url
  }
}
