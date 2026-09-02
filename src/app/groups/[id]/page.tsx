import GroupDetailView from './GroupDetailView';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Study Group | LoopCraft',
  description: 'Track progress and stay accountable with your study group.',
};

interface Params {
  params: { id: string }
}

export default async function GroupDetailPage(props: Params) {
  // Await the params object before destructuring its properties
  const params = await props.params;
  return <GroupDetailView groupId={params.id} />;
}
