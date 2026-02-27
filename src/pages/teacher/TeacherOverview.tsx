import AppLayout from "@/components/AppLayout";
import { classStudents, cognitiveTypes, topicMastery } from "@/lib/mockData";
import { getCognitiveConfig, getRiskConfig, getTrendIcon, getTrendColor } from "@/lib/cognitiveUtils";
import { mockTeacher } from "@/lib/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Users, AlertTriangle, TrendingUp, Brain, BarChart3 } from "lucide-react";

const RADIAN = Math.PI / 180;
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  if (percent < 0.08) return null;
  return <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={10}>{`${(percent * 100).toFixed(0)}%`}</text>;
};

export default function TeacherOverview() {
  const { userName } = useAuth();
  const highRisk = classStudents.filter(s => s.risk === "high");
  const avgAccuracy = (classStudents.reduce((s, st) => s + st.accuracy, 0) / classStudents.length).toFixed(0);

  return (
    <AppLayout>
      <div className="mb-6">
        <p className="text-muted-foreground text-sm mb-1">Teacher Portal</p>
        <h1 className="text-2xl font-bold font-display text-foreground">{userName || mockTeacher.name}</h1>
        <p className="text-muted-foreground text-sm mt-1">{mockTeacher.subject} · {mockTeacher.students} Students</p>
      </div>

      {/* Risk Alert */}
      {highRisk.length > 0 && (
        <div className="mb-6 flex items-start gap-3 bg-rose-400/10 border border-rose-400/20 rounded-lg px-4 py-3">
          <AlertTriangle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
          <div>
            <div className="text-sm font-semibold text-rose-300">{highRisk.length} High-Risk Students Detected</div>
            <div className="text-xs text-muted-foreground">{highRisk.map(s => s.name).join(", ")} — immediate intervention recommended.</div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Students", value: classStudents.length, icon: Users, color: "text-teal" },
          { label: "Class Avg Accuracy", value: `${avgAccuracy}%`, icon: BarChart3, color: "text-violet" },
          { label: "High Risk Students", value: highRisk.length, icon: AlertTriangle, color: "text-rose" },
          { label: "Improving Students", value: classStudents.filter(s => s.trend === "up").length, icon: TrendingUp, color: "text-emerald-400" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="stat-card">
            <Icon className={`w-4 h-4 ${color}`} />
            <div className={`text-2xl font-bold font-display ${color}`}>{value}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Cognitive Distribution */}
        <div className="card-glow p-5">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-4 h-4 text-primary" />
            <h3 className="font-semibold font-display text-sm text-foreground">Cognitive Type Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={cognitiveTypes} cx="50%" cy="50%" outerRadius={80} dataKey="count" labelLine={false} label={renderCustomLabel}>
                {cognitiveTypes.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: "hsl(222 40% 9%)", border: "1px solid hsl(222 30% 16%)", borderRadius: "8px", fontSize: "11px" }}
                labelStyle={{ color: "hsl(210 40% 95%)" }}
              />
              <Legend wrapperStyle={{ fontSize: "10px" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Topic Difficulty Index */}
        <div className="card-glow p-5">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-primary" />
            <h3 className="font-semibold font-display text-sm text-foreground">Topic Difficulty Index</h3>
          </div>
          <div className="space-y-2.5">
            {topicMastery.sort((a, b) => a.accuracy - b.accuracy).map(t => (
              <div key={t.topic}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-foreground">{t.topic}</span>
                  <span className={t.accuracy < 50 ? "text-rose-400" : t.accuracy < 70 ? "text-amber-400" : "text-emerald-400"}>{t.accuracy}%</span>
                </div>
                <div className="h-1.5 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${t.accuracy}%`,
                      background: t.accuracy < 50 ? "hsl(348 80% 60%)" : t.accuracy < 70 ? "hsl(38 92% 55%)" : "hsl(142 70% 45%)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Student Table */}
      <div className="card-glow overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="font-semibold font-display text-foreground text-sm">Class Roster — Cognitive Profiles</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Student", "Cognitive Type", "Accuracy", "Trend", "Risk", "Weak Topics"].map(h => (
                  <th key={h} className="text-left text-xs font-medium text-muted-foreground px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {classStudents.map(s => {
                const cogCfg = getCognitiveConfig(s.cogType);
                const riskCfg = getRiskConfig(s.risk);
                const TrendIcon = getTrendIcon(s.trend);
                const trendColor = getTrendColor(s.trend);
                return (
                  <tr key={s.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-primary text-[10px] font-bold">
                          {s.name.split(" ").map((n: string) => n[0]).join("")}
                        </div>
                        <span className="font-medium text-foreground text-xs">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${cogCfg.bg} ${cogCfg.color}`}>{s.cogType}</span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 bg-border rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${s.accuracy}%` }} />
                        </div>
                        <span className="text-xs font-medium text-foreground">{s.accuracy}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <TrendIcon className={`w-4 h-4 ${trendColor}`} />
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${riskCfg.bg} ${riskCfg.color}`}>{riskCfg.label}</span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex flex-wrap gap-1">
                        {s.topics.slice(0, 2).map((t: string) => (
                          <span key={t} className="text-[10px] bg-rose-400/10 text-rose-400 px-1.5 py-0.5 rounded-full">{t}</span>
                        ))}
                        {s.topics.length > 2 && <span className="text-[10px] text-muted-foreground">+{s.topics.length - 2}</span>}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
