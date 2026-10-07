import { useEffect, useState } from "react";
import { User, Lock, Bell, Palette, Save, Loader2, Sparkles, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import DashboardLayout from "../components/layout/DashboardLayout";
import { useAuth } from "../context/AuthContext";

function Section({ icon: Icon, title, children }) {
  return (
    <div
      className="rounded-3xl overflow-hidden mb-6 border border-white/10 backdrop-blur-xl"
      style={{
        background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%), rgba(15, 18, 27, 0.85)",
        boxShadow: "0 15px 40px -10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      <div className="flex items-center gap-3 px-6 py-4.5 border-b border-white/[0.06]">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center border border-mint-400/20"
          style={{ background: "rgba(52, 211, 153, 0.12)" }}
        >
          <Icon size={16} className="text-mint-300" />
        </div>
        <h3 className="font-display font-bold text-white text-base">{title}</h3>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

export default function Settings() {
  const { user, loading, updateProfile, updatePassword } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [notifs, setNotifs] = useState({
    daily: true,
    insights: true,
    weekly: false,
  });

  useEffect(() => {
    setName(user?.name || "");
    setEmail(user?.email || "");
  }, [user]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      toast.error("Name and email are required");
      return;
    }

    await updateProfile({ name, email });
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();

    if (!currentPw || !newPw) {
      toast.error("Fill in both fields");
      return;
    }

    const updated = await updatePassword({
      currentPassword: currentPw,
      newPassword: newPw,
    });

    if (updated) {
      setCurrentPw("");
      setNewPw("");
    }
  };

  return (
    <DashboardLayout title="Account Settings">
      <div className="max-w-2xl mx-auto space-y-6">
        <Section icon={User} title="Personal Profile">
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-400 mb-1.5">
                Full Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-dark w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-white/[0.04]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-400 mb-1.5">
                Email Address
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="input-dark w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-white/[0.04]"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-premium py-2.5 px-5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer disabled:opacity-60 shadow-[0_8px_20px_rgba(52,211,153,0.25)]"
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              <span>Save Profile Changes</span>
            </button>
          </form>
        </Section>

        <Section icon={Lock} title="Password & Security">
          <form onSubmit={handleSavePassword} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-400 mb-1.5">
                Current Password
              </label>
              <input
                value={currentPw}
                onChange={(e) => setCurrentPw(e.target.value)}
                type="password"
                placeholder="••••••••"
                className="input-dark w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-white/[0.04]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-400 mb-1.5">
                New Password
              </label>
              <input
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                type="password"
                placeholder="••••••••"
                className="input-dark w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-white/[0.04]"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-secondary py-2.5 px-5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              <span>Update Password</span>
            </button>
          </form>
        </Section>

        <Section icon={Bell} title="Mindful Notifications">
          <div className="space-y-4">
            {[
              {
                key: "daily",
                label: "Daily reflection prompt",
                desc: "Receive a gentle nudge every evening to close your day cleanly",
              },
              {
                key: "insights",
                label: "Weekly cognitive summary",
                desc: "AI synthesis of mood patterns and stress indicators sent every Sunday",
              },
              {
                key: "weekly",
                label: "Streak milestone celebrations",
                desc: "Notifications celebrating your consistency streaks",
              },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-white">{label}</p>
                  <p className="text-[11px] text-ink-400">{desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setNotifs((n) => ({ ...n, [key]: !n[key] }))
                  }
                  className={`relative w-11 h-6 rounded-full transition-all duration-200 cursor-pointer ${
                    notifs[key] ? "bg-emerald-500 shadow-[0_0_12px_rgba(52,211,153,0.4)]" : "bg-ink-700"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-200 shadow-md ${
                      notifs[key] ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </Section>

        <Section icon={Palette} title="Theme & Aesthetics">
          <p className="text-xs text-ink-400 mb-3">
            MindScribe Obsidian Glass Dark Mode is currently active to reduce late-night eye strain and blue light exposure.
          </p>
          <div className="flex gap-3">
            {["#34d399", "#38bdf8", "#fbbf24", "#f43f5e"].map((c, i) => (
              <button
                key={c}
                type="button"
                className="w-8 h-8 rounded-full border-2 hover:scale-110 transition-all cursor-pointer"
                style={{
                  background: c,
                  borderColor: i === 0 ? "white" : "transparent",
                  boxShadow: i === 0 ? `0 0 12px ${c}` : "none",
                }}
              />
            ))}
          </div>
        </Section>
      </div>
    </DashboardLayout>
  );
}
