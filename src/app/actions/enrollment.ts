'use server'

import { redirect } from 'next/navigation'
import { validateSession } from '@/lib/auth'

export async function enrollInRoadmap(roadmapId: string) {
  const sessionData = await validateSession();
  const user = sessionData?.user;

  if (!user) {
    redirect(`/login?next=/roadmap/${roadmapId}/learn`)
  }

  // We no longer track roadmap-level enrollment, just node-level progress.
  // Proceed directly to the learning view.
  redirect(`/roadmap/${roadmapId}/learn`)
}
