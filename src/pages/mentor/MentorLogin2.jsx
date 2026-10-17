
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
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Video,
  X,
} from "lucide-react";
import "../../styles/MentorLogin.css";

const DOMAINS = [
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

const DEGREES = [
  "Diploma",
  "Bachelor's Degree",
  "Master's Degree",
  "MBA",
  "PhD / Doctorate",
  "Professional Certification",
  "Other",
];

const EXPERIENCE = [
  "Less than 1 year",
  "1–2 years",
  "3–5 years",
  "6–10 years",
  "11–15 years",
  "16+ years",
];

const WORK_STATUSES = [
  "Employed full-time",
  "Employed part-time",
  "Self-employed / Freelancer",
  "Founder / Entrepreneur",
  "Researcher / Academic",
  "Higher studies",
  "Currently seeking opportunities",
  "Other",
];

const SESSION_FORMATS = ["Video calls", "In-app chat", "Both"];

function readStoredData(key) {
  try {
    const stored = sessionStorage.getItem(key);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function MentorLogin2() {
  const navigate = useNavigate();

  const [details, setDetails] = useState(() => ({
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
    topics: "",
    sessionFormat: "Both",
    availability: "Flexible",
    sessionsPerMonth: "4",
    mentorship: true,
    projectReviews: true,
    careerGuidance: true,
    ...readStoredData("uniskillsMentorProfessionalDraft"),
  }));

  const [error, setError] = useState("");

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;

    setDetails((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
  };

  const handleBack = () => {
    sessionStorage.setItem(
      "uniskillsMentorProfessionalDraft",
      JSON.stringify(details)
    );
    navigate("/mentor/login-1");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !details.domain ||
      !details.degree ||
      !details.university.trim() ||
      !details.graduationYear ||
      !details.workStatus ||
      !details.experience ||
      !details.currentRole.trim()
    ) {
      setError(
        "Complete your domain, education, graduation year, current role, work status, and experience."
      );
      return;
    }

    const year = Number(details.graduationYear);

    if (
      !Number.isInteger(year) ||
      year < 1950 ||
      year > new Date().getFullYear() + 10
    ) {
      setError("Please enter a valid graduation year.");
      return;
    }

    const personalDetails = readStoredData("uniskillsMentorRegistration");

    if (
      !personalDetails.firstName ||
      !personalDetails.lastName ||
      !personalDetails.email
    ) {
      setError("Please complete your personal details before continuing.");
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
      topics: details.topics
        .split(",")
        .map((topic) => topic.trim())
        .filter(Boolean),
      registrationCompletedAt: new Date().toISOString(),
    };

    sessionStorage.setItem(
      "uniskillsMentorRegistration",
      JSON.stringify(completeProfile)
    );

    sessionStorage.removeItem("uniskillsMentorProfessionalDraft");

    navigate("/mentor/dashboard", {
      state: { mentorProfile: completeProfile },
    });
  };

  return (
    <div className="mentor-onboard-page">
      <div className="mentor-onboard-shell">
        <header className="mentor-onboard-header">
          <button
            type="button"
            className="mentor-onboard-brand"
            onClick={() => navigate("/login")}
          >
            <span className="mentor-onboard-brand-icon">
              <GraduationCap size={24} />
            </span>
            <span>
              <strong>UniSkills</strong>
              <small>Intercollegiate Network</small>
            </span>
          </button>

          <div className="mentor-onboard-progress">
            <span>MENTOR REGISTRATION</span>
            <div className="mentor-onboard-progress-track">
              <span className="mentor-onboard-progress-complete" />
            </div>
            <small>Step 2 of 2 · Professional details</small>
          </div>
        </header>

        <main className="mentor-onboard-card">
          <div className="mentor-onboard-heading">
            <span className="mentor-onboard-badge">
              <span />
              YOUR PROFESSIONAL JOURNEY
            </span>
            <h1>Share what you know.</h1>
            <p>
              Tell students about your experience, your strengths, and
              the areas where you can help them grow.
            </p>
          </div>

          <form className="mentor-onboard-form" onSubmit={handleSubmit}>
            <div className="mentor-onboard-section-title">
              <span>02</span>
              <div>
                <h2>Education & qualifications</h2>
                <p>Share your academic and professional background.</p>
              </div>
            </div>

            <div className="mentor-onboard-grid">
              <div className="mentor-onboard-field mentor-onboard-full">
                <label htmlFor="mentor-domain">Primary domain *</label>
                <div className="mentor-onboard-select">
                  <Code2 size={17} />
                  <select
                    id="mentor-domain"
                    name="domain"
                    value={details.domain}
                    onChange={updateField}
                    required
                  >
                    <option value="">Select your area of expertise</option>
                    {DOMAINS.map((domain) => (
                      <option key={domain} value={domain}>
                        {domain}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} />
                </div>
              </div>

              <div className="mentor-onboard-field">
                <label htmlFor="mentor-degree">Highest degree *</label>
                <div className="mentor-onboard-select">
                  <GraduationCap size={17} />
                  <select
                    id="mentor-degree"
                    name="degree"
                    value={details.degree}
                    onChange={updateField}
                    required
                  >
                    <option value="">Select degree</option>
                    {DEGREES.map((degree) => (
                      <option key={degree} value={degree}>
                        {degree}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} />
                </div>
              </div>

              <div className="mentor-onboard-field">
                <label htmlFor="mentor-graduation-year">
                  Graduation year *
                </label>
                <div className="mentor-onboard-input-icon">
                  <CalendarDays size={17} />
                  <input
                    id="mentor-graduation-year"
                    name="graduationYear"
                    type="number"
                    min="1950"
                    max={new Date().getFullYear() + 10}
                    value={details.graduationYear}
                    onChange={updateField}
                    placeholder="e.g. 2021"
                    required
                  />
                </div>
              </div>

              <div className="mentor-onboard-field mentor-onboard-full">
                <label htmlFor="mentor-university">
                  University / Institution *
                </label>
                <div className="mentor-onboard-input-icon">
                  <Building2 size={17} />
                  <input
                    id="mentor-university"
                    name="university"
                    value={details.university}
                    onChange={updateField}
                    placeholder="Enter your university or institution"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mentor-onboard-divider" />

            <div className="mentor-onboard-section-title">
              <span>03</span>
              <div>
                <h2>Professional experience</h2>
                <p>Help students understand your career journey.</p>
              </div>
            </div>

            <div className="mentor-onboard-grid">
              <div className="mentor-onboard-field mentor-onboard-full">
                <label htmlFor="mentor-work-status">
                  Current professional status *
                </label>
                <div className="mentor-onboard-select">
                  <BriefcaseBusiness size={17} />
                  <select
                    id="mentor-work-status"
                    name="workStatus"
                    value={details.workStatus}
                    onChange={updateField}
                    required
                  >
                    <option value="">Select your current status</option>
                    {WORK_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} />
                </div>
              </div>

              <div className="mentor-onboard-field">
                <label htmlFor="mentor-current-role">Current role *</label>
                <input
                  id="mentor-current-role"
                  name="currentRole"
                  value={details.currentRole}
                  onChange={updateField}
                  placeholder="e.g. Senior Software Engineer"
                  required
                />
              </div>

              <div className="mentor-onboard-field">
                <label htmlFor="mentor-company">Company / organization</label>
                <div className="mentor-onboard-input-icon">
                  <Building2 size={17} />
                  <input
                    id="mentor-company"
                    name="company"
                    value={details.company}
                    onChange={updateField}
                    placeholder="Company name"
                  />
                </div>
              </div>

              <div className="mentor-onboard-field mentor-onboard-full">
                <label htmlFor="mentor-experience">
                  Total professional experience *
                </label>
                <div className="mentor-onboard-select">
                  <BriefcaseBusiness size={17} />
                  <select
                    id="mentor-experience"
                    name="experience"
                    value={details.experience}
                    onChange={updateField}
                    required
                  >
                    <option value="">Select years of experience</option>
                    {EXPERIENCE.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>

            <div className="mentor-onboard-divider" />

            <div className="mentor-onboard-section-title">
              <span>04</span>
              <div>
                <h2>Mentorship expertise</h2>
                <p>Choose what you can help students with.</p>
              </div>
            </div>

            <div className="mentor-onboard-grid">
              <div className="mentor-onboard-field mentor-onboard-full">
                <label htmlFor="mentor-skills">Skills & technologies</label>
                <div className="mentor-onboard-input-icon">
                  <Sparkles size={17} />
                  <input
                    id="mentor-skills"
                    name="skills"
                    value={details.skills}
                    onChange={updateField}
                    placeholder="React, DSA, Node.js, System Design..."
                  />
                </div>
                <small>Separate skills with commas.</small>
              </div>

              <div className="mentor-onboard-field mentor-onboard-full">
                <label htmlFor="mentor-topics">Mentoring topics</label>
                <div className="mentor-onboard-input-icon">
                  <MessageCircle size={17} />
                  <input
                    id="mentor-topics"
                    name="topics"
                    value={details.topics}
                    onChange={updateField}
                    placeholder="Interview prep, projects, career planning..."
                  />
                </div>
                <small>
                  Examples: code reviews, placement preparation, resume
                  feedback, project guidance.
                </small>
              </div>

              <div className="mentor-onboard-field mentor-onboard-full">
                <label htmlFor="mentor-bio">Professional introduction</label>
                <textarea
                  id="mentor-bio"
                  name="bio"
                  value={details.bio}
                  onChange={updateField}
                  placeholder="Describe your experience, achievements, and how you can help students."
                  rows={5}
                  maxLength={600}
                />
                <small className="mentor-onboard-character-count">
                  {details.bio.length}/600 characters
                </small>
              </div>
            </div>

            <div className="mentor-onboard-divider" />

            <div className="mentor-onboard-section-title">
              <span>05</span>
              <div>
                <h2>Mentorship preferences</h2>
                <p>Set how and when students can connect with you.</p>
              </div>
            </div>

            <div className="mentor-onboard-grid">
              <div className="mentor-onboard-field">
                <label htmlFor="mentor-session-format">
                  Preferred format
                </label>
                <div className="mentor-onboard-select">
                  <Video size={17} />
                  <select
                    id="mentor-session-format"
                    name="sessionFormat"
                    value={details.sessionFormat}
                    onChange={updateField}
                  >
                    {SESSION_FORMATS.map((format) => (
                      <option key={format} value={format}>
                        {format}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} />
                </div>
              </div>

              <div className="mentor-onboard-field">
                <label htmlFor="mentor-availability">Availability</label>
                <div className="mentor-onboard-select">
                  <CalendarDays size={17} />
                  <select
                    id="mentor-availability"
                    name="availability"
                    value={details.availability}
                    onChange={updateField}
                  >
                    <option value="Flexible">Flexible</option>
                    <option value="Weekdays">Weekdays</option>
                    <option value="Weekends">Weekends</option>
                    <option value="Evenings">Evenings</option>
                    <option value="By appointment">By appointment</option>
                  </select>
                  <ChevronDown size={16} />
                </div>
              </div>

              <div className="mentor-onboard-field mentor-onboard-full">
                <label htmlFor="mentor-sessions">
                  Approximate sessions per month
                </label>
                <div className="mentor-onboard-select">
                  <MessageCircle size={17} />
                  <select
                    id="mentor-sessions"
                    name="sessionsPerMonth"
                    value={details.sessionsPerMonth}
                    onChange={updateField}
                  >
                    <option value="1">1 session</option>
                    <option value="2">2 sessions</option>
                    <option value="4">4 sessions</option>
                    <option value="8">8 sessions</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>

            <div className="mentor-onboard-preferences">
              <div className="mentor-onboard-preferences-heading">
                <span><GraduationCap size={20} /></span>
                <div>
                  <h3>How would you like to contribute?</h3>
                  <p>Select all the ways you want to support students.</p>
                </div>
              </div>

              <label className="mentor-onboard-checkbox">
                <input
                  type="checkbox"
                  name="mentorship"
                  checked={details.mentorship}
                  onChange={updateField}
                />
                <span>
                  <strong>One-to-one mentorship</strong>
                  <small>Guide students through skills and career decisions.</small>
                </span>
              </label>

              <label className="mentor-onboard-checkbox">
                <input
                  type="checkbox"
                  name="projectReviews"
                  checked={details.projectReviews}
                  onChange={updateField}
                />
                <span>
                  <strong>Project and code reviews</strong>
                  <small>Help students improve real projects and portfolios.</small>
                </span>
              </label>

              <label className="mentor-onboard-checkbox">
                <input
                  type="checkbox"
                  name="careerGuidance"
                  checked={details.careerGuidance}
                  onChange={updateField}
                />
                <span>
                  <strong>Career and interview guidance</strong>
                  <small>Share interview preparation and industry insights.</small>
                </span>
              </label>
            </div>

            {error && (
              <div className="mentor-onboard-error" role="alert">
                <X size={16} />
                {error}
              </div>
            )}

            <div className="mentor-onboard-privacy">
              <ShieldCheck size={19} />
              <p>
                <strong>Build trust through your profile.</strong>
                Keep your experience accurate. Any professional verification
                should be completed through the platform's verification process.
              </p>
            </div>

            <button type="submit" className="mentor-onboard-submit">
              Complete mentor registration
              <ArrowRight size={17} />
            </button>

            <div className="mentor-onboard-card-footer">
              <button
                type="button"
                className="mentor-onboard-back"
                onClick={handleBack}
              >
                <ArrowLeft size={15} />
                Back to personal details
              </button>

              <span>
                <CheckCircle2 size={14} />
                Step 2 of 2
              </span>
            </div>
          </form>
        </main>

        <footer className="mentor-onboard-footer">
          <span><ShieldCheck size={13} /> UniSkills Mentor Network</span>
          <span>Share your knowledge. Shape someone's future.</span>
        </footer>
      </div>
    </div>
  );
}

export default MentorLogin2;
