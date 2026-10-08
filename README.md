# LoopCraft

> **Adaptive AI learning for developers.**

LoopCraft is a developer learning platform designed to turn career goals into structured, personalized learning paths and continuously adapt those paths as a learner progresses.

## Why LoopCraft?

Developers can find thousands of tutorials, courses, and roadmaps online. The harder problem is turning them into a learning system that fits an individual's target role, current skills, available study time, progress, practice performance, and missed work.

LoopCraft is being built to solve that problem.

## Core product

### Adaptive learning roadmaps
Role-based engineering paths break large career goals into manageable learning units.

### Progress-aware scheduling
Learning schedules account for completed, current, missed, and upcoming work.

### Practice & review
Learners reinforce concepts through active practice and review rather than simply following a list of resources.

### Missed-task recovery
Falling behind should not mean abandoning a roadmap. LoopCraft provides resume and catch-up flows to help learners continue.

### AI-powered personalization
AI is being developed as a core part of the learning loop:

1. Understand the learner's goal and current level.
2. Generate or personalize a roadmap.
3. Identify skill gaps from progress and practice.
4. Generate targeted practice and explanations.
5. Adapt the learning plan as the learner's situation changes.

The AI layer is being implemented incrementally; not every planned capability is currently enabled in production.

## Planned AI capabilities

### AI Roadmap Generator
Generate a personalized learning path from a target role, existing skills, study availability, and timeframe.

### AI Skill-Gap Analysis
Use learner progress and practice performance to identify weak areas and recommend what to study next.

### AI Practice & Review
Generate targeted exercises and explanations based on the learner's roadmap and weak areas.

### AI Schedule Recovery
When a learner falls behind, intelligently reorganize upcoming work instead of simply accumulating missed tasks.

## Current product foundation

- Role-based roadmap navigation
- Learning dashboard
- Progress tracking
- Practice and review workflows
- Schedule generation
- Completed / current / missed / upcoming task states
- Resume and catch-up flows
- Database-backed application architecture

## Technology

- Next.js
- React
- TypeScript
- Tailwind CSS
- Drizzle ORM
- Neon / PostgreSQL-compatible database
- Playwright
- Lucide React

## Development

Clone the repository:

```bash
git clone https://github.com/fahm-codes/Loop-Craft.git
cd Loop-Craft
npm install
```

Start the development server:

```bash
npm run dev
```

Then open `http://localhost:3000`.

Database-backed functionality requires the environment variables used by the application's database configuration.

## Project status

LoopCraft is an early-stage product under active development.

The long-term goal is to create an adaptive AI learning system where a developer's roadmap evolves with their goals, progress, performance, and available time.

## Contributing

Feedback, bug reports, and product ideas are welcome through GitHub issues.

## License

Licensing terms will be added as the project matures.
