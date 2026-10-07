import { useEffect, useMemo } from "react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  PieChart, Pie, Cell, Tooltip, Legend,
} from "recharts";
import { Sparkles, TrendingUp, Heart, Brain, Activity, Compass, Shield } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { useJournals } from "../context/JournalContext";

const MOOD_COLORS = {
  happy: "#34d399",
  excited: "#facc15",
  calm: "#5eead4",
  neutral: "#9aa5c4",
  anxious: "#fb923c",
  sad: "#93c5fd",
  angry: "#f87171",
};

const moodToScore = {
  happy: 9,
  excited: 10,
  calm: 8,
  neutral: 5,
  anxious: 4,
  sad: 3,
  angry: 2,
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-xl px-3.5 py-2 text-xs shadow-2xl backdrop-blur-xl border border-white/10"
      style={{ background: "rgba(15, 18, 27, 0.95)" }}
    >
      {payload.map((p) => (
        <p key={p.name} className="flex items-center gap-1.5 font-semibold text-white">
          <span className="w-2 h-2 rounded-full" style={{ background: p.payload.fill || p.color }} />
          <span>{p.name}:</span>
          <span className="font-bold">{p.value}</span>
        </p>
      ))}
    </div>
  );
};

export default function Insights() {
  const { journals, fetchJournals } = useJournals();

  useEffect(() => {
    fetchJournals();
  }, [fetchJournals]);

  // Mood distribution for pie chart
  const moodDist = useMemo(() => {
    const counts = {};
    journals.forEach((j) => {
      const m =
        j.mood?.toLowerCase() ||
        j.moodLabel?.toLowerCase() ||
        "neutral";
      counts[m] = (counts[m] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
      fill: MOOD_COLORS[name] || "#9aa5c4",
    }));
  }, [journals]);

  // Dominant mood
  const dominantMood = useMemo(() => {
    return [...moodDist].sort((a, b) => b.value - a.value)[0];
  }, [moodDist]);

  // Radar: emotional balance
  const radarData = useMemo(() => [
    {
      axis: "Joy",
      value: journals.filter((j) =>
        ["happy", "excited"].includes(j.mood?.toLowerCase())
      ).length,
    },
    {
      axis: "Calm",
      value: journals.filter((j) => j.mood?.toLowerCase() === "calm").length,
    },
    {
      axis: "Focus",
      value: journals.filter((j) =>
        ["calm", "happy"].includes(j.mood?.toLowerCase())
      ).length,
    },
    {
      axis: "Anxiety",
      value: journals.filter((j) => j.mood?.toLowerCase() === "anxious").length,
    },
    {
      axis: "Sadness",
      value: journals.filter((j) => j.mood?.toLowerCase() === "sad").length,
    },
    {
      axis: "Anger",
      value: journals.filter((j) => j.mood?.toLowerCase() === "angry").length,
    },
  ], [journals]);

  const avgMood = useMemo(() => {
    const scores = journals.map(
      (j) =>
        moodToScore[j.mood?.toLowerCase()] ||
        moodToScore[j.moodLabel?.toLowerCase()] ||
        5
    );
    return scores.length
      ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)
      : "0.0";
  }, [journals]);

  const aiInsightCards = [
    {
      icon: Brain,
      color: "#34d399",
      bg: "rgba(52, 211, 153, 0.08)",
      border: "rgba(52, 211, 153, 0.2)",
      title: "Dominant Emotional Pattern",
      body: journals.length
        ? `Your primary emotional state is "${dominantMood?.name || "Neutral"}". Noticing this pattern in daily entries allows you to respond consciously rather than react impulsively.`
        : "Record a few reflections to unlock cognitive pattern analysis.",
    },
    {
      icon: Heart,
      color: "#fbbf24",
      bg: "rgba(251, 191, 36, 0.08)",
      border: "rgba(251, 191, 36, 0.2)",
      title: "Mental Well-being Index",
      body: `Your average reflection score is ${avgMood} / 10. ${
        Number(avgMood) >= 7
          ? "You are maintaining high emotional resilience and healthy baseline routines!"
          : "Consider gentle calming pauses, mindfulness walks, or sleep hygiene to support your mood."
      }`,
    },
    {
      icon: TrendingUp,
      color: "#f87171",
      bg: "rgba(248, 113, 113, 0.08)",
      border: "rgba(248, 113, 113, 0.2)",
      title: "Reflective Habit Growth",
      body: `You have documented ${journals.length} reflections. Habit researchers find that 2 weeks of continuous journaling fundamentally rewires stress reactivity.`,
    },
    {
      icon: Sparkles,
      color: "#60a5fa",
      bg: "rgba(96, 165, 250, 0.08)",
      border: "rgba(96, 165, 250, 0.2)",
      title: "Empathetic Recommendation",
      body: "Try an evening gratitude audit: note down 3 small wins or pleasant moments before closing your laptop for the night.",
    },
  ];

  return (
    <DashboardLayout title="Insights & Intelligence">
      <div className="max-w-7xl mx-auto space-y-7">
        {/* Header */}
        <div
          className="rounded-3xl p-6 sm:p-8 border border-white/10"
          style={{
            background:
              "radial-gradient(ellipse at 80% 20%, rgba(96, 165, 250, 0.16), transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(52, 211, 153, 0.15), transparent 50%), linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%), #0c101a",
            boxShadow: "0 20px 50px -15px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
          }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-mint-400/25 bg-mint-400/10 px-3 py-1 text-xs font-semibold text-mint-300 mb-3">
            <Compass size={14} />
            <span>AI Psychological Modeling</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Your Mental Landscape
          </h2>
          <p className="mt-2 text-sm text-ink-300 max-w-2xl leading-relaxed">
            Synthesized emotional patterns derived from your private journal entries. All analyses are performed with privacy-first NLP.
          </p>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart: Mood Distribution */}
          <div
            className="rounded-3xl p-6 border border-white/10 backdrop-blur-xl"
            style={{
              background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%), rgba(15, 18, 27, 0.8)",
              boxShadow: "0 15px 40px -10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-mint-300">Emotional Breakdown</p>
                <h3 className="font-display text-lg font-bold text-white">Mood Distribution</h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/[0.05] text-ink-300">
                All-time
              </span>
            </div>

            {moodDist.length === 0 ? (
              <div className="h-56 flex items-center justify-center text-ink-500 text-xs">
                No entries available to map distribution.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={230}>
                <PieChart>
                  <Pie
                    data={moodDist}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {moodDist.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} stroke="rgba(0,0,0,0.4)" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    formatter={(value) => (
                      <span style={{ color: "#c9d2e7", fontSize: 11, fontWeight: 500 }}>
                        {value}
                      </span>
                    )}
                    iconType="circle"
                    iconSize={8}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Radar Chart: Emotional Balance */}
          <div
            className="rounded-3xl p-6 border border-white/10 backdrop-blur-xl"
            style={{
              background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%), rgba(15, 18, 27, 0.8)",
              boxShadow: "0 15px 40px -10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-electric-500">Multiaxial Balance</p>
                <h3 className="font-display text-lg font-bold text-white">Emotional Equilibrium Radar</h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/[0.05] text-ink-300">
                6 Dimensions
              </span>
            </div>

            <ResponsiveContainer width="100%" height={230}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.07)" />
                <PolarAngleAxis
                  dataKey="axis"
                  tick={{ fill: "#9aa5c4", fontSize: 11, fontWeight: 600 }}
                />
                <Radar
                  name="Emotions"
                  dataKey="value"
                  stroke="#34d399"
                  fill="#34d399"
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insight Cards */}
        <div>
          <div className="mb-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-mint-300">Cognitive Feedback</p>
            <h3 className="font-display text-xl font-bold text-white">Psychological Insights</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {aiInsightCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl p-5 border backdrop-blur-md transition-all hover:scale-[1.01]"
                style={{
                  background: card.bg,
                  borderColor: card.border,
                }}
              >
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  >
                    <card.icon size={16} style={{ color: card.color }} />
                  </div>
                  <h4 className="text-sm font-bold" style={{ color: card.color }}>
                    {card.title}
                  </h4>
                </div>
                <p className="text-xs text-ink-200 leading-relaxed font-normal">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}