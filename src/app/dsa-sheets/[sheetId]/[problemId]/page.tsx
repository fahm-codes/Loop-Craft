import { notFound } from 'next/navigation';
import { allDSASheets } from '@/data/dsaSheets';
import ProblemView from './ProblemView';

export default async function DSASheetProblemPage({ params }: { params: { sheetId: string, problemId: string } }) {
  const { sheetId, problemId } = await params;
  
  const sheet = allDSASheets.find(s => s.id === sheetId);
  if (!sheet) {
    notFound();
  }
  
  let foundProblem = null;
  let foundSection = null;
  
  for (const section of sheet.sections) {
    const p = section.problems.find(p => p.id === problemId);
    if (p) {
      foundProblem = p;
      foundSection = section;
      break;
    }
  }
  
  if (!foundProblem || !foundSection) {
    notFound();
  }
  
  return <ProblemView sheet={sheet} section={foundSection} problem={foundProblem} />;
}

export function generateStaticParams() {
  const params: { sheetId: string, problemId: string }[] = [];
  
  allDSASheets.forEach(sheet => {
    sheet.sections.forEach(section => {
      section.problems.forEach(problem => {
        params.push({
          sheetId: sheet.id,
          problemId: problem.id
        });
      });
    });
  });
  
  return params;
}
