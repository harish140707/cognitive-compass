import { Brain, LayoutDashboard, BookOpen, Lightbulb, BarChart3, FileText, Users, AlertTriangle, LogOut, ChevronRight, Sun, Moon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

const studentNav = [
  { label: "Overview", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Topic Mastery", icon: BookOpen, path: "/dashboard/topics" },
  { label: "Session Insights", icon: BarChart3, path: "/dashboard/sessions" },
  { label: "Recommendations", icon: Lightbulb, path: "/dashboard/recommendations" },
  { label: "Reports", icon: FileText, path: "/dashboard/reports" },
];

const teacherNav = [
  { label: "Class Overview", icon: LayoutDashboard, path: "/teacher" },
  { label: "Student Analysis", icon: Users, path: "/teacher/students" },
  { label: "Risk Alerts", icon: AlertTriangle, path: "/teacher/alerts" },
  { label: "Analytics", icon: BarChart3, path: "/teacher/analytics" },
  { label: "Reports", icon: FileText, path: "/teacher/reports" },
];

export default function Sidebar() {
  const { role, userName, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const location = useLocation();
  const nav = role === "teacher" ? teacherNav : studentNav;
  const initials = userName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <aside className="w-60 min-h-screen bg-sidebar border-r border-sidebar-border flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center animate-pulse-glow">
            <Brain className="w-4 h-4 text-primary" />
          </div>
          <div>
            <div className="text-xs font-semibold text-primary font-display tracking-wide">CogniLearn</div>
            <div className="text-[10px] text-muted-foreground">AI Pattern Analyzer</div>
          </div>
        </div>
      </div>

      {/* User */}
      <div className="px-4 py-3 border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-sidebar-accent/50">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold font-display shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-medium text-foreground truncate">{userName}</div>
            <div className="text-[10px] text-muted-foreground capitalize">{role}</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-3 mb-2">
          {role === "teacher" ? "Teacher Portal" : "My Learning"}
        </div>
        {nav.map(({ label, icon: Icon, path }) => {
          const active = location.pathname === path || (path !== "/dashboard" && path !== "/teacher" && location.pathname.startsWith(path));
          return (
            <Link key={path} to={path} className={cn("nav-item", active && "active")}>
              <Icon className="w-4 h-4 shrink-0" />
              <span>{label}</span>
              {active && <ChevronRight className="w-3 h-3 ml-auto" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="px-3 py-4 border-t border-sidebar-border flex flex-col gap-1">
        <button
          onClick={toggle}
          className="nav-item w-full text-left"
        >
          {theme === "dark" ? <Sun className="w-4 h-4 shrink-0" /> : <Moon className="w-4 h-4 shrink-0" />}
          <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
        </button>
        <button onClick={logout} className="nav-item w-full text-left">
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
