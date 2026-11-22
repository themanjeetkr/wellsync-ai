const moods = {
  happy: { emoji: "😊", label: "Happy", color: "#34d399", bg: "rgba(52, 211, 153, 0.12)", border: "rgba(52, 211, 153, 0.25)" },
  sad: { emoji: "😢", label: "Sad", color: "#93c5fd", bg: "rgba(147, 197, 253, 0.12)", border: "rgba(147, 197, 253, 0.25)" },
  anxious: { emoji: "😰", label: "Anxious", color: "#fb923c", bg: "rgba(251, 146, 60, 0.12)", border: "rgba(251, 146, 60, 0.25)" },
  angry: { emoji: "😤", label: "Angry", color: "#f87171", bg: "rgba(248, 113, 113, 0.12)", border: "rgba(248, 113, 113, 0.25)" },
  neutral: { emoji: "😐", label: "Neutral", color: "#9aa5c4", bg: "rgba(154, 165, 196, 0.12)", border: "rgba(154, 165, 196, 0.2)" },
  excited: { emoji: "🤩", label: "Excited", color: "#facc15", bg: "rgba(250, 204, 21, 0.12)", border: "rgba(250, 204, 21, 0.25)" },
  calm: { emoji: "😌", label: "Calm", color: "#5eead4", bg: "rgba(94, 234, 212, 0.12)", border: "rgba(94, 234, 212, 0.25)" },
};

export default function MoodBadge({ mood, size = "sm" }) {
  const m = moods[mood?.toLowerCase()] || moods.neutral;
  const sizes = {
    sm: "text-[11px] px-2.5 py-1 gap-1.5",
    md: "text-xs px-3 py-1.5 gap-2",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold border backdrop-blur-md transition-all ${sizes[size]}`}
      style={{
        background: m.bg,
        color: m.color,
        borderColor: m.border,
      }}
    >
      <span className="text-xs leading-none">{m.emoji}</span>
      <span>{m.label}</span>
    </span>
  );
}

export { moods };
