import AppLayout from "@/components/AppLayout";
import { classStudents } from "@/lib/mockData";
import { accuracyTrend, topicMastery } from "@/lib/mockData";
import { getCognitiveConfig } from "@/lib/cognitiveUtils";
import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Users, Brain, Search } from "lucide-react";

export default function StudentAnalysis() {
  const [selected, setSelected] = useState(classStudents[0]);
  const [search, setSearch] = useState("");

  const filtered = classStudents.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
  const cogCfg = getCognitiveConfig(selected.cogType);

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-display text-foreground">Student Deep Analysis</h1>
        <p className="text-muted-foreground text-sm mt-1">Individual cognitive performance timelines and weak topic mapping</p>
      </div>

      <div className="flex gap-4">
        {/* Student List */}
        <div className="w-56 shrink-0">
          <div className="relative mb-3">
            <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-2.5 top-2.5" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search students..."
              className="w-full bg-muted border border-border rounded-lg pl-8 pr-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="space-y-1">
            {filtered.map(s => {
              const cfg = getCognitiveConfig(s.cogType);
              return (
                <button
                  key={s.id}
                  onClick={() => setSelected(s)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition-all ${selected.id === s.id ? "bg-primary/15 border border-primary/30" : "hover:bg-muted border border-transparent"}`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center text-primary text-[9px] font-bold shrink-0">
                      {s.name.split(" ").map((n: string) => n[0]).join("")}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-medium text-foreground truncate">{s.name}</div>
                      <div className={`text-[9px] ${cfg.color} truncate`}>{s.cogType}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail Panel */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Profile Header */}
          <div className="card-glow p-5 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center text-primary font-bold font-display text-base shrink-0">
              {selected.name.split(" ").map((n: string) => n[0]).join("")}
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold font-display text-foreground">{selected.name}</h2>
              <div className={`inline-flex items-center gap-1.5 mt-1 px-2.5 py-1 rounded-full text-xs font-semibold ${cogCfg.bg} ${cogCfg.color}`}>
                <Brain className="w-3 h-3" />
                {selected.cogType}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold font-display text-primary">{selected.accuracy}%</div>
              <div className="text-xs text-muted-foreground">Accuracy</div>
            </div>
          </div>

          {/* Performance Timeline */}
          <div className="card-glow p-5">
            <h3 className="font-semibold font-display text-sm text-foreground mb-4">Performance Timeline (8 Weeks)</h3>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={accuracyTrend}>
                <defs>
                  <linearGradient id="sGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(174 80% 48%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(174 80% 48%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 16%)" />
                <XAxis dataKey="week" tick={{ fontSize: 10, fill: "hsl(215 20% 55%)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(215 20% 55%)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "hsl(222 40% 9%)", border: "1px solid hsl(222 30% 16%)", borderRadius: "8px", fontSize: "11px" }} />
                <Area type="monotone" dataKey="accuracy" stroke="hsl(174 80% 48%)" strokeWidth={2} fill="url(#sGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Weak Topic Map */}
          <div className="card-glow p-5">
            <h3 className="font-semibold font-display text-sm text-foreground mb-3">Topic Performance Map</h3>
            <div className="grid grid-cols-4 gap-2">
              {topicMastery.map(t => (
                <div key={t.topic} className={`rounded-lg p-2.5 text-center ${t.status === "weak" ? "bg-rose-400/15" : t.status === "strong" ? "bg-emerald-400/15" : "bg-amber-400/15"}`}>
                  <div className={`text-sm font-bold font-display mb-0.5 ${t.status === "weak" ? "text-rose-400" : t.status === "strong" ? "text-emerald-400" : "text-amber-400"}`}>
                    {t.accuracy}%
                  </div>
                  <div className="text-[9px] text-muted-foreground">{t.topic}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
