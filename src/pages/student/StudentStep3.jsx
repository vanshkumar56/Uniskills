import { useEffect, useState } from "react";
import { getSkills } from "../../lib/skills";
import { useNavigate } from "react-router-dom";
import { useSession, useUser } from "@clerk/react";
import { createSupabaseClient } from "../../lib/supabase";
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  Server,
  Layers3,
  BrainCircuit,
  BarChart3,
  Palette,
  ShieldCheck,
  Package,
  Rocket,
  Cloud,
  Blocks,
  Atom,
  Check,
  Plus,
  X,
  GraduationCap,
  LockKeyhole,
  Users,
  Compass,
} from "lucide-react";
import "../../styles/StudentStep3.css";

const careerPaths = [
  {
    name: "Frontend Developer",
    description: "UI Engineering, React/Next.js, WebGL & Motion",
    icon: Code2,
  },
  {
    name: "Backend Developer",
    description: "Distributed Systems, APIs, Database Architecture",
    icon: Server,
  },
  {
    name: "Full Stack Developer",
    description: "End-to-end applications, Cloud & DevOps",
    icon: Layers3,
    popular: true,
  },
  {
    name: "AI & Machine Learning",
    description: "Deep Learning, LLMs, Neural Networks",
    icon: BrainCircuit,
  },
  {
    name: "Data Analyst & Scientist",
    description: "Statistical Modeling, BI, Predictive Analytics",
    icon: BarChart3,
  },
  {
    name: "UI/UX & Product Designer",
    description: "Design Systems, Interaction Design, User Research",
    icon: Palette,
  },
  {
    name: "Cybersecurity Specialist",
    description: "Threat Modeling, Cryptography, Network Security",
    icon: ShieldCheck,
  },
  {
    name: "Product Builder / Manager",
    description: "Roadmapping, Growth, Rapid Prototyping",
    icon: Package,
  },
  {
    name: "Entrepreneur & Founder",
    description: "Venture Ideation, Fundraising, Startups",
    icon: Rocket,
  },
  {
    name: "Cloud & DevOps Engineer",
    description: "Kubernetes, CI/CD, Infrastructure as Code",
    icon: Cloud,
  },
  {
    name: "Blockchain & Web3 Systems",
    description: "Smart Contracts, Protocols, Cryptography",
    icon: Blocks,
  },
  {
    name: "Quantum & Physics Computing",
    description: "Qiskit, Quantum Algorithms, Simulation",
    icon: Atom,
  },
];

const defaultInterests = [
  "High-Performance Computing",
  "Generative AI & Agents",
  "Open Source Contribution",
  "Fintech & Algorithmic Trading",
  "Climate Tech & Sustainability",
  "HealthTech & Bioinformatics",
  "Developer Tooling",
  "Human-Computer Interaction",
  "Venture Capital & Angel Syndicates",
  "Technical Writing & Documentation",
];

const experienceLevels = [
  {
    name: "Foundational",
    description:
      "Taking university coursework, exploring core foundations and syntax.",
  },
  {
    name: "Intermediate",
    description:
      "Built personal projects, participated in hackathons or campus labs.",
  },
  {
    name: "Advanced",
    description:
      "Industry internship experience or core open-source contributor.",
  },
];

function StudentStep3() {
  const navigate = useNavigate();
  const { session } = useSession();
  const { user } = useUser();
  const getToken = (options) => session?.getToken(options);

  const [primaryPath, setPrimaryPath] = useState("Full Stack Developer");
  const [selectedInterests, setSelectedInterests] = useState([
    "High-Performance Computing",
    "Generative AI & Agents",
    "Fintech & Algorithmic Trading",
  ]);
  const [experience, setExperience] = useState("Intermediate");
  const [showCustomInterest, setShowCustomInterest] = useState(false);
  const [customInterest, setCustomInterest] = useState("");
  const [error, setError] = useState("");
  
const [skills, setSkills] = useState([]);
const [selectedSkills, setSelectedSkills] = useState([]);
const [skillsLoading, setSkillsLoading] = useState(true);
const [skillsError, setSkillsError] = useState("");

useEffect(() => {
  getSkills()
    .then((data) => setSkills(data))
    .catch(() => {
      setSkillsError("Unable to load skills. Please refresh the page.");
    })
    .finally(() => setSkillsLoading(false));
}, []);

const toggleSkill = (skillName) => {
  setSelectedSkills((current) =>
    current.includes(skillName)
      ? current.filter((name) => name !== skillName)
      : [...current, skillName]
  );
};


  const toggleInterest = (interest) => {
    setError("");

    setSelectedInterests((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest]
    );
  };

  const addCustomInterest = (event) => {
    event.preventDefault();

    const value = customInterest.trim();

    if (!value) return;

    if (
      selectedInterests.some(
        (interest) => interest.toLowerCase() === value.toLowerCase()
      )
    ) {
      setError("This interest has already been selected.");
      return;
    }

    setSelectedInterests((current) => [...current, value]);
    setCustomInterest("");
    setShowCustomInterest(false);
    setError("");
  };

  
const handleContinue = async () => {
  if (!primaryPath) {
    setError("Please select your primary career path.");
    return;
  }

  if (!experience) {
    setError("Please select your experience level.");
    return;
  }

  setError("");

  const skillProfile = {
    primaryPath,
    secondaryInterests: selectedInterests,
    selectedSkills,
    experience,
  };

  try {
    sessionStorage.setItem(
      "uniskillsStudentSkills",
      JSON.stringify(skillProfile)
    );

    if (!user) {
      throw new Error("Clerk user is unavailable");
    }

    const supabase = createSupabaseClient(getToken);

    const { error: saveError } = await supabase
      .from("profiles")
      .upsert(
        {
          clerk_user_id: user.id,
          full_name: user.fullName || "",
        },
        { onConflict: "clerk_user_id" }
      );

    if (saveError) throw saveError;

    navigate("/student/step-4");
  } catch (err) {
    console.error("Profile save failed:", err);
    setError("Unable to save your profile. Please try again.");
  }
};


  return (
    <main className="student-skills-page">
      <div className="student-skills-shell">
        <header className="student-skills-header">
          <button
            type="button"
            className="student-skills-brand"
            onClick={() => navigate("/dashboard")}
            aria-label="Go to UniSkills dashboard"
          >
            <span className="student-skills-brand-icon">
              <GraduationCap size={23} />
            </span>

            <span>
              <strong>UniSkills</strong>
              <small>Intercollegiate Network</small>
            </span>
          </button>

          <div className="student-skills-header-progress">
            <span>STUDENT REGISTRATION</span>

            <div className="student-skills-progress-track">
              <span />
            </div>

            <small>Step 3 of 3</small>
          </div>
        </header>

        <section className="student-skills-card">
          <div className="student-skills-eyebrow">
            <span />
            STEP 3 Â· PATHWAY SELECTION
          </div>

          <div className="student-skills-heading">
            <h1>What do you want to become?</h1>
            <p>
              Select your primary career path and secondary interests to
              personalize your learning journey, challenges and opportunities.
            </p>
          </div>

          <div className="student-skills-progress">
            <div className="student-skills-progress-item completed">
              <span />
              <small>1. Account</small>
            </div>

            <div className="student-skills-progress-item completed">
              <span />
              <small>2. Academic Profile</small>
            </div>

            <div className="student-skills-progress-item current">
              <span />
              <small>3. Skill Tracks</small>
            </div>
          </div>

          <div className="student-skills-divider" />

          <section className="student-skills-section">
            <div className="student-skills-section-heading">
              <h2>
                1. Choose Your Primary Path <span>*</span>
              </h2>
              <small>Select one primary specialty</small>
            </div>

            <div className="student-skills-career-grid">
              {careerPaths.map((path) => {
                const Icon = path.icon;
                const selected = primaryPath === path.name;

                return (
                  <button
                    key={path.name}
                    type="button"
                    className={`student-skills-career-card ${
                      selected ? "selected" : ""
                    }`}
                    aria-pressed={selected}
                    onClick={() => {
                      setPrimaryPath(path.name);
                      setError("");
                    }}
                  >
                    <span className="student-skills-career-icon">
                      <Icon size={17} />
                    </span>

                    <span className="student-skills-career-copy">
                      <span className="student-skills-career-title">
                        <strong>{path.name}</strong>

                        {path.popular && (
                          <span className="student-skills-popular">
                            Popular
                          </span>
                        )}
                      </span>

                      <small>{path.description}</small>
                    </span>

                    <span className="student-skills-radio">
                      {selected && <Check size={11} />}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="student-skills-section">
            <div className="student-skills-section-heading">
              <h2>2. Secondary Interests & Interdisciplinary Focus</h2>
              <small>{selectedInterests.length} selected (Optional)</small>
            </div>

            <p className="student-skills-helper">
              Choose additional interests to customize your interdisciplinary
              sprints and cross-departmental matches.
            </p>

            <div className="student-skills-interest-list">
              {defaultInterests.map((interest) => {
                const selected = selectedInterests.includes(interest);

                return (
                  <button
                    key={interest}
                    type="button"
                    className={`student-skills-interest ${
                      selected ? "selected" : ""
                    }`}
                    aria-pressed={selected}
                    onClick={() => toggleInterest(interest)}
                  >
                    {selected && <Check size={11} />}
                    {interest}
                  </button>
                );
              })}

              {selectedInterests
                .filter((interest) => !defaultInterests.includes(interest))
                .map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    className="student-skills-interest selected custom"
                    aria-pressed="true"
                    onClick={() => toggleInterest(interest)}
                  >
                    <Check size={11} />
                    {interest}
                    <X size={11} />
                  </button>
                ))}

              <button
                type="button"
                className="student-skills-add-interest"
                onClick={() => {
                  setShowCustomInterest((current) => !current);
                  setError("");
                }}
              >
                {showCustomInterest ? <X size={12} /> : <Plus size={12} />}
                {showCustomInterest ? "Cancel" : "Add custom interest"}
              </button>
            </div>

            {showCustomInterest && (
              <form
                className="student-skills-custom-form"
                onSubmit={addCustomInterest}
              >
                <input
                  type="text"
                  value={customInterest}
                  onChange={(event) => setCustomInterest(event.target.value)}
                  placeholder="Enter a skill or interest"
                  maxLength={60}
                  aria-label="Custom interest"
                />

                <button type="submit">
                  <Plus size={15} />
                  Add
                </button>
              </form>
            )}
          </section>



<section className="student-skills-section">
  <div className="student-skills-section-heading">
    <h2>3. Choose Your Technical Skills</h2>
    <small>{selectedSkills.length} selected</small>
  </div>

  <p className="student-skills-helper">
    Select skills from the UniSkills database.
  </p>

  {skillsLoading && <p>Loading skills...</p>}

  {skillsError && <p role="alert">{skillsError}</p>}

  {!skillsLoading && !skillsError && (
    <div className="student-skills-interest-list">
      {skills.map((skill) => {
        const selected = selectedSkills.includes(skill.name);

        return (
          <button
            key={skill.id}
            type="button"
            className={`student-skills-interest ${selected ? "selected" : ""}`}
            aria-pressed={selected}
            onClick={() => toggleSkill(skill.name)}
          >
            {selected && <Check size={11} />}
            {skill.name}
          </button>
        );
      })}
    </div>
  )}
</section>
          <section className="student-skills-section">
            <div className="student-skills-section-heading">
              <h2>4. Current Experience Level in Primary Path</h2>
              <small>Calibrates challenge difficulty</small>
            </div>

            <div className="student-skills-experience-grid">
              {experienceLevels.map((level) => {
                const selected = experience === level.name;

                return (
                  <button
                    key={level.name}
                    type="button"
                    className={`student-skills-experience-card ${
                      selected ? "selected" : ""
                    }`}
                    aria-pressed={selected}
                    onClick={() => {
                      setExperience(level.name);
                      setError("");
                    }}
                  >
                    <span className="student-skills-experience-top">
                      <strong>{level.name}</strong>

                      <span className="student-skills-radio">
                        {selected && <Check size={11} />}
                      </span>
                    </span>

                    <small>{level.description}</small>
                  </button>
                );
              })}
            </div>
          </section>

          {error && (
            <div className="student-skills-error" role="alert">
              {error}
            </div>
          )}

          <div className="student-skills-bottom-divider" />

          <div className="student-skills-actions">
            <button
              type="button"
              className="student-skills-back"
              onClick={() => navigate("/student/step-2")}
            >
              <ArrowLeft size={15} />
              <span>Back to Academic Profile</span>
            </button>

            <p className="student-skills-recalibrate">
              You can recalibrate anytime in Scholar Settings.
            </p>

            <button
              type="button"
              className="student-skills-continue"
              onClick={handleContinue}
            >
              <span>Complete Setup & Launch Workspace</span>
              <ArrowRight size={17} />
            </button>
          </div>

          <footer className="student-skills-security-footer">
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
              <Users size={12} />
              Intercollegiate Network
            </span>
          </footer>
        </section>
      </div>
    </main>
  );
}

export default StudentStep3;

