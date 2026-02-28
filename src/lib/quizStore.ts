// In-memory store for quiz progress (per session)
export interface TopicStats {
  topic: string;
  totalAttempts: number;
  correctAnswers: number;
  retries: number;
  usedQuestionIds: string[];
  accuracy: number;
  status: "strong" | "medium" | "weak" | "untested";
}

const defaultTopics = ["Algebra", "Geometry", "Calculus", "Statistics", "Trigonometry", "Linear Algebra", "Probability", "Number Theory"];

let store: Map<string, TopicStats> = new Map(
  defaultTopics.map(topic => [topic, {
    topic,
    totalAttempts: 0,
    correctAnswers: 0,
    retries: 0,
    usedQuestionIds: [],
    accuracy: 0,
    status: "untested",
  }])
);

export function getTopicStats(topic: string): TopicStats {
  return store.get(topic) ?? {
    topic, totalAttempts: 0, correctAnswers: 0, retries: 0,
    usedQuestionIds: [], accuracy: 0, status: "untested",
  };
}

export function getAllTopicStats(): TopicStats[] {
  return Array.from(store.values());
}

export function recordAnswer(topic: string, questionId: string, correct: boolean, isRetry: boolean) {
  const s = getTopicStats(topic);
  const updated: TopicStats = {
    ...s,
    totalAttempts: s.totalAttempts + 1,
    correctAnswers: s.correctAnswers + (correct ? 1 : 0),
    retries: s.retries + (isRetry ? 1 : 0),
    usedQuestionIds: s.usedQuestionIds.includes(questionId)
      ? s.usedQuestionIds
      : [...s.usedQuestionIds, questionId],
  };
  const accuracy = updated.totalAttempts > 0
    ? Math.round((updated.correctAnswers / updated.totalAttempts) * 100)
    : 0;
  updated.accuracy = accuracy;
  updated.status = accuracy >= 80 ? "strong" : accuracy >= 55 ? "medium" : accuracy > 0 ? "weak" : "untested";
  store.set(topic, updated);
}

export function resetStore() {
  store = new Map(
    defaultTopics.map(topic => [topic, {
      topic, totalAttempts: 0, correctAnswers: 0, retries: 0,
      usedQuestionIds: [], accuracy: 0, status: "untested",
    }])
  );
}
