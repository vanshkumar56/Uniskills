
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
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
import "../../styles/AlumniLogin.css";

const initialDetails = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  location: "",
  linkedin: "",
};

function AlumniLogin1() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [details, setDetails] = useState(initialDetails);
  const [photo, setPhoto] = useState("");
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

  const removePhoto = () => {
    setPhoto("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleContinue = (event) => {
    event.preventDefault();

    if (
      !details.firstName.trim() ||
      !details.lastName.trim() ||
      !details.phone.trim() ||
      !details.email.trim()
    ) {
      setError("Please complete your name, phone number, and email.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email.trim())) {
      setError("Enter a valid email address.");
      return;
    }

    const phoneDigits = details.phone.replace(/\D/g, "");

    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      setError("Enter a valid phone number.");
      return;
    }

    const savedData = {
      ...details,
      firstName: details.firstName.trim(),
      lastName: details.lastName.trim(),
      phone: details.phone.trim(),
      email: details.email.trim(),
      location: details.location.trim(),
      linkedin: details.linkedin.trim(),
      photo,
    };

    sessionStorage.setItem("uniskillsAlumniRegistration", JSON.stringify(savedData));
    navigate("/alumni/login-2");
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
              <span />
            </div>
            <small>Step 1 of 2 · Personal details</small>
          </div>
        </header>

        <main className="alumni-card">
          <div className="alumni-heading">
            <span className="alumni-badge">
              <span />
              ALUMNI NETWORK
            </span>
            <h1>Let's get to know you.</h1>
            <p>
              Create your alumni identity and reconnect with students,
              fellow graduates, and opportunities across UniSkills.
            </p>
          </div>

          <form className="alumni-form" onSubmit={handleContinue}>
            <section className="alumni-photo-section">
              <div className="alumni-photo-preview">
                {photo ? (
                  <img src={photo} alt="Your alumni profile" />
                ) : (
                  <UserRound size={37} strokeWidth={1.5} />
                )}
                <button
                  type="button"
                  className="alumni-photo-camera"
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Upload profile photo"
                >
                  <Camera size={16} />
                </button>
              </div>

              <div className="alumni-photo-content">
                <strong>Your profile photo</strong>
                <p>
                  Help students recognize you. Use a clear, professional
                  photograph.
                </p>
                <div className="alumni-photo-actions">
                  <button
                    type="button"
                    className="alumni-upload-button"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <ImagePlus size={15} />
                    {photo ? "Change photo" : "Upload photo"}
                  </button>

                  {photo && (
                    <button
                      type="button"
                      className="alumni-remove-photo"
                      onClick={removePhoto}
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
                className="alumni-file-input"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handlePhoto}
              />
            </section>

            <div className="alumni-form-divider" />

            <div className="alumni-section-title">
              <span>01</span>
              <div>
                <h2>Personal information</h2>
                <p>Tell us who you are.</p>
              </div>
            </div>

            <div className="alumni-form-grid">
              <div className="alumni-field">
                <label htmlFor="alumni-first-name">First name *</label>
                <input
                  id="alumni-first-name"
                  name="firstName"
                  value={details.firstName}
                  onChange={updateField}
                  placeholder="Enter your first name"
                  autoComplete="given-name"
                  required
                />
              </div>

              <div className="alumni-field">
                <label htmlFor="alumni-last-name">Last name *</label>
                <input
                  id="alumni-last-name"
                  name="lastName"
                  value={details.lastName}
                  onChange={updateField}
                  placeholder="Enter your last name"
                  autoComplete="family-name"
                  required
                />
              </div>

              <div className="alumni-field alumni-field-full">
                <label htmlFor="alumni-phone">Phone number *</label>
                <div className="alumni-input-icon">
                  <Phone size={17} />
                  <input
                    id="alumni-phone"
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

              <div className="alumni-field alumni-field-full">
                <label htmlFor="alumni-email">Email address *</label>
                <div className="alumni-input-icon">
                  <Mail size={17} />
                  <input
                    id="alumni-email"
                    name="email"
                    type="email"
                    value={details.email}
                    onChange={updateField}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
                <small>
                  Use the email address where you want to receive UniSkills
                  updates.
                </small>
              </div>

              <div className="alumni-field alumni-field-full">
                <label htmlFor="alumni-location">Current location</label>
                <div className="alumni-input-icon">
                  <MapPin size={17} />
                  <input
                    id="alumni-location"
                    name="location"
                    value={details.location}
                    onChange={updateField}
                    placeholder="City, country"
                    autoComplete="address-level2"
                  />
                </div>
              </div>

              <div className="alumni-field alumni-field-full">
                <label htmlFor="alumni-linkedin">
                  LinkedIn profile <span>Optional</span>
                </label>
                <input
                  id="alumni-linkedin"
                  name="linkedin"
                  type="url"
                  value={details.linkedin}
                  onChange={updateField}
                  placeholder="https://www.linkedin.com/in/your-profile"
                />
              </div>
            </div>

            {error && (
              <div className="alumni-error" role="alert">
                <X size={16} />
                {error}
              </div>
            )}

            <div className="alumni-privacy-note">
              <ShieldCheck size={18} />
              <p>
                <strong>Your information matters.</strong>
                Your profile details are collected for alumni registration.
                You can manage what other members see through your profile
                settings.
              </p>
            </div>

            <button type="submit" className="alumni-submit-button">
              Continue to professional details
              <ArrowRight size={17} />
            </button>

            <div className="alumni-card-footer">
              <button
                type="button"
                className="alumni-back-link"
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

        <footer className="alumni-page-footer">
          <span><ShieldCheck size={13} /> UniSkills Alumni Network</span>
          <span>Learn from experience. Build your future.</span>
        </footer>
      </div>
    </div>
  );
}

export default AlumniLogin1;
