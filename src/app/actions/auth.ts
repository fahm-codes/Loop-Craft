'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { db } from '@/db'
import { users, profiles } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { hashPassword, verifyPassword, createSession, invalidateSession, checkRateLimit } from '@/lib/auth'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const next = formData.get('next') as string || '/profile'

  if (!email || !password) {
    return redirect(`/login?error=${encodeURIComponent("Email and password are required")}&next=${next}`)
  }

  // Rate Limiting by IP (approximate)
  const headerStore = await headers();
  const ip = headerStore.get('x-forwarded-for') || '127.0.0.1';
  const rateLimitKey = `login_${ip}_${email}`;
  const isAllowed = await checkRateLimit(rateLimitKey, 100, 60 * 15); // 100 attempts per 15 minutes
  if (!isAllowed) {
    return redirect(`/login?error=${encodeURIComponent("Too many login attempts. Please try again later.")}&next=${next}`)
  }

  const existingUsers = await db.select().from(users).where(eq(users.email, email.toLowerCase()));
  const user = existingUsers[0];

  if (!user) {
    return redirect(`/login?error=${encodeURIComponent("Invalid email or password. Please try again.")}&next=${next}`)
  }

  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) {
    return redirect(`/login?error=${encodeURIComponent("Invalid email or password. Please try again.")}&next=${next}`)
  }

  await createSession(user.id);

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

  // Rate Limiting by IP
  const headerStore = await headers();
  const ip = headerStore.get('x-forwarded-for') || '127.0.0.1';
  const rateLimitKey = `signup_${ip}`;
  const isAllowed = await checkRateLimit(rateLimitKey, 500, 60 * 60); // 500 signups per hour per IP for testing
  if (!isAllowed) {
    return redirect(`/signup?error=${encodeURIComponent("Too many signup attempts. Please try again later.")}&next=${next}`)
  }

  const normalizedEmail = email.toLowerCase();

  const existingUsers = await db.select().from(users).where(eq(users.email, normalizedEmail));
  if (existingUsers.length > 0) {
    return redirect(`/signup?error=${encodeURIComponent("An account with this email already exists.")}&next=${next}`)
  }

  const passwordHash = await hashPassword(password);

  const newUsers = await db.insert(users).values({
    email: normalizedEmail,
    passwordHash,
  }).returning({ id: users.id });

  const userId = newUsers[0].id;

  await db.insert(profiles).values({
    id: userId,
    email: normalizedEmail,
    fullName,
    role: 'LEARNER'
  });

  await createSession(userId);

  revalidatePath('/', 'layout')
  redirect(next)
}

export async function logout() {
  await invalidateSession()
  redirect('/')
}

export async function getProviderUrl(provider: 'google' | 'github', next: string = '/profile') {
  // OAuth is disabled
  throw new Error("Social login is disabled.")
}
