import { useMemo, useState } from "react";
import { CalendarDays, Clock3, Video, Phone, MapPin, ChevronLeft, ChevronRight, Plus, X, CheckCircle2, ExternalLink } from "lucide-react";
import MentorDashboardLayout from "../../components/mentor/MentorDashboardLayout";
import "../../styles/mentor/MentorSessions.css";

const initialSessions = [
  { id: 1, day: 18, month: "OCT", date: "Today", time: "5:30 PM", end: "6:00 PM", student: "Aarav Sharma", initials: "AS", topic: "Portfolio review", type: "Video call", status: "Confirmed", color: "mint" },
  { id: 2, day: 19, month: "OCT", date: "Tomorrow", time: "11:00 AM", end: "11:30 AM", student: "Neha Mishra", initials: "NM", topic: "Resume & internship plan", type: "Voice call", status: "Confirmed", color: "lilac" },
  { id: 3, day: 21, month: "OCT", date: "Wed, Oct 21", time: "4:00 PM", end: "4:45 PM", student: "Priya Desai", initials: "PD", topic: "Mock interview practice", type: "Video call", status: "Confirmed", color: "peach" },
  { id: 4, day: 23, month: "OCT", date: "Fri, Oct 23", time: "6:00 PM", end: "6:30 PM", student: "Rohan Kumar", initials: "RK", topic: "Full-stack project planning", type: "Voice call", status: "Confirmed", color: "blue" }
];

export default function MentorSessions() {
  const [sessions, setSessions] = useState(initialSessions);
  const [filter, setFilter] = useState("Upcoming");
  const [showForm, setShowForm] = useState(false);
  const [notice, setNotice] = useState("");
  const [form, setForm] = useState({ student: "Aarav Sharma", topic: "", date: "2026-10-24", time: "17:00", type: "Video call" });
  const filtered = useMemo(() => sessions.filter(s => filter === "All" || (filter === "Upcoming" && s.status === "Confirmed") || (filter === "Completed" && s.status === "Completed")), [sessions, filter]);
  const createSession = (e) => {
    e.preventDefault();
    const dateObj = new Date(`${form.date}T${form.time}:00`);
    const session = { id: Date.now(), day: dateObj.getDate(), month: dateObj.toLocaleString("en", { month: "short" }).toUpperCase(), date: dateObj.toLocaleDateString("en", { weekday: "short", month: "short", day: "numeric" }), time: dateObj.toLocaleTimeString("en", { hour: "numeric", minute: "2-digit" }), end: "", student: form.student, initials: form.student.split(" ").map(n => n[0]).join(""), topic: form.topic, type: form.type, status: "Confirmed", color: "mint" };
    setSessions(current => [...current, session].sort((a, b) => a.day - b.day));
    setShowForm(false);
    setNotice("Session added to your schedule.");
    setForm({ student: "Aarav Sharma", topic: "", date: "2026-10-24", time: "17:00", type: "Video call" });
  };
  const complete = (id) => { setSessions(current => current.map(s => s.id === id ? { ...s, status: "Completed" } : s)); setNotice("Session marked as completed."); };

  return <MentorDashboardLayout title="Sessions" subtitle="Plan your conversations, manage upcoming calls and track completed sessions." action={<button className="md-btn md-btn-primary" onClick={() => setShowForm(true)}><Plus size={17} /> Schedule session</button>}>
    {notice && <div className="mr-notice"><CheckCircle2 size={17} />{notice}<button onClick={() => setNotice("")} aria-label="Dismiss"><X size={16} /></button></div>}
    <section className="mses-summary-grid"><div className="md-card mses-summary"><span className="mses-summary-icon"><CalendarDays size={19} /></span><div><small>Scheduled</small><strong>{sessions.filter(s => s.status === "Confirmed").length}</strong><span>Upcoming sessions</span></div></div><div className="md-card mses-summary"><span className="mses-summary-icon purple"><Clock3 size={19} /></span><div><small>Time planned</small><strong>{sessions.filter(s => s.status === "Confirmed").length * 30} min</strong><span>Across upcoming sessions</span></div></div><div className="md-card mses-summary"><span className="mses-summary-icon blue"><CheckCircle2 size={19} /></span><div><small>Completed</small><strong>{sessions.filter(s => s.status === "Completed").length + 26}</strong><span>Sessions this month</span></div></div></section>
    <section className="md-card mses-calendar-strip"><div className="mses-calendar-title"><div><h3>October 2026</h3><p>Your schedule at a glance</p></div><div className="mses-calendar-arrows"><button className="md-icon-button" aria-label="Previous month"><ChevronLeft size={18} /></button><button className="md-icon-button" aria-label="Next month"><ChevronRight size={18} /></button></div></div><div className="mses-weekdays">{["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map(d => <span key={d}>{d}</span>)}</div><div className="mses-days">{Array.from({ length: 31 }, (_, i) => i + 1).map(day => <button key={day} className={`${[18, 19, 21, 23].includes(day) ? "has-session" : ""} ${day === 18 ? "today" : ""}`} onClick={() => { const found = sessions.filter(s => s.day === day); setNotice(found.length ? `${found.length} session(s) scheduled for ${day} October.` : `No sessions scheduled for ${day} October.`); }}>{day}{[18, 19, 21, 23].includes(day) && <i />}</button>)}</div></section>
    <section className="md-card mses-list-card"><div className="md-card-heading"><div><h3>Session schedule</h3><p>Know what's next and be ready for every conversation</p></div><div className="mses-tabs">{["Upcoming", "Completed", "All"].map(t => <button key={t} className={filter === t ? "active" : ""} onClick={() => setFilter(t)}>{t}</button>)}</div></div>
      <div className="mses-list">{filtered.map(s => <article className="mses-session-row" key={s.id}><div className="mses-date-tile"><span>{s.month}</span><strong>{s.day}</strong></div><div className={`md-person-avatar ${s.color}`}>{s.initials}</div><div className="mses-session-main"><strong>{s.topic}</strong><span>{s.student}</span><small><Clock3 size={13} /> {s.date} · {s.time}{s.end ? ` – ${s.end}` : ""}</small></div><span className={`mses-type ${s.type === "Video call" ? "video" : "voice"}`}>{s.type === "Video call" ? <Video size={14} /> : <Phone size={14} />}{s.type}</span><div className="mses-session-actions">{s.status === "Completed" ? <span className="mses-completed"><CheckCircle2 size={15} /> Completed</span> : <><button className="md-btn md-btn-secondary" onClick={() => complete(s.id)}>Mark complete</button><button className="md-btn md-btn-primary" onClick={() => setNotice(`${s.type} for ${s.student} is a prototype. Connect a calling provider to enable live calls.`)}>{s.type === "Video call" ? <Video size={15} /> : <Phone size={15} />} Join</button></>}</div></article>)}
      {!filtered.length && <div className="mses-empty"><CalendarDays size={24} /><p>No sessions in this view yet.</p></div>}</div>
    </section>
    {showForm && <div className="md-modal-backdrop" onClick={() => setShowForm(false)}><form className="md-modal mses-modal" onSubmit={createSession} onClick={e => e.stopPropagation()}><div className="md-modal-header"><div><h3>Schedule a session</h3><p>Set up a conversation with one of your students.</p></div><button type="button" className="md-icon-button" onClick={() => setShowForm(false)} aria-label="Close"><X size={19} /></button></div><label>Student<select value={form.student} onChange={e => setForm({ ...form, student: e.target.value })}><option>Aarav Sharma</option><option>Neha Mishra</option><option>Priya Desai</option><option>Rohan Kumar</option></select></label><label>Session topic<input required value={form.topic} onChange={e => setForm({ ...form, topic: e.target.value })} placeholder="e.g. Portfolio feedback" /></label><div className="mses-form-row"><label>Date<input required type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} /></label><label>Time<input required type="time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} /></label></div><label>Call format<select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}><option>Video call</option><option>Voice call</option><option>In-person</option></select></label><button className="md-btn md-btn-primary md-btn-full" type="submit"><CalendarDays size={16} /> Add to schedule</button></form></div>}
  </MentorDashboardLayout>;
}
