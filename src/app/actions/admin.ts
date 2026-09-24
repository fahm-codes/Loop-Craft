'use server';

import { db } from '@/db';
import { profiles, users, roadmaps, dsaSheets } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { validateSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

function hasAdminAccess(role: string) {
  return ['SUPER_ADMIN', 'ADMIN'].includes(role);
}

export async function updateUserRole(userId: string, newRole: string) {
  const sessionData = await validateSession();
  if (!sessionData || !hasAdminAccess(sessionData.profile.role)) {
    throw new Error('Unauthorized');
  }

  const targetUserRes = await db.select().from(profiles).where(eq(profiles.id, userId));
  const targetUser = targetUserRes[0];

  if (!targetUser) throw new Error('User not found');

  if (targetUser.role === 'SUPER_ADMIN' && sessionData.profile.role !== 'SUPER_ADMIN') {
    throw new Error('Cannot modify SUPER_ADMIN');
  }

  await db.update(profiles).set({ role: newRole as any }).where(eq(profiles.id, userId));
  revalidatePath('/admin/users');
  revalidatePath(`/admin/users/${userId}`);
}

export async function toggleUserSuspension(userId: string, suspend: boolean) {
  const sessionData = await validateSession();
  if (!sessionData || !hasAdminAccess(sessionData.profile.role)) {
    throw new Error('Unauthorized');
  }

  const targetUserRes = await db.select().from(profiles).where(eq(profiles.id, userId));
  const targetUser = targetUserRes[0];

  if (!targetUser) throw new Error('User not found');

  if (targetUser.role === 'SUPER_ADMIN' && sessionData.profile.role !== 'SUPER_ADMIN') {
    throw new Error('Cannot modify SUPER_ADMIN');
  }

  await db.update(profiles).set({ isSuspended: suspend }).where(eq(profiles.id, userId));
  revalidatePath('/admin/users');
  revalidatePath(`/admin/users/${userId}`);
}

export async function deleteUser(userId: string) {
  const sessionData = await validateSession();
  if (!sessionData || !hasAdminAccess(sessionData.profile.role)) {
    throw new Error('Unauthorized');
  }

  const targetUserRes = await db.select().from(profiles).where(eq(profiles.id, userId));
  const targetUser = targetUserRes[0];

  if (!targetUser) throw new Error('User not found');

  if (targetUser.role === 'SUPER_ADMIN' && sessionData.profile.role !== 'SUPER_ADMIN') {
    throw new Error('Cannot modify SUPER_ADMIN');
  }

  await db.delete(users).where(eq(users.id, userId));
  revalidatePath('/admin/users');
}

export async function createRoadmap(data: { id: string, title: string, description: string, categoryId: string }) {
  const sessionData = await validateSession();
  if (!sessionData || !hasAdminAccess(sessionData.profile.role)) throw new Error('Unauthorized');

  await db.insert(roadmaps).values({
    id: data.id,
    title: data.title,
    description: data.description,
    categoryId: data.categoryId,
    status: 'draft'
  });
  revalidatePath('/admin/roadmaps');
}

export async function deleteRoadmap(id: string) {
  const sessionData = await validateSession();
  if (!sessionData || !hasAdminAccess(sessionData.profile.role)) throw new Error('Unauthorized');

  await db.delete(roadmaps).where(eq(roadmaps.id, id));
  revalidatePath('/admin/roadmaps');
}

export async function createDsaSheet(data: { id: string, title: string, description: string }) {
  const sessionData = await validateSession();
  if (!sessionData || !hasAdminAccess(sessionData.profile.role)) throw new Error('Unauthorized');

  await db.insert(dsaSheets).values({
    id: data.id,
    title: data.title,
    description: data.description,
  });
  revalidatePath('/admin/dsa');
}

export async function deleteDsaSheet(id: string) {
  const sessionData = await validateSession();
  if (!sessionData || !hasAdminAccess(sessionData.profile.role)) throw new Error('Unauthorized');

  await db.delete(dsaSheets).where(eq(dsaSheets.id, id));
  revalidatePath('/admin/dsa');
}
