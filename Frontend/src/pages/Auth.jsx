import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Eye, EyeOff, Loader2, LockKeyhole, Mail, User, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const { login, register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let ok;
    if (mode === "login") {
      ok = await login(email, password);
    } else {
      ok = await register(name, email, password);
    }
    if (ok) navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-premium flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* AMBIENT BACKGROUND GLOWS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-mint-400/15 blur-[140px] rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-[450px] h-[450px] bg-electric-500/15 blur-[130px] rounded-full" />
        <div className="absolute -top-20 -right-20 w-[450px] h-[450px] bg-purple-500/10 blur-[130px] rounded-full" />
      </div>

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-3 mb-3 cursor-pointer focus:outline-none"
          >
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center border border-white/20 shadow-[0_8px_24px_rgba(52,211,153,0.35)]"
              style={{ background: "linear-gradient(135deg, #34d399 0%, #059669 100%)" }}
            >
              <Moon size={22} className="text-[#04140e] fill-[#04140e]" />
            </div>
            <span className="font-display text-2xl font-bold tracking-tight text-white">
              Mind<span className="text-gradient-luxe">Scribe</span>
            </span>
          </button>
          <p className="text-xs text-ink-300 font-medium">
            Your private space for mindful reflection & emotional clarity
          </p>
        </div>

        {/* Auth Glass Card */}
        <div
          className="rounded-3xl p-7 sm:p-8 border border-white/10 backdrop-blur-2xl"
          style={{
            background: "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%), rgba(15, 18, 27, 0.85)",
            boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* Tab toggle */}
          <div className="flex gap-1 p-1 rounded-2xl mb-6 bg-white/[0.04] border border-white/[0.06]">
            {["login", "register"].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  mode === m
                    ? "bg-mint-400/20 text-mint-300 shadow-[0_0_12px_rgba(52,211,153,0.2)] border border-mint-400/30"
                    : "text-ink-400 hover:text-white"
                }`}
              >
                {m === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-400 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-500" />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Naina Kapoor"
                    required
                    className="input-dark pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-400 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  required
                  className="input-dark pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <LockKeyhole size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-500" />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="input-dark pl-10 pr-10 py-2.5 rounded-xl text-xs sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 hover:text-white"
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-premium w-full py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-[0_10px_30px_rgba(52,211,153,0.3)] disabled:opacity-50 mt-2"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              <span>{loading ? "Verifying..." : mode === "login" ? "Sign In to Journal" : "Start Your Free Journal"}</span>
              {!loading && <ArrowRight size={15} />}
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-white/[0.06] text-center">
            <p className="text-xs text-ink-400">
              {mode === "login" ? "Don't have an account yet? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setMode(mode === "login" ? "register" : "login")}
                className="text-mint-300 font-bold hover:underline ml-1"
              >
                {mode === "login" ? "Sign up now" : "Sign in here"}
              </button>
            </p>
          </div>
        </div>

        {/* Security badge footer */}
        <div className="flex items-center justify-center gap-2 text-xs text-ink-500">
          <ShieldCheck size={14} className="text-mint-400" />
          <span>Client-Side Encryption • Zero Data Harvesting</span>
        </div>
      </div>
    </div>
  );
}