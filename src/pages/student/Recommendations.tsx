import AppLayout from "@/components/AppLayout";
import { recommendations } from "@/lib/mockData";
import { getCognitiveConfig } from "@/lib/cognitiveUtils";
import { mockStudent } from "@/lib/mockData";
import { Lightbulb, Calendar, Layers, Timer, Video, Brain, ChevronRight, CheckCircle } from "lucide-react";

const iconMap: Record<string, any> = {
  calendar: Calendar,
  layers: Layers,
  timer: Timer,
  video: Video,
};

const priorityConfig = {
  high: { color: "text-rose-400", bg: "bg-rose-400/15", label: "High Priority" },
  medium: { color: "text-amber-400", bg: "bg-amber-400/15", label: "Medium" },
  low: { color: "text-teal", bg: "bg-teal/15", label: "Low" },
};

export default function Recommendations() {
  const cogConfig = getCognitiveConfig(mockStudent.cognitiveType);

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-display text-foreground">Adaptive Recommendations</h1>
        <p className="text-muted-foreground text-sm mt-1">AI-generated personalized learning strategies based on your cognitive profile</p>
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
              Profile: <span className={cogConfig.color}>{mockStudent.cognitiveType}</span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your behavioral patterns indicate deliberate, high-accuracy processing with longer response times. 
              The AI recommends <strong className="text-foreground">spaced repetition</strong> for retention, 
              <strong className="text-foreground"> scaffolded progression</strong> in weak topics, and 
              <strong className="text-foreground"> timed drills</strong> to gradually improve speed without sacrificing accuracy.
            </p>
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
          { label: "Recommended Difficulty", value: "Intermediate", sub: "Gradually increase" },
          { label: "Daily Practice", value: "45 min", sub: "Optimal session length" },
          { label: "Review Schedule", value: "Day 1-3-7-14", sub: "Spaced intervals" },
          { label: "Focus Mode", value: "Accuracy First", sub: "Then speed training" },
        ].map(({ label, value, sub }) => (
          <div key={label} className="card-glow p-4 text-center">
            <div className="text-base font-bold font-display text-primary mb-0.5">{value}</div>
            <div className="text-xs font-medium text-foreground mb-0.5">{label}</div>
            <div className="text-[10px] text-muted-foreground">{sub}</div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="space-y-3">
        <h3 className="font-semibold font-display text-foreground text-sm flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-primary" />
          Personalized Action Plans
        </h3>
        {recommendations.map(rec => {
          const Icon = iconMap[rec.icon] || Lightbulb;
          const pCfg = priorityConfig[rec.priority as keyof typeof priorityConfig];
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
                <p className="text-xs text-muted-foreground leading-relaxed">{rec.description}</p>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <span className="text-xs font-bold text-emerald-400">{rec.estimatedImpact}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Gamification */}
      <div className="mt-6 card-glow p-5 bg-gradient-to-r from-primary/5 to-transparent border-primary/20">
        <div className="flex items-center gap-3 mb-3">
          <CheckCircle className="w-5 h-5 text-primary" />
          <h3 className="font-semibold font-display text-foreground text-sm">This Week's AI Challenge</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-3">Complete 3 Calculus scaffolded sessions without skipping hints. Predicted outcome: +18% accuracy in 2 weeks.</p>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full w-1/3" />
          </div>
          <span className="text-xs text-muted-foreground">1/3 completed</span>
        </div>
      </div>
    </AppLayout>
  );
}
