import AppLayout from "@/components/AppLayout";
import { sessionData } from "@/lib/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Activity, RefreshCw, Clock, TrendingUp } from "lucide-react";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-card border border-border rounded-lg px-3 py-2 text-xs shadow-xl">
        <div className="font-semibold text-foreground mb-1">{label}</div>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-muted-foreground">{p.name}: </span>
            <span className="font-medium text-foreground">{p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function SessionInsights() {
  const totalRetries = sessionData.reduce((s, d) => s + d.retries, 0);
  const avgErrors = (sessionData.reduce((s, d) => s + d.errors, 0) / sessionData.length).toFixed(1);
  const avgDuration = (sessionData.reduce((s, d) => s + d.duration, 0) / sessionData.length).toFixed(0);

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-display text-foreground">Session Insights</h1>
        <p className="text-muted-foreground text-sm mt-1">Behavioral patterns across your learning sessions</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { icon: RefreshCw, label: "Total Retries", value: totalRetries, color: "text-amber" },
          { icon: Activity, label: "Avg Errors/Session", value: avgErrors, color: "text-rose" },
          { icon: Clock, label: "Avg Duration (min)", value: avgDuration, color: "text-teal" },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="stat-card">
            <Icon className={`w-4 h-4 ${color}`} />
            <div className={`text-2xl font-bold font-display ${color}`}>{value}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Retry Behavior */}
        <div className="card-glow p-5">
          <div className="flex items-center gap-2 mb-4">
            <RefreshCw className="w-4 h-4 text-amber" />
            <h3 className="font-semibold font-display text-sm text-foreground">Retry Behavior per Session</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={sessionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 16%)" />
              <XAxis dataKey="session" tick={{ fontSize: 10, fill: "hsl(215 20% 55%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(215 20% 55%)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="retries" name="retries" fill="hsl(38 92% 55%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Error Frequency */}
        <div className="card-glow p-5">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-rose" />
            <h3 className="font-semibold font-display text-sm text-foreground">Error Frequency Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={sessionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 16%)" />
              <XAxis dataKey="session" tick={{ fontSize: 10, fill: "hsl(215 20% 55%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(215 20% 55%)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="errors" name="errors" fill="hsl(348 80% 60%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Session Improvement Line */}
      <div className="card-glow p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-teal" />
          <h3 className="font-semibold font-display text-sm text-foreground">Cognitive Consistency — Improvement Rate per Session</h3>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={sessionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 16%)" />
            <XAxis dataKey="session" tick={{ fontSize: 10, fill: "hsl(215 20% 55%)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "hsl(215 20% 55%)" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="improvement" name="improvement %" stroke="hsl(174 80% 48%)" strokeWidth={2} dot={{ fill: "hsl(174 80% 48%)", r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </AppLayout>
  );
}
