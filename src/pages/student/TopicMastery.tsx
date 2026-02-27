import AppLayout from "@/components/AppLayout";
import { topicMastery } from "@/lib/mockData";
import { getStatusConfig } from "@/lib/cognitiveUtils";
import { BookOpen, AlertCircle, TrendingUp } from "lucide-react";

export default function TopicMastery() {
  const weakTopics = topicMastery.filter(t => t.status === "weak");
  const strongTopics = topicMastery.filter(t => t.status === "strong");

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-display text-foreground">Topic Mastery</h1>
        <p className="text-muted-foreground text-sm mt-1">Heatmap of your performance across all subject areas</p>
      </div>

      {/* Alert */}
      {weakTopics.length > 0 && (
        <div className="mb-6 flex items-start gap-3 bg-rose-400/10 border border-rose-400/20 rounded-lg px-4 py-3">
          <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
          <div>
            <div className="text-sm font-semibold text-rose-300">Concept Gaps Detected</div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {weakTopics.map(t => t.topic).join(", ")} require immediate attention. Your AI recommendations have been updated.
            </div>
          </div>
        </div>
      )}

      {/* Heatmap Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {topicMastery.map(t => {
          const statusCfg = getStatusConfig(t.status);
          const intensity = t.accuracy / 100;
          return (
            <div key={t.topic} className="card-glow p-4 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-10 rounded-xl"
                style={{ background: `hsl(${t.status === "strong" ? "142 70% 45%" : t.status === "weak" ? "348 80% 60%" : "38 92% 55%"})` }}
              />
              <div className="relative">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-sm font-semibold font-display text-foreground">{t.topic}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${statusCfg.bg} ${statusCfg.color}`}>
                    {statusCfg.label}
                  </span>
                </div>
                <div className="text-2xl font-bold font-display mb-1" style={{ color: `hsl(${t.status === "strong" ? "142 70% 55%" : t.status === "weak" ? "348 80% 65%" : "38 92% 65%"})` }}>
                  {t.accuracy}%
                </div>
                <div className="h-1.5 bg-border rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${t.accuracy}%`,
                      background: `hsl(${t.status === "strong" ? "142 70% 45%" : t.status === "weak" ? "348 80% 60%" : "38 92% 55%"})`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>{t.attempts} attempts</span>
                  <span>{t.retries} retries</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Table */}
      <div className="card-glow overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-primary" />
          <h3 className="font-semibold font-display text-foreground text-sm">Detailed Topic Analysis</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Topic", "Accuracy", "Attempts", "Retries", "Error Rate", "Status", "Action"].map(h => (
                  <th key={h} className="text-left text-xs font-medium text-muted-foreground px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topicMastery.sort((a, b) => a.accuracy - b.accuracy).map(t => {
                const statusCfg = getStatusConfig(t.status);
                const errorRate = ((t.retries / t.attempts) * 100).toFixed(0);
                return (
                  <tr key={t.topic} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3 font-medium text-foreground">{t.topic}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-border rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${t.accuracy}%` }} />
                        </div>
                        <span className="text-foreground font-medium">{t.accuracy}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{t.attempts}</td>
                    <td className="px-5 py-3 text-muted-foreground">{t.retries}</td>
                    <td className="px-5 py-3">
                      <span className={`metric-pill ${parseInt(errorRate) > 40 ? "down" : parseInt(errorRate) > 25 ? "neutral" : "up"}`}>
                        {errorRate}%
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusCfg.bg} ${statusCfg.color}`}>
                        {statusCfg.label}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      {t.status !== "strong" && (
                        <button className="text-[10px] text-primary hover:text-primary/80 font-medium transition-colors">
                          Get Strategy →
                        </button>
                      )}
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
