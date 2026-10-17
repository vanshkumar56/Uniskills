
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  CheckCircle2,
  GraduationCap,
  ImagePlus,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import "../../styles/MentorLogin.css";

const EMPTY_DETAILS = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  location: "",
  linkedin: "",
  portfolio: "",
};

function readStoredDetails() {
  try {
    const stored = sessionStorage.getItem("uniskillsMentorRegistration");
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function MentorLogin1() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const storedDetails = readStoredDetails();

  const [details, setDetails] = useState(() => ({
    ...EMPTY_DETAILS,
    ...storedDetails,
  }));
  const [photo, setPhoto] = useState(storedDetails.photo || "");
  const [error, setError] = useState("");

  const updateField = (event) => {
    setDetails((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
    setError("");
  };

  const handlePhoto = (event) => {
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

    reader.readAsDataURL(file);
  };

  const handleContinue = (event) => {
    event.preventDefault();

    if (
      !details.firstName.trim() ||
      !details.lastName.trim() ||
      !details.phone.trim() ||
      !details.email.trim()
    ) {
      setError("Please complete your first name, last name, phone, and email.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    const phoneDigits = details.phone.replace(/\D/g, "");

    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      setError("Please enter a valid phone number with country code.");
      return;
    }

    const personalDetails = {
      ...details,
      firstName: details.firstName.trim(),
      lastName: details.lastName.trim(),
      phone: details.phone.trim(),
      email: details.email.trim(),
      location: details.location.trim(),
      linkedin: details.linkedin.trim(),
      portfolio: details.portfolio.trim(),
      photo,
    };

    sessionStorage.setItem(
      "uniskillsMentorRegistration",
      JSON.stringify(personalDetails)
    );

    navigate("/mentor/login-2");
  };

  return (
    <div className="mentor-onboard-page">
      <div className="mentor-onboard-shell">
        <header className="mentor-onboard-header">
          <button
            type="button"
            className="mentor-onboard-brand"
            onClick={() => navigate("/login")}
            aria-label="Go to login"
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
              <span />
            </div>
            <small>Step 1 of 2 · Personal details</small>
          </div>
        </header>

        <main className="mentor-onboard-card">
          <div className="mentor-onboard-heading">
            <span className="mentor-onboard-badge">
              <span />
              MENTOR NETWORK
            </span>
            <h1>Let's start with you.</h1>
            <p>
              Create your professional identity on UniSkills and help
              students discover the person behind your experience.
            </p>
          </div>

          <form className="mentor-onboard-form" onSubmit={handleContinue}>
            <section className="mentor-onboard-photo-section">
              <div className="mentor-onboard-photo-preview">
                {photo ? (
                  <img src={photo} alt="Mentor profile preview" />
                ) : (
                  <UserRound size={37} strokeWidth={1.5} />
                )}

                <button
                  type="button"
                  className="mentor-onboard-photo-camera"
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Upload profile photo"
                >
                  <Camera size={16} />
                </button>
              </div>

              <div className="mentor-onboard-photo-content">
                <strong>Your profile photo</strong>
                <p>
                  Use a clear, professional photograph so students can
                  recognize you.
                </p>

                <div className="mentor-onboard-photo-actions">
                  <button
                    type="button"
                    className="mentor-onboard-upload-button"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <ImagePlus size={15} />
                    {photo ? "Change photo" : "Upload photo"}
                  </button>

                  {photo && (
                    <button
                      type="button"
                      className="mentor-onboard-remove-photo"
                      onClick={() => {
                        setPhoto("");
                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}
                    >
                      <X size={14} />
                      Remove
                    </button>
                  )}
                </div>

                <small>JPG, PNG or WEBP · Maximum 5 MB</small>
              </div>

              <input
                ref={fileInputRef}
                className="mentor-onboard-file-input"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handlePhoto}
              />
            </section>

            <div className="mentor-onboard-divider" />

            <div className="mentor-onboard-section-title">
              <span>01</span>
              <div>
                <h2>Personal information</h2>
                <p>Basic details for your mentor profile.</p>
              </div>
            </div>

            <div className="mentor-onboard-grid">
              <div className="mentor-onboard-field">
                <label htmlFor="mentor-first-name">First name *</label>
                <input
                  id="mentor-first-name"
                  name="firstName"
                  value={details.firstName}
                  onChange={updateField}
                  placeholder="Enter first name"
                  autoComplete="given-name"
                  required
                />
              </div>

              <div className="mentor-onboard-field">
                <label htmlFor="mentor-last-name">Last name *</label>
                <input
                  id="mentor-last-name"
                  name="lastName"
                  value={details.lastName}
                  onChange={updateField}
                  placeholder="Enter last name"
                  autoComplete="family-name"
                  required
                />
              </div>

              <div className="mentor-onboard-field mentor-onboard-full">
                <label htmlFor="mentor-phone">Phone number *</label>
                <div className="mentor-onboard-input-icon">
                  <Phone size={17} />
                  <input
                    id="mentor-phone"
                    name="phone"
                    type="tel"
                    value={details.phone}
                    onChange={updateField}
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    inputMode="tel"
                    required
                  />
                </div>
                <small>Include your country code.</small>
              </div>

              <div className="mentor-onboard-field mentor-onboard-full">
                <label htmlFor="mentor-email">Professional email *</label>
                <div className="mentor-onboard-input-icon">
                  <Mail size={17} />
                  <input
                    id="mentor-email"
                    name="email"
                    type="email"
                    value={details.email}
                    onChange={updateField}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
                <small>Use an email address you check regularly.</small>
              </div>

              <div className="mentor-onboard-field mentor-onboard-full">
                <label htmlFor="mentor-location">Current location</label>
                <div className="mentor-onboard-input-icon">
                  <MapPin size={17} />
                  <input
                    id="mentor-location"
                    name="location"
                    value={details.location}
                    onChange={updateField}
                    placeholder="City, country"
                    autoComplete="address-level2"
                  />
                </div>
              </div>

              <div className="mentor-onboard-field mentor-onboard-full">
                <label htmlFor="mentor-linkedin">
                  LinkedIn profile <span>Recommended</span>
                </label>
                <input
                  id="mentor-linkedin"
                  name="linkedin"
                  type="url"
                  value={details.linkedin}
                  onChange={updateField}
                  placeholder="https://www.linkedin.com/in/your-profile"
                />
              </div>

              <div className="mentor-onboard-field mentor-onboard-full">
                <label htmlFor="mentor-portfolio">
                  Portfolio or personal website <span>Optional</span>
                </label>
                <input
                  id="mentor-portfolio"
                  name="portfolio"
                  type="url"
                  value={details.portfolio}
                  onChange={updateField}
                  placeholder="https://yourwebsite.com"
                />
              </div>
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
                <strong>Your profile, your control.</strong>
                Your information helps students identify relevant mentors.
                Visibility and verification can be managed through your
                account settings.
              </p>
            </div>

            <button type="submit" className="mentor-onboard-submit">
              Continue to professional details
              <ArrowRight size={17} />
            </button>

            <div className="mentor-onboard-card-footer">
              <button
                type="button"
                className="mentor-onboard-back"
                onClick={() => navigate("/login")}
              >
                <ArrowLeft size={15} />
                Back to login
              </button>

              <span>
                <CheckCircle2 size={14} />
                Step 1 of 2
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

export default MentorLogin1;
