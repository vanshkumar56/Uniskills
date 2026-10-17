import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  ShieldCheck,
  Mail,
  ChevronDown,
  LockKeyhole,
} from "lucide-react";
import "../../styles/StudentStep1.css";

function StudentStep1() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    institution: "",
    cohort: "2026",
    honorCode: false,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const updateField = (event) => {
    const { name, value, checked, type } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!form.firstName.trim() || !form.lastName.trim()) {
      setError("Please enter your first and last name.");
      return;
    }

    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid university email address.");
      return;
    }

    if (!form.institution) {
      setError("Please select your university or institution.");
      return;
    }

    if (!form.honorCode) {
      setError("Please accept the Honor Code and Terms of Service.");
      return;
    }

    setLoading(true);

    navigate("/student/step-2", {
      state: {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        institution: form.institution,
        cohort: form.cohort,
      },
    });
  };

  return (
    <main className="student-step-page">
      <div className="student-step-shell">
        <header className="student-step-header">
          <button
            type="button"
            className="student-step-brand"
            onClick={() => navigate("/login")}
            aria-label="Go to UniSkills login"
          >
            <span className="student-step-brand-icon">
              <GraduationCap size={23} />
            </span>

            <span className="student-step-brand-copy">
              <strong>UniSkills</strong>
              <small>Intercollegiate Network</small>
            </span>
          </button>

          <div className="student-step-progress">
            <span>STUDENT REGISTRATION</span>
            <div className="student-step-progress-track">
              <span />
            </div>
            <small>Step 1 of 2</small>
          </div>
        </header>

        <section className="student-step-card">
          <div className="student-step-academic-badge">
            <span className="student-step-badge-dot" />
            Academic Matriculation 2024–2025
          </div>

          <div className="student-step-heading">
            <h1>Create Your Campus Account</h1>
            <p>
              Join as an active undergraduate student or doctoral candidate to access intercollegiate challenges.
            </p>
          </div>

          <form className="student-step-form" onSubmit={handleSubmit}>
            <div className="student-step-name-grid">
              <div className="student-step-field">
                <label htmlFor="student-first-name">First Name</label>
                <input
                  id="student-first-name"
                  name="firstName"
                  type="text"
                  placeholder="Your first name"
                  autoComplete="given-name"
                  value={form.firstName}
                  onChange={updateField}
                  required
                />
              </div>

              <div className="student-step-field">
                <label htmlFor="student-last-name">Last Name</label>
                <input
                  id="student-last-name"
                  name="lastName"
                  type="text"
                  placeholder="Your last name"
                  autoComplete="family-name"
                  value={form.lastName}
                  onChange={updateField}
                  required
                />
              </div>
            </div>

            <div className="student-step-field student-step-email-field">
              <div className="student-step-label-row">
                <label htmlFor="student-email">
                  Institutional University Email
                </label>

                <span className="student-step-required-note">
                  <ShieldCheck size={12} />
                  University email required
                </span>
              </div>

              <div className="student-step-input-wrap">
                <input
                  id="student-email"
                  name="email"
                  type="email"
                  placeholder="you@university.edu"
                  autoComplete="email"
                  value={form.email}
                  onChange={updateField}
                  required
                />
                <Mail size={16} />
              </div>

              <p className="student-step-helper">
                Use your official university address for student verification.
              </p>
            </div>

            <div className="student-step-institution-grid">
              <div className="student-step-field">
                <label htmlFor="student-institution">
                  Select University / Institution
                </label>

                <div className="student-step-select-wrap">
                  <select
                    id="student-institution"
                    name="institution"
                    value={form.institution}
                    onChange={updateField}
                    required
                  >
                    <option value="">Select your home institution...</option>
                    <option value="GL Bajaj Institute of Technology and Management">
                      GL Bajaj Institute of Technology and Management
                    </option>
                    <option value="Indian Institute of Technology Delhi">
                      Indian Institute of Technology Delhi
                    </option>
                    <option value="Indraprastha Institute of Information Technology Delhi">
                      IIIT Delhi
                    </option>
                    <option value="Dr. A.P.J. Abdul Kalam Technical University">
                      Dr. A.P.J. Abdul Kalam Technical University
                    </option>
                    <option value="Other">Other institution</option>
                  </select>
                  <ChevronDown size={15} />
                </div>
              </div>

              <div className="student-step-field">
                <label htmlFor="student-cohort">Cohort Year</label>

                <div className="student-step-select-wrap">
                  <select
                    id="student-cohort"
                    name="cohort"
                    value={form.cohort}
                    onChange={updateField}
                  >
                    <option value="2024">Class of 2024</option>
                    <option value="2025">Class of 2025</option>
                    <option value="2026">Class of 2026</option>
                    <option value="2027">Class of 2027</option>
                    <option value="2028">Class of 2028</option>
                    <option value="2029">Class of 2029</option>
                    <option value="2030">Class of 2030</option>
                    <option value="2031">Class of 2031</option>
                  </select>
                  <ChevronDown size={15} />
                </div>
              </div>
            </div>

            <label className="student-step-honor">
              <input
                type="checkbox"
                name="honorCode"
                checked={form.honorCode}
                onChange={updateField}
                required
              />

              <span>
                I agree to the <a href="/honor-code">Honor Code</a>,{" "}
                <a href="/academic-conduct">Academic Conduct Policy</a>, and{" "}
                <a href="/terms">Terms of Service</a>. I verify my active
                enrollment status.
              </span>
            </label>

            {error && (
              <div className="student-step-error" role="alert">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="student-step-submit"
              disabled={loading}
            >
              <span>
                {loading ? "Continuing..." : "Create UniSkills Account"}
              </span>
              <ArrowRight size={17} />
            </button>
          </form>

          <div className="student-step-login-footer">
            <span>Already a verified user?</span>
            <button type="button" onClick={() => navigate("/login")}>
              Login here <ArrowRight size={13} />
            </button>

            <span className="student-step-footer-spacer" />

            <span className="student-step-gateway">
              <ShieldCheck size={13} />
              Direct Identity Gateway
            </span>
          </div>
        </section>

        <footer className="student-step-page-footer">
          <span>
            <LockKeyhole size={12} />
            256-Bit Encrypted Campus Verification
          </span>
          <i />
          <span>FERPA &amp; GDPR Compliant</span>
          <i />
          <span>Academic Sprints © {new Date().getFullYear()}</span>
        </footer>

        <button
          type="button"
          className="student-step-back"
          onClick={() => navigate("/basic-details")}
        >
          <ArrowLeft size={14} />
          Back to role selection
        </button>
      </div>
    </main>
  );
}

export default StudentStep1;