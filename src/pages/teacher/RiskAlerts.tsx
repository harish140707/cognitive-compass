import AppLayout from "@/components/AppLayout";
import { classStudents } from "@/lib/mockData";
import { getRiskConfig, getTrendIcon, getTrendColor } from "@/lib/cognitiveUtils";
import { AlertTriangle, Zap, Brain, Users } from "lucide-react";

export default function RiskAlerts() {
  const highRisk = classStudents.filter(s => s.risk === "high");
  const medRisk = classStudents.filter(s => s.risk === "medium");

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-display text-foreground">Risk Alerts</h1>
        <p className="text-muted-foreground text-sm mt-1">Students requiring immediate intervention based on AI analysis</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="stat-card">
          <AlertTriangle className="w-4 h-4 text-rose-400" />
          <div className="text-2xl font-bold font-display text-rose-400">{highRisk.length}</div>
          <div className="text-xs text-muted-foreground">High Risk Students</div>
        </div>
        <div className="stat-card">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <div className="text-2xl font-bold font-display text-amber-400">{medRisk.length}</div>
          <div className="text-xs text-muted-foreground">Medium Risk Students</div>
        </div>
        <div className="stat-card">
          <Users className="w-4 h-4 text-emerald-400" />
          <div className="text-2xl font-bold font-display text-emerald-400">{classStudents.filter(s => s.risk === "low").length}</div>
          <div className="text-xs text-muted-foreground">On Track Students</div>
        </div>
      </div>

      {/* High Risk */}
      <div className="mb-4">
        <h3 className="font-semibold font-display text-rose-400 text-sm mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          High Risk — Immediate Intervention Required
        </h3>
        <div className="space-y-3">
          {highRisk.map(s => {
            const TrendIcon = getTrendIcon(s.trend);
            const tColor = getTrendColor(s.trend);
            return (
              <div key={s.id} className="card-glow p-4 border-l-2 border-rose-400">
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-rose-400/15 flex items-center justify-center text-rose-400 text-xs font-bold">
                      {s.name.split(" ").map((n: string) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">{s.name}</div>
                      <div className="text-[10px] text-muted-foreground">{s.cogType}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-bold text-rose-400">{s.accuracy}%</div>
                      <div className="text-[10px] text-muted-foreground">accuracy</div>
                    </div>
                    <TrendIcon className={`w-4 h-4 ${tColor}`} />
                  </div>
                </div>
                {s.topics.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border/50">
                    <div className="text-[10px] text-muted-foreground mb-1.5">Concept gaps detected:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {s.topics.map((t: string) => (
                        <span key={t} className="text-[10px] bg-rose-400/10 text-rose-400 px-2 py-0.5 rounded-full">{t}</span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-3 pt-3 border-t border-border/50 flex items-center gap-2">
                  <Zap className="w-3 h-3 text-amber-400" />
                  <span className="text-[10px] text-muted-foreground">AI Recommendation: Assign scaffolded remediation modules + schedule 1-on-1 review session</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Medium Risk */}
      <div>
        <h3 className="font-semibold font-display text-amber-400 text-sm mb-3 flex items-center gap-2">
          <Brain className="w-4 h-4" />
          Medium Risk — Monitor Closely
        </h3>
        <div className="space-y-2">
          {medRisk.map(s => (
            <div key={s.id} className="card-glow p-4 flex items-center justify-between border-l-2 border-amber-400">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-400/15 flex items-center justify-center text-amber-400 text-xs font-bold">
                  {s.name.split(" ").map((n: string) => n[0]).join("")}
                </div>
                <div>
                  <div className="font-medium text-foreground text-sm">{s.name}</div>
                  <div className="text-[10px] text-muted-foreground">{s.cogType}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-amber-400">{s.accuracy}%</span>
                {s.topics.map((t: string) => (
                  <span key={t} className="text-[10px] bg-amber-400/10 text-amber-400 px-2 py-0.5 rounded-full">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
