
import { db } from './src/db';
import { dsaProblems } from './src/db/schema';
import { eq } from 'drizzle-orm';
async function run() {
  const probs = await db.select().from(dsaProblems).where(eq(dsaProblems.topic, 'Day 1 : Array (Part 1)'));
  console.log('Problems in Day 1:', probs.map(p => p.title));
}
run();

