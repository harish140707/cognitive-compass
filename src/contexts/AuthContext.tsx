import { createContext, useContext, useState, ReactNode } from "react";

type Role = "student" | "teacher" | null;

interface AuthContextType {
  role: Role;
  userName: string;
  login: (role: Role, name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>(null);
  const [userName, setUserName] = useState("");

  const login = (r: Role, name: string) => { setRole(r); setUserName(name); };
  const logout = () => { setRole(null); setUserName(""); };

  return <AuthContext.Provider value={{ role, userName, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
