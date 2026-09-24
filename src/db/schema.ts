import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  pgEnum,
  uniqueIndex,
  unique,
  primaryKey,
  foreignKey
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ENUMS
export const appRoleEnum = pgEnum('app_role', [
  'SUPER_ADMIN',
  'ADMIN',
  'CONTENT_MANAGER',
  'MODERATOR',
  'SUPPORT',
  'LEARNER',
]);

export const resourceTypeEnum = pgEnum('resource_type', [
  'video',
  'article',
  'course',
  'assignment',
  'other',
  'documentation',
  'pdf/material',
  'external_link',
]);

export const roadmapStatusEnum = pgEnum('roadmap_status', [
  'draft',
  'in_review',
  'published',
  'upcoming',
  'unpublished',
]);

// 1. Custom Auth Tables
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).defaultNow().notNull(),
});

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow().notNull(),
});

export const profiles = pgTable('profiles', {
  id: uuid('id')
    .primaryKey()
    .references(() => users.id, { onDelete: 'cascade' }),
  email: text('email'),
  fullName: text('full_name'),
  role: appRoleEnum('role').default('LEARNER').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).defaultNow().notNull(),
});

export const rateLimits = pgTable('rate_limits', {
  key: text('key').primaryKey(),
  points: integer('points').notNull().default(0),
  expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull(),
});

// 2. Curriculum Tables
export const roadmaps = pgTable('roadmaps', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  categoryId: text('category_id').notNull(),
  difficulty: text('difficulty'),
  estimatedDuration: text('estimated_duration'),
  status: roadmapStatusEnum('status').default('draft').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).defaultNow().notNull(),
});

export const roadmapNodes = pgTable(
  'roadmap_nodes',
  {
    id: text('id').primaryKey(),
    roadmapId: text('roadmap_id')
      .notNull()
      .references(() => roadmaps.id, { onDelete: 'cascade' }),
    title: text('title').notNull(),
    description: text('description').notNull(),
    duration: text('duration'),
    orderIndex: integer('order_index').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).defaultNow().notNull(),
  },
  (table) => {
    return {
      roadmapIdIdx: unique('roadmap_nodes_roadmap_id_idx').on(table.id, table.roadmapId),
    };
  }
);

export const roadmapTopics = pgTable('roadmap_topics', {
  id: uuid('id').defaultRandom().primaryKey(),
  nodeId: text('node_id')
    .notNull()
    .references(() => roadmapNodes.id, { onDelete: 'cascade' }),
  topic: text('topic').notNull(),
  orderIndex: integer('order_index').notNull(),
});

export const resources = pgTable('resources', {
  id: uuid('id').defaultRandom().primaryKey(),
  nodeId: text('node_id')
    .notNull()
    .references(() => roadmapNodes.id, { onDelete: 'cascade' }),
  type: resourceTypeEnum('type').notNull(),
  title: text('title').notNull(),
  url: text('url'),
  content: text('content'),
  orderIndex: integer('order_index').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).defaultNow().notNull(),
});

// 3. User Progress & Submissions
export const userProgress = pgTable(
  'user_progress',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => profiles.id, { onDelete: 'cascade' }),
    roadmapId: text('roadmap_id').notNull(),
    nodeId: text('node_id').notNull(),
    completedAt: timestamp('completed_at', { withTimezone: true, mode: 'date' }).defaultNow().notNull(),
  },
  (table) => {
    return {
      uniqueUserNode: uniqueIndex('unique_user_node').on(table.userId, table.nodeId),
      nodeFk: foreignKey({
        columns: [table.nodeId, table.roadmapId],
        foreignColumns: [roadmapNodes.id, roadmapNodes.roadmapId],
      }).onDelete('cascade'),
    };
  }
);

export const assignmentSubmissions = pgTable(
  'assignment_submissions',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => profiles.id, { onDelete: 'cascade' }),
    resourceId: uuid('resource_id')
      .notNull()
      .references(() => resources.id, { onDelete: 'cascade' }),
    url: text('url'),
    status: text('status').default('submitted'),
    feedback: text('feedback'),
    submittedAt: timestamp('submitted_at', { withTimezone: true, mode: 'date' }).defaultNow().notNull(),
  },
  (table) => {
    return {
      uniqueUserResource: uniqueIndex('unique_user_resource').on(table.userId, table.resourceId),
    };
  }
);

// 4. DSA Trackers
export const dsaSheets = pgTable('dsa_sheets', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).defaultNow().notNull(),
});

export const dsaProblems = pgTable('dsa_problems', {
  id: text('id').primaryKey(),
  sheetId: text('sheet_id')
    .notNull()
    .references(() => dsaSheets.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  url: text('url').notNull(),
  difficulty: text('difficulty').notNull(),
  topic: text('topic').notNull(),
  orderIndex: integer('order_index').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).defaultNow().notNull(),
});

export const dsaProblemStatus = pgTable(
  'dsa_problem_status',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => profiles.id, { onDelete: 'cascade' }),
    problemId: text('problem_id')
      .notNull()
      .references(() => dsaProblems.id, { onDelete: 'cascade' }),
    status: text('status').notNull(), // e.g., 'completed', 'attempted'
    completedAt: timestamp('completed_at', { withTimezone: true, mode: 'date' }),
  },
  (table) => {
    return {
      uniqueUserProblem: uniqueIndex('unique_user_problem').on(table.userId, table.problemId),
    };
  }
);
