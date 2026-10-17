import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, Check, X, Clock3, ArrowUpRight, MessageCircle, CheckCircle2 } from "lucide-react";
import MentorDashboardLayout from "../../components/mentor/MentorDashboardLayout";
import "../../styles/mentor/MentorRequests.css";

const initialRequests = [
  { id: 1, initials: "AS", name: "Aarav Sharma", course: "B.Tech · 2nd year", college: "GL Bajaj Institute of Technology", topic: "Frontend development roadmap", message: "I've learned HTML, CSS and JavaScript and now I'm confused about what to learn next. I'd love help creating a roadmap and building a strong portfolio.", skills: ["HTML/CSS", "JavaScript", "React"], time: "12 min ago", duration: "4 weeks", color: "mint" },
  { id: 2, initials: "PD", name: "Priya Desai", course: "B.Tech · 3rd year", college: "JSS Academy of Technical Education", topic: "Preparing for product internships", message: "I'm targeting product-based internships and want guidance on projects, resume structure and interview preparation.", skills: ["DSA", "Resume", "Interviews"], time: "1 hour ago", duration: "2 months", color: "peach" },
  { id: 3, initials: "RK", name: "Rohan Kumar", course: "B.Tech · 1st year", college: "ABES Engineering College", topic: "Building my first full-stack project", message: "I know the basics of web development and want to build something real. Could you help me choose a project and understand backend development?", skills: ["Web development", "Node.js"], time: "3 hours ago", duration: "6 weeks", color: "lilac" },
  { id: 4, initials: "MS", name: "Meera Singh", course: "BCA · Final year", college: "Amity University", topic: "Career direction in software development", message: "I am close to graduating and would appreciate a practical plan for improving my skills and applying for entry-level roles.", skills: ["Career planning", "Portfolio"], time: "Yesterday", duration: "1 month", color: "blue" }
];

export default function MentorRequests() {
  const [requests, setRequests] = useState(initialRequests);
  const [filter, setFilter] = useState("Pending");
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");
  const filtered = useMemo(() => requests.filter((r) => (filter === "All" || r.status === filter || (!r.status && filter === "Pending")) && `${r.name} ${r.topic} ${r.skills.join(" ")}`.toLowerCase().includes(search.toLowerCase())), [requests, filter, search]);
  const decide = (id, status) => {
    setRequests((current) => current.map((r) => r.id === id ? { ...r, status } : r));
    setNotice(status === "Accepted" ? "Request accepted. The student is now in your student list." : "Request declined.");
  };

  return <MentorDashboardLayout title="Mentorship requests" subtitle="Review student goals and decide who you'd like to guide.">
    {notice && <div className="mr-notice"><CheckCircle2 size={17} />{notice}<button onClick={() => setNotice("")} aria-label="Dismiss"><X size={16} /></button></div>}
    <section className="md-card mr-toolbar"><div className="mr-tabs">{["Pending", "Accepted", "Declined", "All"].map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}<span>{item === "Pending" ? requests.filter(r => !r.status || r.status === "Pending").length : item === "All" ? requests.length : requests.filter(r => r.status === item).length}</span></button>)}</div><div className="mr-tools"><label className="mr-search"><Search size={17} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search students or topics" /></label><button className="md-btn md-btn-secondary" onClick={() => setSearch("")}><SlidersHorizontal size={16} /> Clear</button></div></section>
    <div className="mr-results-label"><span>{filtered.length} {filtered.length === 1 ? "request" : "requests"}</span><span>Review each student's goals before responding.</span></div>
    <div className="mr-request-list">{filtered.map((r) => <article className="md-card mr-request-card" key={r.id}><div className="mr-card-top"><div className={`md-person-avatar ${r.color}`}>{r.initials}</div><div className="mr-student-heading"><h3>{r.name}</h3><span>{r.course} <i /> {r.college}</span></div><span className={`mr-status ${r.status ? r.status.toLowerCase() : "pending"}`}>{r.status || "Pending"}</span></div><div className="mr-topic-block"><span className="mr-field-label">WANTS HELP WITH</span><h4>{r.topic}</h4><p>{r.message}</p></div><div className="mr-skills">{r.skills.map(skill => <span key={skill}>{skill}</span>)}</div><div className="mr-card-footer"><div className="mr-request-meta"><span><Clock3 size={14} /> {r.time}</span><span>Expected guidance: {r.duration}</span></div>{(!r.status || r.status === "Pending") ? <div className="mr-actions"><button className="md-btn md-btn-secondary mr-decline" onClick={() => decide(r.id, "Declined")}><X size={16} /> Decline</button><button className="md-btn md-btn-primary" onClick={() => decide(r.id, "Accepted")}><Check size={16} /> Accept request</button></div> : <button className="md-btn md-btn-secondary" onClick={() => setNotice(`${r.name}'s request is ${r.status.toLowerCase()}.`)}><ArrowUpRight size={16} /> View status</button>}</div></article>)}
      {!filtered.length && <div className="md-card mr-empty"><div><MessageCircle size={24} /></div><h3>No requests found</h3><p>Try a different filter or search term.</p><button className="md-btn md-btn-secondary" onClick={() => { setFilter("All"); setSearch(""); }}>Show all requests</button></div>}
    </div>
  </MentorDashboardLayout>;
}
