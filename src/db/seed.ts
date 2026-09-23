import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { sql as drizzleSql } from 'drizzle-orm';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { dsaSheets, dsaProblems } from './schema';
import { allDSASheets } from '../data/dsaSheets';

dotenv.config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing in environment variables (.env.local)');
}

const sqlClient = neon(process.env.DATABASE_URL);
const db = drizzle(sqlClient);

async function runSeed() {
  console.log('Starting seed process...');

  // 1. Seed Curriculum Data from SQL File
  console.log('Seeding curriculum data from 03_seed_data.sql...');
  
  const actualSqlPath = path.resolve(process.cwd(), '03_seed_data.sql');
  
  if (fs.existsSync(actualSqlPath)) {
    let sqlContent = fs.readFileSync(actualSqlPath, 'utf8');
    sqlContent = sqlContent.replace(/INSERT INTO public\.(\w+) \((.*?)\)\s+VALUES/gi, 'INSERT INTO public.$1 ($2) VALUES');
    sqlContent = sqlContent.replace(/'(DRAFT|IN_REVIEW|PUBLISHED|UPCOMING|UNPUBLISHED|ARCHIVED)'/g, (match, p1) => "'" + p1.toLowerCase() + "'");
    
    const statements = sqlContent.split(';').map(s => s.trim()).filter(s => s.length > 0);
    
    for (const stmt of statements) {
      if (stmt.toUpperCase().startsWith('INSERT')) {
        try {
          await db.execute(drizzleSql.raw(stmt + ';'));
        } catch (err: any) {
          if (err.code !== '23505') {
             console.warn('Non-duplicate error executing statement:', err);
          }
        }
      }
    }
    console.log('Curriculum seed processed.');
  } else {
    console.log('03_seed_data.sql not found at', actualSqlPath);
  }

  // 2. Seed DSA Sheets and Problems from static TS file
  console.log('Seeding DSA static data...');
  for (const sheet of allDSASheets) {
    // Upsert sheet
    await db.insert(dsaSheets).values({
      id: sheet.id,
      title: sheet.title,
      description: sheet.description,
    }).onConflictDoNothing();
    
    // Process sections to get problems
    for (const section of sheet.sections) {
      for (let i = 0; i < section.problems.length; i++) {
        const p = section.problems[i];
        await db.insert(dsaProblems).values({
          id: p.id,
          sheetId: sheet.id,
          title: p.title,
          url: p.problemUrl,
          difficulty: p.difficulty,
          topic: section.title, // or p.companyTags?.join(',')
          orderIndex: i, // Assuming sequential order in section
        }).onConflictDoNothing();
      }
    }
  }
  
  console.log('Seed complete!');
}

runSeed().catch(console.error);
