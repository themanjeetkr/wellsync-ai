import { createElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  ChevronRight,
  Clock3,
  HeartPulse,
  LockKeyhole,
  MessageCircleHeart,
  Moon,
  PenLine,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Activity,
  Smile,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: PenLine,
    title: "Private AI Journaling",
    tag: "Zero Judgment",
    desc: "Write freely in a serene, distraction-free space that intelligently turns fragmented thoughts into clear emotional signals.",
  },
  {
    icon: Brain,
    title: "Pattern Discovery",
    tag: "Deep Insight",
    desc: "Discover underlying triggers, energy dips, and positive routines before they become invisible to your daily awareness.",
  },
  {
    icon: BarChart3,
    title: "Mood Intelligence",
    tag: "Live Analytics",
    desc: "Visualize your emotional rhythm with weekly trends, journaling streaks, and practical next steps backed by behavioral science.",
  },
  {
    icon: ShieldCheck,
    title: "Engineered for Trust",
    tag: "AES-256 Encrypted",
    desc: "Your thoughts belong to you alone. 100% private, client-side protected, and designed for pure personal reflection.",
  },
];

const productStats = [
  { value: "2 min", label: "average daily check-in" },
  { value: "89%", label: "users spot recurring triggers" },
  { value: "100%", label: "confidential & private" },
];

const timeline = [
  {
    time: "Today • Morning",
    text: "I felt a wave of tension right before the team standup again.",
  },
  {
    time: "AI Detection",
    text: "Pattern recognized: Meeting anxiety has recurred on 4 Monday mornings this month.",
  },
  {
    time: "Actionable Reset",
    text: "Recommendation: Practice a 90-second 4-7-8 breathing reset 10 minutes prior to standup.",
  },
];

const testimonials = [
  {
    name: "Naina Kapoor",
    role: "Senior UX Designer, Bengaluru",
    image: "/testimonials/naina.jpg",
    mood: "less overthinking",
    text:
      "MindScribe helped me organize my scattered thoughts without making clinical claims. Within two weeks, I clearly saw my Sunday evening anxiety patterns and learned to protect my personal boundaries.",
    detail: "32 entries written",
    streak: "14 day streak",
  },
  {
    name: "Arjun Mehta",
    role: "Startup Founder, Remote Team",
    image: "/testimonials/arjun.jpg",
    mood: "better sleep quality",
    text:
      "The insights feel genuinely tailored to what I write. I use it every night before bed, and it has become the single most grounding habit that lets me switch off work mode and sleep peacefully.",
    detail: "45 entries written",
    streak: "21 day streak",
  },
  {
    name: "Sofia Ramirez",
    role: "Graduate Researcher & Student",
    image: "/testimonials/sofia.jpg",
    mood: "calmer mornings",
    text:
      "Most mental health apps feel overwhelming and tedious. MindScribe simply lets me write naturally, and produces one sharp, empathetic observation that actually makes my morning calmer.",
    detail: "28 entries written",
    streak: "9 day streak",
  },
];

function Stars() {
  return (
    <div className="flex gap-1" aria-label="5 star rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={15} className="fill-amber-400 text-amber-400 drop-shadow-[0_2px_8px_rgba(251,191,36,0.4)]" />
      ))}
    </div>
  );
}

export default function Homepage() {
  const navigate = useNavigate();
  const [activeMoodIndex, setActiveMoodIndex] = useState(5);

  const moodDays = [
    { day: "Mon", height: "48%", mood: "Tense", score: "5.4" },
    { day: "Tue", height: "62%", mood: "Neutral", score: "6.8" },
    { day: "Wed", height: "42%", mood: "Tired", score: "4.9" },
    { day: "Thu", height: "78%", mood: "Productive", score: "8.1" },
    { day: "Fri", height: "68%", mood: "Relieved", score: "7.2" },
    { day: "Sat", height: "92%", mood: "Serene & Joyful", score: "9.3" },
    { day: "Sun", height: "75%", mood: "Reflective", score: "7.8" },
  ];

  return (
    <div className="min-h-screen bg-premium text-ink-100 font-body overflow-x-hidden selection:bg-mint-400/20 selection:text-mint-200">
      {/* AMBIENT BACKGROUND GLOWS */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[480px] bg-gradient-to-b from-mint-400/15 via-electric-500/10 to-transparent blur-[140px] rounded-full" />
        <div className="absolute top-[40%] -left-32 w-[500px] h-[500px] bg-emerald-500/10 blur-[130px] rounded-full" />
        <div className="absolute top-[60%] -right-32 w-[550px] h-[550px] bg-indigo-500/10 blur-[140px] rounded-full" />
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.08] bg-ink-950/70 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 transition hover:opacity-90 cursor-pointer"
            aria-label="MindScribe home"
          >
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-tr from-mint-400 to-emerald-500 shadow-[0_8px_24px_rgba(52,211,153,0.35)] border border-white/20">
              <Moon size={20} className="text-[#04140e] fill-[#04140e]" />
            </span>
            <span className="font-display text-xl font-bold tracking-tight">
              Mind<span className="text-gradient-luxe">Scribe</span>
            </span>
          </button>

          <div className="hidden items-center gap-8 md:flex">
            {["Features", "How it works", "Stories"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                className="text-sm font-medium text-ink-300 transition hover:text-white"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="text-sm font-medium text-ink-300 hover:text-white px-3 py-2 transition hidden sm:inline-flex"
            >
              Sign in
            </button>
            <button
              onClick={() => navigate("/login")}
              className="btn-premium cursor-pointer text-sm font-semibold"
            >
              Start Free Journal <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="relative px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-2xl">
              {/* Pill badge */}
              <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-mint-400/30 bg-mint-400/10 px-4 py-1.5 text-xs font-semibold text-mint-300 shadow-[0_0_20px_rgba(52,211,153,0.15)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-mint-400"></span>
                </span>
                <span>AI-Powered Mental Health Journal & Emotional Intelligence</span>
              </div>

              <h1 className="font-display text-5xl font-bold leading-[1.04] tracking-tight text-white md:text-7xl">
                Understand your mind{" "}
                <span className="text-gradient-luxe">before the day</span>{" "}
                understands you.
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-ink-300 md:text-xl">
                MindScribe transforms private, honest journaling into crystal-clear emotional insights.
                Discover your recurring triggers, tame subconscious overwhelm, and cultivate daily serenity.
              </p>

              {/* CTAs */}
              <div className="mt-9 flex flex-col gap-3.5 sm:flex-row">
                <button
                  onClick={() => navigate("/login")}
                  className="btn-premium btn-large cursor-pointer"
                >
                  Create Your Private Journal <ArrowRight size={18} />
                </button>
                <a
                  href="#how-it-works"
                  className="btn-secondary btn-large cursor-pointer"
                >
                  See How It Works <ChevronRight size={18} />
                </a>
              </div>

              {/* Social proof avatars row */}
              <div className="mt-8 flex items-center gap-4 pt-2">
                <div className="flex -space-x-3 overflow-hidden">
                  {testimonials.map((t) => (
                    <img
                      key={t.name}
                      src={t.image}
                      alt={t.name}
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-[#07090e] object-cover shadow-md"
                    />
                  ))}
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-tr from-mint-400 to-electric-500 text-xs font-bold text-[#04140e] ring-2 ring-[#07090e]">
                    +12k
                  </div>
                </div>
                <div className="text-xs text-ink-300">
                  <div className="flex items-center gap-1.5 font-semibold text-white">
                    <Stars />
                    <span>4.9 / 5.0</span>
                  </div>
                  <span className="text-ink-400">Loved by 12,000+ mindful journalers</span>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="mt-10 grid grid-cols-3 gap-3 border-t border-white/[0.08] pt-8">
                {productStats.map((stat) => (
                  <div key={stat.label} className="premium-stat">
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* INTERACTIVE PRODUCT SHOWCASE */}
            <div className="relative">
              <div className="app-showcase">
                <div className="showcase-topbar">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-rose-500/80 shadow-[0_0_10px_rgba(244,63,94,0.4)]" />
                    <span className="h-3 w-3 rounded-full bg-amber-400/80 shadow-[0_0_10px_rgba(251,191,36,0.4)]" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400/80 shadow-[0_0_10px_rgba(52,211,153,0.4)]" />
                    <span className="ml-2 text-xs font-semibold text-ink-400">MindScribe AI Reflection Studio</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-mint-300">
                    <Sparkles size={11} /> Real-Time Analysis
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
                  {/* Left Column: Mood Tracker + Pulse */}
                  <div className="space-y-4">
                    {/* Interactive weekly mood chart */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4.5 backdrop-blur-md">
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold text-ink-400 uppercase tracking-wider">Weekly Rhythm</span>
                          <p className="text-sm font-semibold text-white">Emotional Trend</p>
                        </div>
                        <span className="rounded-full border border-mint-400/30 bg-mint-400/10 px-2.5 py-1 text-xs font-semibold text-mint-300">
                          {moodDays[activeMoodIndex].mood}
                        </span>
                      </div>

                      {/* Bar graph */}
                      <div className="flex items-end justify-between gap-2 h-28 pt-2">
                        {moodDays.map((item, i) => (
                          <button
                            key={item.day}
                            type="button"
                            onClick={() => setActiveMoodIndex(i)}
                            className="group flex flex-1 flex-col items-center gap-1.5 h-full justify-end cursor-pointer focus:outline-none"
                          >
                            <div className="w-full relative flex items-end justify-center h-full">
                              <span
                                className={`w-full rounded-t-lg transition-all duration-300 ${
                                  activeMoodIndex === i
                                    ? "bg-gradient-to-t from-emerald-500 to-mint-300 shadow-[0_0_15px_rgba(52,211,153,0.5)]"
                                    : "bg-white/[0.12] group-hover:bg-white/[0.22]"
                                }`}
                                style={{ height: item.height }}
                              />
                            </div>
                            <span className={`text-[10px] font-semibold transition ${activeMoodIndex === i ? "text-mint-300" : "text-ink-400"}`}>
                              {item.day}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Wellness Pulse Card */}
                    <div className="rounded-2xl border border-white/10 bg-[#0c101a]/95 p-4.5 shadow-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-mint-300">
                          <HeartPulse size={17} className="animate-pulse" />
                          <span className="text-xs font-bold uppercase tracking-wider">Wellness Pulse</span>
                        </div>
                        <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                          +14% vs last week
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <p className="font-display text-4xl font-bold text-white tracking-tight">8.4</p>
                        <span className="text-xs text-ink-400">/ 10 optimal state</span>
                      </div>
                      <p className="mt-1.5 text-xs text-ink-400 leading-normal">
                        Self-reflection has lowered evening cortisol and improved sleep latency.
                      </p>
                    </div>
                  </div>

                  {/* Right Column: AI Reflection Card */}
                  <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-5 backdrop-blur-xl">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-tr from-mint-400 to-emerald-500 text-[#04140e] shadow-md">
                          <Brain size={18} />
                        </div>
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-mint-300">Cognitive Reflection</p>
                          <h3 className="font-display text-base font-bold text-white">Pre-Meeting Pattern</h3>
                        </div>
                      </div>
                      <span className="rounded-full bg-white/[0.06] border border-white/10 px-2.5 py-1 text-[11px] text-ink-300">
                        Today 9:42 PM
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {timeline.map((item, i) => (
                        <div key={item.time} className="rounded-2xl border border-white/[0.08] bg-ink-950/60 p-3.5 transition hover:border-white/20">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-mint-300">
                              {item.time}
                            </span>
                            <span className="text-[10px] text-ink-500">Step 0{i + 1}</span>
                          </div>
                          <p className="text-xs text-ink-200 leading-relaxed font-normal">
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-ink-400">
                      <span className="flex items-center gap-1.5 text-mint-300">
                        <CheckCircle2 size={13} /> Encrypted AI synthesis
                      </span>
                      <span>2 min read</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="px-5 py-24 md:px-8 relative">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 max-w-2xl">
              <p className="eyebrow">
                <Zap size={14} /> Premium Architecture
              </p>
              <h2 className="section-title">A mental health companion built with nuance and elegance.</h2>
              <p className="mt-3 text-ink-300 text-base">
                Unlike shallow mood trackers that only log happy or sad faces, MindScribe uses rich linguistic models to deeply understand the context behind your thoughts.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {features.map(({ icon, title, tag, desc }) => (
                <article key={title} className="feature-card group cursor-default">
                  <div className="flex items-center justify-between">
                    <span className="feature-icon group-hover:scale-110 transition-transform duration-300">
                      {createElement(icon, { size: 22 })}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-semibold text-mint-300">
                      {tag}
                    </span>
                  </div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section id="how-it-works" className="px-5 py-24 md:px-8 border-y border-white/[0.06] bg-black/30">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] items-center">
            <div>
              <p className="eyebrow">
                <Activity size={14} /> The 3-Step Flow
              </p>
              <h2 className="section-title">From chaotic thoughts to mental calm in minutes.</h2>
              <p className="mt-5 text-ink-300 text-base leading-relaxed">
                Designed for real, busy human beings. Write as little as 2 sentences when you're overwhelmed, or write multiple paragraphs when you want to unpack a heavy memory.
              </p>

              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 text-sm text-ink-200">
                  <CheckCircle2 size={16} className="text-mint-400" />
                  <span>No rigid prompts or tedious questionnaires</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-ink-200">
                  <CheckCircle2 size={16} className="text-mint-400" />
                  <span>Personalized emotional vocabulary & trigger maps</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-ink-200">
                  <CheckCircle2 size={16} className="text-mint-400" />
                  <span>Actionable next steps calibrated to your state</span>
                </div>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Write Naturally",
                  desc: "Type or dictate whatever is on your mind. No formatting rules, no self-censorship, zero judgment.",
                },
                {
                  step: "02",
                  title: "AI Synthesis",
                  desc: "Private NLP detects emotional temperature, hidden cognitive distortions, and subtle recurring themes.",
                },
                {
                  step: "03",
                  title: "Act With Clarity",
                  desc: "Receive one gentle, realistic grounding ritual or mindset reframe crafted specifically for your day.",
                },
              ].map(({ step, title, desc }) => (
                <article key={title} className="process-card">
                  <span>{step}</span>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION (WITH AI GENERATED PHOTOS) */}
        <section id="stories" className="px-5 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="eyebrow">
                  <Smile size={14} /> Real Human Stories
                </p>
                <h2 className="section-title">Loved by people who value emotional clarity.</h2>
                <p className="mt-2 text-ink-400 text-sm">
                  Verified stories from thinkers, creators, and leaders using MindScribe to stay grounded.
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-mint-400/20 bg-mint-400/10 px-4 py-2 text-xs font-semibold text-mint-300">
                <LockKeyhole size={14} />
                <span>100% Private • Anonymized Feedback</span>
              </div>
            </div>

            {/* Testimonials 3-Card Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
              {testimonials.map((t) => (
                <article key={t.name} className="testimonial-card group">
                  <div>
                    {/* Header: Photo + Name + Verified Badge + Stars */}
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        {/* AI Generated Portrait Image */}
                        <div className="testimonial-photo-frame group-hover:scale-105 transition-transform duration-300">
                          <img
                            src={t.image}
                            alt={t.name}
                            loading="lazy"
                          />
                          <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-emerald-500 text-ink-950 shadow-md">
                            <CheckCircle2 size={12} className="text-[#04140e] fill-[#04140e]" />
                          </span>
                        </div>

                        <div>
                          <h3 className="text-base font-bold text-white group-hover:text-mint-300 transition-colors">
                            {t.name}
                          </h3>
                          <p className="text-xs text-ink-400">{t.role}</p>
                        </div>
                      </div>

                      <Stars />
                    </div>

                    {/* Quote mark decoration */}
                    <div className="mb-2 text-mint-400/30">
                      <Quote size={20} />
                    </div>

                    {/* Testimonial Quote */}
                    <blockquote>
                      "{t.text}"
                    </blockquote>
                  </div>

                  {/* Footer tags */}
                  <div className="mt-6 pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-2">
                    <span className="pill">
                      <CheckCircle2 size={12} className="text-mint-400" /> {t.detail}
                    </span>
                    <span className="pill">
                      <MessageCircleHeart size={12} className="text-amber-400" /> {t.mood}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CALL TO ACTION BANNER */}
        <section className="px-5 py-20 md:px-8">
          <div className="cta-panel mx-auto max-w-5xl">
            <div>
              <p className="eyebrow text-mint-300">
                <Sparkles size={14} /> Start Today
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
                Build the mental habit your future self will thank you for.
              </h2>
              <p className="mt-4 max-w-2xl text-ink-200 text-base">
                Begin with one honest entry right now. MindScribe gives you the space and clarity to understand who you are.
              </p>
              <div className="mt-5 flex items-center gap-4 text-xs text-ink-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-mint-400" /> Free to start
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-mint-400" /> No credit card required
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-mint-400" /> AES-256 encrypted
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate("/login")}
              className="btn-premium btn-large whitespace-nowrap cursor-pointer shadow-[0_15px_40px_rgba(52,211,153,0.4)]"
            >
              Start Journaling Free <ArrowRight size={18} />
            </button>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.08] bg-ink-950/80 px-5 py-10 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-ink-400 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-7 w-7 place-items-center rounded-xl bg-mint-400/20 text-mint-300">
              <Moon size={14} />
            </span>
            <span className="font-medium text-ink-300">
              MindScribe © {new Date().getFullYear()}. Private AI Journaling for Modern Mental Wellness.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-ink-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              All systems private & operational
            </span>
            <span className="flex items-center gap-1.5">
              <Clock3 size={13} /> Built for daily reflection
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
