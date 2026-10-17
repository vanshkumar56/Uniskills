
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  BookOpen,
  Trophy,
  Users,
  Search,
  Bell,
  Bookmark,
  BookmarkCheck,
  ArrowUpRight,
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  Briefcase,
  Code2,
  GraduationCap,
  Sparkles,
  Flame,
  ChevronDown,
  SlidersHorizontal,
  X,
  Compass,
  Building2,
  CircleDollarSign,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Handshake,
  ExternalLink,
} from "lucide-react";
import "../../styles/StudentDashboard.css";

const opportunities = [
  {
    id: 1,
    title: "Software Engineering Internship",
    company: "Google",
    logo: "https://cdn.simpleicons.org/google/4285F4",
    initials: "G",
    type: "Internship",
    mode: "Hybrid",
    location: "Bengaluru, India",
    reward: "Paid internship",
    deadline: "Nov 12, 2026",
    description:
      "Work on real-world engineering challenges, collaborate with experienced developers, and build products used by people around the world.",
    tags: ["Software Development", "DSA"],
    category: "Internships",
    url: "https://www.google.com/about/careers/applications/",
  },
  {
    id: 2,
    title: "Smart India Hackathon",
    company: "Government of India",
    logo: "",
    initials: "SIH",
    type: "Hackathon",
    mode: "Team-based",
    location: "Pan India",
    reward: "Prizes & recognition",
    deadline: "Nov 20, 2026",
    description:
      "Collaborate with students from different disciplines and develop innovative solutions to real-world problem statements.",
    tags: ["Innovation", "Teamwork"],
    category: "Hackathons",
    url: "https://www.sih.gov.in/",
  },
  {
    id: 3,
    title: "Microsoft Student Opportunities",
    company: "Microsoft",
    logo: "https://cdn.simpleicons.org/microsoft/5E5E5E",
    initials: "M",
    type: "Internship",
    mode: "Multiple locations",
    location: "India",
    reward: "Career experience",
    deadline: "Nov 25, 2026",
    description:
      "Explore student programs, technical internships, and opportunities to develop your skills with Microsoft's teams.",
    tags: ["Technology", "Cloud"],
    category: "Internships",
    url: "https://careers.microsoft.com/",
  },
  {
    id: 4,
    title: "GitHub Campus Program",
    company: "GitHub",
    logo: "https://cdn.simpleicons.org/github/181717",
    initials: "GH",
    type: "Student Program",
    mode: "Online",
    location: "Remote",
    reward: "Community & learning",
    deadline: "Dec 01, 2026",
    description:
      "Grow your developer community, explore GitHub tools, and connect with students who love building software.",
    tags: ["Git", "Open Source"],
    category: "Fellowships",
    url: "https://education.github.com/",
  },
  {
    id: 5,
    title: "Adobe Creative Campus",
    company: "Adobe",
    logo: "https://cdn.simpleicons.org/adobe/FF0000",
    initials: "A",
    type: "Student Program",
    mode: "Online",
    location: "Remote",
    reward: "Creative learning",
    deadline: "Dec 05, 2026",
    description:
      "Discover creative technology resources, explore digital design workflows, and build projects that showcase your creativity.",
    tags: ["Design", "Creativity"],
    category: "Fellowships",
    url: "https://www.adobe.com/creativecloud.html",
  },
  {
    id: 6,
    title: "Amazon Software Development Internship",
    company: "Amazon",
    logo: "https://cdn.simpleicons.org/amazon/FF9900",
    initials: "a",
    type: "Internship",
    mode: "Multiple locations",
    location: "India",
    reward: "Paid internship",
    deadline: "Dec 10, 2026",
    description:
      "Explore software engineering roles, work on scalable systems, and learn how engineering teams solve customer problems.",
    tags: ["Java", "Problem Solving"],
    category: "Internships",
    url: "https://www.amazon.jobs/",
  },
  {
    id: 7,
    title: "MLH Global Hack Week",
    company: "Major League Hacking",
    logo: "https://cdn.simpleicons.org/mlh/000000",
    initials: "MLH",
    type: "Hackathon",
    mode: "Online",
    location: "Remote",
    reward: "Projects & prizes",
    deadline: "Dec 12, 2026",
    description:
      "Join a developer community, learn new technologies, build projects, and collaborate with hackers worldwide.",
    tags: ["Web Development", "AI"],
    category: "Hackathons",
    url: "https://ghw.mlh.io/",
  },
  {
    id: 8,
    title: "HackerRank Coding Challenge",
    company: "HackerRank",
    logo: "https://cdn.simpleicons.org/hackerrank/00EA64",
    initials: "HR",
    type: "Coding Contest",
    mode: "Online",
    location: "Remote",
    reward: "Rankings & recognition",
    deadline: "Dec 15, 2026",
    description:
      "Test your programming fundamentals through coding challenges and build confidence solving algorithmic problems.",
    tags: ["DSA", "Algorithms"],
    category: "Competitions",
    url: "https://www.hackerrank.com/",
  },
  {
    id: 9,
    title: "NVIDIA Student Programs",
    company: "NVIDIA",
    logo: "https://cdn.simpleicons.org/nvidia/76B900",
    initials: "N",
    type: "Internship",
    mode: "Multiple locations",
    location: "India & global",
    reward: "Career experience",
    deadline: "Dec 18, 2026",
    description:
      "Explore opportunities in computing, graphics, artificial intelligence, and high-performance software engineering.",
    tags: ["AI", "Computing"],
    category: "Internships",
    url: "https://www.nvidia.com/en-us/about-nvidia/careers/",
  },
  {
    id: 10,
    title: "Devfolio Build Challenge",
    company: "Devfolio",
    logo: "",
    initials: "D",
    type: "Hackathon",
    mode: "Online",
    location: "Remote",
    reward: "Prizes & exposure",
    deadline: "Dec 20, 2026",
    description:
      "Turn an idea into a working prototype, collaborate with builders, and demonstrate your skills through a project.",
    tags: ["Prototyping", "Web3"],
    category: "Hackathons",
    url: "https://devfolio.co/",
  },
  {
    id: 11,
    title: "Student Founder Fellowship",
    company: "Startup India",
    logo: "",
    initials: "SI",
    type: "Fellowship",
    mode: "Hybrid",
    location: "India",
    reward: "Mentorship & networking",
    deadline: "Dec 22, 2026",
    description:
      "Explore entrepreneurship, validate ideas, and learn the fundamentals of turning an early concept into a product.",
    tags: ["Startups", "Product"],
    category: "Fellowships",
    url: "https://www.startupindia.gov.in/",
  },
  {
    id: 12,
    title: "Career Guidance & Mentorship",
    company: "UniSkills Network",
    logo: "",
    initials: "U",
    type: "Mentorship",
    mode: "Online",
    location: "Remote",
    reward: "Expert guidance",
    deadline: "Rolling applications",
    description:
      "Connect with experienced professionals and alumni for career direction, portfolio feedback, and practical guidance.",
    tags: ["Career Growth", "Portfolio"],
    category: "Mentorship",
    url: "",
  },
];

const categories = [
  "All",
  "Internships",
  "Hackathons",
  "Competitions",
  "Fellowships",
  "Mentorship",
];

const navItems = [
  { label: "Discover", icon: Home, route: "/student/dashboard" },
  { label: "Learning", icon: BookOpen, route: "/student/learning" },
  { label: "Compete", icon: Trophy, route: "/student/competitions" },
  { label: "Mentorship", icon: Handshake, route: "/student/mentorship" },
];

function CompanyLogo({ opportunity }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div
      className={`student-dashboard-company-logo ${
        imageFailed || !opportunity.logo ? opportunity.color || "green" : ""
      }`}
    >
      {opportunity.logo && !imageFailed ? (
        <img
          src={opportunity.logo}
          alt={`${opportunity.company} logo`}
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span>{opportunity.initials}</span>
      )}
    </div>
  );
}

function StudentDashboard() {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [savedIds, setSavedIds] = useState([]);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [activeNav, setActiveNav] = useState("Discover");
  const [sortBy, setSortBy] = useState("recommended");
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);

  const filteredOpportunities = useMemo(() => {
    let result = opportunities.filter((opportunity) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        !query ||
        [
          opportunity.title,
          opportunity.company,
          opportunity.type,
          opportunity.description,
          opportunity.location,
          ...opportunity.tags,
        ].some((value) => value.toLowerCase().includes(query));

      const matchesCategory =
        activeCategory === "All" ||
        opportunity.category === activeCategory;

      const matchesSaved =
        !showSavedOnly || savedIds.includes(opportunity.id);

      return matchesSearch && matchesCategory && matchesSaved;
    });

    if (sortBy === "deadline") {
      result = [...result].sort((a, b) => {
        const aDate = Date.parse(a.deadline);
        const bDate = Date.parse(b.deadline);

        if (Number.isNaN(aDate)) return 1;
        if (Number.isNaN(bDate)) return -1;

        return aDate - bDate;
      });
    }

    return result;
  }, [search, activeCategory, showSavedOnly, savedIds, sortBy]);

  const toggleSaved = (id) => {
    setSavedIds((current) =>
      current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id]
    );
  };

  const goToNav = (item) => {
    setActiveNav(item.label);

    if (item.route !== "/student/dashboard") {
      navigate(item.route);
    }
  };

  const resetFilters = () => {
    setSearch("");
    setActiveCategory("All");
    setShowSavedOnly(false);
    setSortBy("recommended");
  };

  return (
    <main className="student-dashboard">
      <aside className="student-dashboard-sidebar">
        <button
          type="button"
          className="student-dashboard-brand"
          onClick={() => navigate("/student/dashboard")}
        >
          <span className="student-dashboard-brand-icon">
            <GraduationCap size={24} />
          </span>

          <span>
            <strong>UniSkills</strong>
            <small>Intercollegiate Network</small>
          </span>
        </button>

        <div className="student-dashboard-sidebar-label">
          WORKSPACE
        </div>

        <nav className="student-dashboard-side-nav">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                type="button"
                className={`student-dashboard-nav-item ${
                  activeNav === item.label ? "active" : ""
                }`}
                onClick={() => goToNav(item)}
              >
                <Icon size={19} />
                <span>{item.label}</span>

                {activeNav === item.label && (
                  <span className="student-dashboard-nav-dot" />
                )}
              </button>
            );
          })}

          <button
            type="button"
            className={`student-dashboard-nav-item ${
              showSavedOnly ? "active" : ""
            }`}
            onClick={() => {
              setShowSavedOnly((current) => !current);
              setActiveNav("Saved");
              setActiveCategory("All");
            }}
          >
            <Bookmark size={19} />
            <span>Saved opportunities</span>

            {savedIds.length > 0 && (
              <span className="student-dashboard-count">
                {savedIds.length}
              </span>
            )}
          </button>
        </nav>

        <div className="student-dashboard-sidebar-spacer" />

        <div className="student-dashboard-sidebar-promo">
          <span className="student-dashboard-promo-icon">
            <Sparkles size={19} />
          </span>

          <strong>Your next big thing starts here.</strong>

          <p>
            Keep exploring. Every opportunity is a chance to grow.
          </p>

          <button
            type="button"
            onClick={() => navigate("/student/step-3")}
          >
            Update skill profile
            <ArrowUpRight size={14} />
          </button>
        </div>

        <button
          type="button"
          className="student-dashboard-profile"
          onClick={() => navigate("/student/profile")}
        >
          <span className="student-dashboard-avatar">S</span>

          <span className="student-dashboard-profile-copy">
            <strong>Student</strong>
            <small>Student account</small>
          </span>
        </button>
      </aside>

      <section className="student-dashboard-main">
        <header className="student-dashboard-topbar">
          <div className="student-dashboard-breadcrumb">
            <span>Workspace</span>
            <span>/</span>
            <strong>Discover opportunities</strong>
          </div>

          <div className="student-dashboard-top-actions">
            <span className="student-dashboard-status">
              <span />
              Student workspace
            </span>

            <button
              type="button"
              className="student-dashboard-notification"
              aria-label="Notifications"
              aria-expanded={showNotifications}
              onClick={() => setShowNotifications((current) => !current)}
            >
              <Bell size={19} />
              {savedIds.length > 0 && <span />}
            </button>
          </div>

          {showNotifications && (
            <div className="student-dashboard-notification-panel">
              <strong>Notifications</strong>
              <p>
                {savedIds.length > 0
                  ? `You have saved ${savedIds.length} ${
                      savedIds.length === 1 ? "opportunity" : "opportunities"
                    }.`
                  : "Save opportunities to keep your shortlist handy."}
              </p>
              <button
                type="button"
                onClick={() => {
                  setShowNotifications(false);
                  setShowSavedOnly(true);
                  setActiveNav("Saved");
                  setActiveCategory("All");
                }}
              >
                View saved opportunities
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </header>

        <div className="student-dashboard-content">
          <section className="student-dashboard-welcome">
            <div className="student-dashboard-welcome-copy">
              <div className="student-dashboard-welcome-eyebrow">
                <Sparkles size={14} />
                YOUR CAREER, YOUR RULES
              </div>

              <h1>
                Find your next
                <br />
                <span>big opportunity.</span>
              </h1>

              <p>
                Internships, hackathons, competitions and experiences that
                help turn your skills into something extraordinary.
              </p>

              <div className="student-dashboard-welcome-actions">
                <button
                  type="button"
                  onClick={() => {
                    resetFilters();
                    document
                      .getElementById("student-opportunity-list")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Explore opportunities
                  <ArrowRight size={16} />
                </button>

                <button
                  type="button"
                  className="student-dashboard-secondary-action"
                  onClick={() => navigate("/student/step-4")}
                >
                  <Code2 size={16} />
                  Update my skills
                </button>
              </div>
            </div>
          </section>

          <section className="student-dashboard-stats">
            <article>
              <span className="student-dashboard-stat-icon green">
                <Compass size={19} />
              </span>
              <div>
                <strong>Explore</strong>
                <small>Discover new paths</small>
              </div>
            </article>

            <article>
              <span className="student-dashboard-stat-icon orange">
                <Trophy size={19} />
              </span>
              <div>
                <strong>Compete</strong>
                <small>Show what you can do</small>
              </div>
            </article>

            <article>
              <span className="student-dashboard-stat-icon blue">
                <Briefcase size={19} />
              </span>
              <div>
                <strong>Get hired</strong>
                <small>Turn skills into experience</small>
              </div>
            </article>

            <article>
              <span className="student-dashboard-stat-icon purple">
                <Handshake size={19} />
              </span>
              <div>
                <strong>Get guidance</strong>
                <small>Learn from experienced people</small>
              </div>
            </article>
          </section>

          <section
            className="student-dashboard-opportunities"
            id="student-opportunity-list"
          >
            <div className="student-dashboard-section-heading">
              <div>
                <div className="student-dashboard-section-eyebrow">
                  <Flame size={14} />
                  FIND YOUR NEXT MOVE
                </div>

                <h2>
                  {showSavedOnly
                    ? "Your saved opportunities"
                    : "Opportunities worth your time"}
                </h2>

                <p>
                  Find internships, challenges and connections that move you
                  forward.
                </p>
              </div>

              <label className="student-dashboard-sort">
                <SlidersHorizontal size={15} />

                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  aria-label="Sort opportunities"
                >
                  <option value="recommended">Recommended</option>
                  <option value="deadline">Closing soon</option>
                </select>

                <ChevronDown size={14} />
              </label>
            </div>

            <div className="student-dashboard-search-row">
              <label className="student-dashboard-search">
                <Search size={18} />

                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search companies, opportunities or skills..."
                />

                {search && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => setSearch("")}
                  >
                    <X size={15} />
                  </button>
                )}
              </label>

              <button
                type="button"
                className={`student-dashboard-filter-button ${
                  showFilters ? "active" : ""
                }`}
                onClick={() => setShowFilters((current) => !current)}
              >
                <SlidersHorizontal size={17} />
                Filters
              </button>
            </div>

            {showFilters && (
              <div className="student-dashboard-filter-panel">
                <div>
                  <strong>Opportunity type</strong>
                  <p>Choose the opportunities you want to explore.</p>
                </div>

                <div className="student-dashboard-filter-options">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      className={
                        activeCategory === category ? "active" : ""
                      }
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className="student-dashboard-reset-filters"
                  onClick={resetFilters}
                >
                  Reset filters
                </button>
              </div>
            )}

            <div className="student-dashboard-category-tabs">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={
                    activeCategory === category ? "active" : ""
                  }
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="student-dashboard-results-line">
              <span>
                <strong>{filteredOpportunities.length}</strong>{" "}
                opportunities to explore
              </span>

              {showSavedOnly && (
                <button
                  type="button"
                  onClick={() => {
                    setShowSavedOnly(false);
                    setActiveNav("Discover");
                  }}
                >
                  <X size={13} />
                  Show all
                </button>
              )}
            </div>

            {filteredOpportunities.length > 0 ? (
              <div className="student-dashboard-opportunity-grid">
                {filteredOpportunities.map((opportunity) => {
                  const saved = savedIds.includes(opportunity.id);

                  return (
                    <article
                      className="student-dashboard-opportunity-card"
                      key={opportunity.id}
                    >
                      <div className="student-dashboard-card-top">
                        <CompanyLogo opportunity={opportunity} />

                        <div className="student-dashboard-card-company">
                          <strong>{opportunity.company}</strong>
                          <small>{opportunity.type}</small>
                        </div>

                        <button
                          type="button"
                          className={`student-dashboard-save ${
                            saved ? "saved" : ""
                          }`}
                          aria-label={
                            saved
                              ? "Remove saved opportunity"
                              : "Save opportunity"
                          }
                          aria-pressed={saved}
                          onClick={() => toggleSaved(opportunity.id)}
                        >
                          {saved ? (
                            <BookmarkCheck size={19} />
                          ) : (
                            <Bookmark size={19} />
                          )}
                        </button>
                      </div>

                      <h3>{opportunity.title}</h3>

                      <p className="student-dashboard-opportunity-description">
                        {opportunity.description}
                      </p>

                      <div className="student-dashboard-tags">
                        {opportunity.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>

                      <div className="student-dashboard-opportunity-meta">
                        <span>
                          <MapPin size={14} />
                          {opportunity.location}
                        </span>

                        <span>
                          <Building2 size={14} />
                          {opportunity.mode}
                        </span>

                        <span>
                          <CircleDollarSign size={14} />
                          {opportunity.reward}
                        </span>
                      </div>

                      <div className="student-dashboard-card-footer">
                        <div className="student-dashboard-deadline">
                          <CalendarDays size={15} />
                          <span>
                            <small>Deadline</small>
                            <strong>{opportunity.deadline}</strong>
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => setSelectedOpportunity(opportunity)}
                        >
                          View details
                          <ArrowUpRight size={15} />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="student-dashboard-no-results">
                <span>
                  <Search size={25} />
                </span>

                <h3>No opportunities found</h3>

                <p>
                  Try another search or category to discover more opportunities.
                </p>

                <button type="button" onClick={resetFilters}>
                  Clear search and filters
                </button>
              </div>
            )}
          </section>

          <section className="student-dashboard-bottom-banner">
            <span className="student-dashboard-bottom-banner-icon">
              <GraduationCap size={25} />
            </span>

            <div>
              <h2>Your skills deserve an opportunity.</h2>
              <p>
                Keep your profile updated to discover experiences that match
                your interests.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/student/step-4")}
            >
              Update skill profile
              <ArrowRight size={15} />
            </button>
          </section>

          <footer className="student-dashboard-footer">
            <span>UniSkills · Intercollegiate Network</span>

            <span>
              <ShieldCheck size={13} />
              Your journey, your opportunities.
            </span>
          </footer>
        </div>
      </section>

      <nav className="student-dashboard-mobile-nav">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              type="button"
              className={activeNav === item.label ? "active" : ""}
              onClick={() => goToNav(item)}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}

        <button
          type="button"
          className={showSavedOnly ? "active" : ""}
          onClick={() => {
            setShowSavedOnly((current) => !current);
            setActiveNav("Saved");
            setActiveCategory("All");
          }}
        >
          <Bookmark size={20} />
          <span>Saved</span>
        </button>
      </nav>

      {selectedOpportunity && (
        <div
          className="student-dashboard-modal-backdrop"
          onClick={() => setSelectedOpportunity(null)}
        >
          <section
            className="student-dashboard-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="student-dashboard-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="student-dashboard-modal-close"
              aria-label="Close details"
              onClick={() => setSelectedOpportunity(null)}
            >
              <X size={19} />
            </button>

            <CompanyLogo opportunity={selectedOpportunity} />

            <span className="student-dashboard-modal-type">
              {selectedOpportunity.type}
            </span>

            <h2 id="student-dashboard-modal-title">
              {selectedOpportunity.title}
            </h2>

            <p className="student-dashboard-modal-company">
              {selectedOpportunity.company}
            </p>

            <p className="student-dashboard-modal-description">
              {selectedOpportunity.description}
            </p>

            <div className="student-dashboard-modal-meta">
              <span>
                <MapPin size={15} />
                {selectedOpportunity.location}
              </span>

              <span>
                <Clock3 size={15} />
                Deadline: {selectedOpportunity.deadline}
              </span>

              <span>
                <CircleDollarSign size={15} />
                {selectedOpportunity.reward}
              </span>
            </div>

            <div className="student-dashboard-tags">
              {selectedOpportunity.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <div className="student-dashboard-modal-note">
              <FileText size={16} />
              <p>
                These are demonstration listings. Confirm current availability,
                eligibility, and deadlines on the official provider website.
              </p>
            </div>

            <button
              type="button"
              className="student-dashboard-modal-primary"
              onClick={() => {
                if (selectedOpportunity.url) {
                  window.open(
                    selectedOpportunity.url,
                    "_blank",
                    "noopener,noreferrer"
                  );
                } else {
                  toggleSaved(selectedOpportunity.id);
                }
              }}
            >
              {selectedOpportunity.url ? (
                <>
                  Visit official website
                  <ExternalLink size={16} />
                </>
              ) : (
                <>
                  <Bookmark size={16} />
                  {savedIds.includes(selectedOpportunity.id)
                    ? "Already saved"
                    : "Save opportunity"}
                </>
              )}
            </button>
          </section>
        </div>
      )}
    </main>
  );
}

export default StudentDashboard;
