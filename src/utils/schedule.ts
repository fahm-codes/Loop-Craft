import { Roadmap, RoadmapNode } from '@/data/roadmap';

export interface ScheduleItem {
  node: RoadmapNode;
  index: number;
  start: Date;
  end: Date;
  isCompleted: boolean;
  status: 'COMPLETED' | 'MISSED' | 'CURRENT' | 'UPCOMING';
}

export function getDaysFromDuration(duration: string): number {
  if (!duration) return 7;
  const match = duration.match(/Week\s+(\d+)(?:-(\d+))?/i);
  if (match) {
    const startWeek = parseInt(match[1]);
    const endWeek = match[2] ? parseInt(match[2]) : startWeek;
    return ((endWeek - startWeek) + 1) * 7;
  }
  const num = parseInt(duration) || 1;
  if (duration.toLowerCase().includes('week')) return num * 7;
  if (duration.toLowerCase().includes('month')) return num * 30;
  if (duration.toLowerCase().includes('day')) return num;
  return 7;
}

export function generateSchedule(
  roadmap: Roadmap, 
  enrollmentDateStr: string, 
  completedNodes: Record<string, boolean>
): ScheduleItem[] {
  const schedule: ScheduleItem[] = [];
  if (!enrollmentDateStr) return schedule;
  
  let currentDate = new Date(enrollmentDateStr);
  const now = new Date();
  
  let foundCurrent = false;

  roadmap.nodes.forEach((node, index) => {
    const days = getDaysFromDuration(node.duration);
    const startDate = new Date(currentDate);
    const endDate = new Date(currentDate);
    endDate.setDate(endDate.getDate() + Math.max(1, days - 1));
    endDate.setHours(23, 59, 59, 999); // Generous deadline
    
    const isCompleted = !!completedNodes[node.id];
    let status: ScheduleItem['status'] = 'UPCOMING';
    
    if (isCompleted) {
      status = 'COMPLETED';
    } else {
      if (endDate < now) {
        status = 'MISSED';
      } else if (!foundCurrent) {
        status = 'CURRENT';
        foundCurrent = true;
      } else {
        status = 'UPCOMING';
      }
    }

    schedule.push({
      node,
      index,
      start: startDate,
      end: endDate,
      isCompleted,
      status
    });
    
    currentDate = new Date(endDate);
    currentDate.setDate(currentDate.getDate() + 1);
    currentDate.setHours(0, 0, 0, 0);
  });
  
  // If there are missed items, but no CURRENT item (e.g. everything unfinished is missed), 
  // we might want the first missed item to act as the primary blocker. But 'MISSED' status is fine.
  
  return schedule;
}

export function adjustScheduleToStartToday(
  roadmap: Roadmap,
  targetNodeId: string
): Date {
  let daysFromStart = 0;
  for (const node of roadmap.nodes) {
    if (node.id === targetNodeId) break;
    daysFromStart += getDaysFromDuration(node.duration);
  }
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const newEnrollmentDate = new Date(today);
  newEnrollmentDate.setDate(newEnrollmentDate.getDate() - daysFromStart);
  return newEnrollmentDate;
}
