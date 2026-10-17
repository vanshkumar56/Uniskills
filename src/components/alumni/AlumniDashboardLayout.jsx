import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Inbox, UsersRound, CalendarDays, UserRound, BriefcaseBusiness,
  Settings, Search, Bell, ChevronDown, LogOut, Menu, X, GraduationCap
} from "lucide-react";
import { useState } from "react";
import "../../styles/alumni/AlumniDashboard.css";

const navigation = [
  { label: "Overview", path: "/alumni/dashboard", icon: LayoutDashboard },
  { label: "Student connections", path: "/alumni/connections", icon: Inbox, count: "3" },
  { label: "Opportunities", path: "/alumni/opportunities", icon: BriefcaseBusiness },
  { label: "My mentees", path: "/alumni/mentees", icon: UsersRound },
  { label: "Events & sessions", path: "/alumni/events", icon: CalendarDays },
  { label: "Alumni profile", path: "/alumni/profile", icon: UserRound },
  { label: "Settings", path: "/alumni/settings", icon: Settings }
];

export default function AlumniDashboardLayout({ children, title, subtitle, action }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="md-shell">
      {mobileOpen && <button className="md-mobile-backdrop" aria-label="Close menu" onClick={() => setMobileOpen(false)} />}
      <aside className={`md-sidebar ${mobileOpen ? "md-sidebar-open" : ""}`}>
        <div className="md-brand">
          <div className="md-brand-mark"><GraduationCap size={23} /></div>
          <div><strong>UniSkills</strong><span>ALUMNI NETWORK</span></div>
          <button className="md-icon-button md-close-menu" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={19} /></button>
        </div>
        <div className="md-workspace-label">WORKSPACE</div>
        <nav className="md-nav">
          {navigation.map(({ label, path, icon: Icon, count }) => (
            <NavLink key={path} to={path} end={path === "/alumni/dashboard"} onClick={() => setMobileOpen(false)} className={({ isActive }) => `md-nav-link ${isActive ? "active" : ""}`}>
              <Icon size={19} strokeWidth={1.9} />
              <span>{label}</span>
              {count && <b>{count}</b>}
            </NavLink>
          ))}
        </nav>
        <div className="md-sidebar-bottom">
          <div className="md-help-card">
            <div className="md-help-icon"><GraduationCap size={18} /></div>
            <strong>Open doors for students</strong>
            <p>Your experience can help a student find their next opportunity.</p>
            <button onClick={() => navigate("/alumni/mentees")}>Explore your network <span>↗</span></button>
          </div>
          <button className="md-nav-link md-logout" onClick={() => navigate("/login")}><LogOut size={19} /><span>Log out</span></button>
        </div>
      </aside>

      <main className="md-main">
        <header className="md-topbar">
          <button className="md-icon-button md-open-menu" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={21} /></button>
          <div className="md-breadcrumb"><span>Alumni network</span><span className="md-breadcrumb-slash">/</span><strong>{title}</strong></div>
          <div className="md-topbar-right">
            <label className="md-search"><Search size={17} /><input placeholder="Search anything..." aria-label="Search anything" /></label>
            <button className="md-icon-button md-notification" aria-label="Notifications"><Bell size={19} /><i /></button>
            <button className="md-user-menu" onClick={() => navigate("/alumni/profile")}>
              <span className="md-avatar">VK</span>
              <span className="md-user-copy"><strong>Vansh Kumar</strong><small>Alumni</small></span>
              <ChevronDown size={16} />
            </button>
          </div>
        </header>
        <div className="md-page">
          <div className="md-page-heading">
            <div><h1>{title}</h1><p>{subtitle}</p></div>
            {action && <div className="md-heading-action">{action}</div>}
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
