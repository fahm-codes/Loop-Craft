import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `
You are LoopCraft's roadmap planning engine.

Create practical, realistic developer learning roadmaps. Prioritize fundamentals before advanced topics, projects over passive learning, and a sustainable workload.

Return ONLY valid JSON with this shape:
{
  "title": "string",
  "summary": "string",
  "weeklyHours": number,
  "weeks": [
    {
      "week": number,
      "title": "string",
      "goal": "string",
      "topics": ["string"],
      "practice": ["string"],
      "project": "string"
    }
  ]
}

Do not include markdown fences or any text outside the JSON.
`;

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const model = process.env.ANTHROPIC_MODEL;

  if (!apiKey || !model) {
    return NextResponse.json(
      { error: "LoopCraft AI is not configured yet. Set ANTHROPIC_API_KEY and ANTHROPIC_MODEL." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const goal = typeof body.goal === "string" ? body.goal.trim() : "";
    const skills = typeof body.skills === "string" ? body.skills.trim() : "";
    const hours = Number(body.hours);
    const duration = Number(body.duration);

    if (!goal || !Number.isFinite(hours) || !Number.isFinite(duration) || hours < 1 || hours > 60 || duration < 2 || duration > 52) {
      return NextResponse.json({ error: "Please provide a goal, weekly study hours, and a duration between 2 and 52 weeks." }, { status: 400 });
    }

    const userPrompt = `
Target role / goal: ${goal}
Current skills: ${skills || "Not specified"}
Available study time: ${hours} hours per week
Target duration: ${duration} weeks

Generate a roadmap that fits these constraints. Keep the progression realistic and include hands-on practice and a project in every week.
`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: 5000,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: userPrompt }],
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Anthropic API error:", errorText);
      return NextResponse.json({ error: "The AI provider could not generate a roadmap right now." }, { status: 502 });
    }

    const data = await response.json();
    const text = data?.content?.find((item: { type?: string }) => item.type === "text")?.text;

    if (!text) {
      return NextResponse.json({ error: "The AI provider returned an empty response." }, { status: 502 });
    }

    let roadmap;
    try {
      roadmap = JSON.parse(text);
    } catch {
      const cleaned = text.replace(/^\s*\`\`\`json\s*/i, "").replace(/\s*\`\`\`\s*$/i, "");
      roadmap = JSON.parse(cleaned);
    }

    return NextResponse.json({ roadmap });
  } catch (error) {
    console.error("LoopCraft roadmap generation error:", error);
    return NextResponse.json({ error: "Unable to generate a roadmap. Please try again." }, { status: 500 });
  }
}
