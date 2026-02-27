import AppLayout from "@/components/AppLayout";
import { classStudents, weeklyReports, cognitiveTypes } from "@/lib/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { BarChart3, Download, TrendingUp } from "lucide-react";

const accuracyData = classStudents.map(s => ({ name: s.name.split(" ")[0], accuracy: s.accuracy, risk: s.risk }));

export default function TeacherAnalytics() {
  return (
    <AppLayout>
      <div className="mb-6 flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">Analytics & Export</h1>
          <p className="text-muted-foreground text-sm mt-1">Class-wide performance metrics and cognitive analytics</p>
        </div>
        <button className="flex items-center gap-2 bg-primary/15 hover:bg-primary/20 text-primary border border-primary/30 text-sm font-medium px-4 py-2 rounded-lg transition-all">
          <Download className="w-4 h-4" /> Export PDF Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Class Accuracy Bar */}
        <div className="card-glow p-5">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-primary" />
            <h3 className="font-semibold font-display text-sm text-foreground">Student Accuracy Comparison</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={accuracyData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 16%)" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: "hsl(215 20% 55%)" }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "hsl(215 20% 55%)" }} axisLine={false} tickLine={false} width={45} />
              <Tooltip contentStyle={{ background: "hsl(222 40% 9%)", border: "1px solid hsl(222 30% 16%)", borderRadius: "8px", fontSize: "11px" }} />
              <Bar dataKey="accuracy" name="Accuracy %" fill="hsl(174 80% 48%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Cognitive Distribution */}
        <div className="card-glow p-5">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-primary" />
            <h3 className="font-semibold font-display text-sm text-foreground">Cognitive Type Breakdown</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={cognitiveTypes} cx="50%" cy="50%" outerRadius={80} dataKey="count" nameKey="type">
                {cognitiveTypes.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(222 40% 9%)", border: "1px solid hsl(222 30% 16%)", borderRadius: "8px", fontSize: "11px" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="card-glow overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          <h3 className="font-semibold font-display text-foreground text-sm">Improvement Comparison Table</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Week", "Class Avg Accuracy", "Sessions Completed", "Avg Improvement", "Status"].map(h => (
                  <th key={h} className="text-left text-xs font-medium text-muted-foreground px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeklyReports.map(r => (
                <tr key={r.week} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3 text-foreground text-xs">{r.week}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-14 h-1.5 bg-border rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${r.accuracy}%` }} />
                      </div>
                      <span className="text-xs text-foreground font-medium">{r.accuracy}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{r.sessions * 4}</td>
                  <td className="px-5 py-3">
                    <span className={`metric-pill ${r.improvement > 0 ? "up" : r.improvement < 0 ? "down" : "neutral"}`}>
                      {r.improvement > 0 ? "+" : ""}{r.improvement}%
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${r.status === "improving" ? "bg-emerald-400/15 text-emerald-400" : r.status === "declined" ? "bg-rose-400/15 text-rose-400" : "bg-amber-400/15 text-amber-400"}`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
