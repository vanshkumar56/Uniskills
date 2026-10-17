
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Code2,
  GraduationCap,
  MapPin,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import "../../styles/AlumniLogin.css";

const domains = [
  "Software Development",
  "Data Science & Analytics",
  "Artificial Intelligence & Machine Learning",
  "Cybersecurity",
  "Cloud Computing & DevOps",
  "Product Management",
  "UI/UX & Product Design",
  "Business & Consulting",
  "Finance & Fintech",
  "Research & Academia",
  "Entrepreneurship",
  "Marketing & Sales",
  "Other",
];

const degrees = [
  "Diploma",
  "Bachelor's Degree",
  "Master's Degree",
  "MBA",
  "PhD / Doctorate",
  "Professional Certification",
  "Other",
];

const experienceLevels = [
  "Less than 1 year",
  "1–2 years",
  "3–5 years",
  "6–10 years",
  "11–15 years",
  "16+ years",
];

const workStatuses = [
  "Employed full-time",
  "Employed part-time",
  "Self-employed / Freelancer",
  "Founder / Entrepreneur",
  "Researcher / Academic",
  "Higher studies",
  "Currently seeking opportunities",
  "Other",
];

function AlumniLogin2() {
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    domain: "",
    degree: "",
    university: "",
    graduationYear: "",
    workStatus: "",
    currentRole: "",
    company: "",
    experience: "",
    skills: "",
    bio: "",
    mentorship: true,
    opportunities: true,
  });

  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;

    setDetails((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
    setSaved(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !details.domain ||
      !details.degree ||
      !details.university.trim() ||
      !details.graduationYear ||
      !details.workStatus ||
      !details.experience
    ) {
      setError("Please complete all required professional details.");
      return;
    }

    const year = Number(details.graduationYear);

    if (
      !Number.isInteger(year) ||
      year < 1950 ||
      year > new Date().getFullYear() + 10
    ) {
      setError("Enter a valid graduation year.");
      return;
    }

    const raw = sessionStorage.getItem("uniskillsAlumniRegistration");
    let personalDetails = {};

    try {
      personalDetails = raw ? JSON.parse(raw) : {};
    } catch {
      setError("Your personal details could not be read. Please return to step 1.");
      return;
    }

    if (
      !personalDetails.firstName ||
      !personalDetails.lastName ||
      !personalDetails.email
    ) {
      setError("Please complete your personal details first.");
      return;
    }

    const completeProfile = {
      ...personalDetails,
      ...details,
      graduationYear: year,
      skills: details.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
      registrationCompletedAt: new Date().toISOString(),
    };

    sessionStorage.setItem(
      "uniskillsAlumniRegistration",
      JSON.stringify(completeProfile)
    );

    setSaved(true);
    navigate("/alumni/dashboard", {
      state: { alumniProfile: completeProfile },
    });
  };

  const handleBack = () => {
    sessionStorage.setItem(
      "uniskillsAlumniProfessionalDraft",
      JSON.stringify(details)
    );
    navigate("/alumni/login-1");
  };

  return (
    <div className="alumni-page">
      <div className="alumni-shell">
        <header className="alumni-header">
          <button
            type="button"
            className="alumni-brand"
            onClick={() => navigate("/login")}
          >
            <span className="alumni-brand-icon">
              <GraduationCap size={24} />
            </span>
            <span>
              <strong>UniSkills</strong>
              <small>Intercollegiate Network</small>
            </span>
          </button>

          <div className="alumni-progress">
            <span>ALUMNI REGISTRATION</span>
            <div className="alumni-progress-track">
              <span className="alumni-progress-complete" />
            </div>
            <small>Step 2 of 2 · Professional details</small>
          </div>
        </header>

        <main className="alumni-card">
          <div className="alumni-heading">
            <span className="alumni-badge">
              <span />
              YOUR PROFESSIONAL JOURNEY
            </span>
            <h1>Tell us what you do.</h1>
            <p>
              Share your experience, expertise, and career journey so
              students can find the right person to learn from.
            </p>
          </div>

          <form className="alumni-form" onSubmit={handleSubmit}>
            <div className="alumni-section-title">
              <span>02</span>
              <div>
                <h2>Education & qualifications</h2>
                <p>Your academic background and qualifications.</p>
              </div>
            </div>

            <div className="alumni-form-grid">
              <div className="alumni-field alumni-field-full">
                <label htmlFor="alumni-domain">Primary domain *</label>
                <div className="alumni-select-wrap">
                  <Code2 size={17} />
                  <select
                    id="alumni-domain"
                    name="domain"
                    value={details.domain}
                    onChange={updateField}
                    required
                  >
                    <option value="">Select your industry or domain</option>
                    {domains.map((domain) => (
                      <option key={domain} value={domain}>
                        {domain}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} />
                </div>
              </div>

              <div className="alumni-field">
                <label htmlFor="alumni-degree">Highest degree *</label>
                <div className="alumni-select-wrap">
                  <GraduationCap size={17} />
                  <select
                    id="alumni-degree"
                    name="degree"
                    value={details.degree}
                    onChange={updateField}
                    required
                  >
                    <option value="">Select degree</option>
                    {degrees.map((degree) => (
                      <option key={degree} value={degree}>
                        {degree}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} />
                </div>
              </div>

              <div className="alumni-field">
                <label htmlFor="alumni-graduation-year">
                  Graduation year *
                </label>
                <div className="alumni-input-icon">
                  <CalendarDays size={17} />
                  <input
                    id="alumni-graduation-year"
                    name="graduationYear"
                    type="number"
                    min="1950"
                    max={new Date().getFullYear() + 10}
                    value={details.graduationYear}
                    onChange={updateField}
                    placeholder="e.g. 2022"
                    required
                  />
                </div>
              </div>

              <div className="alumni-field alumni-field-full">
                <label htmlFor="alumni-university">
                  University / Institution *
                </label>
                <div className="alumni-input-icon">
                  <Building2 size={17} />
                  <input
                    id="alumni-university"
                    name="university"
                    value={details.university}
                    onChange={updateField}
                    placeholder="Enter your university or college"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="alumni-form-divider" />

            <div className="alumni-section-title">
              <span>03</span>
              <div>
                <h2>Current professional status</h2>
                <p>What are you doing in your career today?</p>
              </div>
            </div>

            <div className="alumni-form-grid">
              <div className="alumni-field alumni-field-full">
                <label htmlFor="alumni-work-status">
                  Current status *
                </label>
                <div className="alumni-select-wrap">
                  <BriefcaseBusiness size={17} />
                  <select
                    id="alumni-work-status"
                    name="workStatus"
                    value={details.workStatus}
                    onChange={updateField}
                    required
                  >
                    <option value="">Select your current status</option>
                    {workStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} />
                </div>
              </div>

              <div className="alumni-field">
                <label htmlFor="alumni-current-role">Current role</label>
                <input
                  id="alumni-current-role"
                  name="currentRole"
                  value={details.currentRole}
                  onChange={updateField}
                  placeholder="e.g. Software Engineer"
                />
              </div>

              <div className="alumni-field">
                <label htmlFor="alumni-company">Company / organization</label>
                <div className="alumni-input-icon">
                  <Building2 size={17} />
                  <input
                    id="alumni-company"
                    name="company"
                    value={details.company}
                    onChange={updateField}
                    placeholder="Where do you work?"
                  />
                </div>
              </div>

              <div className="alumni-field alumni-field-full">
                <label htmlFor="alumni-experience">
                  Total professional experience *
                </label>
                <div className="alumni-select-wrap">
                  <BriefcaseBusiness size={17} />
                  <select
                    id="alumni-experience"
                    name="experience"
                    value={details.experience}
                    onChange={updateField}
                    required
                  >
                    <option value="">Select your experience</option>
                    {experienceLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>

            <div className="alumni-form-divider" />

            <div className="alumni-section-title">
              <span>04</span>
              <div>
                <h2>Expertise & community</h2>
                <p>Help students understand how you can guide them.</p>
              </div>
            </div>

            <div className="alumni-form-grid">
              <div className="alumni-field alumni-field-full">
                <label htmlFor="alumni-skills">
                  Skills & areas of expertise
                </label>
                <div className="alumni-input-icon">
                  <Sparkles size={17} />
                  <input
                    id="alumni-skills"
                    name="skills"
                    value={details.skills}
                    onChange={updateField}
                    placeholder="React, Node.js, DSA, system design..."
                  />
                </div>
                <small>Separate skills with commas.</small>
              </div>

              <div className="alumni-field alumni-field-full">
                <label htmlFor="alumni-bio">
                  Professional introduction
                </label>
                <textarea
                  id="alumni-bio"
                  name="bio"
                  value={details.bio}
                  onChange={updateField}
                  placeholder="Share your journey, accomplishments, or what you enjoy helping others learn."
                  rows={5}
                  maxLength={500}
                />
                <small className="alumni-character-count">
                  {details.bio.length}/500 characters
                </small>
              </div>
            </div>

            <div className="alumni-preference-panel">
              <div className="alumni-preference-heading">
                <span className="alumni-preference-icon">
                  <GraduationCap size={20} />
                </span>
                <div>
                  <h3>Give back to the next generation</h3>
                  <p>Choose how you want to participate in UniSkills.</p>
                </div>
              </div>

              <label className="alumni-checkbox-row">
                <input
                  type="checkbox"
                  name="mentorship"
                  checked={details.mentorship}
                  onChange={updateField}
                />
                <span>
                  <strong>Become a mentor</strong>
                  <small>
                    Help students with skills, projects, and career decisions.
                  </small>
                </span>
              </label>

              <label className="alumni-checkbox-row">
                <input
                  type="checkbox"
                  name="opportunities"
                  checked={details.opportunities}
                  onChange={updateField}
                />
                <span>
                  <strong>Share opportunities</strong>
                  <small>
                    Share internships, referrals, challenges, and industry
                    insights when available.
                  </small>
                </span>
              </label>
            </div>

            {error && (
              <div className="alumni-error" role="alert">
                <X size={16} />
                {error}
              </div>
            )}

            {saved && (
              <div className="alumni-success" role="status">
                <CheckCircle2 size={16} />
                Your professional details have been saved.
              </div>
            )}

            <button type="submit" className="alumni-submit-button">
              Complete alumni registration
              <ArrowRight size={17} />
            </button>

            <div className="alumni-card-footer">
              <button
                type="button"
                className="alumni-back-link"
                onClick={handleBack}
              >
                <ArrowLeft size={15} />
                Back to personal details
              </button>
              <span>
                <ShieldCheck size={14} />
                Step 2 of 2
              </span>
            </div>
          </form>
        </main>

        <footer className="alumni-page-footer">
          <span><ShieldCheck size={13} /> UniSkills Alumni Network</span>
          <span>Learn from experience. Build your future.</span>
        </footer>
      </div>
    </div>
  );
}

export default AlumniLogin2;
