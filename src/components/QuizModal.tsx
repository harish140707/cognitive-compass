import { useState, useEffect } from "react";
import { X, CheckCircle2, XCircle, RotateCcw, ChevronRight, Trophy } from "lucide-react";
import { QuizQuestion, getQuizForTopic, QUESTIONS_PER_QUIZ } from "@/lib/quizData";
import { recordAnswer, getTopicStats } from "@/lib/quizStore";

interface QuizModalProps {
  topic: string;
  onClose: () => void;
  onComplete: () => void;
}

type AnswerState = "idle" | "correct" | "wrong";

export default function QuizModal({ topic, onClose, onComplete }: QuizModalProps) {
  const stats = getTopicStats(topic);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>("idle");
  const [sessionScore, setSessionScore] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  const [done, setDone] = useState(false);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const qs = getQuizForTopic(topic, stats.usedQuestionIds);
    if (qs.length === 0) {
      // All questions used — reset used IDs for this topic so they can retry
      const qs2 = getQuizForTopic(topic, []);
      setQuestions(qs2);
    } else {
      setQuestions(qs);
    }
  }, [topic]);

  const current = questions[currentIdx];

  const handleSelect = (idx: number) => {
    if (answerState !== "idle") return;
    setSelected(idx);
    const correct = idx === current.correct;
    setAnswerState(correct ? "correct" : "wrong");
    recordAnswer(topic, current.id, correct, isRetrying);
    if (correct) setSessionScore(s => s + 1);
    else setWrongAttempts(w => w + 1);
  };

  const handleRetry = () => {
    setSelected(null);
    setAnswerState("idle");
    setIsRetrying(true);
    recordAnswer(topic, current.id, false, true);
    setWrongAttempts(w => w + 1);
  };

  const handleNext = () => {
    if (currentIdx + 1 >= questions.length) {
      setDone(true);
      onComplete();
    } else {
      setCurrentIdx(i => i + 1);
      setSelected(null);
      setAnswerState("idle");
      setIsRetrying(false);
    }
  };

  const difficultyColor: Record<string, string> = {
    easy: "text-emerald bg-emerald/10",
    medium: "text-amber bg-amber/10",
    hard: "text-rose bg-rose/10",
  };

  const accuracy = questions.length > 0 ? Math.round((sessionScore / (currentIdx + (answerState !== "idle" ? 1 : 0))) * 100) || 0 : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-lg card-glow p-0 overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
          <div>
            <div className="text-xs text-muted-foreground font-medium">Quiz · {topic}</div>
            {!done && <div className="text-sm font-semibold text-foreground font-display mt-0.5">
              Question {currentIdx + 1} of {questions.length}
            </div>}
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {done ? (
          /* ── Completion Screen ── */
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold font-display text-foreground mb-1">Quiz Complete!</h3>
            <p className="text-muted-foreground text-sm mb-6">Here's how you did on {topic}</p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-muted/50 rounded-xl p-3">
                <div className="text-xl font-bold font-display text-primary">{sessionScore}/{questions.length}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">Correct</div>
              </div>
              <div className="bg-muted/50 rounded-xl p-3">
                <div className="text-xl font-bold font-display text-amber">{wrongAttempts}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">Wrong Attempts</div>
              </div>
              <div className="bg-muted/50 rounded-xl p-3">
                <div className="text-xl font-bold font-display" style={{ color: accuracy >= 80 ? "hsl(142 70% 55%)" : accuracy >= 55 ? "hsl(38 92% 65%)" : "hsl(348 80% 65%)" }}>
                  {accuracy}%
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5">Session Accuracy</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
              >
                View Stats
              </button>
              <button
                onClick={() => {
                  setDone(false);
                  setCurrentIdx(0);
                  setSelected(null);
                  setAnswerState("idle");
                  setSessionScore(0);
                  setWrongAttempts(0);
                  setIsRetrying(false);
                  const updatedStats = getTopicStats(topic);
                  setQuestions(getQuizForTopic(topic, updatedStats.usedQuestionIds));
                }}
                className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Quiz Again
              </button>
            </div>
          </div>
        ) : questions.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground text-sm">Loading questions…</div>
        ) : (
          /* ── Question Screen ── */
          <div className="p-6">
            {/* Progress bar */}
            <div className="flex gap-1 mb-5">
              {questions.map((_, i) => (
                <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i < currentIdx ? "bg-primary" : i === currentIdx ? "bg-primary/50" : "bg-border"}`} />
              ))}
            </div>

            {/* Difficulty badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${difficultyColor[current.difficulty]}`}>
                {current.difficulty.toUpperCase()}
              </span>
              {isRetrying && (
                <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-amber/10 text-amber">RETRY</span>
              )}
            </div>

            {/* Question */}
            <p className="text-base font-semibold font-display text-foreground mb-5 leading-relaxed">{current.question}</p>

            {/* Options */}
            <div className="flex flex-col gap-2.5 mb-6">
              {current.options.map((opt, i) => {
                let cls = "w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-150 ";
                if (answerState === "idle") {
                  cls += selected === i
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-muted/30 text-foreground hover:border-primary/50 hover:bg-muted/50";
                } else if (i === current.correct) {
                  cls += "border-emerald bg-emerald/10 text-emerald";
                } else if (selected === i && i !== current.correct) {
                  cls += "border-rose bg-rose/10 text-rose";
                } else {
                  cls += "border-border bg-muted/20 text-muted-foreground opacity-50";
                }
                return (
                  <button key={i} className={cls} onClick={() => handleSelect(i)}>
                    <span className="font-mono text-xs mr-2 opacity-60">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Feedback & Controls */}
            {answerState !== "idle" && (
              <div className={`flex items-center justify-between p-3 rounded-xl mb-4 ${answerState === "correct" ? "bg-emerald/10 border border-emerald/20" : "bg-rose/10 border border-rose/20"}`}>
                <div className="flex items-center gap-2">
                  {answerState === "correct"
                    ? <CheckCircle2 className="w-4 h-4 text-emerald" />
                    : <XCircle className="w-4 h-4 text-rose" />
                  }
                  <span className={`text-sm font-semibold ${answerState === "correct" ? "text-emerald" : "text-rose"}`}>
                    {answerState === "correct" ? "Correct!" : "Incorrect"}
                  </span>
                </div>
                <div className="flex gap-2">
                  {answerState === "wrong" && (
                    <button
                      onClick={handleRetry}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-amber/10 text-amber hover:bg-amber/20 transition-colors font-medium"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Retry
                    </button>
                  )}
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
                  >
                    {currentIdx + 1 >= questions.length ? "Finish" : "Next"}
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
