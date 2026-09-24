
import { db } from './src/db';
import { resources } from './src/db/schema';
async function run() {
  await db.insert(resources).values({
    id: 'f568a0a9-25f0-466d-8c10-2b10a43dc8e4',
    nodeId: 'week-1',
    type: 'assignment',
    title: 'Track A: Finish all these exercises',
    url: 'https://example.com',
    orderIndex: 5,
  }).onConflictDoNothing();
  console.log('Done!');
}
run();

