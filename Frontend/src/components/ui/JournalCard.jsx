import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontal, Trash2, Edit3, ArrowUpRight, Sparkles } from "lucide-react";
import { useState } from "react";
import MoodBadge from "./MoodBadge";
import { useJournals } from "../../context/JournalContext";

export default function JournalCard({ journal, compact = false }) {
  const { removeJournal } = useJournals();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const timeAgo = journal.createdAt
    ? formatDistanceToNow(new Date(journal.createdAt), { addSuffix: true })
    : "";

  return (
    <div
      className="group relative flex flex-col justify-between rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-mint-400/30"
      style={{
        background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%), rgba(15, 18, 27, 0.8)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
        backdropFilter: "blur(16px)",
      }}
      onClick={() => navigate(`/journals/${journal._id}`)}
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-base font-bold text-white group-hover:text-mint-300 transition-colors truncate">
              {journal.title || "Untitled Entry"}
            </h3>
            <p className="text-[11px] font-medium text-ink-400 mt-0.5">{timeAgo}</p>
          </div>

          <div className="relative flex items-center gap-1">
            <button
              className="opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 rounded-lg flex items-center justify-center text-ink-400 hover:text-white hover:bg-white/[0.08]"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((o) => !o);
              }}
              aria-label="Entry options"
            >
              <MoreHorizontal size={15} />
            </button>

            {menuOpen && (
              <div
                className="absolute right-0 top-full mt-1.5 w-36 rounded-xl overflow-hidden z-20 shadow-2xl border border-white/10"
                style={{
                  background: "#121622",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="w-full flex items-center gap-2 px-3.5 py-2.5 text-xs font-medium text-ink-300 hover:text-white hover:bg-white/[0.06] transition-colors"
                  onClick={() => {
                    navigate(`/journals/${journal._id}/edit`);
                    setMenuOpen(false);
                  }}
                >
                  <Edit3 size={13} /> Edit
                </button>
                <button
                  className="w-full flex items-center gap-2 px-3.5 py-2.5 text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors border-t border-white/[0.06]"
                  onClick={() => {
                    removeJournal(journal._id);
                    setMenuOpen(false);
                  }}
                >
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {!compact && journal.content && (
          <p className="text-xs text-ink-300 line-clamp-3 mb-4 leading-relaxed font-normal">
            {journal.content}
          </p>
        )}
      </div>

      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2">
        <div>
          {journal.mood ? (
            <MoodBadge mood={journal.mood} />
          ) : (
            <span className="text-[11px] text-ink-500">No mood tagged</span>
          )}
        </div>

        {journal.aiReply && (
          <span className="flex items-center gap-1 text-[11px] font-semibold text-mint-300 bg-mint-400/10 border border-mint-400/20 px-2 py-0.5 rounded-full">
            <Sparkles size={11} /> AI Insight
          </span>
        )}
      </div>
    </div>
  );
}
