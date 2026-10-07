import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from "recharts";
import {
  BookOpen, Brain, Flame, Sparkles, PenLine, ArrowRight, Sun, Moon, CloudSun,
} from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import StatCard from "../components/ui/StatCard";
import JournalCard from "../components/ui/JournalCard";
import { useAuth } from "../context/AuthContext";
import { useJournals } from "../context/JournalContext";

const moodToScore = { happy: 9, excited: 10, calm: 8, neutral: 5, anxious: 4, sad: 3, angry: 2 };

function getWeekLabel(date) {
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

function generateWeekData(journals) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return { day: getWeekLabel(d), date: d.toDateString(), entries: 0, mood: 0 };
  });
  journals.forEach((j) => {
    const date = new Date(j.createdAt).toDateString();
    const idx = days.findIndex((d) => d.date === date);
    if (idx !== -1) {
      days[idx].entries += 1;
      days[idx].mood = moodToScore[j.mood?.toLowerCase()] || 5;
    }
  });
  return days;
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-xl px-3.5 py-2.5 text-xs shadow-xl backdrop-blur-xl border border-white/10"
      style={{ background: "rgba(15, 18, 27, 0.95)" }}
    >
      <p className="font-semibold text-white mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="flex items-center gap-1.5" style={{ color: p.color }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
          <span className="capitalize">{p.name}:</span>
          <span className="font-bold">{p.value}</span>
        </p>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const { user } = useAuth();
  const { journals, fetchJournals, loading } = useJournals();
  const navigate = useNavigate();
  const [now] = useState(() => Date.now());

  useEffect(() => {
    fetchJournals();
  }, [fetchJournals]);

  const weekData = useMemo(() => generateWeekData(journals), [journals]);
  const recent = useMemo(() => journals.slice(0, 4), [journals]);

  const avgMood = useMemo(() => {
    const scores = journals.map((j) => moodToScore[j.mood?.toLowerCase()] || 5);
    return scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "—";
  }, [journals]);

  const thisWeek = useMemo(() => {
    const weekAgo = now - 7 * 86400000;
    return journals.filter((j) => new Date(j.createdAt) > weekAgo).length;
  }, [journals, now]);

  const aiInsights = [
    {
      title: "Emotional Equilibrium",
      text: "Your entries show peak calmness during mid-week reflections. Evening journal habit is stabilizing sleep onset.",
      color: "#34d399",
      tag: "Pattern",
    },
    {
      title: "Reflection Momentum",
      text: `You have logged ${journals.length} reflections. Regular journaling has been linked to a 28% reduction in chronic stress.`,
      color: "#fbbf24",
      tag: "Habit",
    },
    {
      title: "Actionable Reset",
      text: "Try dedicating your next journal entry to a 3-point gratitude scan before tomorrow's work begins.",
      color: "#60a5fa",
      tag: "Guidance",
    },
  ];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const GreetingIcon = hour < 12 ? Sun : hour < 17 ? CloudSun : Moon;
  const firstName = user?.name?.split(" ")[0] || "Friend";

  return (
    <DashboardLayout title="Dashboard">
      <div className="max-w-7xl mx-auto space-y-7">
        {/* WELCOME BANNER */}
        <div
          className="relative overflow-hidden rounded-3xl p-6 sm:p-8 border border-white/10"
          style={{
            background:
              "radial-gradient(ellipse at 85% 20%, rgba(52, 211, 153, 0.18), transparent 55%), radial-gradient(ellipse at 15% 80%, rgba(59, 130, 246, 0.14), transparent 50%), linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%), #0c101a",
            boxShadow: "0 20px 50px -15px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          }}
        >
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-mint-400/25 bg-mint-400/10 px-3 py-1 text-xs font-semibold text-mint-300 mb-3">
                <GreetingIcon size={14} className="text-mint-300" />
                <span>{new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}</span>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white">
                {greeting}, <span className="text-gradient-luxe">{firstName}</span>.
              </h2>
              <p className="mt-2 text-sm text-ink-300 max-w-xl leading-relaxed">
                "What is taking up space in your mind right now?" Take 2 minutes to unload your thoughts in privacy.
              </p>
            </div>

            <button
              onClick={() => navigate("/journals/new")}
              className="btn-premium py-3 px-5 text-sm font-bold shadow-[0_10px_30px_rgba(52,211,153,0.3)] flex items-center gap-2 self-start md:self-auto cursor-pointer"
            >
              <PenLine size={16} /> Write Today's Entry
            </button>
          </div>
        </div>

        {/* STATS ROW */}
        <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={BookOpen}
            label="Total Entries"
            value={journals.length}
            change={12}
            changeLabel="vs last month"
            color="sage"
            delay={0}
          />
          <StatCard
            icon={Brain}
            label="Avg Mood Score"
            value={avgMood}
            color="amber"
            delay={80}
          />
          <StatCard
            icon={Flame}
            label="This Week's Entries"
            value={thisWeek}
            change={thisWeek > 3 ? 25 : -10}
            changeLabel="goal: 5 entries"
            color="rose"
            delay={160}
          />
          <StatCard
            icon={Sparkles}
            label="AI Insights Active"
            value={aiInsights.length}
            color="blue"
            delay={240}
          />
        </div>

        {/* CHARTS ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Mood Trend AreaChart */}
          <div
            className="rounded-3xl p-6 border border-white/10 backdrop-blur-xl"
            style={{
              background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%), rgba(15, 18, 27, 0.8)",
              boxShadow: "0 15px 40px -10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-mint-300">Emotional Trajectory</p>
                <h3 className="font-display text-lg font-bold text-white">Mood Trend (Last 7 Days)</h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                Scale 1 - 10
              </span>
            </div>

            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={weekData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="moodAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#34d399" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: "#6f7c9e", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 10]} tick={{ fill: "#6f7c9e", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="mood"
                  name="Mood Score"
                  stroke="#34d399"
                  strokeWidth={2.5}
                  fill="url(#moodAreaGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Weekly Activity BarChart */}
          <div
            className="rounded-3xl p-6 border border-white/10 backdrop-blur-xl"
            style={{
              background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%), rgba(15, 18, 27, 0.8)",
              boxShadow: "0 15px 40px -10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-amber-400">Consistency Tracker</p>
                <h3 className="font-display text-lg font-bold text-white">Weekly Entries Logged</h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300">
                Volume
              </span>
            </div>

            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weekData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: "#6f7c9e", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fill: "#6f7c9e", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="entries"
                  name="Entries"
                  fill="#f59e0b"
                  radius={[6, 6, 0, 0]}
                  opacity={0.85}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RECENT ENTRIES & AI INSIGHTS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Entries */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-mint-300">Journal Timeline</p>
                <h3 className="font-display text-lg font-bold text-white">Recent Reflections</h3>
              </div>
              <button
                onClick={() => navigate("/journals")}
                className="flex items-center gap-1.5 text-xs font-bold text-mint-300 hover:text-white transition-colors"
              >
                View all entries <ArrowRight size={13} />
              </button>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-28 rounded-2xl animate-pulse bg-white/[0.04] border border-white/5"
                  />
                ))}
              </div>
            ) : recent.length === 0 ? (
              <div
                className="rounded-3xl p-10 text-center border border-white/10"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%), rgba(15, 18, 27, 0.7)",
                }}
              >
                <div className="mx-auto w-12 h-12 rounded-2xl bg-mint-400/10 border border-mint-400/20 flex items-center justify-center text-mint-300 mb-3">
                  <PenLine size={20} />
                </div>
                <h4 className="font-display text-base font-bold text-white">Your journal is waiting</h4>
                <p className="text-xs text-ink-400 mt-1 max-w-sm mx-auto">
                  Start your journey today by expressing what's currently in your mind.
                </p>
                <button
                  onClick={() => navigate("/journals/new")}
                  className="mt-5 btn-premium py-2.5 px-4 text-xs font-bold cursor-pointer"
                >
                  Write Your First Entry
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recent.map((j) => (
                  <JournalCard key={j._id} journal={j} />
                ))}
              </div>
            )}
          </div>

          {/* AI Insights Column */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-electric-500">Cognitive Feedback</p>
                <h3 className="font-display text-lg font-bold text-white">AI Insights</h3>
              </div>
              <button
                onClick={() => navigate("/insights")}
                className="text-xs font-bold text-ink-400 hover:text-white transition-colors"
              >
                Details
              </button>
            </div>

            <div className="space-y-3">
              {aiInsights.map((insight) => (
                <div
                  key={insight.title}
                  className="rounded-2xl p-4.5 border border-white/10 backdrop-blur-md transition-all hover:border-white/20"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%), rgba(15, 18, 27, 0.8)",
                  }}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <Sparkles size={14} style={{ color: insight.color }} />
                      <p className="text-xs font-bold text-white">{insight.title}</p>
                    </div>
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full border"
                      style={{
                        color: insight.color,
                        borderColor: `${insight.color}40`,
                        background: `${insight.color}15`,
                      }}
                    >
                      {insight.tag}
                    </span>
                  </div>
                  <p className="text-xs text-ink-300 leading-relaxed">{insight.text}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("/journals/new")}
              className="w-full btn-secondary py-3 text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer mt-3"
            >
              <PenLine size={14} /> Quick Reflection Check-in
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
