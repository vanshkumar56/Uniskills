import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import "../styles/ForgotPassword.css";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your registered email address.");
      return;
    }

    setLoading(true);

    window.setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const handleResend = () => {
    setError("");
    setLoading(true);

    window.setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  return (
    <main className="forgot-page">
      <div className="forgot-modal-container">
        <div className="forgot-side-banner">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80"
            alt="Students collaborating"
            className="forgot-banner-img"
          />

          <div className="forgot-banner-header">
            <button
              type="button"
              className="forgot-brand-pill"
              onClick={() => navigate("/login")}
              aria-label="Return to login"
            >
              <span className="forgot-brand-dot" />
              <strong>UniSkills</strong>
            </button>
          </div>
        </div>

        <section className="forgot-modal-content" aria-live="polite">
          {!submitted ? (
            <div className="forgot-view" key="recovery-form">
              <div className="forgot-card-heading">
                <h2>Forgot Password?</h2>
                <p>
                  Enter the email address associated with your account to
                  receive password reset instructions.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="forgot-form">
                <div className="forgot-field">
                  <label htmlFor="recovery-email">Email Address *</label>
                  <div className="forgot-input-wrap">
                    <Mail className="forgot-input-icon" size={17} />
                    <input
                      id="recovery-email"
                      type="email"
                      placeholder="name@example.com"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        setError("");
                      }}
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="forgot-error" role="alert">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="forgot-submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="forgot-spinner" />
                      Sending reset link...
                    </>
                  ) : (
                    <>
                      <span>Send Reset Link</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>

              <div className="forgot-help">
                <span className="forgot-help-icon">i</span>
                <p>
                  Make sure you enter the primary email address linked to your
                  UniSkills account.
                </p>
              </div>

              <button
                type="button"
                className="forgot-back-button"
                onClick={() => navigate("/login")}
              >
                <ArrowLeft size={14} />
                Back to sign in
              </button>
            </div>
          ) : (
            <div className="forgot-view forgot-success-view" key="recovery-success">
              <div className="forgot-success-badge">
                <svg viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="22" fill="#E6F6EE" />
                  <path
                    d="m15 24 6 6 12-13"
                    stroke="#00A859"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="forgot-card-heading">
                <h2>Check Your Inbox</h2>
                <p>
                  If an account exists for this address, we've sent instructions
                  to set up a new password.
                </p>
              </div>

              <div className="forgot-email-preview">
                <Mail size={16} />
                <span>{email}</span>
              </div>

              <div className="forgot-help">
                <span className="forgot-help-icon">i</span>
                <p>
                  Didn't see the email? Be sure to check your spam/junk folder
                  or request another link below.
                </p>
              </div>

              <button
                type="button"
                className="forgot-submit"
                onClick={handleResend}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="forgot-spinner" />
                    Resending link...
                  </>
                ) : (
                  <>
                    <span>Resend Reset Link</span>
                    <RefreshCw size={15} />
                  </>
                )}
              </button>

              <button
                type="button"
                className="forgot-back-button"
                onClick={() => navigate("/login")}
              >
                <ArrowLeft size={14} />
                Back to sign in
              </button>

              <button
                type="button"
                className="forgot-edit-email"
                onClick={() => {
                  setSubmitted(false);
                  setError("");
                }}
              >
                Use a different email address
              </button>
            </div>
          )}

          <div className="forgot-card-footer">
            <ShieldCheck size={15} />
            Safe & secure account recovery
          </div>
        </section>
      </div>
    </main>
  );
}

export default ForgotPassword;