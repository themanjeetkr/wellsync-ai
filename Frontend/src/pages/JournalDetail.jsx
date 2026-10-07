import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit3, Trash2, Calendar, Sparkles, Brain } from "lucide-react";
import { format } from "date-fns";
import DashboardLayout from "../components/layout/DashboardLayout";
import MoodBadge from "../components/ui/MoodBadge";
import { useJournals } from "../context/JournalContext";

export default function JournalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentJournal, fetchJournalById, removeJournal, loading } = useJournals();

  useEffect(() => {
    fetchJournalById(id);
  }, [id, fetchJournalById]);

  if (loading) {
    return (
      <DashboardLayout title="Entry Details">
        <div className="max-w-3xl mx-auto space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 rounded-2xl animate-pulse bg-white/[0.04] border border-white/5"
            />
          ))}
        </div>
      </DashboardLayout>
    );
  }

  if (!currentJournal) {
    return (
      <DashboardLayout title="Not Found">
        <div className="max-w-2xl mx-auto text-center py-20">
          <p className="text-ink-400 text-sm">Reflection entry could not be found.</p>
          <button
            onClick={() => navigate("/journals")}
            className="mt-4 btn-secondary py-2 px-4 text-xs font-semibold cursor-pointer"
          >
            ← Back to Journals
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this reflection?")) {
      await removeJournal(currentJournal._id);
      navigate("/journals");
    }
  };

  return (
    <DashboardLayout title="Reflection">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Back and Action Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/journals")}
            className="flex items-center gap-2 text-xs font-semibold text-ink-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} /> Back to all entries
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/journals/${id}/edit`)}
              className="btn-secondary py-2 px-3 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Edit3 size={13} /> Edit
            </button>
            <button
              onClick={handleDelete}
              className="p-2 rounded-xl text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all cursor-pointer"
              title="Delete reflection"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Reading Article Card */}
        <article
          className="rounded-3xl border border-white/10 overflow-hidden"
          style={{
            background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%), rgba(15, 18, 27, 0.85)",
            boxShadow: "0 25px 60px -15px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Header */}
          <div className="p-7 sm:p-9 border-b border-white/[0.08]">
            <h1 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight mb-4">
              {currentJournal.title || "Untitled Reflection"}
            </h1>

            <div className="flex flex-wrap items-center gap-3">
              {currentJournal.createdAt && (
                <span className="flex items-center gap-1.5 text-xs text-ink-400 font-medium">
                  <Calendar size={13} />
                  {format(new Date(currentJournal.createdAt), "MMMM d, yyyy 'at' h:mm a")}
                </span>
              )}
              {currentJournal.mood && <MoodBadge mood={currentJournal.mood} />}
            </div>
          </div>

          {/* Body Content */}
          <div className="p-7 sm:p-9 space-y-6">
            <div className="text-ink-200 text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-normal">
              {currentJournal.content || "No written content recorded."}
            </div>

            {/* AI Reflection Box */}
            {currentJournal.aiReply && (
              <div className="mt-8 rounded-2xl border border-mint-400/30 bg-mint-400/10 p-6 backdrop-blur-md">
                <div className="flex items-center gap-2 text-xs font-bold text-mint-300 uppercase tracking-wider mb-2">
                  <Brain size={16} /> AI Mental Wellness Observation
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-white">
                  {currentJournal.aiReply}
                </p>
              </div>
            )}
          </div>
        </article>
      </div>
    </DashboardLayout>
  );
}
