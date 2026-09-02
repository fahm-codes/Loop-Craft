export interface GroupMember {
  id: string;
  displayName: string;
  role: 'OWNER' | 'MEMBER';
  joinedAt: string;
}

export interface GroupMilestone {
  id: string;
  title: string;
  targetNodeId: string;
  targetDate?: string;
  isCompleted: boolean;
}

export interface StudyGroup {
  id: string;
  name: string;
  roadmapId: string;
  inviteCode: string;
  createdAt: string;
  discordInviteUrl?: string;
  members: GroupMember[];
  milestones: GroupMilestone[];
}

const GROUPS_STORAGE_KEY = 'loopcraft-study-groups';

// Utility to get current user ID (mock for local storage)
export const getCurrentUserId = (): string => {
  if (typeof window === 'undefined') return 'mock-user';
  let uid = localStorage.getItem('loopcraft-uid');
  if (!uid) {
    uid = 'user-' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('loopcraft-uid', uid);
  }
  return uid;
};

// Generates a readable code like LC-A8F2K
const generateInviteCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'LC-';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// --- DATA ACCESS LAYER (MOCKING DB) ---

const readGroups = (): StudyGroup[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(GROUPS_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const writeGroups = (groups: StudyGroup[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(GROUPS_STORAGE_KEY, JSON.stringify(groups));
};

export const groupService = {
  getGroupsForUser: (userId: string): StudyGroup[] => {
    const groups = readGroups();
    return groups.filter(g => g.members.some(m => m.id === userId));
  },

  getGroupById: (groupId: string): StudyGroup | null => {
    const groups = readGroups();
    return groups.find(g => g.id === groupId) || null;
  },

  createGroup: (name: string, roadmapId: string, userId: string, userName: string = 'You'): StudyGroup => {
    const groups = readGroups();
    const newGroup: StudyGroup = {
      id: 'group-' + Date.now(),
      name,
      roadmapId,
      inviteCode: generateInviteCode(),
      createdAt: new Date().toISOString(),
      members: [
        {
          id: userId,
          displayName: userName,
          role: 'OWNER',
          joinedAt: new Date().toISOString()
        },
        // MOCK DATA: Add two fake users to demonstrate group features and accountability
        {
          id: 'mock-user-1',
          displayName: 'Alex',
          role: 'MEMBER',
          joinedAt: new Date().toISOString()
        },
        {
          id: 'mock-user-2',
          displayName: 'Sam',
          role: 'MEMBER',
          joinedAt: new Date().toISOString()
        }
      ],
      milestones: []
    };
    groups.push(newGroup);
    writeGroups(groups);
    return newGroup;
  },

  joinGroup: (inviteCode: string, userId: string, userName: string = 'You'): { success: boolean; group?: StudyGroup; error?: string } => {
    const groups = readGroups();
    const groupIndex = groups.findIndex(g => g.inviteCode === inviteCode);
    
    if (groupIndex === -1) {
      return { success: false, error: 'Invalid invite code.' };
    }
    
    const group = groups[groupIndex];
    
    if (group.members.some(m => m.id === userId)) {
      return { success: false, error: 'You are already a member of this group.' };
    }
    
    if (group.members.length >= 5) {
      return { success: false, error: 'This group has reached the maximum of 5 members.' };
    }
    
    group.members.push({
      id: userId,
      displayName: userName,
      role: 'MEMBER',
      joinedAt: new Date().toISOString()
    });
    
    writeGroups(groups);
    return { success: true, group };
  },

  leaveGroup: (groupId: string, userId: string): { success: boolean; error?: string } => {
    let groups = readGroups();
    const groupIndex = groups.findIndex(g => g.id === groupId);
    if (groupIndex === -1) return { success: false, error: 'Group not found.' };
    
    const group = groups[groupIndex];
    const memberIndex = group.members.findIndex(m => m.id === userId);
    
    if (memberIndex === -1) return { success: false, error: 'Not a member.' };
    
    const isOwner = group.members[memberIndex].role === 'OWNER';
    
    group.members.splice(memberIndex, 1);
    
    if (group.members.length === 0) {
      // Delete group if empty
      groups.splice(groupIndex, 1);
    } else if (isOwner) {
      // Transfer ownership to the first available member
      group.members[0].role = 'OWNER';
    }
    
    writeGroups(groups);
    return { success: true };
  },
  
  removeMember: (groupId: string, ownerId: string, memberIdToRemove: string): { success: boolean; error?: string } => {
    let groups = readGroups();
    const groupIndex = groups.findIndex(g => g.id === groupId);
    if (groupIndex === -1) return { success: false, error: 'Group not found.' };
    
    const group = groups[groupIndex];
    const owner = group.members.find(m => m.id === ownerId);
    if (!owner || owner.role !== 'OWNER') {
      return { success: false, error: 'Only the group owner can remove members.' };
    }
    
    if (ownerId === memberIdToRemove) {
      return { success: false, error: 'Owner cannot remove themselves. Use Leave Group instead.' };
    }
    
    group.members = group.members.filter(m => m.id !== memberIdToRemove);
    writeGroups(groups);
    return { success: true };
  },

  updateDiscordInvite: (groupId: string, ownerId: string, inviteUrl: string): { success: boolean; error?: string } => {
    let groups = readGroups();
    const group = groups.find(g => g.id === groupId);
    if (!group) return { success: false, error: 'Group not found.' };
    
    const owner = group.members.find(m => m.id === ownerId);
    if (!owner || owner.role !== 'OWNER') {
      return { success: false, error: 'Only the group owner can update the Discord link.' };
    }
    
    group.discordInviteUrl = inviteUrl;
    writeGroups(groups);
    return { success: true };
  },

  addMilestone: (groupId: string, ownerId: string, targetNodeId: string, title: string, targetDate?: string): { success: boolean; error?: string } => {
    let groups = readGroups();
    const group = groups.find(g => g.id === groupId);
    if (!group) return { success: false, error: 'Group not found.' };
    
    const owner = group.members.find(m => m.id === ownerId);
    if (!owner || owner.role !== 'OWNER') {
      return { success: false, error: 'Only the group owner can create milestones.' };
    }
    
    group.milestones.push({
      id: 'ms-' + Date.now(),
      title,
      targetNodeId,
      targetDate,
      isCompleted: false
    });
    
    writeGroups(groups);
    return { success: true };
  },
  
  completeMilestone: (groupId: string, ownerId: string, milestoneId: string): { success: boolean; error?: string } => {
    let groups = readGroups();
    const group = groups.find(g => g.id === groupId);
    if (!group) return { success: false, error: 'Group not found.' };
    
    const owner = group.members.find(m => m.id === ownerId);
    if (!owner || owner.role !== 'OWNER') {
      return { success: false, error: 'Only the group owner can manage milestones.' };
    }
    
    const milestone = group.milestones.find(m => m.id === milestoneId);
    if (milestone) {
      milestone.isCompleted = true;
      writeGroups(groups);
      return { success: true };
    }
    return { success: false, error: 'Milestone not found.' };
  }
};
