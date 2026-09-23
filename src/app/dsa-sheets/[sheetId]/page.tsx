import { notFound } from 'next/navigation';
import { allDSASheets } from '@/data/dsaSheets';
import SheetView from './SheetView';

export default async function DSASheetPage({ params }: { params: { sheetId: string } }) {
  const { sheetId } = await params;
  
  const sheet = allDSASheets.find(s => s.id === sheetId);
  
  if (!sheet) {
    notFound();
  }
  
  return <SheetView sheet={sheet} />;
}

export function generateStaticParams() {
  return allDSASheets.map((sheet) => ({
    sheetId: sheet.id,
  }));
}
