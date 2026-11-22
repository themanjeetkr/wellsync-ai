import { useCallback, useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Lightbulb,
  Save,
  Loader2,
  Sparkles,
  Brain,
  CheckCircle2,
} from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { useJournals } from "../context/JournalContext";
import { getJournalSuggestions } from "../services/api";

const moods = [
  { value: "happy", label: "Happy", emoji: "😊", color: "#34d399" },
  { value: "calm", label: "Calm", emoji: "😌", color: "#5eead4" },
  { value: "excited", label: "Excited", emoji: "🤩", color: "#facc15" },
  { value: "neutral", label: "Neutral", emoji: "😐", color: "#9aa5c4" },
  { value: "anxious", label: "Anxious", emoji: "😰", color: "#fb923c" },
  { value: "sad", label: "Sad", emoji: "😢", color: "#93c5fd" },
  { value: "angry", label: "Angry", emoji: "😤", color: "#f87171" },
];

export default function JournalEditor() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const { addJournal, editJournal, fetchJournalById, fetchJournals } =
    useJournals();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const [aiReply, setAiReply] = useState("");
  const [saving, setSaving] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [suggestionData, setSuggestionData] = useState(null);
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const [suggestionError, setSuggestionError] = useState("");
  const lastReplyKey = useRef("");

  useEffect(() => {
    if (isEdit) {
      fetchJournalById(id).then((j) => {
        if (j) {
          setTitle(j.title || "");
          setContent(j.content || "");
          setMood(j.mood || "");
          setAiReply(j.aiReply || "");
        }
      });
    }
  }, [id, isEdit, fetchJournalById]);

  useEffect(() => {
    setWordCount(content.trim() ? content.trim().split(/\s+/).length : 0);
  }, [content]);

  const requestAIReply = useCallback(async () => {
    const trimmedContent = content.trim();

    if (trimmedContent.length < 20) {
      setSuggestionError("Write at least 20 characters to get an AI reply.");
      return;
    }

    setSuggestionLoading(true);
    setSuggestionError("");

    try {
      const token = localStorage.getItem("token");
      const data = await getJournalSuggestions(
        { title: title.trim(), content: trimmedContent, mood },
        token
      );

      lastReplyKey.current = `${title.trim()}|${trimmedContent}|${
        data.mood || mood
      }`;
      setSuggestionData(data);
      setAiReply(data.reply || "");

      if (data.mood) {
        setMood(data.mood);
      }
      return data;
    } catch (err) {
      setSuggestionError(err.message || "AI reply is unavailable.");
      return null;
    } finally {
      setSuggestionLoading(false);
    }
  }, [content, mood, title]);

  useEffect(() => {
    const trimmedContent = content.trim();
    const replyKey = `${title.trim()}|${trimmedContent}|${mood}`;

    if (trimmedContent.length < 40 || replyKey === lastReplyKey.current) {
      return;
    }

    const timeoutId = setTimeout(() => {
      requestAIReply();
    }, 1400);

    return () => clearTimeout(timeoutId);
  }, [content, mood, requestAIReply, title]);

  const handleSave = async () => {
    if (!title.trim() && !content.trim()) return;

    if (!mood) {
      alert("Please select how you are feeling right now.");
      return;
    }

    setSaving(true);

    try {
      let finalReply = aiReply;
      let finalSuggestionData = suggestionData;

      if (!finalReply && content.trim().length >= 20) {
        finalSuggestionData = await requestAIReply();
        finalReply = finalSuggestionData?.reply || "";
      }

      const data = {
        title: title.trim() || "Untitled Reflection",
        content,
        mood: finalSuggestionData?.mood || mood || "neutral",
        aiReply: finalReply,
      };

      const result = isEdit
        ? await editJournal(id, data)
        : await addJournal(data);

      if (result) {
        await fetchJournals();
        navigate("/insights");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout title={isEdit ? "Edit Reflection" : "New Reflection"}>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Navigation & Header Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-semibold text-ink-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} /> Back to Journals
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs text-ink-400 font-medium hidden sm:inline-block">
              {wordCount} {wordCount === 1 ? "word" : "words"} • Encrypted
            </span>
            <button
              onClick={handleSave}
              disabled={saving || suggestionLoading}
              className="btn-premium py-2.5 px-4 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-[0_8px_24px_rgba(52,211,153,0.3)] disabled:opacity-50"
            >
              {saving || suggestionLoading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Save size={14} />
              )}
              <span>{saving ? "Saving Reflection..." : isEdit ? "Update Entry" : "Save & Synthesize"}</span>
            </button>
          </div>
        </div>

        {/* 2-Column Editor Layout */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Main Writing Canvas */}
          <div
            className="rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between"
            style={{
              background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%), rgba(15, 18, 27, 0.85)",
              boxShadow: "0 20px 50px -10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Title Input */}
            <div className="p-6 pb-4 border-b border-white/[0.06]">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title your thoughts..."
                className="w-full bg-transparent font-display text-2xl sm:text-3xl font-bold text-white outline-none placeholder:text-ink-500"
              />
            </div>

            {/* Mood Selector Row */}
            <div className="px-6 py-4 bg-white/[0.02] border-b border-white/[0.06]">
              <p className="text-xs font-bold uppercase tracking-wider text-ink-400 mb-2.5">
                How does your heart and mind feel right now?
              </p>
              <div className="flex flex-wrap gap-2">
                {moods.map((m) => {
                  const active = mood?.toLowerCase() === m.value;
                  return (
                    <button
                      key={m.value}
                      type="button"
                      onClick={() => setMood(m.value)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                        active
                          ? "bg-mint-400/20 border-mint-400/40 text-mint-300 shadow-[0_0_12px_rgba(52,211,153,0.25)] scale-105"
                          : "bg-white/[0.03] border-white/[0.07] text-ink-400 hover:text-white hover:bg-white/[0.06]"
                      }`}
                    >
                      <span>{m.emoji}</span>
                      <span>{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Textarea Canvas */}
            <div className="p-6 flex-1 flex flex-col">
              <textarea
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  setAiReply("");
                  setSuggestionError("");
                }}
                placeholder="What happened today? How did it make you feel? Write freely without editing yourself..."
                rows={14}
                className="w-full bg-transparent text-sm sm:text-base leading-relaxed text-ink-200 outline-none resize-none placeholder:text-ink-600 flex-1"
              />

              {/* AI Realtime Reflection Bubble */}
              {aiReply && (
                <div className="mt-4 rounded-2xl border border-mint-400/30 bg-mint-400/10 p-4.5 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-xs font-bold text-mint-300 uppercase tracking-wider mb-1.5">
                    <Sparkles size={14} /> AI Cognitive Reflection
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-white">
                    {aiReply}
                  </p>
                </div>
              )}
            </div>

            {/* Editor Footer Status */}
            <div className="px-6 py-3.5 bg-white/[0.02] border-t border-white/[0.06] flex items-center justify-between text-xs text-ink-500 font-medium">
              <span>{wordCount} words recorded</span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 size={13} /> Private & Client-Encrypted
              </span>
            </div>
          </div>

          {/* AI Companion Sidebar */}
          <aside
            className="rounded-3xl p-5 border border-white/10 backdrop-blur-xl h-fit space-y-4"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%), rgba(15, 18, 27, 0.9)",
              boxShadow: "0 15px 40px -10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Brain size={17} className="text-mint-300" />
                <span>AI Companion</span>
              </div>
              {suggestionLoading && (
                <Loader2 size={15} className="animate-spin text-mint-400" />
              )}
            </div>

            {suggestionError ? (
              <p className="text-xs text-rose-300 bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">
                {suggestionError}
              </p>
            ) : suggestionData ? (
              <div className="space-y-3.5">
                <div className="rounded-xl bg-white/[0.04] p-3 border border-white/5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-ink-400">
                    Detected Emotion
                  </span>
                  <p className="text-sm font-bold text-mint-300 capitalize mt-0.5">
                    {suggestionData.mood}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-ink-400 block mb-2">
                    Reflective Prompts
                  </span>
                  <ul className="space-y-2">
                    {suggestionData.suggestions?.map((s, idx) => (
                      <li
                        key={idx}
                        className="rounded-xl border border-white/5 bg-white/[0.03] p-3 text-xs leading-relaxed text-ink-200"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-ink-400 space-y-2">
                <Lightbulb size={24} className="mx-auto text-amber-400/80 mb-2" />
                <p className="font-semibold text-white">Need a spark?</p>
                <p className="leading-relaxed text-ink-400">
                  Write at least 20-40 characters. MindScribe's AI will detect emotional patterns and offer gentle guidance.
                </p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
}
