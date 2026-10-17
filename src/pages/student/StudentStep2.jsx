
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Camera,
  Upload,
  X,
  Plus,
  CalendarDays,
  MapPin,
  ChevronDown,
  Check,
  LockKeyhole,
  FileText,
  Compass,
  CircleHelp,
} from "lucide-react";
import "../../styles/StudentStep2.css";

function StudentStep2() {
  const navigate = useNavigate();
  const photoInputRef = useRef(null);

  const [photo, setPhoto] = useState("");
  const [standing, setStanding] = useState("3rd Year");
  const [graduation, setGraduation] = useState("Class of 2028");
  const [campus, setCampus] = useState("Greater Noida, India");
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState([
    "Algorithms & Complexity",
    "Distributed Systems",
    "Quantum Information",
    "Peer Math Circle",
    "Alumni Mentorship",
  ]);
  const [customInterest, setCustomInterest] = useState("");
  const [showInterestInput, setShowInterestInput] = useState(false);
  const [discoveryEnabled, setDiscoveryEnabled] = useState(true);
  const [error, setError] = useState("");

  const academicStandings = [
    "1st Year",
    "2nd Year",
    "3rd Year",
    "Final Year",
    "Master's",
    "Doctoral",
  ];

  const graduationYears = Array.from({ length: 8 }, (_, index) => {
    const year = new Date().getFullYear() + index;
    return `Class of ${year}`;
  });

  const campusOptions = [
    "Greater Noida, India",
    "Delhi, India",
    "Noida, India",
    "Kanpur, India",
    "Mumbai, India",
    "Bengaluru, India",
    "Hyderabad, India",
    "Pune, India",
    "Other",
  ];

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Your profile photo must be smaller than 5 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setPhoto(String(reader.result));
      setError("");
    };

    reader.onerror = () => {
      setError("Unable to load your photo. Please try again.");
    };

    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const removePhoto = () => {
    setPhoto("");

    if (photoInputRef.current) {
      photoInputRef.current.value = "";
    }
  };

  const addInterest = () => {
    const value = customInterest.trim();

    if (!value) return;

    if (interests.some((interest) => interest.toLowerCase() === value.toLowerCase())) {
      setError("This interest has already been added.");
      return;
    }

    setInterests((current) => [...current, value]);
    setCustomInterest("");
    setShowInterestInput(false);
    setError("");
  };

  const removeInterest = (interestToRemove) => {
    setInterests((current) =>
      current.filter((interest) => interest !== interestToRemove)
    );
  };

  const handleContinue = (event) => {
    event.preventDefault();
    setError("");

    if (!standing) {
      setError("Please select your current academic standing.");
      return;
    }

    if (!graduation) {
      setError("Please select your expected graduation year.");
      return;
    }

    if (!campus.trim()) {
      setError("Please select your primary campus location.");
      return;
    }

    if (bio.length > 250) {
      setError("Your academic statement cannot exceed 250 characters.");
      return;
    }

    const profile = {
      photo,
      standing,
      graduation,
      campus,
      bio: bio.trim(),
      interests,
      discoveryEnabled,
    };

    try {
      sessionStorage.setItem("uniskillsStudentProfile", JSON.stringify(profile));
      navigate("/student/step-3");
    } catch {
      setError("Unable to save your profile in this browser. Please try again.");
    }
  };

  const handleSkip = () => {
    navigate("/student/step-3");
  };

  return (
    <main className="student-profile-page">
      <div className="student-profile-shell">
        <header className="student-profile-header">
          <button
            type="button"
            className="student-profile-brand"
            onClick={() => navigate("/dashboard")}
            aria-label="Go to UniSkills dashboard"
          >
            <span className="student-profile-brand-icon">
              <GraduationCap size={23} />
            </span>

            <span>
              <strong>UniSkills</strong>
              <small>Intercollegiate Network</small>
            </span>
          </button>

          <div className="student-profile-header-right">
            <span className="student-profile-header-label">
              STUDENT REGISTRATION
            </span>

            <span className="student-profile-step-count">
              Step 2 of 3
            </span>
          </div>
        </header>

        <section className="student-profile-card">
          <div className="student-profile-title-row">
            <div>
              <div className="student-profile-eyebrow">
                <span />
                ACADEMIC PROFILE
              </div>

              <h1>Complete Academic Identity</h1>

              <p>
                Tell us about your academic journey, interests, and
                ambitions to discover opportunities that fit you.
              </p>
            </div>

            <div className="student-profile-verification">
              <ShieldCheck size={18} />

              <div>
                <strong>Profile Setup</strong>
                <small>Step 2 of 3</small>
              </div>
            </div>
          </div>

          <div className="student-profile-progress">
            <div className="student-profile-progress-item completed">
              <span className="student-profile-progress-bar" />
              <small>
                <Check size={12} />
                1. Account
              </small>
            </div>

            <div className="student-profile-progress-item current">
              <span className="student-profile-progress-bar" />
              <small>
                2. Academic Profile
              </small>
            </div>

            <div className="student-profile-progress-item">
              <span className="student-profile-progress-bar" />
              <small>
                3. Skill Tracks
              </small>
            </div>
          </div>

          <form className="student-profile-form" onSubmit={handleContinue}>
            <section className="student-profile-section">
              <div className="student-profile-section-heading">
                <label>Scholar Portrait</label>
              </div>

              <div className="student-profile-upload-panel">
                <div className="student-profile-avatar">
                  {photo ? (
                    <img src={photo} alt="Student profile preview" />
                  ) : (
                    <span className="student-profile-avatar-placeholder">
                      <GraduationCap size={25} />
                    </span>
                  )}

                  <button
                    type="button"
                    className="student-profile-camera"
                    onClick={() => photoInputRef.current?.click()}
                    aria-label="Upload profile photo"
                  >
                    <Camera size={13} />
                  </button>
                </div>

                <div className="student-profile-upload-content">
                  <div className="student-profile-upload-actions">
                    <button
                      type="button"
                      className="student-profile-upload-button"
                      onClick={() => photoInputRef.current?.click()}
                    >
                      <Upload size={13} />
                      Upload Photo
                    </button>

                    {photo && (
                      <button
                        type="button"
                        className="student-profile-remove-photo"
                        onClick={removePhoto}
                      >
                        <X size={13} />
                        Remove
                      </button>
                    )}
                  </div>

                  <p>
                    Square photo recommended. PNG or JPG up to 5 MB.
                    A clear, professional photo works best.
                  </p>

                  <span className="student-profile-watermark-note">
                    <ShieldCheck size={12} />
                    Your photo will be used for your student profile.
                  </span>

                  <input
                    ref={photoInputRef}
                    className="student-profile-file-input"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handlePhotoChange}
                  />
                </div>
              </div>
            </section>

            <section className="student-profile-section">
              <div className="student-profile-section-heading">
                <label>Current Academic Standing</label>

                <span className="student-profile-inline-hint">
                  Select your current year
                </span>
              </div>

              <div className="student-profile-standing">
                {academicStandings.map((year) => (
                  <button
                    key={year}
                    type="button"
                    className={standing === year ? "selected" : ""}
                    aria-pressed={standing === year}
                    onClick={() => setStanding(year)}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </section>

            <section className="student-profile-section">
              <div className="student-profile-name-grid">
                <div className="student-profile-field">
                  <label htmlFor="student-graduation">
                    Expected Graduation
                  </label>

                  <div className="student-profile-input-icon-wrap">
                    <CalendarDays size={16} />

                    <select
                      id="student-graduation"
                      value={graduation}
                      onChange={(event) => setGraduation(event.target.value)}
                      required
                    >
                      {graduationYears.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>

                    <ChevronDown
                      className="student-profile-select-arrow"
                      size={15}
                    />
                  </div>
                </div>

                <div className="student-profile-field">
                  <label htmlFor="student-campus">
                    Primary Campus Base
                  </label>

                  <div className="student-profile-input-icon-wrap">
                    <MapPin size={16} />

                    <select
                      id="student-campus"
                      value={campus}
                      onChange={(event) => setCampus(event.target.value)}
                      required
                    >
                      {campusOptions.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>

                    <ChevronDown
                      className="student-profile-select-arrow"
                      size={15}
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="student-profile-section">
              <div className="student-profile-section-heading">
                <label htmlFor="student-bio">
                  Academic Statement / Focus Bio
                </label>

                <span className="student-profile-character-count">
                  {bio.length} / 250 characters
                </span>
              </div>

              <textarea
                id="student-bio"
                value={bio}
                onChange={(event) => setBio(event.target.value.slice(0, 250))}
                placeholder="Describe your academic interests, current projects, research goals, or what you want to achieve..."
                maxLength={250}
                rows={4}
              />

              <p className="student-profile-helper">
                Briefly describe your technical curiosities, projects,
                research interests, or intended academic milestones.
              </p>
            </section>

            <section className="student-profile-section">
              <div className="student-profile-section-heading">
                <label>Curricular & Fellowship Interests</label>

                <button
                  type="button"
                  className="student-profile-add-interest"
                  onClick={() => setShowInterestInput((current) => !current)}
                >
                  <Plus size={13} />
                  Add Custom
                </button>
              </div>

              {showInterestInput && (
                <div className="student-profile-interest-form">
                  <input
                    type="text"
                    value={customInterest}
                    onChange={(event) => setCustomInterest(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        addInterest();
                      }
                    }}
                    placeholder="Enter an academic interest"
                    maxLength={60}
                    aria-label="Custom academic interest"
                  />

                  <button
                    type="button"
                    onClick={addInterest}
                    aria-label="Add interest"
                  >
                    <Plus size={17} />
                  </button>
                </div>
              )}

              <div className="student-profile-interest-tags">
                {interests.map((interest) => (
                  <span className="student-profile-interest-tag" key={interest}>
                    {interest}

                    <button
                      type="button"
                      onClick={() => removeInterest(interest)}
                      aria-label={`Remove ${interest}`}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>

              <p className="student-profile-helper">
                Choose the subjects and communities you want to explore.
              </p>
            </section>

            <section className="student-profile-discovery">
              <span className="student-profile-discovery-icon">
                <Compass size={19} />
              </span>

              <div className="student-profile-discovery-copy">
                <strong>Enable Intercollegiate Discovery</strong>

                <p>
                  Allow alumni mentors and participating institutions
                  to discover your published projects and interests.
                </p>
              </div>

              <button
                type="button"
                className={`student-profile-switch ${
                  discoveryEnabled ? "enabled" : ""
                }`}
                role="switch"
                aria-checked={discoveryEnabled}
                aria-label="Enable intercollegiate discovery"
                onClick={() => setDiscoveryEnabled((current) => !current)}
              >
                <span />
              </button>
            </section>

            {error && (
              <div className="student-profile-error" role="alert">
                {error}
              </div>
            )}

            <div className="student-profile-actions">
              <button
                type="button"
                className="student-profile-skip"
                onClick={handleSkip}
              >
                Skip for now
                <span>(Limited Discovery)</span>
              </button>

              <button
                type="submit"
                className="student-profile-continue"
              >
                Continue to Skill Tracks
                <ArrowRight size={16} />
              </button>
            </div>
          </form>

          <div className="student-profile-security-footer">
            <span>
              <LockKeyhole size={12} />
              256-Bit Encrypted Campus Data
            </span>

            <i />

            <span>
              <ShieldCheck size={12} />
              FERPA & GDPR Compliant
            </span>

            <i />

            <button
              type="button"
              onClick={() => navigate("/student/step-3")}
            >
              <FileText size={12} />
              Data Policies
            </button>
          </div>
        </section>

        <button
          type="button"
          className="student-profile-back"
          onClick={() => navigate("/student/step-1")}
        >
          <ArrowLeft size={14} />
          Back to Account Details
        </button>

        <footer className="student-profile-page-footer">
          <span>
            <CircleHelp size={12} />
            Need help? Contact support
          </span>
        </footer>
      </div>
    </main>
  );
}

export default StudentStep2;
