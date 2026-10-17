import { useNavigate } from "react-router-dom";
import { ArrowUpRight, ArrowRight, CalendarDays, Clock3, UsersRound, Inbox, Star, Video, MessageCircle, CheckCircle2, CircleHelp, TrendingUp } from "lucide-react";
import MentorDashboardLayout from "../../components/mentor/MentorDashboardLayout";
import "../../styles/mentor/MentorOverview.css";

const requests = [
  { initials: "AS", name: "Aarav Sharma", course: "2nd year · Computer Science", topic: "Frontend development roadmap", time: "12 min ago", color: "mint" },
  { initials: "PD", name: "Priya Desai", course: "3rd year · Information Technology", topic: "Preparing for product internships", time: "1 hr ago", color: "peach" },
  { initials: "RK", name: "Rohan Kumar", course: "1st year · Computer Science", topic: "Building my first full-stack project", time: "3 hrs ago", color: "lilac" }
];

const sessions = [
  { initials: "NM", name: "Neha Mishra", topic: "Portfolio review", date: "Today", time: "5:30 PM", type: "Video call" },
  { initials: "AS", name: "Aarav Sharma", topic: "React learning plan", date: "Tomorrow", time: "11:00 AM", type: "Voice call" }
];

export default function MentorOverview() {
  const navigate = useNavigate();
  return (
    <MentorDashboardLayout title="Overview" subtitle="A quick look at your mentoring activity and what needs your attention." action={<button className="md-btn md-btn-primary" onClick={() => navigate("/mentor/requests")}>Review requests <ArrowRight size={16} /></button>}>
      <section className="mo-welcome">
        <div><span className="mo-eyebrow">YOUR IMPACT, AT A GLANCE</span><h2>Hey Vansh, ready to make a difference?</h2><p>You have 4 requests waiting and 2 sessions coming up. Let's make today count.</p><button className="mo-welcome-link" onClick={() => navigate("/mentor/students")}>Go to my students <ArrowUpRight size={16} /></button></div>
        <div className="mo-welcome-art"><div className="mo-art-orbit mo-art-orbit-one" /><div className="mo-art-orbit mo-art-orbit-two" /><div className="mo-art-card"><GraduationCapFallback /><span>Guidance that<br />moves you forward</span><div className="mo-art-dots">•••</div></div><div className="mo-art-spark">✦</div></div>
      </section>

      <section className="mo-stats-grid">
        <div className="mo-stat-card"><div className="mo-stat-top"><span className="mo-stat-icon green"><UsersRound size={19} /></span><span className="mo-stat-trend"><TrendingUp size={13} /> +2 this month</span></div><span className="mo-stat-label">Active students</span><strong>18</strong><small>Students you're currently guiding</small></div>
        <div className="mo-stat-card"><div className="mo-stat-top"><span className="mo-stat-icon orange"><Inbox size={19} /></span><span className="mo-stat-pill">Needs action</span></div><span className="mo-stat-label">Pending requests</span><strong>4</strong><small>Students waiting for your response</small></div>
        <div className="mo-stat-card"><div className="mo-stat-top"><span className="mo-stat-icon blue"><CalendarDays size={19} /></span><span className="mo-stat-trend">This month</span></div><span className="mo-stat-label">Sessions completed</span><strong>26</strong><small>Across 12 different students</small></div>
        <div className="mo-stat-card"><div className="mo-stat-top"><span className="mo-stat-icon purple"><Star size={19} /></span><span className="mo-stat-trend">Great work</span></div><span className="mo-stat-label">Student rating</span><strong>4.9<span className="mo-out-of">/5</span></strong><small>From 21 student reviews</small></div>
      </section>

      <div className="mo-content-grid">
        <section className="md-card mo-requests-card">
          <div className="md-card-heading"><div><h3>New mentorship requests</h3><p>Students looking for your guidance</p></div><button className="md-text-link" onClick={() => navigate("/mentor/requests")}>View all <ArrowRight size={15} /></button></div>
          <div className="mo-request-list">{requests.map((r) => <div className="mo-request-row" key={r.name}><div className={`md-person-avatar ${r.color}`}>{r.initials}</div><div className="mo-request-info"><strong>{r.name}</strong><span>{r.course}</span><p>“{r.topic}”</p><small>{r.time}</small></div><button className="mo-review-btn" onClick={() => navigate("/mentor/requests")}>Review</button></div>)}</div>
          <button className="mo-all-requests" onClick={() => navigate("/mentor/requests")}>See all 4 pending requests <ArrowRight size={16} /></button>
        </section>

        <section className="md-card mo-sessions-card">
          <div className="md-card-heading"><div><h3>Upcoming sessions</h3><p>Your next conversations</p></div><button className="md-icon-button mo-calendar-btn" onClick={() => navigate("/mentor/sessions")} aria-label="View calendar"><CalendarDays size={18} /></button></div>
          <div className="mo-session-list">{sessions.map((s) => <div className="mo-session-row" key={s.name}><div className="mo-date-tile"><strong>{s.date === "Today" ? "18" : "19"}</strong><span>{s.date === "Today" ? "OCT" : "OCT"}</span></div><div className="mo-session-info"><strong>{s.topic}</strong><span>{s.name}</span><small><Clock3 size={13} /> {s.time} · {s.type}</small></div><button className="mo-session-open" onClick={() => navigate("/mentor/sessions")} aria-label={`Open ${s.topic}`}><ArrowUpRight size={17} /></button></div>)}</div>
          <button className="mo-all-requests" onClick={() => navigate("/mentor/sessions")}>Open session calendar <ArrowRight size={16} /></button>
        </section>
      </div>

      <div className="mo-bottom-grid">
        <section className="md-card mo-progress-card"><div className="md-card-heading"><div><h3>Your mentoring this month</h3><p>Small steps, meaningful progress</p></div><span className="mo-month-label">October 2026</span></div><div className="mo-progress-numbers"><div><strong>26</strong><span>of 30 sessions goal</span></div><span className="mo-progress-percent">87%</span></div><div className="mo-progress-track"><div /></div><div className="mo-progress-footer"><span><CheckCircle2 size={15} /> 4 more sessions to hit your goal</span><button className="md-text-link" onClick={() => navigate("/mentor/sessions")}>View sessions <ArrowRight size={14} /></button></div></section>
        <section className="mo-tip-card"><div className="mo-tip-icon"><CircleHelp size={21} /></div><div><span className="mo-eyebrow">MENTOR TIP</span><h3>Make every session count</h3><p>Share a short follow-up note after each session. It helps students turn advice into action.</p><button onClick={() => navigate("/mentor/students")}>Explore your students <ArrowRight size={15} /></button></div></section>
      </div>
    </MentorDashboardLayout>
  );
}

function GraduationCapFallback() {
  return <div className="mo-art-cap"><UsersRound size={28} /></div>;
}
