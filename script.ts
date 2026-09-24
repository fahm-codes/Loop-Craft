
import { db } from './src/db';
import { dsaSheets, resources } from './src/db/schema';
async function run() {
  const sheets = await db.select().from(dsaSheets);
  console.log('Sheets:', sheets);
  const res = await db.select().from(resources);
  console.log('Resources:', res.slice(0, 2));
}
run();

