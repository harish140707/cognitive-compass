import { useState, useCallback } from "react";
import AppLayout from "@/components/AppLayout";
import QuizModal from "@/components/QuizModal";
import { getAllTopicStats, TopicStats } from "@/lib/quizStore";
import { BookOpen, AlertCircle, Play, TrendingUp, Target, RefreshCw } from "lucide-react";

function getStatusConfig(status: TopicStats["status"]) {
  switch (status) {
    case "strong": return { label: "Strong", bg: "bg-emerald/15", color: "text-emerald", hsl: "142 70% 45%", textHsl: "142 70% 55%" };
    case "medium": return { label: "Medium", bg: "bg-amber/15", color: "text-amber", hsl: "38 92% 55%", textHsl: "38 92% 65%" };
    case "weak": return { label: "Weak", bg: "bg-rose/15", color: "text-rose", hsl: "348 80% 60%", textHsl: "348 80% 65%" };
    default: return { label: "Untested", bg: "bg-muted", color: "text-muted-foreground", hsl: "215 20% 40%", textHsl: "215 20% 55%" };
  }
}

export default function TopicMastery() {
  const [stats, setStats] = useState<TopicStats[]>(() => getAllTopicStats());
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);

  const refresh = useCallback(() => setStats(getAllTopicStats()), []);

  const weakTopics = stats.filter(t => t.status === "weak");
  const testedTopics = stats.filter(t => t.status !== "untested");

  return (
    <AppLayout>
      {activeQuiz && (
        <QuizModal
          topic={activeQuiz}
          onClose={() => { setActiveQuiz(null); refresh(); }}
          onComplete={() => refresh()}
        />
      )}

      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">Topic Mastery</h1>
          <p className="text-muted-foreground text-sm mt-1">Take quizzes per subject — stats update based on your real performance</p>
        </div>
        <button
          onClick={refresh}
          className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground transition-colors font-medium"
        >
          <RefreshCw className="w-3 h-3" />
          Refresh
        </button>
      </div>

      {/* Concept gap alert */}
      {weakTopics.length > 0 && (
        <div className="mb-6 flex items-start gap-3 bg-rose/10 border border-rose/20 rounded-lg px-4 py-3">
          <AlertCircle className="w-4 h-4 text-rose mt-0.5 shrink-0" />
          <div>
            <div className="text-sm font-semibold text-rose">Concept Gaps Detected</div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {weakTopics.map(t => t.topic).join(", ")} require immediate attention. Your AI recommendations have been updated.
            </div>
          </div>
        </div>
      )}

      {/* Summary row */}
      {testedTopics.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="card-glow p-4">
            <div className="text-xs text-muted-foreground mb-1">Topics Tested</div>
            <div className="text-2xl font-bold font-display text-primary">{testedTopics.length}<span className="text-sm text-muted-foreground font-normal">/{stats.length}</span></div>
          </div>
          <div className="card-glow p-4">
            <div className="text-xs text-muted-foreground mb-1">Total Attempts</div>
            <div className="text-2xl font-bold font-display text-foreground">{testedTopics.reduce((s, t) => s + t.totalAttempts, 0)}</div>
          </div>
          <div className="card-glow p-4">
            <div className="text-xs text-muted-foreground mb-1">Avg Accuracy</div>
            <div className="text-2xl font-bold font-display text-emerald">
              {testedTopics.length > 0 ? Math.round(testedTopics.reduce((s, t) => s + t.accuracy, 0) / testedTopics.length) : 0}%
            </div>
          </div>
        </div>
      )}

      {/* Topic Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {stats.map(t => {
          const cfg = getStatusConfig(t.status);
          const untested = t.status === "untested";
          return (
            <div
              key={t.topic}
              className="card-glow p-4 relative overflow-hidden group cursor-pointer"
              onClick={() => setActiveQuiz(t.topic)}
            >
              {!untested && (
                <div
                  className="absolute inset-0 opacity-[0.07] rounded-xl"
                  style={{ background: `hsl(${cfg.hsl})` }}
                />
              )}
              <div className="relative">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-sm font-semibold font-display text-foreground leading-tight">{t.topic}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium shrink-0 ml-1 ${cfg.bg} ${cfg.color}`}>
                    {cfg.label}
                  </span>
                </div>

                {untested ? (
                  <div className="py-3 flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Play className="w-4 h-4 text-primary ml-0.5" />
                    </div>
                    <span className="text-[11px] text-muted-foreground">Start Quiz</span>
                  </div>
                ) : (
                  <>
                    <div className="text-2xl font-bold font-display mb-1" style={{ color: `hsl(${cfg.textHsl})` }}>
                      {t.accuracy}%
                    </div>
                    <div className="h-1.5 bg-border rounded-full overflow-hidden mb-2">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${t.accuracy}%`, background: `hsl(${cfg.hsl})` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-muted-foreground">
                      <span>{t.totalAttempts} attempts</span>
                      <span>{t.retries} retries</span>
                    </div>
                  </>
                )}

                {/* Take quiz button overlay */}
                {!untested && (
                  <div className="mt-2 flex items-center gap-1 text-[10px] text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-3 h-3" />
                    Continue Quiz
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Table */}
      {testedTopics.length > 0 && (
        <div className="card-glow overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <h3 className="font-semibold font-display text-foreground text-sm">Detailed Topic Analysis</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">{testedTopics.length} topic{testedTopics.length !== 1 ? "s" : ""} tested</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {["Topic", "Accuracy", "Correct", "Attempts", "Retries", "Error Rate", "Status", ""].map(h => (
                    <th key={h} className="text-left text-xs font-medium text-muted-foreground px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...testedTopics].sort((a, b) => a.accuracy - b.accuracy).map(t => {
                  const cfg = getStatusConfig(t.status);
                  const errorRate = t.totalAttempts > 0 ? Math.round(((t.totalAttempts - t.correctAnswers) / t.totalAttempts) * 100) : 0;
                  return (
                    <tr key={t.topic} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3 font-medium text-foreground">{t.topic}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-border rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all" style={{ width: `${t.accuracy}%`, background: `hsl(${cfg.hsl})` }} />
                          </div>
                          <span className="text-foreground font-medium">{t.accuracy}%</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-muted-foreground">{t.correctAnswers}/{t.totalAttempts}</td>
                      <td className="px-5 py-3 text-muted-foreground">{t.totalAttempts}</td>
                      <td className="px-5 py-3 text-muted-foreground">{t.retries}</td>
                      <td className="px-5 py-3">
                        <span className={`metric-pill ${errorRate > 40 ? "down" : errorRate > 25 ? "neutral" : "up"}`}>
                          {errorRate}%
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${cfg.bg} ${cfg.color}`}>
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <button
                          onClick={() => setActiveQuiz(t.topic)}
                          className="text-[10px] text-primary hover:text-primary/80 font-medium transition-colors flex items-center gap-1"
                        >
                          <Play className="w-3 h-3" />
                          Quiz
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {testedTopics.length === 0 && (
        <div className="card-glow p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-lg font-bold font-display text-foreground mb-2">No quiz data yet</h3>
          <p className="text-sm text-muted-foreground mb-4">Click any subject card above to start a quiz.<br/>Your accuracy, attempts, and retries will be tracked in real time.</p>
        </div>
      )}
    </AppLayout>
  );
}
