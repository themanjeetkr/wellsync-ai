import { createElement } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const colorMap = {
  sage: {
    bg: "rgba(16, 185, 129, 0.06)",
    border: "rgba(52, 211, 153, 0.2)",
    iconBg: "rgba(52, 211, 153, 0.15)",
    iconBorder: "rgba(52, 211, 153, 0.3)",
    iconText: "#34d399",
    value: "#6ee7b7",
    glow: "rgba(52, 211, 153, 0.15)",
  },
  amber: {
    bg: "rgba(245, 158, 11, 0.06)",
    border: "rgba(251, 191, 36, 0.2)",
    iconBg: "rgba(251, 191, 36, 0.15)",
    iconBorder: "rgba(251, 191, 36, 0.3)",
    iconText: "#fbbf24",
    value: "#fde68a",
    glow: "rgba(251, 191, 36, 0.15)",
  },
  rose: {
    bg: "rgba(244, 63, 94, 0.06)",
    border: "rgba(251, 113, 133, 0.2)",
    iconBg: "rgba(251, 113, 133, 0.15)",
    iconBorder: "rgba(251, 113, 133, 0.3)",
    iconText: "#fb7185",
    value: "#fecdd3",
    glow: "rgba(244, 63, 94, 0.15)",
  },
  blue: {
    bg: "rgba(59, 130, 246, 0.06)",
    border: "rgba(96, 165, 250, 0.2)",
    iconBg: "rgba(96, 165, 250, 0.15)",
    iconBorder: "rgba(96, 165, 250, 0.3)",
    iconText: "#60a5fa",
    value: "#bfdbfe",
    glow: "rgba(59, 130, 246, 0.15)",
  },
};

export default function StatCard({
  icon,
  label,
  value,
  change,
  changeLabel,
  color = "sage",
  delay = 0,
}) {
  const c = colorMap[color] || colorMap.sage;
  const positive = change >= 0;

  return (
    <div
      className="group relative overflow-hidden rounded-2xl p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{
        background: `linear-gradient(145deg, rgba(255,255,255,0.05) 0%, ${c.bg} 100%), rgba(15, 18, 27, 0.75)`,
        border: `1px solid ${c.border}`,
        boxShadow: `0 12px 30px -10px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)`,
        animationDelay: `${delay}ms`,
        animationFillMode: "forwards",
      }}
    >
      {/* Ambient corner aura */}
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-60"
        style={{ background: c.glow }}
      />

      <div className="relative z-10 flex items-start justify-between mb-3.5">
        <div
          className="grid h-11 w-11 place-items-center rounded-xl border transition-transform duration-300 group-hover:scale-105"
          style={{
            background: c.iconBg,
            borderColor: c.iconBorder,
            boxShadow: `0 4px 14px ${c.glow}`,
          }}
        >
          {createElement(icon, { size: 20, style: { color: c.iconText } })}
        </div>

        {change !== undefined && (
          <div
            className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border ${
              positive
                ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                : "bg-rose-500/15 border-rose-500/30 text-rose-300"
            }`}
          >
            {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {Math.abs(change)}%
          </div>
        )}
      </div>

      <div className="relative z-10">
        <p
          className="font-display text-3xl font-bold tracking-tight mb-0.5"
          style={{ color: c.value }}
        >
          {value}
        </p>
        <p className="text-xs font-semibold text-ink-300">{label}</p>
        {changeLabel && (
          <p className="text-[11px] text-ink-400 mt-1 font-medium">{changeLabel}</p>
        )}
      </div>
    </div>
  );
}
