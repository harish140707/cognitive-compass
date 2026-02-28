/**
 * Derives all dashboard statistics purely from the live quizStore.
 * Import and call computeQuizStats() anywhere you need dynamic numbers.
 */
import { getAllTopicStats, TopicStats } from "./quizStore";
import { getCognitiveConfig } from "./cognitiveUtils";

export interface QuizStats {
  // Overview cards
  overallAccuracy: number;        // % correct of all attempts
  totalAttempts: number;
  totalRetries: number;
  retryRatio: number;             // retries / totalAttempts  [0-1]
  hesitationIndex: number;        // proxy: weak-topic ratio  [0-1]
  learningVelocity: number;       // strong-topics count
  consistencyIndex: number;       // topics with ≥1 attempt / total  [0-1]
  conceptGapScore: number;        // weak-topic count * 10 (0-80)
  sessionImprovementRate: number; // % improvement vs baseline

  // Cognitive profile
  cognitiveType: string;

  // Per-topic array (same shape TopicMastery already uses)
  topicStats: TopicStats[];

  // For charts — accuracy timeline across topics (sorted by mastery order)
  accuracyTimeline: { week: string; accuracy: number; responseTime: number }[];

  // Session-level chart data derived from topic stats
  sessionChartData: { session: string; retries: number; errors: number; duration: number; improvement: number }[];

  // Reports
  weeklyReports: { week: string; accuracy: number; sessions: number; improvement: number; cogType: string; status: string }[];

  // Recommendations — driven by weakest topics
  weakTopics: string[];
  strongTopics: string[];
  hasData: boolean;
}

const TOPIC_ORDER = ["Algebra", "Geometry", "Calculus", "Statistics", "Trigonometry", "Linear Algebra", "Probability", "Number Theory"];

export function computeQuizStats(): QuizStats {
  const all = getAllTopicStats();
  const attempted = all.filter(t => t.totalAttempts > 0);
  const hasData = attempted.length > 0;

  const totalAttempts = all.reduce((s, t) => s + t.totalAttempts, 0);
  const totalCorrect  = all.reduce((s, t) => s + t.correctAnswers, 0);
  const totalRetries  = all.reduce((s, t) => s + t.retries, 0);

  const overallAccuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;
  const retryRatio      = totalAttempts > 0 ? parseFloat((totalRetries / totalAttempts).toFixed(2)) : 0;

  const weakTopics   = all.filter(t => t.status === "weak").map(t => t.topic);
  const strongTopics = all.filter(t => t.status === "strong").map(t => t.topic);
  const mediumTopics = all.filter(t => t.status === "medium").map(t => t.topic);

  const hesitationIndex    = attempted.length > 0 ? parseFloat((weakTopics.length / Math.max(attempted.length, 1)).toFixed(2)) : 0.34;
  const learningVelocity   = parseFloat((strongTopics.length + mediumTopics.length * 0.5).toFixed(1));
  const consistencyIndex   = parseFloat((attempted.length / TOPIC_ORDER.length).toFixed(2));
  const conceptGapScore    = weakTopics.length * 10;
  const sessionImprovementRate = hasData ? parseFloat(Math.max(0, overallAccuracy - 60).toFixed(1)) : 0;

  // Cognitive type
  let cognitiveType = "Untested Learner";
  if (hasData) {
    if (overallAccuracy >= 80 && retryRatio < 0.2) cognitiveType = "Fast & Accurate Learner";
    else if (overallAccuracy >= 80 && retryRatio >= 0.2) cognitiveType = "Slow but Accurate Learner";
    else if (overallAccuracy < 60 && retryRatio >= 0.4) cognitiveType = "Trial-and-Error Learner";
    else if (conceptGapScore >= 40) cognitiveType = "Concept Gap Learner";
    else if (overallAccuracy >= 60 && retryRatio >= 0.3) cognitiveType = "High Cognitive Load Learner";
    else if (attempted.length >= 3 && consistencyIndex < 0.5) cognitiveType = "Inconsistent Performer";
    else cognitiveType = "Slow but Accurate Learner";
  }

  // Accuracy timeline — one point per attempted topic in order
  const accuracyTimeline = TOPIC_ORDER.map((topic, i) => {
    const t = all.find(x => x.topic === topic);
    return {
      week: topic.substring(0, 4),
      accuracy: t?.totalAttempts ? t.accuracy : 0,
      responseTime: t?.totalAttempts ? Math.max(8, 30 - t.accuracy * 0.25) : 30,
    };
  });

  // Session chart — one "session" per attempted topic
  const sessionChartData = attempted.map((t, i) => ({
    session: `S${i + 1}`,
    retries: t.retries,
    errors: t.totalAttempts - t.correctAnswers,
    duration: 20 + t.totalAttempts * 2,
    improvement: i === 0 ? 0 : t.accuracy - attempted[i - 1].accuracy,
  }));

  // Weekly reports — one "week" per attempted topic (most recent first)
  const weeklyReports = attempted.slice().reverse().map((t, i) => {
    const prevAcc = i < attempted.length - 1 ? attempted[attempted.length - 2 - i]?.accuracy ?? t.accuracy : t.accuracy;
    const diff = t.accuracy - prevAcc;
    return {
      week: t.topic,
      accuracy: t.accuracy,
      sessions: t.totalAttempts,
      improvement: diff,
      cogType: cognitiveType,
      status: t.status === "strong" ? "improving" : t.status === "weak" ? "declined" : "stable",
    };
  });

  return {
    overallAccuracy,
    totalAttempts,
    totalRetries,
    retryRatio,
    hesitationIndex,
    learningVelocity,
    consistencyIndex,
    conceptGapScore,
    sessionImprovementRate,
    cognitiveType,
    topicStats: all,
    accuracyTimeline,
    sessionChartData,
    weeklyReports,
    weakTopics,
    strongTopics,
    hasData,
  };
}
