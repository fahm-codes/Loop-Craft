"use client";

import { useState } from "react";
import { Bot, Clock3, Sparkles, Target, Loader2 } from "lucide-react";

type Week = {
  week: number;
  title: string;
  goal: string;
  topics: string[];
  practice: string[];
  project: string;
};

type Roadmap = {
  title: string;
  summary: string;
  weeklyHours: number;
  weeks: Week[];
};

export default function AIRoadmapGenerator() {
  const [goal, setGoal] = useState("AI Engineer");
  const [skills, setSkills] = useState("");
  const [hours, setHours] = useState("10");
  const [duration, setDuration] = useState("12");
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generateRoadmap() {
    setLoading(true);
    setError("");
    setRoadmap(null);

    try {
      const response = await fetch("/api/ai/roadmap", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          goal,
          skills,
          hours: Number(hours),
          duration: Number(duration),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to generate roadmap.");
      }

      setRoadmap(data.roadmap);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to generate roadmap.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="ai-roadmap-generator" className="border border-accent p-6 md:p-8 lg:p-12 bg-bg-sec rounded-md">
      <div className="flex items-start gap-4 mb-8">
        <div className="border border-accent p-3 shrink-0">
          <Bot className="text-accent" size={28} />
        </div>
        <div>
          <div className="font-mono text-xs tracking-widest text-accent uppercase mb-2">&gt; LOOPCRAFT AI</div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary">Generate your learning roadmap</h2>
          <p className="font-mono text-sm text-text-secondary mt-3 max-w-2xl leading-relaxed">
            Tell LoopCraft where you want to go, what you already know, and how much time you have. The AI creates a practical roadmap with weekly goals, practice, and projects.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <label className="font-mono text-xs uppercase tracking-widest text-text-muted">
          Target role / goal
          <input value={goal} onChange={(e) => setGoal(e.target.value)} className="mt-2 w-full border border-border-main bg-bg-main px-4 py-3 text-sm text-text-primary outline-none focus:border-accent" placeholder="e.g. AI Engineer" />
        </label>

        <label className="font-mono text-xs uppercase tracking-widest text-text-muted">
          Current skills
          <input value={skills} onChange={(e) => setSkills(e.target.value)} className="mt-2 w-full border border-border-main bg-bg-main px-4 py-3 text-sm text-text-primary outline-none focus:border-accent" placeholder="e.g. Python, basic ML, SQL" />
        </label>

        <label className="font-mono text-xs uppercase tracking-widest text-text-muted">
          Hours / week
          <div className="relative mt-2">
            <Clock3 className="absolute left-3 top-3 text-text-muted" size={16} />
            <input type="number" min="1" max="60" value={hours} onChange={(e) => setHours(e.target.value)} className="w-full border border-border-main bg-bg-main pl-10 pr-4 py-3 text-sm text-text-primary outline-none focus:border-accent" />
          </div>
        </label>

        <label className="font-mono text-xs uppercase tracking-widest text-text-muted">
          Duration / weeks
          <div className="relative mt-2">
            <Target className="absolute left-3 top-3 text-text-muted" size={16} />
            <input type="number" min="2" max="52" value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full border border-border-main bg-bg-main pl-10 pr-4 py-3 text-sm text-text-primary outline-none focus:border-accent" />
          </div>
        </label>
      </div>

      <button onClick={generateRoadmap} disabled={loading} className="border border-accent bg-accent text-bg-main px-6 py-3 font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-2 disabled:opacity-60">
        {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
        {loading ? "Generating..." : "Generate with AI"}
      </button>

      {error && <div className="mt-6 border border-error bg-error/5 p-4 font-mono text-xs text-error">{error}</div>}

      {roadmap && (
        <div className="mt-10 border-t border-border-main pt-8">
          <h3 className="font-display text-2xl font-bold text-text-primary">{roadmap.title}</h3>
          <p className="font-mono text-sm text-text-secondary mt-3 leading-relaxed">{roadmap.summary}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {roadmap.weeks.map((week) => (
              <article key={week.week} className="border border-border-main bg-bg-main p-5">
                <div className="font-mono text-[10px] uppercase tracking-widest text-accent mb-3">Week {week.week}</div>
                <h4 className="font-display font-bold text-text-primary mb-2">{week.title}</h4>
                <p className="font-mono text-xs text-text-secondary mb-4">{week.goal}</p>
                <div className="space-y-3">
                  <div><span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">Topics</span><ul className="mt-1 list-disc list-inside font-mono text-xs text-text-secondary">{week.topics.map((item) => <li key={item}>{item}</li>)}</ul></div>
                  <div><span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">Practice</span><ul className="mt-1 list-disc list-inside font-mono text-xs text-text-secondary">{week.practice.map((item) => <li key={item}>{item}</li>)}</ul></div>
                  <div><span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">Project</span><p className="mt-1 font-mono text-xs text-text-secondary">{week.project}</p></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
