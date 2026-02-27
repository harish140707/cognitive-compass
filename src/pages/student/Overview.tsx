import AppLayout from "@/components/AppLayout";
import { mockStudent, accuracyTrend, performanceMetrics } from "@/lib/mockData";
import { getCognitiveConfig } from "@/lib/cognitiveUtils";
import { useAuth } from "@/contexts/AuthContext";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart,
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
            <span className="text-foreground font-medium">{p.value}{p.name === "accuracy" ? "%" : "s"}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function StudentOverview() {
  const { userName } = useAuth();
  const cogConfig = getCognitiveConfig(mockStudent.cognitiveType);

  const stats = [
    { label: "Accuracy Score", value: `${mockStudent.cognitiveScore}%`, icon: Target, color: "text-teal", change: "+12%", trend: "up" },
    { label: "Avg Response Time", value: `${performanceMetrics.avgResponseTime}s`, icon: Clock, color: "text-violet", change: "-3s", trend: "up" },
    { label: "Learning Velocity", value: performanceMetrics.learningVelocity.toFixed(1), icon: Zap, color: "text-amber", change: "+0.8", trend: "up" },
    { label: "Consistency Index", value: `${(performanceMetrics.consistencyIndex * 100).toFixed(0)}%`, icon: Activity, color: "text-[#60a5fa]", change: "+5%", trend: "up" },
  ];

  return (
    <AppLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="text-muted-foreground text-sm mb-1">Welcome back,</p>
            <h1 className="text-2xl font-bold font-display text-foreground">{userName || mockStudent.name}</h1>
            <p className="text-muted-foreground text-sm mt-1">{mockStudent.grade} · {mockStudent.enrolled}</p>
          </div>
          {/* Cognitive Badge */}
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl ${cogConfig.bg} border border-border`}>
            <Brain className={`w-5 h-5 ${cogConfig.color}`} />
            <div>
              <div className="text-[10px] text-muted-foreground">Cognitive Profile</div>
              <div className={`text-sm font-bold font-display ${cogConfig.color}`}>{mockStudent.cognitiveType}</div>
              <div className="text-[10px] text-muted-foreground">{cogConfig.desc}</div>
            </div>
          </div>
        </div>

        {/* Weekly improvement alert */}
        <div className="mt-4 flex items-center gap-2.5 bg-emerald-400/10 border border-emerald-400/20 rounded-lg px-4 py-2.5">
          <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs text-emerald-300">
            <strong>+{mockStudent.weeklyImprovement}% improvement</strong> this week! You're on track — keep it up.
          </span>
        </div>
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
        {/* Accuracy Trend */}
        <div className="card-glow p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold font-display text-foreground text-sm">Accuracy Trend</h3>
              <p className="text-xs text-muted-foreground">8-week performance</p>
            </div>
            <Award className="w-4 h-4 text-primary" />
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={accuracyTrend}>
              <defs>
                <linearGradient id="accGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(174 80% 48%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(174 80% 48%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 16%)" />
              <XAxis dataKey="week" tick={{ fontSize: 10, fill: "hsl(215 20% 55%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(215 20% 55%)" }} axisLine={false} tickLine={false} domain={[50, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="accuracy" name="accuracy" stroke="hsl(174 80% 48%)" strokeWidth={2} fill="url(#accGrad)" dot={{ fill: "hsl(174 80% 48%)", r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Response Time */}
        <div className="card-glow p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold font-display text-foreground text-sm">Response Time Trend</h3>
              <p className="text-xs text-muted-foreground">Avg seconds per question</p>
            </div>
            <Clock className="w-4 h-4 text-violet" />
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={accuracyTrend}>
              <defs>
                <linearGradient id="rtGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(262 75% 65%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(262 75% 65%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 16%)" />
              <XAxis dataKey="week" tick={{ fontSize: 10, fill: "hsl(215 20% 55%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(215 20% 55%)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="responseTime" name="responseTime" stroke="hsl(262 75% 65%)" strokeWidth={2} fill="url(#rtGrad)" dot={{ fill: "hsl(262 75% 65%)", r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Feature Metrics */}
      <div className="card-glow p-5">
        <h3 className="font-semibold font-display text-foreground text-sm mb-4">Behavioral Feature Vector</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Retry Ratio", value: `${(performanceMetrics.retryRatio * 100).toFixed(0)}%`, desc: "Questions with retries", color: "bg-amber/15", bar: performanceMetrics.retryRatio * 100 },
            { label: "Hesitation Index", value: `${(performanceMetrics.hesitationIndex * 100).toFixed(0)}%`, desc: "Cognitive hesitation rate", color: "bg-rose/15", bar: performanceMetrics.hesitationIndex * 100 },
            { label: "Concept Gap Score", value: `${performanceMetrics.conceptGapScore}`, desc: "Missing concept density", color: "bg-[#f87171]/15", bar: performanceMetrics.conceptGapScore },
            { label: "Session Improvement", value: `+${performanceMetrics.sessionImprovementRate}%`, desc: "Per session growth rate", color: "bg-emerald-400/15", bar: performanceMetrics.sessionImprovementRate },
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
