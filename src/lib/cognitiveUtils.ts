import { Brain, TrendingUp, TrendingDown, Minus, Zap, Target, Clock, RefreshCw, Activity } from "lucide-react";

export const COGNITIVE_TYPE_CONFIG: Record<string, { color: string; bg: string; desc: string }> = {
  "Fast & Accurate Learner": { color: "text-teal", bg: "bg-teal/15", desc: "Efficient and precise" },
  "Fast but Careless Learner": { color: "text-amber", bg: "bg-amber/15", desc: "Speed over accuracy" },
  "Slow but Accurate Learner": { color: "text-violet", bg: "bg-violet/15", desc: "Deliberate and precise" },
  "Trial & Error Learner": { color: "text-amber", bg: "bg-amber/15", desc: "Learns through iteration" },
  "Concept Gap Learner": { color: "text-rose", bg: "bg-rose/15", desc: "Missing foundational concepts" },
  "High Cognitive Load Learner": { color: "text-[#60a5fa]", bg: "bg-[#60a5fa]/15", desc: "Overloaded processing" },
  "Inconsistent Performer": { color: "text-[#fb923c]", bg: "bg-[#fb923c]/15", desc: "Variable performance" },
  "Struggling Retention Learner": { color: "text-rose", bg: "bg-rose/15", desc: "Retention difficulties" },
  // Aliases
  "Slow but Accurate": { color: "text-violet", bg: "bg-violet/15", desc: "Deliberate and precise" },
  "Fast & Accurate": { color: "text-teal", bg: "bg-teal/15", desc: "Efficient and precise" },
  "Concept Gap": { color: "text-rose", bg: "bg-rose/15", desc: "Missing foundations" },
  "Trial & Error": { color: "text-amber", bg: "bg-amber/15", desc: "Learns through iteration" },
  "High Cog. Load": { color: "text-[#60a5fa]", bg: "bg-[#60a5fa]/15", desc: "Overloaded processing" },
  "Fast but Careless": { color: "text-amber", bg: "bg-amber/15", desc: "Speed over accuracy" },
  "Struggling Retention": { color: "text-rose", bg: "bg-rose/15", desc: "Retention difficulties" },
  "Inconsistent": { color: "text-[#fb923c]", bg: "bg-[#fb923c]/15", desc: "Variable performance" },
};

export function getCognitiveConfig(type: string) {
  return COGNITIVE_TYPE_CONFIG[type] || { color: "text-muted-foreground", bg: "bg-muted", desc: "" };
}

export function getRiskConfig(risk: string) {
  if (risk === "high") return { color: "text-rose-400", bg: "bg-rose-400/15", label: "High Risk" };
  if (risk === "medium") return { color: "text-amber-400", bg: "bg-amber-400/15", label: "Medium" };
  return { color: "text-emerald-400", bg: "bg-emerald-400/15", label: "Low Risk" };
}

export function getTrendIcon(trend: string) {
  if (trend === "up") return TrendingUp;
  if (trend === "down") return TrendingDown;
  return Minus;
}

export function getTrendColor(trend: string) {
  if (trend === "up") return "text-emerald-400";
  if (trend === "down") return "text-rose-400";
  return "text-amber-400";
}

export function getStatusConfig(status: string) {
  if (status === "strong") return { color: "text-emerald-400", bg: "bg-emerald-400/15", label: "Strong" };
  if (status === "weak") return { color: "text-rose-400", bg: "bg-rose-400/15", label: "Needs Work" };
  return { color: "text-amber-400", bg: "bg-amber-400/15", label: "Developing" };
}
