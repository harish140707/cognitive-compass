"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Brain } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface EyeBallProps {
  size?: number;
  pupilSize?: number;
  maxDistance?: number;
  eyeColor?: string;
  pupilColor?: string;
  isBlinking?: boolean;
  forceLookX?: number;
  forceLookY?: number;
}

const EyeBall = ({
  size = 48,
  pupilSize = 16,
  maxDistance = 10,
  eyeColor = "white",
  pupilColor = "black",
  isBlinking = false,
  forceLookX,
  forceLookY,
}: EyeBallProps) => {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const eyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculatePupilPosition = () => {
    if (!eyeRef.current) return { x: 0, y: 0 };
    if (forceLookX !== undefined && forceLookY !== undefined) return { x: forceLookX, y: forceLookY };
    const eye = eyeRef.current.getBoundingClientRect();
    const eyeCenterX = eye.left + eye.width / 2;
    const eyeCenterY = eye.top + eye.height / 2;
    const deltaX = mouseX - eyeCenterX;
    const deltaY = mouseY - eyeCenterY;
    const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);
    const angle = Math.atan2(deltaY, deltaX);
    return { x: Math.cos(angle) * distance, y: Math.sin(angle) * distance };
  };

  const pupilPosition = calculatePupilPosition();

  return (
    <div
      ref={eyeRef}
      className="rounded-full flex items-center justify-center transition-all duration-150"
      style={{
        width: `${size}px`,
        height: isBlinking ? "2px" : `${size}px`,
        backgroundColor: eyeColor,
        overflow: "hidden",
      }}
    >
      {!isBlinking && (
        <div
          className="rounded-full"
          style={{
            width: `${pupilSize}px`,
            height: `${pupilSize}px`,
            backgroundColor: pupilColor,
            transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
            transition: "transform 0.1s ease-out",
          }}
        />
      )}
    </div>
  );
};

export default function AnimatedLoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const [isPurpleBlinking, setIsPurpleBlinking] = useState(false);
  const [isBlackBlinking, setIsBlackBlinking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isLookingAtEachOther, setIsLookingAtEachOther] = useState(false);
  const [isPurplePeeking, setIsPurplePeeking] = useState(false);
  const purpleRef = useRef<HTMLDivElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);
  const yellowRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => { setMouseX(e.clientX); setMouseY(e.clientY); };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const scheduleBlink = () => {
      const t = setTimeout(() => {
        setIsPurpleBlinking(true);
        setTimeout(() => { setIsPurpleBlinking(false); scheduleBlink(); }, 150);
      }, Math.random() * 4000 + 3000);
      return t;
    };
    const t = scheduleBlink();
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const scheduleBlink = () => {
      const t = setTimeout(() => {
        setIsBlackBlinking(true);
        setTimeout(() => { setIsBlackBlinking(false); scheduleBlink(); }, 150);
      }, Math.random() * 4000 + 3000);
      return t;
    };
    const t = scheduleBlink();
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (isTyping) {
      setIsLookingAtEachOther(true);
      const timer = setTimeout(() => setIsLookingAtEachOther(false), 800);
      return () => clearTimeout(timer);
    } else {
      setIsLookingAtEachOther(false);
    }
  }, [isTyping]);

  useEffect(() => {
    if (password.length > 0 && showPassword) {
      const t = setTimeout(() => {
        setIsPurplePeeking(true);
        setTimeout(() => setIsPurplePeeking(false), 800);
      }, Math.random() * 3000 + 2000);
      return () => clearTimeout(t);
    } else {
      setIsPurplePeeking(false);
    }
  }, [password, showPassword, isPurplePeeking]);

  const calculatePosition = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return { faceX: 0, faceY: 0, bodySkew: 0 };
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 3;
    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;
    return {
      faceX: Math.max(-15, Math.min(15, deltaX / 20)),
      faceY: Math.max(-10, Math.min(10, deltaY / 30)),
      bodySkew: Math.max(-6, Math.min(6, -deltaX / 120)),
    };
  };

  const purplePos = calculatePosition(purpleRef);
  const blackPos = calculatePosition(blackRef);
  const yellowPos = calculatePosition(yellowRef);
  const orangePos = calculatePosition(orangeRef);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (email.trim() && password.trim()) {
      const name = email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      login(role, name);
      navigate(role === "teacher" ? "/teacher" : "/dashboard");
    } else {
      setError("Please enter your email and password.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left panel */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 text-primary-foreground" style={{ background: "linear-gradient(135deg, hsl(222 47% 8%) 0%, hsl(222 45% 12%) 50%, hsl(222 47% 8%) 100%)" }}>
        {/* Logo */}
        <div className="relative z-20">
          <div className="flex items-center gap-3 text-lg font-semibold">
            <div className="size-9 rounded-xl flex items-center justify-center" style={{ background: "hsl(174 80% 48% / 0.2)", border: "1px solid hsl(174 80% 48% / 0.3)" }}>
              <Brain className="size-4" style={{ color: "hsl(174 80% 48%)" }} />
            </div>
            <div>
              <div className="font-bold tracking-wide" style={{ color: "hsl(174 80% 48%)", fontFamily: "'Space Grotesk', sans-serif" }}>CogniLearn</div>
              <div className="text-[11px] font-normal" style={{ color: "hsl(215 20% 55%)" }}>AI Cognitive Pattern Analyzer</div>
            </div>
          </div>
        </div>

        {/* Characters */}
        <div className="relative z-20 flex items-end justify-center h-[500px]">
          <div className="relative" style={{ width: "580px", height: "420px" }}>

            {/* Elder Citizen */}
            <div
              ref={purpleRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: "60px", width: "150px",
                height: (isTyping || (password.length > 0 && !showPassword)) ? "470px" : "430px",
                background: "linear-gradient(180deg, #F5E6D3 0%, #E8D4C0 100%)",
                borderRadius: "75px 75px 0 0", zIndex: 1,
                boxShadow: "0 8px 32px rgba(0,0,0,0.15), inset 0 -20px 40px rgba(0,0,0,0.05)",
                transform: (password.length > 0 && showPassword)
                  ? "skewX(0deg)"
                  : (isTyping || (password.length > 0 && !showPassword))
                  ? `skewX(${(purplePos.bodySkew || 0) - 12}deg) translateX(40px)`
                  : `skewX(${purplePos.bodySkew || 0}deg)`,
                transformOrigin: "bottom center",
              }}
            >
              <div className="absolute" style={{ left: "10px", top: "100px", width: "130px", height: "200px", background: "linear-gradient(135deg, #8B5A2B 0%, #A0522D 50%, #8B4513 100%)", borderRadius: "20px 60px 0 0", opacity: 0.9 }} />
              <div className="absolute" style={{ left: "35px", top: "-15px", width: "80px", height: "55px", background: "linear-gradient(180deg, #E8E8E8 0%, #C0C0C0 50%, #A8A8A8 100%)", borderRadius: "40px 40px 20px 20px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
              <div className="absolute w-[40px] h-[30px] rounded-full" style={{ left: "55px", top: "-30px", background: "linear-gradient(180deg, #D0D0D0 0%, #B0B0B0 100%)" }} />
              <div className="absolute rounded-full" style={{ left: "25px", top: "20px", width: "100px", height: "85px", background: "linear-gradient(180deg, #F0D5B0 0%, #E0BA8A 60%, #D4A574 100%)", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }} />
              <div className="absolute w-[20px] h-[14px] rounded-full" style={{ left: "32px", top: "68px", background: "rgba(232,150,122,0.35)" }} />
              <div className="absolute w-[20px] h-[14px] rounded-full" style={{ left: "98px", top: "68px", background: "rgba(232,150,122,0.35)" }} />
              <div className="absolute w-[8px] h-[8px] rounded-full" style={{ left: "71px", top: "35px", background: "radial-gradient(circle, #FF1744 0%, #DC143C 100%)" }} />
              <div className="absolute w-[22px] h-[4px] rounded-full bg-[#8B7355]" style={{ left: "40px", top: "43px", transform: "rotate(-5deg)" }} />
              <div className="absolute w-[22px] h-[4px] rounded-full bg-[#8B7355]" style={{ left: "90px", top: "43px", transform: "rotate(5deg)" }} />
              <div className="absolute flex gap-[14px] transition-all duration-700 ease-in-out" style={{ left: (password.length > 0 && showPassword) ? "33px" : isLookingAtEachOther ? "40px" : `${38 + purplePos.faceX}px`, top: (password.length > 0 && showPassword) ? "48px" : isLookingAtEachOther ? "52px" : `${50 + purplePos.faceY}px` }}>
                <div className="absolute top-[7px] left-[30px] w-[12px] h-[3px] bg-[#6D4C2E] rounded" />
                <div className="relative">
                  <div className="absolute -inset-[4px] border-[3px] border-[#6D4C2E] rounded-full" style={{ width: "28px", height: "26px", background: "rgba(255,255,255,0.08)" }} />
                  <EyeBall size={18} pupilSize={8} maxDistance={4} eyeColor="#FAFAFA" pupilColor="#3D2314" isBlinking={isPurpleBlinking} forceLookX={(password.length > 0 && showPassword) ? (isPurplePeeking ? 4 : -4) : isLookingAtEachOther ? 3 : undefined} forceLookY={(password.length > 0 && showPassword) ? (isPurplePeeking ? 5 : -4) : isLookingAtEachOther ? 4 : undefined} />
                </div>
                <div className="relative">
                  <div className="absolute -inset-[4px] border-[3px] border-[#6D4C2E] rounded-full" style={{ width: "28px", height: "26px", background: "rgba(255,255,255,0.08)" }} />
                  <EyeBall size={18} pupilSize={8} maxDistance={4} eyeColor="#FAFAFA" pupilColor="#3D2314" isBlinking={isPurpleBlinking} forceLookX={(password.length > 0 && showPassword) ? (isPurplePeeking ? 4 : -4) : isLookingAtEachOther ? 3 : undefined} forceLookY={(password.length > 0 && showPassword) ? (isPurplePeeking ? 5 : -4) : isLookingAtEachOther ? 4 : undefined} />
                </div>
              </div>
              <div className="absolute border-b-[3px] border-[#A0522D] rounded-b-full transition-all duration-700" style={{ width: "26px", height: "12px", left: (password.length > 0 && showPassword) ? "62px" : `${62 + purplePos.faceX}px`, top: (password.length > 0 && showPassword) ? "76px" : `${76 + purplePos.faceY}px` }} />
              <div className="absolute w-[8px] h-[200px] rounded-full" style={{ left: "-25px", bottom: "0px", background: "linear-gradient(90deg, #5D4037 0%, #8D6E63 50%, #5D4037 100%)", transform: "rotate(-8deg)" }}>
                <div className="absolute -top-2 -left-3 w-[25px] h-[20px] rounded-t-full border-t-[6px] border-l-[6px] border-[#5D4037]" />
              </div>
            </div>

            {/* Business Person */}
            <div
              ref={blackRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: "220px", width: "140px", height: "360px",
                background: "linear-gradient(180deg, #1A237E 0%, #283593 50%, #1A237E 100%)",
                borderRadius: "12px 12px 0 0", zIndex: 2,
                boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 2px 0 rgba(255,255,255,0.1)",
                transform: (password.length > 0 && showPassword) ? "skewX(0deg)" : isLookingAtEachOther ? `skewX(${(blackPos.bodySkew || 0) * 1.5 + 10}deg) translateX(20px)` : (isTyping || (password.length > 0 && !showPassword)) ? `skewX(${(blackPos.bodySkew || 0) * 1.5}deg)` : `skewX(${blackPos.bodySkew || 0}deg)`,
                transformOrigin: "bottom center",
              }}
            >
              <div className="absolute" style={{ left: "25px", top: "95px", width: "40px", height: "80px", background: "linear-gradient(135deg, #0D47A1 0%, #1565C0 100%)", clipPath: "polygon(100% 0, 100% 100%, 50% 100%, 0 30%)" }} />
              <div className="absolute" style={{ right: "25px", top: "95px", width: "40px", height: "80px", background: "linear-gradient(225deg, #0D47A1 0%, #1565C0 100%)", clipPath: "polygon(0 0, 0 100%, 50% 100%, 100% 30%)" }} />
              <div className="absolute" style={{ left: "50px", top: "88px", width: "40px", height: "25px", background: "#FAFAFA", clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }} />
              <div className="absolute w-[85px] h-[80px] rounded-full" style={{ left: "28px", top: "12px", background: "linear-gradient(180deg, #E8C9A0 0%, #D4A574 100%)" }} />
              <div className="absolute" style={{ left: "32px", top: "5px", width: "78px", height: "40px", background: "linear-gradient(180deg, #2D2D2D 0%, #1A1A1A 100%)", borderRadius: "40px 40px 0 0" }} />
              <div className="absolute" style={{ left: "58px", top: "108px", width: "24px", height: "120px", background: "linear-gradient(180deg, #B71C1C 0%, #D32F2F 30%, #B71C1C 100%)", clipPath: "polygon(35% 0%, 65% 0%, 100% 8%, 65% 100%, 35% 100%, 0% 8%)" }} />
              <div className="absolute flex gap-4 transition-all duration-700 ease-in-out" style={{ left: (password.length > 0 && showPassword) ? "40px" : isLookingAtEachOther ? "52px" : `${48 + blackPos.faceX}px`, top: (password.length > 0 && showPassword) ? "42px" : isLookingAtEachOther ? "38px" : `${45 + blackPos.faceY}px` }}>
                <EyeBall size={16} pupilSize={6} maxDistance={4} eyeColor="#FAFAFA" pupilColor="#1A1A1A" isBlinking={isBlackBlinking} forceLookX={(password.length > 0 && showPassword) ? -4 : isLookingAtEachOther ? 0 : undefined} forceLookY={(password.length > 0 && showPassword) ? -4 : isLookingAtEachOther ? -4 : undefined} />
                <EyeBall size={16} pupilSize={6} maxDistance={4} eyeColor="#FAFAFA" pupilColor="#1A1A1A" isBlinking={isBlackBlinking} forceLookX={(password.length > 0 && showPassword) ? -4 : isLookingAtEachOther ? 0 : undefined} forceLookY={(password.length > 0 && showPassword) ? -4 : isLookingAtEachOther ? -4 : undefined} />
              </div>
              <div className="absolute w-[20px] h-[10px] border-b-[3px] border-[#5D4037] rounded-b-full transition-all duration-700" style={{ left: (password.length > 0 && showPassword) ? "55px" : `${62 + blackPos.faceX}px`, top: (password.length > 0 && showPassword) ? "68px" : `${72 + blackPos.faceY}px` }} />
              <div className="absolute w-[55px] h-[40px] rounded-lg" style={{ right: "-35px", bottom: "70px", background: "linear-gradient(180deg, #8D6E63 0%, #5D4037 100%)", boxShadow: "0 4px 12px rgba(0,0,0,0.3)", border: "2px solid #4E342E" }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[22px] h-[10px] bg-[#4E342E] rounded-t-md" />
                <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-[35px] h-[3px] bg-[#D4A574] rounded" />
                <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[8px] h-[8px] rounded-full bg-[#FFD700] border border-[#B8860B]" />
              </div>
            </div>

            {/* Farmer */}
            <div
              ref={orangeRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: "-10px", width: "210px", height: "230px", zIndex: 3,
                background: "linear-gradient(180deg, #2E7D32 0%, #388E3C 30%, #1B5E20 100%)",
                borderRadius: "105px 105px 0 0",
                transform: (password.length > 0 && showPassword) ? "skewX(0deg)" : `skewX(${orangePos.bodySkew || 0}deg)`,
                transformOrigin: "bottom center",
              }}
            >
              <div className="absolute" style={{ left: "25px", top: "-25px", width: "160px", height: "28px", background: "linear-gradient(180deg, #DEB887 0%, #D2B48C 50%, #C4A574 100%)", borderRadius: "80px / 14px" }} />
              <div className="absolute" style={{ left: "55px", top: "-60px", width: "100px", height: "45px", background: "linear-gradient(180deg, #F5DEB3 0%, #DEB887 50%, #D2B48C 100%)", borderRadius: "50px 50px 0 0" }} />
              <div className="absolute w-[100px] h-[8px] bg-[#8B4513] rounded" style={{ left: "55px", top: "-20px" }} />
              <div className="absolute rounded-full" style={{ left: "45px", top: "10px", width: "120px", height: "100px", background: "linear-gradient(180deg, #E8C4A0 0%, #D4A574 50%, #C49060 100%)" }} />
              <div className="absolute w-[22px] h-[14px] rounded-full" style={{ left: "52px", top: "65px", background: "rgba(212,131,106,0.35)" }} />
              <div className="absolute w-[22px] h-[14px] rounded-full" style={{ left: "136px", top: "65px", background: "rgba(212,131,106,0.35)" }} />
              <div className="absolute w-[26px] h-[5px] rounded-full bg-[#5D4037]" style={{ left: "62px", top: "35px", transform: "rotate(-3deg)" }} />
              <div className="absolute w-[26px] h-[5px] rounded-full bg-[#5D4037]" style={{ left: "120px", top: "35px", transform: "rotate(3deg)" }} />
              <div className="absolute" style={{ left: "82px", top: "76px", width: "46px", height: "14px", background: "linear-gradient(180deg, #4E342E 0%, #3E2723 100%)", borderRadius: "0 0 23px 23px" }} />
              <div className="absolute flex gap-[22px] transition-all duration-200 ease-out" style={{ left: (password.length > 0 && showPassword) ? "62px" : `${76 + (orangePos.faceX || 0)}px`, top: (password.length > 0 && showPassword) ? "40px" : `${44 + (orangePos.faceY || 0)}px` }}>
                <EyeBall size={20} pupilSize={9} maxDistance={4} eyeColor="#FAFAFA" pupilColor="#3D2314" forceLookX={(password.length > 0 && showPassword) ? -5 : undefined} forceLookY={(password.length > 0 && showPassword) ? -4 : undefined} />
                <EyeBall size={20} pupilSize={9} maxDistance={4} eyeColor="#FAFAFA" pupilColor="#3D2314" forceLookX={(password.length > 0 && showPassword) ? -5 : undefined} forceLookY={(password.length > 0 && showPassword) ? -4 : undefined} />
              </div>
              <div className="absolute w-[12px] h-[80px] bg-[#1565C0] rounded" style={{ left: "60px", top: "95px", transform: "rotate(-15deg)" }} />
              <div className="absolute w-[12px] h-[80px] bg-[#1565C0] rounded" style={{ right: "60px", top: "95px", transform: "rotate(15deg)" }} />
            </div>

            {/* Young Student */}
            <div
              ref={yellowRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: "340px", width: "140px", height: "270px",
                background: "linear-gradient(180deg, #1976D2 0%, #2196F3 30%, #1565C0 100%)",
                borderRadius: "70px 70px 0 0", zIndex: 4,
                transform: (password.length > 0 && showPassword) ? "skewX(0deg)" : `skewX(${yellowPos.bodySkew || 0}deg)`,
                transformOrigin: "bottom center",
              }}
            >
              <div className="absolute" style={{ left: "35px", top: "80px", width: "70px", height: "25px", background: "#FAFAFA", borderRadius: "0 0 35px 35px" }} />
              <div className="absolute" style={{ left: "28px", top: "-8px", width: "85px", height: "50px", background: "linear-gradient(180deg, #1A1A1A 0%, #2D2D2D 100%)", borderRadius: "42px 42px 0 0" }} />
              <div className="absolute w-[82px] h-[72px] rounded-full" style={{ left: "29px", top: "18px", background: "linear-gradient(180deg, #FFCC80 0%, #FFB74D 100%)" }} />
              <div className="absolute w-[14px] h-[10px] rounded-full" style={{ left: "32px", top: "55px", background: "rgba(255,138,128,0.5)" }} />
              <div className="absolute w-[14px] h-[10px] rounded-full" style={{ left: "95px", top: "55px", background: "rgba(255,138,128,0.5)" }} />
              <div className="absolute flex gap-4 transition-all duration-200 ease-out" style={{ left: (password.length > 0 && showPassword) ? "42px" : `${52 + (yellowPos.faceX || 0)}px`, top: (password.length > 0 && showPassword) ? "42px" : `${48 + (yellowPos.faceY || 0)}px` }}>
                <EyeBall size={16} pupilSize={7} maxDistance={4} eyeColor="#FAFAFA" pupilColor="#1A1A1A" forceLookX={(password.length > 0 && showPassword) ? -5 : undefined} forceLookY={(password.length > 0 && showPassword) ? -4 : undefined} />
                <EyeBall size={16} pupilSize={7} maxDistance={4} eyeColor="#FAFAFA" pupilColor="#1A1A1A" forceLookX={(password.length > 0 && showPassword) ? -5 : undefined} forceLookY={(password.length > 0 && showPassword) ? -4 : undefined} />
              </div>
              <div className="absolute transition-all duration-200 ease-out" style={{ left: (password.length > 0 && showPassword) ? "52px" : `${58 + (yellowPos.faceX || 0)}px`, top: (password.length > 0 && showPassword) ? "68px" : `${72 + (yellowPos.faceY || 0)}px`, width: "26px", height: "14px", borderBottom: "4px solid #5D4037", borderRadius: "0 0 26px 26px" }} />
              <div className="absolute w-[50px] h-[80px] rounded-xl" style={{ right: "-30px", top: "75px", background: "linear-gradient(180deg, #FF7043 0%, #F4511E 100%)" }}>
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[35px] h-[10px] bg-[#FFAB91] rounded" />
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[30px] h-[20px] bg-[#BF360C] rounded-md" />
              </div>
              <div className="absolute flex flex-col gap-[3px]" style={{ left: "-35px", bottom: "85px", transform: "rotate(-5deg)" }}>
                <div className="w-[40px] h-[10px] rounded-sm" style={{ background: "linear-gradient(90deg, #E53935 0%, #EF5350 100%)" }} />
                <div className="w-[40px] h-[10px] rounded-sm" style={{ background: "linear-gradient(90deg, #1E88E5 0%, #42A5F5 100%)" }} />
                <div className="w-[40px] h-[10px] rounded-sm" style={{ background: "linear-gradient(90deg, #43A047 0%, #66BB6A 100%)" }} />
                <div className="w-[40px] h-[10px] rounded-sm" style={{ background: "linear-gradient(90deg, #FB8C00 0%, #FFA726 100%)" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Footer links */}
        <div className="relative z-20 flex items-center gap-8 text-sm" style={{ color: "hsl(215 20% 45%)" }}>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>

        {/* Decorative blobs */}
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:20px_20px]" />
        <div className="absolute top-1/4 right-1/4 size-64 rounded-full blur-3xl" style={{ background: "hsl(174 80% 48% / 0.06)" }} />
        <div className="absolute bottom-1/4 left-1/4 size-96 rounded-full blur-3xl" style={{ background: "hsl(174 80% 48% / 0.04)" }} />
      </div>

      {/* Right login section */}
      <div className="flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-[420px]">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 text-lg font-semibold mb-12">
            <div className="size-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(174 80% 48% / 0.15)" }}>
              <Brain className="size-4" style={{ color: "hsl(174 80% 48%)" }} />
            </div>
            <span style={{ color: "hsl(174 80% 48%)", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>CogniLearn</span>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Welcome back!</h1>
            <p className="text-muted-foreground text-sm">Sign in to your CogniLearn dashboard</p>
          </div>

          {/* Role selector */}
          <div className="mb-5">
            <Label className="text-sm font-medium mb-1.5 block">Sign in as</Label>
            <div className="grid grid-cols-2 gap-2">
              {(["student", "teacher"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`py-2.5 rounded-lg border text-sm font-medium capitalize transition-all ${role === r ? "border-primary bg-primary/10 text-primary" : "border-border bg-muted text-muted-foreground hover:text-foreground"}`}
                >
                  {r === "student" ? "🎓 Student" : "🏫 Teacher"}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@school.edu"
                value={email}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(false)}
                required
                className="h-12 bg-background border-border/60 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 pr-10 bg-background border-border/60 focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">Remember for 30 days</Label>
              </div>
              <a href="#" className="text-sm text-primary hover:underline font-medium">Forgot password?</a>
            </div>

            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg">{error}</div>
            )}

            <Button type="submit" className="w-full h-12 text-base font-medium" size="lg" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6">
            <Button variant="outline" className="w-full h-12 bg-background border-border/60 hover:bg-accent" type="button">
              <Mail className="mr-2 size-5" />
              Continue with Google
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground mt-8">
            Don't have an account?{" "}
            <a href="#" className="text-foreground font-medium hover:underline">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
}
