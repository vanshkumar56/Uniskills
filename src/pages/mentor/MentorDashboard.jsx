
import { useNavigate } from "react-router-dom";
import {
  UsersRound,
  MessageCircle,
  CalendarDays,
  Star,
  ArrowRight,
  Clock3,
  Video,
  CheckCircle2,
  TrendingUp,
  UserRound
} from "lucide-react";
import MentorDashboardLayout from "../../components/mentor/MentorDashboardLayout";
import "../../styles/MentorDashboard.css";
const stats = [
  {
    title: "Active Students",
    value: "12",
    detail: "Students you're guiding",
    icon: UsersRound,
    color: "green"
  },
  {
    title: "Pending Requests",
    value: "5",
    detail: "Waiting for your response",
    icon: MessageCircle,
    color: "orange"
  },
  {
    title: "Upcoming Sessions",
    value: "3",
    detail: "Scheduled conversations",
    icon: CalendarDays,
    color: "blue"
  },
  {
    title: "Average Rating",
    value: "4.9",
    detail: "From student feedback",
    icon: Star,
    color: "purple"
  }
];

const requests = [
  {
    id: 1,
    initials: "AS",
    name: "Aarav Sharma",
    course: "B.Tech · 2nd Year",
    topic: "Frontend Development",
    message: "Wants guidance on building projects and preparing for internships.",
    time: "15 min ago",
    color: "mint"
  },
  {
    id: 2,
    initials: "PD",
    name: "Priya Desai",
    course: "B.Tech · 3rd Year",
    topic: "Career Guidance",
    message: "Looking for advice on resume building and technical interviews.",
    time: "1 hour ago",
    color: "peach"
  },
  {
    id: 3,
    initials: "RK",
    name: "Rohan Kumar",
    course: "B.Tech · 1st Year",
    topic: "Web Development",
    message: "Wants help choosing a learning path and improving programming fundamentals.",
    time: "3 hours ago",
    color: "lilac"
  }
];

const sessions = [
  {
    id: 1,
    initials: "NM",
    name: "Neha Mishra",
    topic: "Resume Review",
    date: "Today",
    time: "5:30 PM",
    color: "lilac"
  },
  {
    id: 2,
    initials: "AS",
    name: "Aarav Sharma",
    topic: "Frontend Project Discussion",
    date: "Tomorrow",
    time: "11:00 AM",
    color: "mint"
  },
  {
    id: 3,
    initials: "PD",
    name: "Priya Desai",
    topic: "Internship Preparation",
    date: "Oct 21",
    time: "4:00 PM",
    color: "peach"
  }
];

function MentorDashboard() {
  const navigate = useNavigate();

  return (
    <MentorDashboardLayout
      title="Overview"
      subtitle="Track your mentorship activity, support students, and manage upcoming sessions."
      action={
        <button
          className="md-btn md-btn-primary"
          onClick={() => navigate("/mentor/requests")}
        >
          View Requests
          <ArrowRight size={16} />
        </button>
      }
    >
      <section className="mo-welcome">
        <div>
          <span className="mo-eyebrow">YOUR MENTORSHIP JOURNEY</span>

          <h2>
            Your experience can make someone's next step easier.
          </h2>

          <p>
            Check your student requests, prepare for upcoming sessions,
            and help learners turn their goals into real progress.
          </p>

          <button
            className="mo-welcome-link"
            onClick={() => navigate("/mentor/students")}
          >
            Meet your students
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="mo-welcome-art">
          <div className="mo-art-orbit mo-art-orbit-one" />
          <div className="mo-art-orbit mo-art-orbit-two" />

          <div className="mo-art-card">
            <div className="mo-art-cap">
              <UsersRound size={28} />
            </div>
            <span>
              Learn together.
              <br />
              Grow together.
            </span>
            <div className="mo-art-dots">•••</div>
          </div>

          <div className="mo-art-spark">✦</div>
        </div>
      </section>

      <section className="mo-stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article className="mo-stat-card" key={stat.title}>
              <div className="mo-stat-top">
                <span className={`mo-stat-icon ${stat.color}`}>
                  <Icon size={19} />
                </span>

                {stat.title === "Pending Requests" && (
                  <span className="mo-stat-pill">Needs attention</span>
                )}

                {stat.title === "Active Students" && (
                  <span className="mo-stat-trend">
                    <TrendingUp size={13} />
                    Active
                  </span>
                )}
              </div>

              <span className="mo-stat-label">{stat.title}</span>
              <strong>{stat.value}</strong>
              <small>{stat.detail}</small>
            </article>
          );
        })}
      </section>

      <div className="mo-content-grid">
        <section className="md-card mo-requests-card">
          <div className="md-card-heading">
            <div>
              <h3>New mentorship requests</h3>
              <p>Students looking for your guidance</p>
            </div>

            <button
              className="md-text-link"
              onClick={() => navigate("/mentor/requests")}
            >
              View all
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="mo-request-list">
            {requests.map((request) => (
              <article className="mo-request-row" key={request.id}>
                <div className={`md-person-avatar ${request.color}`}>
                  {request.initials}
                </div>

                <div className="mo-request-info">
                  <strong>{request.name}</strong>
                  <p>{request.course}</p>
                  <span>{request.topic}</span>
                  <small>{request.time}</small>
                </div>

                <button
                  className="mo-review-btn"
                  onClick={() => navigate("/mentor/requests")}
                >
                  Review
                </button>
              </article>
            ))}
          </div>

          <button
            className="mo-all-requests"
            onClick={() => navigate("/mentor/requests")}
          >
            Manage mentorship requests
            <ArrowRight size={16} />
          </button>
        </section>

        <section className="md-card mo-sessions-card">
          <div className="md-card-heading">
            <div>
              <h3>Upcoming sessions</h3>
              <p>Your next student conversations</p>
            </div>

            <button
              className="md-icon-button"
              onClick={() => navigate("/mentor/sessions")}
              aria-label="View all sessions"
            >
              <CalendarDays size={18} />
            </button>
          </div>

          <div className="mo-session-list">
            {sessions.map((session) => (
              <article className="mo-session-row" key={session.id}>
                <div className="mo-session-date">
                  <CalendarDays size={17} />
                  <span>{session.date}</span>
                </div>

                <div className={`md-person-avatar ${session.color}`}>
                  {session.initials}
                </div>

                <div className="mo-session-info">
                  <strong>{session.name}</strong>
                  <span>{session.topic}</span>
                  <small>
                    <Clock3 size={13} />
                    {session.time}
                  </small>
                </div>

                <button
                  className="mo-session-open"
                  onClick={() => navigate("/mentor/sessions")}
                  aria-label={`View session with ${session.name}`}
                >
                  <ArrowRight size={16} />
                </button>
              </article>
            ))}
          </div>

          <button
            className="mo-all-requests"
            onClick={() => navigate("/mentor/sessions")}
          >
            View session calendar
            <ArrowRight size={16} />
          </button>
        </section>
      </div>

      <div className="mo-bottom-grid">
        <section className="md-card mo-progress-card">
          <div className="md-card-heading">
            <div>
              <h3>Your mentoring impact</h3>
              <p>Progress towards your monthly goal</p>
            </div>

            <span className="mo-month-label">October 2026</span>
          </div>

          <div className="mo-progress-numbers">
            <div>
              <strong>17</strong>
              <span>of 20 students supported</span>
            </div>

            <span className="mo-progress-percent">85%</span>
          </div>

          <div className="mo-progress-track">
            <div style={{ width: "85%" }} />
          </div>

          <div className="mo-progress-footer">
            <span>
              <CheckCircle2 size={15} />
              3 more students to reach your goal
            </span>

            <button
              className="md-text-link"
              onClick={() => navigate("/mentor/students")}
            >
              View students
              <ArrowRight size={14} />
            </button>
          </div>
        </section>

        <section className="mo-tip-card">
          <div className="mo-tip-icon">
            <UserRound size={21} />
          </div>

          <div>
            <span className="mo-eyebrow">MENTOR TIP</span>

            <h3>Small guidance can create big change.</h3>

            <p>
              Give students one clear action to work on after each
              session. It helps them turn advice into progress.
            </p>

            <button onClick={() => navigate("/mentor/students")}>
              Check student progress
              <ArrowRight size={15} />
            </button>
          </div>
        </section>
      </div>
    </MentorDashboardLayout>
  );
}

export default MentorDashboard;
