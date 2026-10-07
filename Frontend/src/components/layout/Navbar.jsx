import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Search, Bell, ChevronDown, LogOut, Settings, Moon, Sparkles } from "lucide-react";

export default function Navbar({ title = "Dashboard" }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  return (
    <header
      className="h-16 flex items-center px-4 sm:px-6 lg:px-8 gap-3 sm:gap-4 sticky top-0 z-30"
      style={{
        background: "rgba(7, 9, 14, 0.75)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      {/* Page Title & Mobile Brand */}
      <div className="flex min-w-0 items-center gap-3 mr-auto">
        <button
          onClick={() => navigate("/")}
          className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl bg-gradient-to-tr from-mint-400 to-emerald-500 lg:hidden shadow-sm"
        >
          <Moon size={16} className="text-[#04140e] fill-[#04140e]" />
        </button>

        <div className="min-w-0">
          <p className="hidden text-[10px] font-bold uppercase tracking-wider text-mint-300 sm:block lg:hidden">
            MindScribe
          </p>
          <h1 className="truncate font-display text-lg sm:text-xl font-bold text-white tracking-tight">
            {title}
          </h1>
        </div>
      </div>

      {/* Global Quick Search */}
      <div className="relative hidden md:block">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-500" />
        <input
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder="Search thoughts, tags..."
          className="input-dark pl-9 pr-9 py-2 rounded-xl text-xs w-60 bg-white/[0.04] focus:bg-white/[0.07]"
        />
        <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-ink-500 bg-white/[0.06] px-1.5 py-0.5 rounded border border-white/[0.08]">
          ⌘K
        </kbd>
      </div>

      {/* Notification Bell */}
      <button
        className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl btn-ghost text-ink-400 hover:text-white"
        aria-label="Notifications"
      >
        <Bell size={16} />
        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
      </button>

      {/* User Profile Button */}
      <div className="relative">
        <button
          onClick={() => setProfileOpen((p) => !p)}
          className="flex items-center gap-2.5 rounded-xl px-2.5 py-1.5 btn-ghost text-ink-300 hover:text-white border border-transparent hover:border-white/10"
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-[#04140e] shadow-sm"
            style={{ background: "linear-gradient(135deg, #6ee7b7, #38bdf8)" }}
          >
            {(user?.name || user?.email || "U")[0].toUpperCase()}
          </div>
          <span className="text-xs font-semibold text-ink-200 hidden md:block">
            {user?.name?.split(" ")[0] || "Account"}
          </span>
          <ChevronDown
            size={13}
            className={`text-ink-500 transition-transform ${profileOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown */}
        {profileOpen && (
          <div
            className="absolute right-0 top-full mt-2 w-52 rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-50 backdrop-blur-2xl"
            style={{ background: "rgba(15, 18, 27, 0.96)" }}
          >
            <div className="px-4 py-3 border-b border-white/[0.08]">
              <p className="text-xs font-bold text-white truncate">{user?.name || "Mindful User"}</p>
              <p className="text-[11px] text-ink-400 truncate">{user?.email}</p>
            </div>

            <div className="p-1.5 space-y-0.5">
              <button
                onClick={() => {
                  navigate("/settings");
                  setProfileOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-ink-300 hover:text-white hover:bg-white/[0.06] transition-colors text-left"
              >
                <Settings size={14} className="text-mint-300" /> Settings
              </button>
              <button
                onClick={() => {
                  logout();
                  setProfileOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors text-left"
              >
                <LogOut size={14} /> Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
