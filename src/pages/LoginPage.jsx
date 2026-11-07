import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useCarRental } from "../context/CarRentalContext";

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const {
    loginUser,
    navigate,
    showToast
  } = useCarRental();

  const [role, setRole] = useState(() => searchParams.get("role") || "driver");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  useEffect(() => {
    const roleParam = searchParams.get("role");
    if (roleParam) {
      setRole(roleParam);
    }
  }, [searchParams]);

  const handleFillDemo = () => {
    if (role === "admin") {
      setEmail("admin@renderrcars.com");
      setPassword("admin123");
      showToast("Admin credentials loaded! 🛡️");
    } else {
      setEmail("driver@renderrcars.com");
      setPassword("driver123");
      showToast("Driver credentials loaded! 🏎️");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    const cleanPass = password.trim();

    if (!cleanEmail || !cleanEmail.includes("@")) {
      showToast("Please enter a valid email address");
      return;
    }
    if (!cleanPass || cleanPass.length < 5) {
      showToast("Password must be at least 5 characters");
      return;
    }

    if (role === "admin") {
      if (cleanEmail.toLowerCase().includes("admin") || cleanPass === "admin123") {
        loginUser(cleanEmail, "admin");
        navigate("/admin");
      } else {
        showToast("Invalid admin credentials. Use demo: admin@renderrcars.com / admin123");
      }
    } else {
      loginUser(cleanEmail, "driver");
      navigate("/");
    }
  };

  return (
    <div className="login-standalone-page">
      {/* RETURN TO HOME LINK */}
      <button
        type="button"
        className="back-home-link"
        onClick={() => navigate("/")}
      >
        <span>←</span> Return to Fleet
      </button>

      {/* BACKGROUND */}
      <div className="login-bg-media">
        <img src="/pictures/poster of login page.png" alt="RenderRCars Poster" />
      </div>
      <div className="bg-overlay"></div>

      <main className="login-page">
        <section className="login-container">
          <div className="login-card">
            <div className="brand-header">
              <button
                type="button"
                className="brand-logo-btn"
                onClick={() => navigate("/")}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                <img src="/pictures/logo.png" alt="RenderRCars Logo" />
              </button>
              <h1>{role === "admin" ? "Admin Console" : "Member Login"}</h1>
              <p className="subtitle">
                {role === "admin"
                  ? "Access central fleet telemetry, vehicle dispatch & reservations"
                  : "Access member discounts, reservations & telemetry"}
              </p>
            </div>

            {/* DUAL ROLE TABS */}
            <div className="role-tabs">
              <button
                type="button"
                className={`role-tab ${role === "driver" ? "active" : ""}`}
                onClick={() => setRole("driver")}
              >
                🏎️ Driver Portal
              </button>
              <button
                type="button"
                className={`role-tab ${role === "admin" ? "active" : ""}`}
                onClick={() => setRole("admin")}
              >
                🛡️ Admin Console
              </button>
            </div>

            {/* DEMO QUICK FILL HELPER */}
            <div className="demo-preset-badge">
              <span>Demo: <strong>{role === "admin" ? "admin@renderrcars.com" : "driver@renderrcars.com"}</strong></span>
              <button
                type="button"
                className="btn-fill-demo"
                onClick={handleFillDemo}
              >
                Auto Fill ⚡
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* EMAIL */}
              <div className="input-group">
                <label htmlFor="loginEmail">
                  {role === "admin" ? "Administrator Email" : "Driver Email Address"}
                </label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="loginEmail"
                    placeholder={role === "admin" ? "admin@renderrcars.com" : "driver@renderrcars.com"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="input-group">
                <label htmlFor="loginPassword">Password</label>
                <div className="input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="loginPassword"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="toggle-pwd-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    👁️
                  </button>
                </div>
              </div>

              {/* OPTIONS ROW */}
              <div className="options-row">
                <label className="remember-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  /> Keep me logged in
                </label>
                <button
                  type="button"
                  className="forgot-link"
                  onClick={() => showToast("Password reset instructions dispatched to your verified email.")}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--primary-cyan)" }}
                >
                  Forgot Password?
                </button>
              </div>

              {/* SUBMIT BUTTON */}
              <button type="submit" className="submit-login-btn">
                <span>{role === "admin" ? "AUTHENTICATE TERMINAL 🛡️" : "AUTHENTICATE & ENTER →"}</span>
              </button>

              <p className="register-prompt">
                Need to rent right away?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--primary-red)", textDecoration: "underline" }}
                >
                  Browse Fleet without Account
                </button>
              </p>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
