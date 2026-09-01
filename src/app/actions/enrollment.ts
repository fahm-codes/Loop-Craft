'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function enrollInRoadmap(roadmapId: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/login?next=/roadmap/${roadmapId}/learn`)
  }

  // Attempt to create enrollment if it doesn't exist
  // We use upsert or just catch the unique constraint error
  const { error } = await supabase
    .from('enrollments')
    .insert({
      user_id: user.id,
      roadmap_id: roadmapId,
      status: 'in_progress'
    })

  // If error is unique constraint, it means they are already enrolled, which is fine.
  if (error && error.code !== '23505') {
    // 23505 is PostgreSQL unique_violation
    console.error('Failed to enroll:', error)
  }

  redirect(`/roadmap/${roadmapId}/learn`)
}
