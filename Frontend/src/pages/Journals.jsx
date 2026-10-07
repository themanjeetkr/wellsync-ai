import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PenLine, Search, SlidersHorizontal, X, Sparkles } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import JournalCard from "../components/ui/JournalCard";
import { useJournals } from "../context/JournalContext";

const moods = [
  { label: "All", emoji: "✨" },
  { label: "Happy", emoji: "😊" },
  { label: "Calm", emoji: "😌" },
  { label: "Excited", emoji: "🤩" },
  { label: "Neutral", emoji: "😐" },
  { label: "Anxious", emoji: "😰" },
  { label: "Sad", emoji: "😢" },
  { label: "Angry", emoji: "😤" },
];

export default function Journals() {
  const { journals, fetchJournals, loading } = useJournals();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedMood, setSelectedMood] = useState("All");

  useEffect(() => {
    fetchJournals();
  }, [fetchJournals]);

  const filtered = journals.filter((j) => {
    const matchSearch =
      j.title?.toLowerCase().includes(search.toLowerCase()) ||
      j.content?.toLowerCase().includes(search.toLowerCase());
    const matchMood =
      selectedMood === "All" ||
      j.mood?.toLowerCase() === selectedMood.toLowerCase();
    return matchSearch && matchMood;
  });

  return (
    <DashboardLayout title="Journals & Entries">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* TOP BAR: SEARCH & NEW ENTRY */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5">
          <div className="relative flex-1 max-w-lg">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your journal by keyword or thought..."
              className="input-dark w-full pl-10 pr-9 py-2.5 rounded-xl text-xs sm:text-sm bg-white/[0.04]"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <button
            onClick={() => navigate("/journals/new")}
            className="btn-premium py-2.5 px-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-[0_8px_24px_rgba(52,211,153,0.25)]"
          >
            <PenLine size={15} /> Write New Entry
          </button>
        </div>

        {/* MOOD FILTER CHIPS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-ink-400 mr-1 flex-shrink-0">
            <SlidersHorizontal size={13} /> Filter:
          </span>
          {moods.map((m) => {
            const active = selectedMood === m.label;
            return (
              <button
                key={m.label}
                onClick={() => setSelectedMood(m.label)}
                className={`flex items-center gap-1.5 flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                  active
                    ? "bg-mint-400/15 border-mint-400/35 text-mint-300 shadow-[0_0_12px_rgba(52,211,153,0.2)]"
                    : "bg-white/[0.03] border-white/[0.07] text-ink-400 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                <span>{m.emoji}</span>
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>

        {/* RESULTS COUNT */}
        <div className="flex items-center justify-between text-xs text-ink-400 font-medium">
          <span className="flex items-center gap-1.5">
            Showing <strong className="text-white">{filtered.length}</strong> {filtered.length === 1 ? "entry" : "entries"}
            {selectedMood !== "All" && ` tagged with "${selectedMood}"`}
          </span>

          {(search || selectedMood !== "All") && (
            <button
              onClick={() => {
                setSearch("");
                setSelectedMood("All");
              }}
              className="text-mint-300 hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* JOURNAL LISTING */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-44 rounded-2xl animate-pulse bg-white/[0.04] border border-white/5"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="rounded-3xl p-12 text-center border border-white/10"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%), rgba(15, 18, 27, 0.7)",
            }}
          >
            <div className="mx-auto w-12 h-12 rounded-2xl bg-mint-400/10 border border-mint-400/20 flex items-center justify-center text-mint-300 mb-3">
              <Sparkles size={20} />
            </div>
            <h3 className="font-display text-lg font-bold text-white">
              {search || selectedMood !== "All" ? "No matching reflections" : "Your journal is empty"}
            </h3>
            <p className="text-xs text-ink-400 mt-1 max-w-sm mx-auto">
              {search || selectedMood !== "All"
                ? "Try searching for a different keyword or removing the active mood filter."
                : "Capture your thoughts freely without fear of judgment. Begin your habit today."}
            </p>
            <button
              onClick={() => navigate("/journals/new")}
              className="mt-5 btn-premium py-2.5 px-4 text-xs font-bold cursor-pointer"
            >
              <PenLine size={14} /> Write an Entry Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((j) => (
              <JournalCard key={j._id} journal={j} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}