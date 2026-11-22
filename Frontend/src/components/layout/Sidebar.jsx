import { createElement } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LogOut, Moon, PenLine, Sparkles } from "lucide-react";
import { navItems } from "./dashboardNav";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <aside
      className="fixed left-0 top-0 z-40 hidden h-full w-64 flex-col lg:flex"
      style={{
        background: "linear-gradient(180deg, #0a0d15 0%, #07090e 100%)",
        borderRight: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      {/* Brand Header */}
      <div className="px-6 py-6 flex items-center justify-between border-b border-white/[0.06]">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 text-left cursor-pointer focus:outline-none"
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/20 shadow-[0_4px_16px_rgba(52,211,153,0.3)]"
            style={{ background: "linear-gradient(135deg, #34d399 0%, #059669 100%)" }}
          >
            <Moon size={18} className="text-[#04140e] fill-[#04140e]" />
          </div>
          <div>
            <span className="font-display text-lg font-bold text-white tracking-tight">
              Mind<span className="text-gradient-luxe">Scribe</span>
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-mint-300">
              AI Wellness
            </span>
          </div>
        </button>
      </div>

      {/* New Entry Action Button */}
      <div className="px-4 pt-5 pb-2">
        <button
          onClick={() => navigate("/journals/new")}
          className="w-full btn-premium py-2.5 px-4 text-xs font-bold rounded-xl shadow-[0_8px_24px_rgba(52,211,153,0.25)] flex items-center justify-center gap-2 cursor-pointer"
        >
          <PenLine size={15} />
          <span>New Journal Entry</span>
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-ink-500">
          Main Navigation
        </div>
        {navItems.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? "text-mint-300 bg-mint-400/15 border border-mint-400/25 shadow-[0_0_15px_rgba(52,211,153,0.12)]"
                  : "text-ink-400 hover:text-white hover:bg-white/[0.04]"
              }`
            }
          >
            {createElement(icon, { size: 17, className: "shrink-0" })}
            <span className="truncate">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Footer Profile */}
      <div className="p-3 border-t border-white/[0.06]">
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-white/10 transition-all">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-[#04140e] flex-shrink-0 shadow-sm border border-white/20"
            style={{ background: "linear-gradient(135deg, #6ee7b7, #38bdf8)" }}
          >
            {(user?.name || user?.email || "U")[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white truncate">{user?.name || "Mindful User"}</p>
            <p className="text-[11px] text-ink-400 truncate">{user?.email}</p>
          </div>
          <button
            onClick={logout}
            title="Sign out"
            className="text-ink-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-all cursor-pointer"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}
