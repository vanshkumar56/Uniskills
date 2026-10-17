
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  LockKeyhole,
  Plus,
  X,
  Search,
  Code2,
  Check,
} from "lucide-react";
import "../../styles/StudentStep4.css";

const popularTechnologies = [
  "HTML5",
  "CSS3",
  "TypeScript",
  "Python",
  "Node.js",
  "Docker",
  "PostgreSQL",
  "Git",
  "Tailwind CSS",
  "Next.js",
];

const technologyCatalog = [
  { name: "JavaScript", description: "Web Scripting & ES6+ Standards", short: "JS" },
  { name: "React", description: "Component Architecture & Hooks", short: "Re" },
  { name: "Python", description: "Data Modeling & Backend Logic", short: "Py" },
  { name: "HTML & CSS", description: "Semantic Document Layouts & Flexbox", short: "H5" },
  { name: "TypeScript", description: "Static Type Checking & Interfaces", short: "TS" },
  { name: "Git & GitHub", description: "Branching, Rebasing & PR Workflow", short: "Git" },
  { name: "Node.js & Express", description: "REST API Development & Middleware", short: "Nd" },
  { name: "SQL & PostgreSQL", description: "Relational Schemas, Joins & Indexing", short: "SQL" },
  { name: "Docker", description: "Containers, Images & Deployment", short: "Dk" },
  { name: "Tailwind CSS", description: "Utility-First Responsive Styling", short: "Tw" },
  { name: "Next.js", description: "React Framework & Server Rendering", short: "Nx" },
  { name: "Java", description: "Object-Oriented Programming", short: "Ja" },
  { name: "C", description: "Programming Fundamentals & Memory", short: "C" },
  { name: "C++", description: "Data Structures & Algorithms", short: "C+" },
  { name: "MongoDB", description: "Document Databases & Queries", short: "Mg" },
  { name: "Firebase", description: "Authentication & Cloud Services", short: "Fb" },
  { name: "Figma", description: "UI Design & Prototyping", short: "Fg" },
  { name: "Linux", description: "Command Line & System Administration", short: "Ln" },
  { name: "AWS", description: "Cloud Infrastructure & Services", short: "AWS" },
  { name: "Machine Learning", description: "Model Training & Evaluation", short: "ML" },
  { name: "REST APIs", description: "HTTP APIs & Integration", short: "API" },
  { name: "GraphQL", description: "Query Language for APIs", short: "GQL" },
  { name: "Go", description: "Concurrent Backend Development", short: "Go" },
  { name: "Rust", description: "Memory-Safe Systems Programming", short: "Rs" },
  { name: "Kotlin", description: "Modern Application Development", short: "Kt" },
];

const initialSkills = [
  { name: "JavaScript", level: "Intermediate" },
  { name: "React", level: "Intermediate" },
  { name: "Python", level: "Advanced" },
  { name: "HTML & CSS", level: "Advanced" },
  { name: "TypeScript", level: "Beginner" },
  { name: "Git & GitHub", level: "Intermediate" },
  { name: "Node.js & Express", level: "Beginner" },
  { name: "SQL & PostgreSQL", level: "Beginner" },
];

const proficiencyLevels = ["Beginner", "Intermediate", "Advanced"];

const technologyAliases = {
  html5: "HTML & CSS",
  css3: "HTML & CSS",
  "node.js": "Node.js & Express",
  node: "Node.js & Express",
  postgresql: "SQL & PostgreSQL",
  sql: "SQL & PostgreSQL",
  git: "Git & GitHub",
  github: "Git & GitHub",
};

function getTechnologyDetails(name) {
  const normalized = name.trim().toLowerCase();
  const matchedName = technologyAliases[normalized] || name.trim();

  return (
    technologyCatalog.find(
      (technology) =>
        technology.name.toLowerCase() === matchedName.toLowerCase()
    ) || {
      name: matchedName,
      description: "Custom technology or competency",
      short: matchedName.slice(0, 3).toUpperCase(),
    }
  );
}

function StudentStep4() {
  const navigate = useNavigate();

 
const [skills, setSkills] = useState(() => {
  try {
    const saved = sessionStorage.getItem("uniskillsStudentTechnologies");

    if (saved) {
      return JSON.parse(saved);
    }

    const profile = JSON.parse(
      sessionStorage.getItem("uniskillsStudentSkills") || "{}"
    );

    if (profile.selectedSkills?.length) {
      return profile.selectedSkills.map((name) => ({
        name,
        level: "Beginner",
      }));
    }

    return initialSkills;
  } catch {
    return initialSkills;
  }
});


  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const isSelected = (technologyName, currentSkills = skills) => {
    const normalizedName = getTechnologyDetails(technologyName).name.toLowerCase();

    return currentSkills.some(
      (skill) => skill.name.toLowerCase() === normalizedName
    );
  };

  const toggleTechnology = (name) => {
    const technology = getTechnologyDetails(name);

    setSkills((current) => {
      const alreadySelected = current.some(
        (skill) =>
          skill.name.toLowerCase() === technology.name.toLowerCase()
      );

      if (alreadySelected) {
        return current.filter(
          (skill) =>
            skill.name.toLowerCase() !== technology.name.toLowerCase()
        );
      }

      return [
        ...current,
        { name: technology.name, level: "Beginner" },
      ];
    });

    setError("");
  };

  const addTechnology = (name) => {
    const technology = getTechnologyDetails(name);

    if (!technology.name) return;

    if (isSelected(technology.name)) {
      setError(`${technology.name} is already in your skill list.`);
      return;
    }

    setSkills((current) => [
      ...current,
      { name: technology.name, level: "Beginner" },
    ]);

    setSearch("");
    setError("");
  };

  const removeTechnology = (name) => {
    setSkills((current) =>
      current.filter((skill) => skill.name !== name)
    );

    setError("");
  };

  const updateLevel = (name, level) => {
    setSkills((current) =>
      current.map((skill) =>
        skill.name === name ? { ...skill, level } : skill
      )
    );
  };

  const handleContinue = () => {
    if (skills.length === 0) {
      setError("Add at least one technology before continuing.");
      return;
    }

    try {
      sessionStorage.setItem(
        "uniskillsStudentTechnologies",
        JSON.stringify(skills)
      );

      navigate("/student/dashboard");
    } catch {
      setError("Unable to save your skills. Please try again.");
    }
  };

  const filteredSuggestions = technologyCatalog.filter(
    (technology) =>
      technology.name.toLowerCase().includes(search.trim().toLowerCase()) &&
      !isSelected(technology.name)
  );

  const canAddCustom =
    search.trim().length > 0 &&
    !isSelected(search.trim()) &&
    !filteredSuggestions.some(
      (technology) =>
        technology.name.toLowerCase() === search.trim().toLowerCase()
    );

  return (
    <main className="student-tech-page">
      <div className="student-tech-shell">
        <header className="student-tech-header">
          <button
            type="button"
            className="student-tech-brand"
            onClick={() => navigate("/dashboard")}
            aria-label="Go to UniSkills dashboard"
          >
            <span className="student-tech-brand-icon">
              <GraduationCap size={23} />
            </span>

            <span>
              <strong>UniSkills</strong>
              <small>Intercollegiate Network</small>
            </span>
          </button>

          <div className="student-tech-header-progress">
            <span>STUDENT REGISTRATION</span>
            <div className="student-tech-progress-track">
              <span />
            </div>
            <small>Step 3 of 3</small>
          </div>
        </header>

        <section className="student-tech-card">
          <div className="student-tech-eyebrow">
            <span />
            STEP 3 Â· TECHNOLOGY PROFILE
          </div>

          <div className="student-tech-heading">
            <h1>What technologies do you know?</h1>
            <p>
              List your languages, frameworks and developer tools. Your
              self-assessed proficiency helps match you with suitable
              challenges and projects.
            </p>
          </div>

          <div className="student-tech-progress">
            <div className="student-tech-progress-item completed">
              <span />
              <small>1. Account</small>
            </div>
            <div className="student-tech-progress-item completed">
              <span />
              <small>2. Academic Profile</small>
            </div>
            <div className="student-tech-progress-item current">
              <span />
              <small>3. Skills & Technologies</small>
            </div>
          </div>

          <section className="student-tech-section">
            <div className="student-tech-section-heading">
              <h2>Quick Add Popular Technologies</h2>
            </div>

            <div className="student-tech-quick-list">
              {popularTechnologies.map((technology) => {
                const selected = isSelected(technology);

                return (
                  <button
                    key={technology}
                    type="button"
                    className={`student-tech-quick-chip ${
                      selected ? "already-added" : ""
                    }`}
                    aria-pressed={selected}
                    onClick={() => toggleTechnology(technology)}
                  >
                    {selected ? (
                      <Check size={11} />
                    ) : (
                      <Plus size={11} />
                    )}
                    {technology}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="student-tech-section">
            <div className="student-tech-list-heading">
              <span>TECHNOLOGY / COMPETENCY</span>
              <span>SELF-ASSESSED LEVEL</span>
            </div>

            <div className="student-tech-list">
              {skills.map((skill) => {
                const technology = getTechnologyDetails(skill.name);

                return (
                  <article className="student-tech-row" key={skill.name}>
                    <span className="student-tech-short-icon">
                      {technology.short}
                    </span>

                    <div className="student-tech-details">
                      <strong>{technology.name}</strong>
                      <small>{technology.description}</small>
                    </div>

                    <select
                      className="student-tech-level"
                      value={skill.level}
                      aria-label={`${technology.name} proficiency`}
                      onChange={(event) =>
                        updateLevel(skill.name, event.target.value)
                      }
                    >
                      {proficiencyLevels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      className="student-tech-remove"
                      onClick={() => removeTechnology(skill.name)}
                      aria-label={`Remove ${technology.name}`}
                    >
                      <X size={15} />
                    </button>
                  </article>
                );
              })}

              {skills.length === 0 && (
                <div className="student-tech-empty">
                  <Code2 size={25} />
                  <strong>No technologies added yet</strong>
                  <p>
                    Choose a popular technology or add your own below.
                  </p>
                </div>
              )}
            </div>
          </section>

          <section className="student-tech-add-panel">
            <div className="student-tech-add-heading">
              <span className="student-tech-add-icon">
                <Plus size={16} />
              </span>

              <div>
                <h2>Add another skill</h2>
                <p>
                  Search the technology library or enter your own
                  language, framework, tool or competency.
                </p>
              </div>
            </div>

            <form
              className="student-tech-search-form"
              onSubmit={(event) => {
                event.preventDefault();

                if (search.trim()) {
                  addTechnology(search);
                }
              }}
            >
              <div className="student-tech-search-wrap">
                <Search size={15} />

                <input
                  type="text"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setError("");
                  }}
                  placeholder="Type a skill (e.g. GraphQL, Rust, PyTorch, Figma...)"
                  aria-label="Search or enter a technology"
                />

                {search && (
                  <button
                    type="button"
                    className="student-tech-clear-search"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <button
                type="submit"
                className="student-tech-add-button"
                disabled={!search.trim()}
              >
                <Plus size={14} />
                Add Skill
              </button>
            </form>

            {search.trim() && (
              <div className="student-tech-suggestions">
                {filteredSuggestions.slice(0, 5).map((technology) => (
                  <button
                    key={technology.name}
                    type="button"
                    onClick={() => addTechnology(technology.name)}
                  >
                    <span>{technology.short}</span>
                    <span>{technology.name}</span>
                    <Plus size={13} />
                  </button>
                ))}

                {filteredSuggestions.length === 0 && !canAddCustom && (
                  <p>This technology is already in your list.</p>
                )}

                {canAddCustom && (
                  <button
                    type="button"
                    onClick={() => addTechnology(search)}
                  >
                    <span>
                      <Plus size={13} />
                    </span>
                    <span>Add custom skill: {search.trim()}</span>
                    <ArrowRight size={13} />
                  </button>
                )}
              </div>
            )}
          </section>

          {error && (
            <div className="student-tech-error" role="alert">
              {error}
            </div>
          )}

          <div className="student-tech-summary">
            <span>
              <Check size={14} />
              {skills.length} {skills.length === 1 ? "skill" : "skills"} added
            </span>
            <span>
              <ShieldCheck size={14} />
              Self-assessed profile
            </span>
          </div>

          <div className="student-tech-actions">
            <button
              type="button"
              className="student-tech-back"
              onClick={() => navigate("/student/step-3")}
            >
              <ArrowLeft size={15} />
              Back
            </button>

            <button
              type="button"
              className="student-tech-continue"
              onClick={handleContinue}
            >
              Continue to Dashboard
              <ArrowRight size={16} />
            </button>
          </div>

          <footer className="student-tech-security-footer">
            <span>
              <LockKeyhole size={12} />
              Secure Campus Data
            </span>
            <i />
            <span>
              <ShieldCheck size={12} />
              Privacy Protected
            </span>
            <i />
            <span>
              <GraduationCap size={12} />
              UniSkills Network
            </span>
          </footer>
        </section>
      </div>
    </main>
  );
}

export default StudentStep4;

