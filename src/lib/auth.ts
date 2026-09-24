import { cookies } from 'next/headers';
import { db } from '../db';
import { sessions, users, profiles, rateLimits } from '../db/schema';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

export async function createSession(userId: string) {
  const sessionId = uuidv4(); // standard UUID is sufficiently random
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30); // 30 days

  await db.insert(sessions).values({
    id: sessionId,
    userId,
    expiresAt,
  });

  const cookieStore = await cookies();
  cookieStore.set('session', sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
  });

  return sessionId;
}

export async function validateSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session')?.value;

  if (!sessionId) return null;

  const sessionList = await db.select().from(sessions).where(eq(sessions.id, sessionId));
  const session = sessionList[0];

  if (!session) return null;

  if (session.expiresAt.getTime() < Date.now()) {
    await db.delete(sessions).where(eq(sessions.id, sessionId));
    return null;
  }

  const userList = await db.select().from(users).where(eq(users.id, session.userId));
  if (!userList[0]) return null;
  
  const profileList = await db.select().from(profiles).where(eq(profiles.id, session.userId));
  const profile = profileList[0] || null;

  // If suspended, invalidate session
  if (profile?.isSuspended) {
    await db.delete(sessions).where(eq(sessions.id, sessionId));
    return null;
  }

  return { session, user: userList[0], profile };
}

export async function invalidateSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session')?.value;

  if (sessionId) {
    await db.delete(sessions).where(eq(sessions.id, sessionId));
  }

  cookieStore.delete('session');
}

export async function checkRateLimit(key: string, maxPoints: number, windowSeconds: number): Promise<boolean> {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + windowSeconds * 1000);

  const existing = await db.select().from(rateLimits).where(eq(rateLimits.key, key));

  if (existing.length === 0) {
    await db.insert(rateLimits).values({
      key,
      points: 1,
      expiresAt,
    });
    return true;
  }

  const record = existing[0];
  if (record.expiresAt.getTime() < now.getTime()) {
    await db.update(rateLimits).set({
      points: 1,
      expiresAt,
    }).where(eq(rateLimits.key, key));
    return true;
  }

  if (record.points >= maxPoints) {
    return false;
  }

  await db.update(rateLimits).set({
    points: record.points + 1,
  }).where(eq(rateLimits.key, key));

  return true;
}
