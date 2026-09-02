import DashboardView from './DashboardView';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Learner Dashboard | LoopCraft',
  description: 'Your developer learning workspace and progress tracker.',
};

export default function DashboardPage() {
  return <DashboardView />;
}
