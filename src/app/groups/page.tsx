import GroupsView from './GroupsView';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Study Groups | LoopCraft',
  description: 'Join a small accountability group to learn together.',
};

export default function GroupsPage() {
  return <GroupsView />;
}
