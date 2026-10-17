
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Code2,
  GraduationCap,
  MessageCircle,
  Search,
  Send,
  SlidersHorizontal,
  Star,
  Users,
  Video,
  X,
} from "lucide-react";
import "../../styles/MentorShip.css";

const MENTORS = [
  {
    id: 1,
    name: "Aarav Mehta",
    role: "Senior Software Engineer",
    company: "Google",
    experience: "6 years",
    rating: 4.9,
    reviews: 128,
    sessions: 94,
    availability: "Available this week",
    format: "Video and chat",
    price: "Free",
    color: "blue",
    skills: ["React", "JavaScript", "Frontend", "System Design"],
    about:
      "I help students become confident frontend engineers through practical projects, portfolio reviews, and interview preparation.",
    featured: true,
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Software Development Engineer",
    company: "Microsoft",
    experience: "5 years",
    rating: 4.9,
    reviews: 96,
    sessions: 76,
    availability: "Available this week",
    format: "Video and chat",
    price: "Free",
    color: "rose",
    skills: ["DSA", "Java", "Problem Solving", "Interviews"],
    about:
      "I guide students through data structures, algorithms, technical interviews, and structured placement preparation.",
    featured: true,
  },
  {
    id: 3,
    name: "Rohan Verma",
    role: "Backend Engineer",
    company: "Amazon",
    experience: "7 years",
    rating: 4.8,
    reviews: 84,
    sessions: 67,
    availability: "Available tomorrow",
    format: "Video and chat",
    price: "Free",
    color: "amber",
    skills: ["Node.js", "Express", "APIs", "Databases"],
    about:
      "I help aspiring backend developers design APIs, understand databases, and build production-minded projects.",
    featured: true,
  },
  {
    id: 4,
    name: "Ananya Gupta",
    role: "Machine Learning Engineer",
    company: "Adobe",
    experience: "4 years",
    rating: 4.8,
    reviews: 72,
    sessions: 51,
    availability: "Available this week",
    format: "Video and chat",
    price: "Free",
    color: "purple",
    skills: ["Python", "Machine Learning", "AI", "Data Science"],
    about:
      "I mentor students exploring machine learning, Python, data science projects, and their first AI portfolio.",
    featured: false,
  },
  {
    id: 5,
    name: "Kunal Singh",
    role: "Full Stack Developer",
    company: "Fintech",
    experience: "5 years",
    rating: 4.7,
    reviews: 63,
    sessions: 48,
    availability: "Available this week",
    format: "Video and chat",
    price: "Free",
    color: "green",
    skills: ["React", "Node.js", "MongoDB", "Full Stack"],
    about:
      "I help developers turn their ideas into complete applications and prepare projects for portfolios and hackathons.",
    featured: false,
  },
  {
    id: 6,
    name: "Neha Kapoor",
    role: "Product Designer",
    company: "Design Studio",
    experience: "6 years",
    rating: 4.9,
    reviews: 88,
    sessions: 70,
    availability: "Available next week",
    format: "Video and chat",
    price: "Free",
    color: "orange",
    skills: ["UI/UX", "Figma", "Product Design", "Portfolio"],
    about:
      "I help students improve their design thinking, build stronger case studies, and create portfolio-ready product experiences.",
    featured: false,
  },
  {
    id: 7,
    name: "Aditya Rao",
    role: "Cybersecurity Analyst",
    company: "Security Consulting",
    experience: "5 years",
    rating: 4.8,
    reviews: 54,
    sessions: 39,
    availability: "Available this week",
    format: "Video and chat",
    price: "Free",
    color: "slate",
    skills: ["Cybersecurity", "Linux", "Networking", "Security"],
    about:
      "I help beginners build strong security fundamentals and understand practical cybersecurity career paths.",
    featured: false,
  },
  {
    id: 8,
    name: "Ishita Jain",
    role: "Technical Program Manager",
    company: "Technology",
    experience: "8 years",
    rating: 4.9,
    reviews: 105,
    sessions: 91,
    availability: "Available this week",
    format: "Video and chat",
    price: "Free",
    color: "teal",
    skills: ["Career Guidance", "Resume Review", "Leadership", "Interviews"],
    about:
      "I help students understand tech career paths, improve resumes, communicate their work, and prepare for professional opportunities.",
    featured: false,
  },
];

const FILTER_SKILLS = [
  "All skills",
  "React",
  "DSA",
  "Node.js",
  "Python",
  "Machine Learning",
  "UI/UX",
  "Career Guidance",
  "Cybersecurity",
  "System Design",
];

const SORT_OPTIONS = [
  { value: "rating", label: "Highest rated" },
  { value: "reviews", label: "Most reviewed" },
  { value: "sessions", label: "Most sessions" },
];

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

function MentorAvatar({ mentor, large = false }) {
  return (
    <div
      className={`mentor-avatar mentor-avatar-${mentor.color}${large ? " mentor-avatar-large" : ""}`}
      aria-label={`${mentor.name} profile placeholder`}
    >
      {getInitials(mentor.name)}
    </div>
  );
}

export default function MentorShip() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("All skills");
  const [sortBy, setSortBy] = useState("rating");
  const [availabilityOnly, setAvailabilityOnly] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState({});
  const [activeTab, setActiveTab] = useState("discover");
  const [showFilters, setShowFilters] = useState(false);
  const [notice, setNotice] = useState("");

  const filteredMentors = useMemo(() => {
    const query = search.trim().toLowerCase();

    return MENTORS.filter((mentor) => {
      const searchable = [
        mentor.name,
        mentor.role,
        mentor.company,
        mentor.about,
        ...mentor.skills,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = !query || searchable.includes(query);
      const matchesSkill =
        selectedSkill === "All skills" ||
        mentor.skills.includes(selectedSkill);

      const matchesAvailability =
        !availabilityOnly ||
        mentor.availability.toLowerCase().includes("available this week") ||
        mentor.availability.toLowerCase().includes("available tomorrow");

      const matchesTab =
        activeTab === "discover" ||
        (activeTab === "messages" && !!sentMessages[mentor.id]);

      return (
        matchesSearch &&
        matchesSkill &&
        matchesAvailability &&
        matchesTab
      );
    }).sort((a, b) => {
      if (sortBy === "reviews") return b.reviews - a.reviews;
      if (sortBy === "sessions") return b.sessions - a.sessions;
      return b.rating - a.rating || b.reviews - a.reviews;
    });
  }, [
    search,
    selectedSkill,
    sortBy,
    availabilityOnly,
    activeTab,
    sentMessages,
  ]);

  const featuredMentors = MENTORS.filter((mentor) => mentor.featured).sort(
    (a, b) => b.rating - a.rating || b.reviews - a.reviews
  );

  const openContact = (mentor) => {
    setSelectedMentor(mentor);
    setMessage("");
    setNotice("");
  };

  const closeContact = () => {
    setSelectedMentor(null);
    setMessage("");
    setNotice("");
  };

  const sendMessage = (event) => {
    event.preventDefault();

    if (!selectedMentor || !message.trim()) return;

    setSentMessages((previous) => ({
      ...previous,
      [selectedMentor.id]: {
        mentor: selectedMentor,
        messages: [
          ...(previous[selectedMentor.id]?.messages || []),
          {
            text: message.trim(),
            sender: "student",
            time: new Date().toISOString(),
          },
        ],
      },
    }));

    setNotice(
      "Message saved in this demo. Connect the messaging backend to deliver it to your mentor."
    );
    setMessage("");
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedSkill("All skills");
    setAvailabilityOnly(false);
    setSortBy("rating");
  };

  return (
    <div className="mentorship-page">
      <header className="mentorship-header">
        <button
          type="button"
          className="mentorship-brand"
          onClick={() => navigate("/student/dashboard")}
          aria-label="Go to student dashboard"
        >
          <span className="mentorship-brand-icon">
            <GraduationCap size={23} />
          </span>
          <span className="mentorship-brand-copy">
            <strong>UniSkills</strong>
            <small>Intercollegiate Network</small>
          </span>
        </button>

        <div className="mentorship-header-actions">
          <button
            type="button"
            className="mentorship-header-link"
            onClick={() => navigate("/student/dashboard")}
          >
            <ArrowLeft size={15} />
            Dashboard
          </button>
          <button
            type="button"
            className="mentorship-messages-button"
            onClick={() => {
              setActiveTab("messages");
              document
                .getElementById("mentorship-directory")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <MessageCircle size={16} />
            My conversations
            {Object.keys(sentMessages).length > 0 && (
              <span>{Object.keys(sentMessages).length}</span>
            )}
          </button>
        </div>
      </header>

      <main className="mentorship-main">
        <section className="mentorship-intro">
          <div className="mentorship-intro-copy">
            <span className="mentorship-eyebrow">
              <Users size={14} />
              LEARN FROM PEOPLE WHO HAVE DONE IT
            </span>
            <h1>
              Your next breakthrough
              <br />
              starts with a <span>mentor.</span>
            </h1>
            <p>
              Connect with experienced professionals and alumni who can
              help you solve problems, grow your skills, and navigate
              your tech career.
            </p>
            <div className="mentorship-intro-actions">
              <button
                type="button"
                className="mentorship-primary-button"
                onClick={() =>
                  document
                    .getElementById("mentorship-directory")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Find your mentor <ArrowRight size={16} />
              </button>
              <span className="mentorship-intro-note">
                <CheckCircle2 size={15} />
                Conversations in one place
              </span>
            </div>
          </div>

          <div className="mentorship-intro-summary">
            <div className="mentorship-summary-heading">
              <span className="mentorship-summary-icon">
                <Users size={20} />
              </span>
              <div>
                <strong>Find the right guidance</strong>
                <span>For your next career step</span>
              </div>
            </div>
            <div className="mentorship-summary-divider" />
            <div className="mentorship-summary-row">
              <span><Code2 size={17} /> Technical skills</span>
              <span>01</span>
            </div>
            <div className="mentorship-summary-row">
              <span><Briefcase size={17} /> Career direction</span>
              <span>02</span>
            </div>
            <div className="mentorship-summary-row">
              <span><Video size={17} /> One-to-one guidance</span>
              <span>03</span>
            </div>
          </div>
        </section>

        <section className="mentorship-benefits">
          <article>
            <span><Star size={18} /></span>
            <div>
              <strong>Compare ratings</strong>
              <p>Explore feedback and mentor experience.</p>
            </div>
          </article>
          <article>
            <span><Code2 size={18} /></span>
            <div>
              <strong>Learn from experience</strong>
              <p>Find mentors who match your skill goals.</p>
            </div>
          </article>
          <article>
            <span><MessageCircle size={18} /></span>
            <div>
              <strong>Connect in-app</strong>
              <p>Start a conversation from a mentor profile.</p>
            </div>
          </article>
        </section>

        <section className="mentorship-featured-section">
          <div className="mentorship-section-heading">
            <div>
              <span className="mentorship-section-eyebrow">
                MENTOR SPOTLIGHT
              </span>
              <h2>Mentors to learn from</h2>
              <p>
                Explore professionals across engineering, design, and
                career development.
              </p>
            </div>
            <button
              type="button"
              className="mentorship-text-button"
              onClick={() =>
                document
                  .getElementById("mentorship-directory")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View all mentors <ArrowRight size={15} />
            </button>
          </div>

          <div className="mentorship-featured-grid">
            {featuredMentors.map((mentor) => (
              <article
                className="mentorship-featured-card"
                key={mentor.id}
              >
                <div className="mentorship-featured-card-top">
                  <MentorAvatar mentor={mentor} large />
                  <span className="mentorship-rating">
                    <Star size={14} fill="currentColor" />
                    {mentor.rating.toFixed(1)}
                  </span>
                </div>

                <div className="mentorship-mentor-identity">
                  <h3>{mentor.name}</h3>
                  <p>{mentor.role}</p>
                  <span className="mentorship-company">
                    <Briefcase size={13} />
                    {mentor.company}
                  </span>
                </div>

                <div className="mentorship-review-line">
                  <span>{mentor.reviews} reviews</span>
                  <span>{mentor.experience} experience</span>
                </div>

                <div className="mentorship-skill-tags">
                  {mentor.skills.slice(0, 3).map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                  {mentor.skills.length > 3 && (
                    <span>+{mentor.skills.length - 3}</span>
                  )}
                </div>

                <button
                  type="button"
                  className="mentorship-card-button"
                  onClick={() => openContact(mentor)}
                >
                  <MessageCircle size={15} />
                  Contact mentor
                  <ArrowRight size={15} />
                </button>
              </article>
            ))}
          </div>
        </section>

        <section
          className="mentorship-directory-section"
          id="mentorship-directory"
        >
          <div className="mentorship-section-heading">
            <div>
              <span className="mentorship-section-eyebrow">
                MENTOR DIRECTORY
              </span>
              <h2>
                {activeTab === "messages"
                  ? "Your conversations"
                  : "Find your match"}
              </h2>
              <p>
                {activeTab === "messages"
                  ? "Mentors you have started a conversation with."
                  : "Search by name, company, skill, or the challenge you want help with."}
              </p>
            </div>
          </div>

          <div className="mentorship-directory-tabs">
            <button
              type="button"
              className={activeTab === "discover" ? "active" : ""}
              onClick={() => setActiveTab("discover")}
            >
              <Users size={15} /> Discover mentors
            </button>
            <button
              type="button"
              className={activeTab === "messages" ? "active" : ""}
              onClick={() => setActiveTab("messages")}
            >
              <MessageCircle size={15} /> My conversations
              {Object.keys(sentMessages).length > 0 && (
                <span className="mentorship-tab-count">
                  {Object.keys(sentMessages).length}
                </span>
              )}
            </button>
          </div>

          <div className="mentorship-search-toolbar">
            <label className="mentorship-search">
              <Search size={18} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search mentors, skills, or companies..."
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </label>

            <button
              type="button"
              className={`mentorship-filter-toggle ${showFilters ? "active" : ""}`}
              onClick={() => setShowFilters((value) => !value)}
            >
              <SlidersHorizontal size={16} />
              Filters
              <ChevronDown size={15} />
            </button>
          </div>

          {showFilters && (
            <div className="mentorship-filter-panel">
              <label>
                <span>Expertise</span>
                <select
                  value={selectedSkill}
                  onChange={(event) => setSelectedSkill(event.target.value)}
                >
                  {FILTER_SKILLS.map((skill) => (
                    <option key={skill} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span>Sort mentors by</span>
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="mentorship-availability-toggle">
                <input
                  type="checkbox"
                  checked={availabilityOnly}
                  onChange={(event) =>
                    setAvailabilityOnly(event.target.checked)
                  }
                />
                <span>Available this week</span>
              </label>

              <button
                type="button"
                className="mentorship-clear-filters"
                onClick={clearFilters}
              >
                Clear filters
              </button>
            </div>
          )}

          <div className="mentorship-result-count">
            <span>
              {filteredMentors.length}{" "}
              {filteredMentors.length === 1 ? "mentor" : "mentors"} found
            </span>
            <span>Ratings shown are sample data for this prototype.</span>
          </div>

          {filteredMentors.length > 0 ? (
            <div className="mentorship-directory-grid">
              {filteredMentors.map((mentor) => {
                const conversation = sentMessages[mentor.id];

                return (
                  <article
                    className="mentorship-directory-card"
                    key={mentor.id}
                  >
                    <div className="mentorship-directory-card-header">
                      <MentorAvatar mentor={mentor} />
                      <div className="mentorship-directory-identity">
                        <h3>{mentor.name}</h3>
                        <p>{mentor.role}</p>
                        <span>{mentor.company}</span>
                      </div>
                      <div className="mentorship-directory-rating">
                        <Star size={14} fill="currentColor" />
                        <strong>{mentor.rating.toFixed(1)}</strong>
                        <small>({mentor.reviews})</small>
                      </div>
                    </div>

                    <div className="mentorship-experience-line">
                      <span><Briefcase size={14} /> {mentor.experience}</span>
                      <span><MessageCircle size={14} /> {mentor.sessions} sessions</span>
                    </div>

                    <p className="mentorship-directory-about">
                      {mentor.about}
                    </p>

                    <div className="mentorship-skill-tags">
                      {mentor.skills.map((skill) => (
                        <button
                          type="button"
                          key={skill}
                          onClick={() => {
                            setSelectedSkill(
                              FILTER_SKILLS.includes(skill)
                                ? skill
                                : "All skills"
                            );
                            setActiveTab("discover");
                          }}
                          title={`Filter by ${skill}`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>

                    <div className="mentorship-availability-line">
                      <span className="mentorship-availability-dot" />
                      {mentor.availability}
                    </div>

                    <div className="mentorship-directory-card-footer">
                      <div className="mentorship-format">
                        <Video size={15} />
                        {mentor.format}
                      </div>
                      <button
                        type="button"
                        className="mentorship-contact-button"
                        onClick={() => openContact(mentor)}
                      >
                        {conversation ? "Open conversation" : "Contact"}
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="mentorship-empty-state">
              <span><Search size={25} /></span>
              <h3>No mentors found</h3>
              <p>
                Try another skill or clear your filters to see more mentors.
              </p>
              <button
                type="button"
                className="mentorship-primary-button"
                onClick={clearFilters}
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        <section className="mentorship-guidance">
          <div className="mentorship-guidance-icon">
            <GraduationCap size={24} />
          </div>
          <div>
            <h2>Not sure who to contact?</h2>
            <p>
              Start with the skill or career goal you want help with.
              Choose someone whose expertise matches your next step.
            </p>
          </div>
          <button
            type="button"
            className="mentorship-secondary-button"
            onClick={() => {
              setActiveTab("discover");
              setSelectedSkill("Career Guidance");
              setShowFilters(true);
              document
                .getElementById("mentorship-directory")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Find career guidance <ArrowRight size={15} />
          </button>
        </section>
      </main>

      <footer className="mentorship-footer">
        <span><ShieldCheckIcon /> UniSkills Mentorship</span>
        <span>Learn from experience. Build your future.</span>
      </footer>

      {selectedMentor && (
        <div
          className="mentorship-modal-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeContact();
          }}
        >
          <section
            className="mentorship-contact-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mentorship-modal-title"
          >
            <div className="mentorship-modal-header">
              <div className="mentorship-modal-mentor">
                <MentorAvatar mentor={selectedMentor} />
                <div>
                  <strong>{selectedMentor.name}</strong>
                  <span>{selectedMentor.role}</span>
                  <span>{selectedMentor.company}</span>
                </div>
              </div>
              <button
                type="button"
                className="mentorship-modal-close"
                onClick={closeContact}
                aria-label="Close contact window"
              >
                <X size={19} />
              </button>
            </div>

            <div className="mentorship-modal-body">
              <span className="mentorship-section-eyebrow">
                START A CONVERSATION
              </span>
              <h2 id="mentorship-modal-title">Connect with your mentor</h2>
              <p>
                Introduce yourself, explain what you're working on, and
                share what guidance you need.
              </p>

              <div className="mentorship-modal-mentor-skills">
                {selectedMentor.skills.slice(0, 4).map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>

              <form onSubmit={sendMessage}>
                <label htmlFor="mentorship-message">Your message</label>
                <textarea
                  id="mentorship-message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder={`Hi ${selectedMentor.name.split(" ")[0]}, I'm a student interested in ${selectedMentor.skills[0]}...`}
                  rows={5}
                  required
                  maxLength={1500}
                />
                <div className="mentorship-message-meta">
                  <span>{message.length}/1500 characters</span>
                  <span><Clock3 size={13} /> Usually best to include a specific goal</span>
                </div>

                {notice && (
                  <div className="mentorship-message-notice" role="status">
                    <CheckCircle2 size={17} />
                    {notice}
                  </div>
                )}

                <button
                  type="submit"
                  className="mentorship-primary-button mentorship-send-button"
                  disabled={!message.trim()}
                >
                  Send message <Send size={15} />
                </button>
              </form>

              {sentMessages[selectedMentor.id]?.messages?.length > 0 && (
                <div className="mentorship-previous-messages">
                  <h3>Your messages in this demo</h3>
                  {sentMessages[selectedMentor.id].messages.map(
                    (item, index) => (
                      <div
                        className="mentorship-sent-message"
                        key={`${item.time}-${index}`}
                      >
                        <span>You</span>
                        <p>{item.text}</p>
                      </div>
                    )
                  )}
                </div>
              )}

              <p className="mentorship-modal-disclaimer">
                Prototype mode: messages are stored in the current page
                  state only. A backend is required for delivery, persistent
                  conversations, and mentor replies.
              </p>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

function ShieldCheckIcon() {
  return <CheckCircle2 size={14} />;
}
