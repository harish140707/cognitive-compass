// Mock data for the cognitive learning analyzer
export const mockStudent = {
  id: "stu-001",
  name: "Alex Chen",
  email: "alex.chen@edu.com",
  role: "student",
  avatar: "AC",
  grade: "10th Grade",
  enrolled: "Sep 2024",
  cognitiveType: "Slow but Accurate Learner",
  cognitiveScore: 78,
  weeklyImprovement: 12,
  learningVelocity: 6.4,
  consistencyIndex: 0.82,
};

export const mockTeacher = {
  id: "tea-001",
  name: "Dr. Sarah Mitchell",
  email: "s.mitchell@school.edu",
  role: "teacher",
  avatar: "SM",
  subject: "Mathematics & Science",
  students: 34,
};

export const accuracyTrend = [
  { week: "W1", accuracy: 58, responseTime: 32 },
  { week: "W2", accuracy: 62, responseTime: 29 },
  { week: "W3", accuracy: 65, responseTime: 27 },
  { week: "W4", accuracy: 61, responseTime: 28 },
  { week: "W5", accuracy: 70, responseTime: 24 },
  { week: "W6", accuracy: 74, responseTime: 22 },
  { week: "W7", accuracy: 73, responseTime: 21 },
  { week: "W8", accuracy: 78, responseTime: 20 },
];

export const topicMastery = [
  { topic: "Algebra", accuracy: 85, attempts: 42, retries: 8, status: "strong" },
  { topic: "Geometry", accuracy: 72, attempts: 38, retries: 12, status: "medium" },
  { topic: "Calculus", accuracy: 45, attempts: 31, retries: 22, status: "weak" },
  { topic: "Statistics", accuracy: 68, attempts: 25, retries: 9, status: "medium" },
  { topic: "Trigonometry", accuracy: 38, attempts: 28, retries: 19, status: "weak" },
  { topic: "Linear Algebra", accuracy: 80, attempts: 20, retries: 5, status: "strong" },
  { topic: "Probability", accuracy: 61, attempts: 33, retries: 14, status: "medium" },
  { topic: "Number Theory", accuracy: 55, attempts: 18, retries: 10, status: "medium" },
];

export const sessionData = [
  { session: "S1", retries: 18, errors: 12, duration: 42, improvement: 0 },
  { session: "S2", retries: 15, errors: 10, duration: 38, improvement: 5 },
  { session: "S3", retries: 20, errors: 14, duration: 51, improvement: -3 },
  { session: "S4", retries: 12, errors: 8, duration: 35, improvement: 8 },
  { session: "S5", retries: 10, errors: 7, duration: 33, improvement: 11 },
  { session: "S6", retries: 8, errors: 5, duration: 30, improvement: 14 },
];

export const cognitiveTypes = [
  { type: "Fast & Accurate", count: 6, color: "#2dd4bf" },
  { type: "Trial & Error", count: 8, color: "#f59e0b" },
  { type: "Slow & Accurate", count: 7, color: "#a78bfa" },
  { type: "Concept Gap", count: 5, color: "#f87171" },
  { type: "High Cog. Load", count: 4, color: "#60a5fa" },
  { type: "Inconsistent", count: 4, color: "#fb923c" },
];

export const classStudents = [
  { id: 1, name: "Alex Chen", cogType: "Slow but Accurate", accuracy: 78, risk: "low", trend: "up", topics: ["Calculus", "Trigonometry"] },
  { id: 2, name: "Maya Patel", cogType: "Fast & Accurate", accuracy: 92, risk: "low", trend: "up", topics: [] },
  { id: 3, name: "James Wilson", cogType: "Concept Gap", accuracy: 45, risk: "high", trend: "down", topics: ["Algebra", "Stats", "Calculus"] },
  { id: 4, name: "Zoe Kim", cogType: "Trial & Error", accuracy: 63, risk: "medium", trend: "stable", topics: ["Trigonometry"] },
  { id: 5, name: "Ethan Brown", cogType: "High Cog. Load", accuracy: 55, risk: "high", trend: "down", topics: ["Calculus", "Geometry"] },
  { id: 6, name: "Lily Zhang", cogType: "Fast but Careless", accuracy: 71, risk: "medium", trend: "up", topics: ["Statistics"] },
  { id: 7, name: "Noah Davis", cogType: "Struggling Retention", accuracy: 42, risk: "high", trend: "down", topics: ["Algebra", "Geometry", "Calculus"] },
  { id: 8, name: "Sofia Lopez", cogType: "Slow but Accurate", accuracy: 81, risk: "low", trend: "up", topics: ["Statistics"] },
];

export const recommendations = [
  {
    id: 1,
    type: "Spaced Repetition",
    topic: "Calculus",
    description: "Schedule 15-min daily reviews with increasing intervals to improve retention of derivative concepts.",
    priority: "high",
    estimatedImpact: "+18% accuracy",
    icon: "calendar",
  },
  {
    id: 2,
    type: "Scaffolded Practice",
    topic: "Trigonometry",
    description: "Begin with unit circle fundamentals before advancing to identity transformations.",
    priority: "high",
    estimatedImpact: "+22% accuracy",
    icon: "layers",
  },
  {
    id: 3,
    type: "Timed Accuracy Drills",
    topic: "Algebra",
    description: "Your accuracy is high but response time can improve. Try 5-min timed problem sets.",
    priority: "medium",
    estimatedImpact: "-3s response time",
    icon: "timer",
  },
  {
    id: 4,
    type: "Concept Video",
    topic: "Statistics",
    description: "Watch micro-lessons on conditional probability before next session.",
    priority: "medium",
    estimatedImpact: "+12% accuracy",
    icon: "video",
  },
];

export const performanceMetrics = {
  avgResponseTime: 20.4,
  retryRatio: 0.28,
  errorFrequency: 6.2,
  hesitationIndex: 0.34,
  learningVelocity: 6.4,
  consistencyIndex: 0.82,
  conceptGapScore: 38,
  sessionImprovementRate: 12.3,
};

export const weeklyReports = [
  { week: "Feb 17 – Feb 23", accuracy: 78, sessions: 5, improvement: 12, cogType: "Slow but Accurate", status: "improving" },
  { week: "Feb 10 – Feb 16", accuracy: 73, sessions: 4, improvement: 5, cogType: "Slow but Accurate", status: "stable" },
  { week: "Feb 3 – Feb 9", accuracy: 70, sessions: 6, improvement: 8, cogType: "Slow but Accurate", status: "improving" },
  { week: "Jan 27 – Feb 2", accuracy: 65, sessions: 3, improvement: -3, cogType: "Trial & Error", status: "declined" },
  { week: "Jan 20 – Jan 26", accuracy: 62, sessions: 5, improvement: 4, cogType: "Trial & Error", status: "stable" },
];
