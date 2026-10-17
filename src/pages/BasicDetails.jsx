import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Sparkles,
  Briefcase,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Check,
} from "lucide-react";
import "../styles/BasicDetails.css";

const ROLES = [
  {
    id: "student",
    title: "Student",
    badge: "Most Popular",
    description: "Explore competitions, showcase projects, and land internships.",
    path: "/student/step-1",
    icon: GraduationCap,
  },
  {
    id: "mentor",
    title: "Mentor",
    badge: "Guide & Inspire",
    description: "Review submissions, conduct sessions, and guide young talent.",
    path: "/mentor/login-1",
    icon: Sparkles,
  },
  {
    id: "alumni",
    title: "Alumni / Professional",
    badge: "Network",
    description: "Connect with campus networks, refer candidates, and recruit.",
    path: "/alumni/login-1",
    icon: Briefcase,
  },
];

function BasicDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedRole, setSelectedRole] = useState("student");
  const [loading, setLoading] = useState(false);

  const userName = location.state?.name || "there";

  const handleContinue = () => {
    const roleConfig = ROLES.find((r) => r.id === selectedRole);
    if (!roleConfig) return;

    setLoading(true);
    window.setTimeout(() => {
      navigate(roleConfig.path, {
        state: location.state,
      });
    }, 380);
  };

  return (
    <main className="details-page">
      <div className="details-modal-container">
        <div className="details-side-banner">
          <img
            src="blob:https://chatgpt.com/56aad66c-0768-4824-8d5a-3f2c37ba355e"
            alt="Students collaborating"
            className="details-banner-img"
          />

          <div className="details-banner-header">
            <button
              type="button"
              className="details-brand-pill"
              onClick={() => navigate("/login")}
              aria-label="Return to login"
            >
              <span className="details-brand-dot" />
              <strong>UniSkills</strong>
            </button>
          </div>
        </div>

        <section className="details-modal-content">
          <div className="details-header-wrap">
            <div className="details-step-pill">STEP 2 OF 2</div>
            <h2>Welcome, {userName}!</h2>
            <p>Select your primary role to customize your workspace.</p>
          </div>

          <div className="details-cards-grid" role="radiogroup" aria-label="Choose your role">
            {ROLES.map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;

              return (
                <div
                  key={role.id}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={0}
                  className={`details-role-card ${isSelected ? "selected" : ""}`}
                  onClick={() => setSelectedRole(role.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedRole(role.id);
                    }
                  }}
                >
                  <div className="details-card-left">
                    <div className="details-role-icon">
                      <Icon size={20} />
                    </div>

                    <div className="details-role-info">
                      <div className="details-role-title-row">
                        <strong>{role.title}</strong>
                        <span className="details-role-badge">{role.badge}</span>
                      </div>
                      <p>{role.description}</p>
                    </div>
                  </div>

                  <div className="details-check-circle">
                    <Check size={14} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="details-actions">
            <button
              type="button"
              className="details-submit"
              disabled={loading}
              onClick={handleContinue}
            >
              {loading ? (
                <>
                  <span className="details-spinner" />
                  Customizing your workspace...
                </>
              ) : (
                <>
                  <span>Continue</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            <button
              type="button"
              className="details-back-button"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={14} />
              Go back
            </button>
          </div>

          <div className="details-card-footer">
            <ShieldCheck size={15} />
            You can modify your role settings anytime later
          </div>
        </section>
      </div>
    </main>
  );
}

export default BasicDetails;