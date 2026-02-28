import AppLayout from "@/components/AppLayout";
import { computeQuizStats } from "@/lib/quizStats";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Activity, RefreshCw, Clock, TrendingUp, AlertCircle } from "lucide-react";

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
  const q = computeQuizStats();
  const data = q.sessionChartData;

  const totalRetries = q.totalRetries;
  const avgErrors = data.length > 0
    ? (data.reduce((s, d) => s + d.errors, 0) / data.length).toFixed(1)
    : "0";
  const avgDuration = data.length > 0
    ? (data.reduce((s, d) => s + d.duration, 0) / data.length).toFixed(0)
    : "0";

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-display text-foreground">Session Insights</h1>
        <p className="text-muted-foreground text-sm mt-1">Behavioral patterns derived from your quiz performance</p>
      </div>

      {!q.hasData && (
        <div className="mb-6 flex items-center gap-2.5 bg-amber-400/10 border border-amber-400/20 rounded-lg px-4 py-2.5">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-xs text-amber-300">No quiz attempts yet — take quizzes in <strong>Topic Mastery</strong> to populate this page.</span>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { icon: RefreshCw, label: "Total Retries",       value: totalRetries, color: "text-amber" },
          { icon: Activity,  label: "Avg Errors/Topic",    value: avgErrors,    color: "text-rose" },
          { icon: Clock,     label: "Avg Questions/Topic", value: avgDuration,  color: "text-teal" },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="stat-card">
            <Icon className={`w-4 h-4 ${color}`} />
            <div className={`text-2xl font-bold font-display ${color}`}>{value}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div className="card-glow p-5">
          <div className="flex items-center gap-2 mb-4">
            <RefreshCw className="w-4 h-4 text-amber" />
            <h3 className="font-semibold font-display text-sm text-foreground">Retry Behavior per Topic</h3>
          </div>
          {q.hasData ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="session" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="retries" name="retries" fill="hsl(38 92% 55%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[200px] flex items-center justify-center text-muted-foreground text-xs">No data yet</div>
          )}
        </div>

        <div className="card-glow p-5">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-rose" />
            <h3 className="font-semibold font-display text-sm text-foreground">Error Frequency per Topic</h3>
          </div>
          {q.hasData ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="session" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="errors" name="errors" fill="hsl(348 80% 60%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[200px] flex items-center justify-center text-muted-foreground text-xs">No data yet</div>
          )}
        </div>
      </div>

      <div className="card-glow p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-teal" />
          <h3 className="font-semibold font-display text-sm text-foreground">Accuracy Improvement Across Topics</h3>
        </div>
        {q.hasData ? (
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="session" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="improvement" name="improvement %" stroke="hsl(174 80% 48%)" strokeWidth={2} dot={{ fill: "hsl(174 80% 48%)", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[180px] flex items-center justify-center text-muted-foreground text-xs">No data yet</div>
        )}
      </div>
    </AppLayout>
  );
}
