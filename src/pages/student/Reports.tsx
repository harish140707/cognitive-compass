import AppLayout from "@/components/AppLayout";
import { weeklyReports } from "@/lib/mockData";
import { FileText, Download, TrendingUp, TrendingDown, Minus, Brain } from "lucide-react";

export default function Reports() {
  return (
    <AppLayout>
      <div className="mb-6 flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">Performance Reports</h1>
          <p className="text-muted-foreground text-sm mt-1">Weekly cognitive analytics & improvement history</p>
        </div>
        <button className="flex items-center gap-2 bg-primary/15 hover:bg-primary/20 text-primary border border-primary/30 text-sm font-medium px-4 py-2 rounded-lg transition-all">
          <Download className="w-4 h-4" />
          Export All
        </button>
      </div>

      {/* Cognitive Shift Timeline */}
      <div className="card-glow p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-4 h-4 text-primary" />
          <h3 className="font-semibold font-display text-foreground text-sm">Cognitive Profile Evolution</h3>
        </div>
        <div className="flex items-center gap-0 overflow-x-auto pb-2">
          {weeklyReports.slice().reverse().map((r, i) => (
            <div key={r.week} className="flex items-center gap-0 shrink-0">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${r.status === "improving" ? "bg-emerald-400/20 text-emerald-400 border border-emerald-400/40" : r.status === "declined" ? "bg-rose-400/20 text-rose-400 border border-rose-400/40" : "bg-primary/20 text-primary border border-primary/40"}`}>
                  {r.accuracy}
                </div>
                <div className="text-[9px] text-muted-foreground mt-1 w-20 text-center">{r.cogType}</div>
              </div>
              {i < weeklyReports.length - 1 && (
                <div className="w-8 h-px bg-border mx-1 mb-4" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Reports Table */}
      <div className="card-glow overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          <h3 className="font-semibold font-display text-foreground text-sm">Weekly Report History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Period", "Accuracy", "Sessions", "Improvement", "Cognitive Type", "Status", "Report"].map(h => (
                  <th key={h} className="text-left text-xs font-medium text-muted-foreground px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeklyReports.map(r => {
                const Icon = r.improvement > 0 ? TrendingUp : r.improvement < 0 ? TrendingDown : Minus;
                const iColor = r.improvement > 0 ? "text-emerald-400" : r.improvement < 0 ? "text-rose-400" : "text-amber-400";
                const sColor = r.status === "improving" ? "text-emerald-400 bg-emerald-400/15" : r.status === "declined" ? "text-rose-400 bg-rose-400/15" : "text-amber-400 bg-amber-400/15";
                return (
                  <tr key={r.week} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3 text-foreground font-medium text-xs">{r.week}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 bg-border rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${r.accuracy}%` }} />
                        </div>
                        <span className="font-medium text-foreground">{r.accuracy}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{r.sessions}</td>
                    <td className="px-5 py-3">
                      <div className={`flex items-center gap-1 ${iColor}`}>
                        <Icon className="w-3 h-3" />
                        <span className="font-medium text-xs">{r.improvement > 0 ? "+" : ""}{r.improvement}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-xs text-muted-foreground">{r.cogType}</td>
                    <td className="px-5 py-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${sColor}`}>{r.status}</span>
                    </td>
                    <td className="px-5 py-3">
                      <button className="flex items-center gap-1 text-[10px] text-primary hover:text-primary/80 font-medium transition-colors">
                        <Download className="w-3 h-3" /> PDF
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Predictive Forecast */}
      <div className="mt-4 card-glow p-5 border-l-2 border-primary">
        <div className="text-xs text-muted-foreground mb-1">AI Predictive Analytics</div>
        <h3 className="font-bold font-display text-foreground mb-2">Projected Performance — Next 4 Weeks</h3>
        <p className="text-xs text-muted-foreground mb-3">Based on current trajectory, learning velocity, and behavioral patterns, the model predicts:</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Projected Accuracy", value: "87%", desc: "+9% from current", color: "text-teal" },
            { label: "Dropout Risk", value: "Low", desc: "8% probability", color: "text-emerald-400" },
            { label: "Concept Mastery ETA", value: "3 weeks", desc: "Calculus & Trig", color: "text-violet" },
          ].map(({ label, value, desc, color }) => (
            <div key={label} className="bg-muted rounded-lg p-3">
              <div className={`text-lg font-bold font-display ${color} mb-0.5`}>{value}</div>
              <div className="text-xs font-medium text-foreground">{label}</div>
              <div className="text-[10px] text-muted-foreground">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
