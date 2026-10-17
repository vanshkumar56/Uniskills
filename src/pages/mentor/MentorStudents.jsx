import { useMemo, useState } from "react";
import { Search, MessageCircle, CalendarDays, ArrowUpRight, Send, X, Video, Phone, MoreHorizontal } from "lucide-react";
import MentorDashboardLayout from "../../components/mentor/MentorDashboardLayout";
import "../../styles/mentor/MentorStudents.css";

const initialStudents = [
  { id: 1, initials: "AS", name: "Aarav Sharma", course: "B.Tech · 2nd year", goal: "Frontend development", progress: 68, last: "2 hours ago", next: "Today, 5:30 PM", color: "mint", unread: 2, messages: [{ from: "student", text: "Hey Vansh, I pushed the updated portfolio. Could you review it before our session?" }, { from: "mentor", text: "Absolutely! Share the link here and I'll take a look before we meet." }, { from: "student", text: "Here it is — I also updated the projects section." }] },
  { id: 2, initials: "NM", name: "Neha Mishra", course: "B.Tech · 3rd year", goal: "Portfolio & internships", progress: 82, last: "Yesterday", next: "Tomorrow, 11:00 AM", color: "lilac", unread: 0, messages: [{ from: "student", text: "Thank you for the resume feedback! I have made the changes." }, { from: "mentor", text: "Great progress. Let's review the final version tomorrow." }] },
  { id: 3, initials: "PD", name: "Priya Desai", course: "B.Tech · 3rd year", goal: "Product internship prep", progress: 45, last: "2 days ago", next: "Oct 21, 4:00 PM", color: "peach", unread: 1, messages: [{ from: "student", text: "I finished the first two DSA topics. What should I practice next?" }] },
  { id: 4, initials: "RK", name: "Rohan Kumar", course: "B.Tech · 1st year", goal: "Full-stack project", progress: 30, last: "3 days ago", next: "Oct 23, 6:00 PM", color: "blue", unread: 0, messages: [{ from: "student", text: "I have a project idea ready for our next discussion." }] }
];

export default function MentorStudents() {
  const [students, setStudents] = useState(initialStudents);
  const [selectedId, setSelectedId] = useState(1);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const selected = students.find(s => s.id === selectedId);
  const filtered = useMemo(() => students.filter(s => `${s.name} ${s.goal}`.toLowerCase().includes(search.toLowerCase())), [students, search]);
  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !selected) return;
    setStudents(current => current.map(s => s.id === selectedId ? { ...s, messages: [...s.messages, { from: "mentor", text: message.trim() }], unread: 0, last: "Just now" } : s));
    setMessage("");
  };

  return <MentorDashboardLayout title="My students" subtitle="Keep track of progress, conversations and the next step for each student.">
    <div className="ms-layout">
      <section className="md-card ms-student-panel"><div className="ms-panel-heading"><div><h3>Your students <span>{students.length}</span></h3><p>Students you're currently guiding</p></div></div><label className="ms-search"><Search size={16} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Find a student" /></label><div className="ms-student-list">{filtered.map(s => <button key={s.id} className={`ms-student-item ${selectedId === s.id ? "active" : ""}`} onClick={() => setSelectedId(s.id)}><div className={`md-person-avatar ${s.color}`}>{s.initials}</div><div className="ms-student-item-copy"><strong>{s.name}</strong><span>{s.goal}</span><small>Last active {s.last}</small></div>{s.unread > 0 && <b className="ms-unread">{s.unread}</b>}</button>)}</div><div className="ms-student-panel-footer"><span className="ms-online-dot" /> All times shown in your local timezone</div></section>
      {selected ? <section className="md-card ms-chat-panel"><header className="ms-chat-header"><div className={`md-person-avatar ${selected.color}`}>{selected.initials}</div><div className="ms-chat-person"><strong>{selected.name}</strong><span>{selected.course}</span></div><div className="ms-chat-header-actions"><button className="md-icon-button" title="Schedule session" onClick={() => window.location.assign("/mentor/sessions")}><CalendarDays size={18} /></button><button className="md-icon-button" title="Video call" onClick={() => alert("Video call is a prototype action. Connect a calling provider to enable live calls.")}><Video size={18} /></button><button className="md-icon-button" title="More options"><MoreHorizontal size={19} /></button></div></header>
        <div className="ms-student-context"><div><span>MENTORING GOAL</span><strong>{selected.goal}</strong></div><div><span>PROGRESS</span><strong>{selected.progress}%</strong><div className="ms-progress-track"><i style={{ width: `${selected.progress}%` }} /></div></div><div><span>NEXT SESSION</span><strong>{selected.next}</strong></div></div>
        <div className="ms-chat-date">YOUR CONVERSATION</div><div className="ms-messages">{selected.messages.map((m, i) => <div className={`ms-message ${m.from === "mentor" ? "sent" : "received"}`} key={`${i}-${m.text}`}><p>{m.text}</p><small>{m.from === "mentor" ? "You" : selected.name} · {i === selected.messages.length - 1 ? "Now" : "Earlier"}</small></div>)}</div>
        <form className="ms-compose" onSubmit={sendMessage}><input value={message} onChange={e => setMessage(e.target.value)} placeholder={`Message ${selected.name.split(" ")[0]}...`} aria-label="Message student" /><button type="submit" disabled={!message.trim()} aria-label="Send message"><Send size={17} /></button></form><div className="ms-chat-footnote">Demo chat · messages are stored in this page's local state</div>
      </section> : <section className="md-card ms-empty-chat"><MessageCircle size={25} /><h3>Select a student</h3><p>Choose a student to view their conversation.</p></section>}
    </div>
  </MentorDashboardLayout>;
}
