import { notFound } from 'next/navigation';
import { db } from '@/db';
import { dsaSheets, dsaProblems } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import SheetView from './SheetView';

export default async function DSASheetPage({ params }: { params: { sheetId: string } }) {
  const { sheetId } = await params;
  
  const sheets = await db.select().from(dsaSheets).where(eq(dsaSheets.id, sheetId));
  const sheet = sheets[0];
  
  if (!sheet) {
    notFound();
  }

  const problems = await db.select().from(dsaProblems).where(eq(dsaProblems.sheetId, sheetId)).orderBy(asc(dsaProblems.orderIndex));
  
  // Group problems by topic to form sections
  const sectionsMap = new Map<string, any>();
  
  problems.forEach(p => {
    if (!sectionsMap.has(p.topic)) {
      sectionsMap.set(p.topic, {
        id: p.topic.replace(/\s+/g, '-').toLowerCase(),
        title: p.topic,
        order: sectionsMap.size + 1,
        problemCount: 0,
        problems: []
      });
    }
    const section = sectionsMap.get(p.topic);
    section.problemCount++;
    section.problems.push({
      id: p.id,
      title: p.title,
      difficulty: p.difficulty,
      platform: 'unknown',
      problemUrl: p.url
    });
  });

  const sections = Array.from(sectionsMap.values());
  // Sort sections by extracting Day number
  sections.sort((a, b) => {
    const matchA = a.title.match(/Day (\d+)/);
    const matchB = b.title.match(/Day (\d+)/);
    const numA = matchA ? parseInt(matchA[1]) : 999;
    const numB = matchB ? parseInt(matchB[1]) : 999;
    return numA - numB;
  });

  const formattedSheet = {
    id: sheet.id,
    title: sheet.title,
    provider: sheet.title.split(' ')[0] || 'Unknown',
    description: sheet.description || '',
    sourceUrl: '#',
    versionInfo: 'DB Version',
    totalProblems: problems.length,
    sections: sections
  };
  
  return <SheetView sheet={formattedSheet} />;
}
