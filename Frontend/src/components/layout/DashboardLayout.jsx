import { createElement } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { PenLine } from "lucide-react";
import Sidebar from "./Sidebar";
import { navItems } from "./dashboardNav";
import Navbar from "./Navbar";

function MobileBottomNav() {
  const navigate = useNavigate();
  const mobileNavItems = navItems.filter(({ to }) => to !== "/settings");

  return (
    <nav className="mobile-bottom-nav lg:hidden" aria-label="Primary mobile navigation">
      <div className="mobile-bottom-nav-inner">
        {mobileNavItems.slice(0, 2).map(({ to, icon, label, shortLabel }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `mobile-nav-link ${isActive ? "mobile-nav-link-active" : ""}`
            }
          >
            {createElement(icon, { size: 18 })}
            <span>{shortLabel || label}</span>
          </NavLink>
        ))}

        <button
          type="button"
          onClick={() => navigate("/journals/new")}
          className="mobile-nav-action"
          aria-label="Create new journal entry"
        >
          <PenLine size={20} />
        </button>

        {mobileNavItems.slice(2).map(({ to, icon, label, shortLabel }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `mobile-nav-link ${isActive ? "mobile-nav-link-active" : ""}`
            }
          >
            {createElement(icon, { size: 18 })}
            <span>{shortLabel || label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default function DashboardLayout({ children, title }) {
  return (
    <div className="flex h-dvh overflow-hidden bg-mesh">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden lg:ml-64">
        <Navbar title={title} />
        <main className="dashboard-main flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
