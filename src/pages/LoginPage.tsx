import { Brain, Shield, GraduationCap, ArrowRight, Zap, BarChart3, Target } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import heroBrain from "@/assets/hero-brain.jpg";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<"student" | "teacher" | null>(null);
  const [name, setName] = useState("");

  const handleLogin = () => {
    if (!selected || !name.trim()) return;
    login(selected, name.trim());
    navigate(selected === "teacher" ? "/teacher" : "/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 py-12">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center animate-pulse-glow">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="text-lg font-bold text-primary font-display tracking-wide">CogniLearn</div>
            <div className="text-xs text-muted-foreground">AI Cognitive Pattern Analyzer</div>
          </div>
        </div>

        <h1 className="text-4xl font-bold font-display text-foreground mb-2 leading-tight">
          Unlock Your <br />
          <span className="glow-text">Learning Potential</span>
        </h1>
        <p className="text-muted-foreground text-sm mb-8 max-w-sm">
          AI-powered behavioral analysis that models how you think and learn — then adapts to optimize your growth.
        </p>

        {/* Features */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { icon: Zap, label: "Real-time AI Analysis" },
            { icon: BarChart3, label: "Behavioral Insights" },
            { icon: Target, label: "Adaptive Learning" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="card-glow p-3 text-center">
              <Icon className="w-4 h-4 text-primary mx-auto mb-1.5" />
              <div className="text-[10px] text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="space-y-4 max-w-sm">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Sign in as</label>
            <div className="grid grid-cols-2 gap-2">
              {(["student", "teacher"] as const).map(role => (
                <button
                  key={role}
                  onClick={() => setSelected(role)}
                  className={`flex items-center gap-2.5 p-3 rounded-lg border transition-all text-left ${
                    selected === role
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-muted text-muted-foreground hover:border-border/80 hover:text-foreground"
                  }`}
                >
                  {role === "student" ? <GraduationCap className="w-4 h-4 shrink-0" /> : <Shield className="w-4 h-4 shrink-0" />}
                  <span className="text-sm font-medium capitalize">{role}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={!selected || !name.trim()}
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-2.5 rounded-lg text-sm transition-all hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Enter Dashboard
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-muted-foreground mt-6">
          Demo system — all data is simulated for demonstration purposes.
        </p>
      </div>

      {/* Right panel */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <img src={heroBrain} alt="Neural network visualization" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background/60" />
        <div className="absolute bottom-12 left-10 right-10">
          <div className="card-glow p-5">
            <div className="text-xs text-muted-foreground mb-1">Currently analyzing</div>
            <div className="text-2xl font-bold font-display text-foreground mb-3">8 Cognitive Learning Patterns</div>
            <div className="flex flex-wrap gap-1.5">
              {["Fast & Accurate", "Trial & Error", "Slow & Accurate", "Concept Gap", "High Load", "Inconsistent", "Careless", "Struggling"].map(t => (
                <span key={t} className="text-[10px] bg-primary/15 text-primary px-2 py-0.5 rounded-full">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
