
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_Gz4EriOHu1wY@ep-twilight-salad-b5msr4il-pooler.c-7.us-east-2.aws.neon.tech/neondb');

async function fix() {
  await sql\INSERT INTO resources (id, node_id, type, title, url, order_index) VALUES ('track-a-assignment', 'week-1', 'assignment', 'Track A: Finish all these exercises', 'https://example.com', 5) ON CONFLICT (id) DO NOTHING\;
  console.log('Inserted assignment resource.');
}
fix();

