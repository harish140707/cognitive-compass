import AppLayout from "@/components/AppLayout";
import { getCognitiveConfig } from "@/lib/cognitiveUtils";
import { computeQuizStats } from "@/lib/quizStats";
import { useAuth } from "@/contexts/AuthContext";
import {
  Area, AreaChart, CartesianGrid, Tooltip, ResponsiveContainer, XAxis, YAxis,
} from "recharts";
import { Brain, TrendingUp, Clock, Target, Zap, Activity, Award, AlertCircle } from "lucide-react";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-card border border-border rounded-lg px-3 py-2 text-xs shadow-xl">
        <div className="font-semibold text-foreground mb-1">{label}</div>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-muted-foreground">{p.name}:</span>
            <span className="text-foreground font-medium">{p.value}{p.name === "accuracy" ? "%" : ""}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function StudentOverview() {
  const { userName } = useAuth();
  const q = computeQuizStats();
  const cogConfig = getCognitiveConfig(q.cognitiveType);

  const stats = [
    { label: "Accuracy Score",      value: `${q.overallAccuracy}%`,                          icon: Target,   color: "text-teal",        change: q.hasData ? `${q.overallAccuracy}%` : "—" },
    { label: "Topics Attempted",     value: `${q.topicStats.filter(t=>t.totalAttempts>0).length}/8`, icon: Clock,    color: "text-violet",      change: `${q.totalAttempts} Qs` },
    { label: "Learning Velocity",    value: q.learningVelocity.toFixed(1),                    icon: Zap,      color: "text-amber",        change: `${q.strongTopics.length} strong` },
    { label: "Consistency Index",    value: `${(q.consistencyIndex * 100).toFixed(0)}%`,      icon: Activity, color: "text-[hsl(213_94%_68%)]", change: `${q.totalRetries} retries` },
  ];

  return (
    <AppLayout>
      <div className="mb-8">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="text-muted-foreground text-sm mb-1">Welcome back,</p>
            <h1 className="text-2xl font-bold font-display text-foreground">{userName || "Student"}</h1>
            <p className="text-muted-foreground text-sm mt-1">Math & Science · All stats based on your quiz performance</p>
          </div>
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl ${cogConfig.bg} border border-border`}>
            <Brain className={`w-5 h-5 ${cogConfig.color}`} />
            <div>
              <div className="text-[10px] text-muted-foreground">Cognitive Profile</div>
              <div className={`text-sm font-bold font-display ${cogConfig.color}`}>{q.cognitiveType}</div>
              <div className="text-[10px] text-muted-foreground">{cogConfig.desc}</div>
            </div>
          </div>
        </div>

        {!q.hasData ? (
          <div className="mt-4 flex items-center gap-2.5 bg-amber-400/10 border border-amber-400/20 rounded-lg px-4 py-2.5">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs text-amber-300">
              No quiz data yet — go to <strong>Topic Mastery</strong> and complete some quizzes to see live stats here.
            </span>
          </div>
        ) : (
          <div className="mt-4 flex items-center gap-2.5 bg-emerald-400/10 border border-emerald-400/20 rounded-lg px-4 py-2.5">
            <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-xs text-emerald-300">
              <strong>{q.overallAccuracy}% overall accuracy</strong> across {q.topicStats.filter(t=>t.totalAttempts>0).length} topics · {q.strongTopics.length > 0 ? `Strong in: ${q.strongTopics.join(", ")}` : "Keep practicing to build strengths!"}
            </span>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map(({ label, value, icon: Icon, color, change }) => (
          <div key={label} className="stat-card">
            <div className="flex items-center justify-between">
              <Icon className={`w-4 h-4 ${color}`} />
              <span className="metric-pill up">{change}</span>
            </div>
            <div className={`text-2xl font-bold font-display ${color}`}>{value}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="card-glow p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold font-display text-foreground text-sm">Accuracy by Topic</h3>
              <p className="text-xs text-muted-foreground">Live from quiz performance</p>
            </div>
            <Award className="w-4 h-4 text-primary" />
          </div>
          {q.hasData ? (
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={q.accuracyTimeline}>
                <defs>
                  <linearGradient id="accGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(174 80% 48%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(174 80% 48%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="accuracy" name="accuracy" stroke="hsl(174 80% 48%)" strokeWidth={2} fill="url(#accGrad)" dot={{ fill: "hsl(174 80% 48%)", r: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[180px] flex items-center justify-center text-muted-foreground text-xs">Complete quizzes to see chart</div>
          )}
        </div>

        <div className="card-glow p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold font-display text-foreground text-sm">Topic Attempts vs Retries</h3>
              <p className="text-xs text-muted-foreground">Per topic breakdown</p>
            </div>
            <Clock className="w-4 h-4 text-violet" />
          </div>
          {q.hasData ? (
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={q.accuracyTimeline.map((d, i) => ({ ...d, retries: q.topicStats[i]?.retries ?? 0 }))}>
                <defs>
                  <linearGradient id="rtGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(262 75% 65%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(262 75% 65%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="retries" name="retries" stroke="hsl(262 75% 65%)" strokeWidth={2} fill="url(#rtGrad)" dot={{ fill: "hsl(262 75% 65%)", r: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[180px] flex items-center justify-center text-muted-foreground text-xs">Complete quizzes to see chart</div>
          )}
        </div>
      </div>

      {/* Feature Metrics */}
      <div className="card-glow p-5">
        <h3 className="font-semibold font-display text-foreground text-sm mb-4">Behavioral Feature Vector</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Retry Ratio",         value: `${(q.retryRatio * 100).toFixed(0)}%`,          desc: "Retries / total attempts",    color: "bg-amber-400/15",   bar: q.retryRatio * 100 },
            { label: "Hesitation Index",    value: `${(q.hesitationIndex * 100).toFixed(0)}%`,     desc: "Weak-topic ratio",            color: "bg-rose-400/15",    bar: q.hesitationIndex * 100 },
            { label: "Concept Gap Score",   value: `${q.conceptGapScore}`,                         desc: "Weak topics × 10",            color: "bg-[hsl(0_80%_60%)]/15", bar: q.conceptGapScore },
            { label: "Session Improvement", value: `+${q.sessionImprovementRate}%`,                desc: "Accuracy above baseline",     color: "bg-emerald-400/15", bar: q.sessionImprovementRate },
          ].map(({ label, value, desc, color, bar }) => (
            <div key={label} className={`${color} rounded-lg p-3`}>
              <div className="text-lg font-bold font-display text-foreground mb-0.5">{value}</div>
              <div className="text-xs font-medium text-foreground mb-1">{label}</div>
              <div className="text-[10px] text-muted-foreground mb-2">{desc}</div>
              <div className="h-1 bg-border rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${Math.min(bar, 100)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
