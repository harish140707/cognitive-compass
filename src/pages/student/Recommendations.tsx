import AppLayout from "@/components/AppLayout";
import { computeQuizStats } from "@/lib/quizStats";
import { getCognitiveConfig } from "@/lib/cognitiveUtils";
import { Lightbulb, Calendar, Layers, Timer, Video, Brain, ChevronRight, CheckCircle, AlertCircle } from "lucide-react";

const STRATEGY_MAP: Record<string, { type: string; icon: string; priority: "high" | "medium" | "low"; typeDesc: (topic: string, acc: number) => string; impact: string }> = {
  weak:   { type: "Scaffolded Practice",   icon: "layers",   priority: "high",   typeDesc: (t, a) => `Start with fundamentals in ${t}. Your accuracy is ${a}% — build from the ground up.`,                        impact: "+20% accuracy" },
  medium: { type: "Spaced Repetition",     icon: "calendar", priority: "medium", typeDesc: (t, a) => `Schedule 15-min daily reviews for ${t}. Accuracy at ${a}% — needs consolidation.`,                         impact: "+12% accuracy" },
  strong: { type: "Timed Accuracy Drills", icon: "timer",    priority: "low",    typeDesc: (t, a) => `You're strong in ${t} (${a}%). Use timed drills to further reduce response time.`,                          impact: "-2s response time" },
};

const iconMap: Record<string, any> = { calendar: Calendar, layers: Layers, timer: Timer, video: Video };
const priorityConfig = {
  high:   { color: "text-rose-400",  bg: "bg-rose-400/15",  label: "High Priority" },
  medium: { color: "text-amber-400", bg: "bg-amber-400/15", label: "Medium" },
  low:    { color: "text-teal",      bg: "bg-teal/15",      label: "Low" },
};

export default function Recommendations() {
  const q = computeQuizStats();
  const cogConfig = getCognitiveConfig(q.cognitiveType);

  // Build dynamic recommendations from quiz results
  const dynRecs = q.topicStats
    .filter(t => t.totalAttempts > 0)
    .sort((a, b) => a.accuracy - b.accuracy) // worst first
    .slice(0, 4)
    .map((t, i) => {
      const cfg = STRATEGY_MAP[t.status] ?? STRATEGY_MAP.medium;
      return { id: i, topic: t.topic, accuracy: t.accuracy, ...cfg };
    });

  // Challenge progress: completed strong topics / total attempted
  const challengeGoal = 3;
  const challengeDone = Math.min(q.strongTopics.length, challengeGoal);

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-display text-foreground">Adaptive Recommendations</h1>
        <p className="text-muted-foreground text-sm mt-1">AI-generated strategies based on your live quiz performance</p>
      </div>

      {/* Strategy Summary */}
      <div className="card-glow p-5 mb-6 border-l-2 border-primary">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-0.5">AI Learning Strategy Summary</div>
            <h3 className="font-bold font-display text-foreground mb-2">
              Profile: <span className={cogConfig.color}>{q.cognitiveType}</span>
            </h3>
            {q.hasData ? (
              <p className="text-sm text-muted-foreground leading-relaxed">
                Based on your quiz data — <strong className="text-foreground">{q.overallAccuracy}% accuracy</strong>, {q.totalRetries} retries across {q.topicStats.filter(t=>t.totalAttempts>0).length} topics.
                {q.weakTopics.length > 0 && <> Weak areas: <strong className="text-foreground">{q.weakTopics.join(", ")}</strong>.</>}
                {q.strongTopics.length > 0 && <> Strong in: <strong className="text-foreground">{q.strongTopics.join(", ")}</strong>.</>}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">Take quizzes in Topic Mastery to get personalized recommendations.</p>
            )}
            <div className="flex flex-wrap gap-2 mt-3">
              {["Spaced Repetition", "Scaffolded Practice", "Timed Drills", "Concept Bridging"].map(tag => (
                <span key={tag} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Schedule */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Recommended Difficulty", value: q.overallAccuracy >= 75 ? "Advanced" : q.overallAccuracy >= 55 ? "Intermediate" : "Beginner", sub: "Based on accuracy" },
          { label: "Daily Practice",          value: "45 min",                                         sub: "Optimal session length" },
          { label: "Review Schedule",         value: "Day 1-3-7-14",                                   sub: "Spaced intervals" },
          { label: "Focus Mode",              value: q.retryRatio > 0.3 ? "Accuracy First" : "Speed+", sub: q.retryRatio > 0.3 ? "Reduce retries" : "Then speed training" },
        ].map(({ label, value, sub }) => (
          <div key={label} className="card-glow p-4 text-center">
            <div className="text-base font-bold font-display text-primary mb-0.5">{value}</div>
            <div className="text-xs font-medium text-foreground mb-0.5">{label}</div>
            <div className="text-[10px] text-muted-foreground">{sub}</div>
          </div>
        ))}
      </div>

      {/* Dynamic Recommendations */}
      <div className="space-y-3">
        <h3 className="font-semibold font-display text-foreground text-sm flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-primary" />
          {q.hasData ? "Personalized Action Plans" : "Action Plans (take quizzes to personalise)"}
        </h3>

        {!q.hasData && (
          <div className="flex items-center gap-2.5 bg-amber-400/10 border border-amber-400/20 rounded-lg px-4 py-3">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs text-amber-300">Complete quizzes in <strong>Topic Mastery</strong> to unlock personalised recommendations.</span>
          </div>
        )}

        {dynRecs.map(rec => {
          const Icon = iconMap[rec.icon] || Lightbulb;
          const pCfg = priorityConfig[rec.priority];
          return (
            <div key={rec.id} className="card-glow p-5 flex items-start gap-4 group cursor-pointer hover:border-primary/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-sm font-semibold font-display text-foreground">{rec.type}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${pCfg.bg} ${pCfg.color}`}>{pCfg.label}</span>
                  <span className="text-[10px] text-muted-foreground">Topic: {rec.topic}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{rec.typeDesc(rec.topic, rec.accuracy)}</p>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <span className="text-xs font-bold text-emerald-400">{rec.impact}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Challenge */}
      <div className="mt-6 card-glow p-5 bg-gradient-to-r from-primary/5 to-transparent border-primary/20">
        <div className="flex items-center gap-3 mb-3">
          <CheckCircle className="w-5 h-5 text-primary" />
          <h3 className="font-semibold font-display text-foreground text-sm">This Week's AI Challenge</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          {q.weakTopics.length > 0
            ? `Master ${challengeGoal} topics with 80%+ accuracy. Currently strong in ${challengeDone}/${challengeGoal} topics.`
            : q.hasData
            ? "Excellent! You've mastered all attempted topics. Try more subjects!"
            : "Complete quizzes to unlock the weekly challenge."}
        </p>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(challengeDone / challengeGoal) * 100}%` }} />
          </div>
          <span className="text-xs text-muted-foreground">{challengeDone}/{challengeGoal} completed</span>
        </div>
      </div>
    </AppLayout>
  );
}
