import React, { useState, useEffect } from "react";
import { useCarRental } from "../context/CarRentalContext";

export default function LoginModal() {
  const { loginModal, closeLoginModal, loginUser, showToast, navigate } = useCarRental();
  const [role, setRole] = useState("driver");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  useEffect(() => {
    if (loginModal.open) {
      setRole(loginModal.role || "driver");
      setEmail("");
      setPassword("");
      setShowPassword(false);
    }
  }, [loginModal.open, loginModal.role]);

  if (!loginModal.open) return null;

  const handleAutoFill = () => {
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
        setTimeout(() => {
          navigate("/admin");
        }, 300);
      } else {
        showToast("Invalid admin credentials. Use demo: admin@renderrcars.com / admin123");
      }
    } else {
      loginUser(cleanEmail, "driver");
    }
  };

  return (
    <div className="modal active" id="loginModal" onClick={(e) => {
      if (e.target.id === "loginModal") closeLoginModal();
    }}>
      <div className="modal-box auth-modal-box">
        <button className="close" type="button" onClick={closeLoginModal}>×</button>
        <div className="modal-label" id="modalAuthLabel">
          {role === "admin" ? "FLEET COMMAND ACCESS" : "VIP CLUB ACCESS"}
        </div>
        <h2 id="modalAuthTitle">
          {role === "admin" ? "ADMIN CONSOLE LOGIN" : "DRIVER ACCOUNT LOGIN"}
        </h2>

        {/* ROLE SELECTOR TABS */}
        <div className="auth-role-tabs">
          <button
            type="button"
            className={`auth-role-tab ${role === "driver" ? "active" : ""}`}
            onClick={() => setRole("driver")}
          >
            🏎️ Driver Mode
          </button>
          <button
            type="button"
            className={`auth-role-tab ${role === "admin" ? "active" : ""}`}
            onClick={() => setRole("admin")}
          >
            🛡️ Admin Mode
          </button>
        </div>

        {/* DEMO AUTO-FILL HELPER */}
        <div className="auth-demo-banner">
          <span>Demo: <strong>{role === "admin" ? "admin@renderrcars.com" : "driver@renderrcars.com"}</strong></span>
          <button type="button" className="btn-demo-autofill" onClick={handleAutoFill}>
            Auto Fill ⚡
          </button>
        </div>

        <p style={{ color: "var(--text-secondary)", fontSize: "13px", margin: "10px 0 15px" }}>
          {role === "admin"
            ? "Authenticate with administrator ID to access live fleet telemetry & dispatch."
            : "Access member discounts, zero-deposit rentals and fast booking checkout."}
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="modalEmail">
            {role === "admin" ? "ADMINISTRATOR ID / EMAIL" : "DRIVER EMAIL ADDRESS"}
          </label>
          <input
            type="email"
            id="modalEmail"
            placeholder={role === "admin" ? "admin@renderrcars.com" : "driver@renderrcars.com"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <label htmlFor="modalPassword">PASSWORD</label>
          <div className="modal-input-group">
            <input
              type={showPassword ? "text" : "password"}
              id="modalPassword"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              className="btn-pwd-eye"
              onClick={() => setShowPassword(!showPassword)}
              title="Show/Hide Password"
            >
              👁️
            </button>
          </div>

          <div className="auth-modal-options">
            <label className="auth-remember-check">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              /> Remember session
            </label>
            <button
              type="button"
              className="auth-portal-link"
              onClick={() => {
                closeLoginModal();
                navigate(`/login?role=${role}`);
              }}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              Open Full Portal ↗
            </button>
          </div>

          <button
            className="confirm-button auth-submit-btn"
            type="submit"
            style={{ margin: "18px 0 0 0" }}
          >
            {role === "admin" ? "AUTHENTICATE AS ADMIN 🛡️" : "LOGIN AS DRIVER →"}
          </button>
        </form>
      </div>
    </div>
  );
}
