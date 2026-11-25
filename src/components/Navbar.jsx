import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCarRental } from "../context/CarRentalContext";

export default function Navbar({ onSearch }) {
  const location = useLocation();
  const {
    user,
    userRole,
    currentMode,
    switchMode,
    logoutUser,
    openLoginModal,
    showToast,
    navigate,
    favorites
  } = useCarRental();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        if (onSearch) onSearch(searchInput);
        const el = document.getElementById("cars");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } else {
      if (onSearch) onSearch(searchInput);
      const el = document.getElementById("cars");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ACTIVE MODE STATUS BAR */}
      {user && (
        <div className="mode-status-bar" id="modeStatusBar">
          <div className="mode-status-inner">
            <div className="mode-info">
              <span
                className={`mode-badge ${currentMode === "admin" ? "admin-badge" : "driver-badge"}`}
                id="currentModeBadge"
              >
                {currentMode === "admin" ? "🛡️ ADMIN MODE ACTIVE" : "🏎️ DRIVER VIP MODE"}
              </span>
              <span className="mode-user-text" id="modeUserText">
                {currentMode === "admin" ? `Fleet Terminal: ${user}` : `Member Account: ${user}`}
              </span>
            </div>
            <div className="mode-actions" id="modeActionsContainer">
              {currentMode === "admin" ? (
                <>
                  <button
                    className="mode-btn-action btn-admin-launch"
                    type="button"
                    onClick={() => navigate("/admin")}
                  >
                    ⚡ Launch Admin Console ↗
                  </button>
                  <button
                    className="mode-btn-action"
                    type="button"
                    onClick={() => switchMode("driver")}
                  >
                    Switch to Driver
                  </button>
                  <button
                    className="mode-btn-action"
                    type="button"
                    onClick={logoutUser}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="mode-btn-action"
                    type="button"
                    onClick={() => navigate("/status")}
                    style={{
                      background: "rgba(0, 242, 254, 0.15)",
                      borderColor: "var(--primary-cyan)",
                      color: "var(--primary-cyan)"
                    }}
                  >
                    📍 Live Status
                  </button>
                  <button
                    className="mode-btn-action"
                    type="button"
                    onClick={() => navigate("/my-bookings")}
                  >
                    📑 My Bookings
                  </button>
                  <button
                    className="mode-btn-action"
                    type="button"
                    onClick={() => switchMode("admin")}
                  >
                    Switch to Admin
                  </button>
                  <button
                    className="mode-btn-action"
                    type="button"
                    onClick={() => handleNavClick("cars")}
                  >
                    Explore Fleet
                  </button>
                  <button
                    className="mode-btn-action"
                    type="button"
                    onClick={logoutUser}
                  >
                    Sign Out
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FLOATING NAVBAR */}
      <header className="navbar">
        <div className="brand">
          <button
            type="button"
            className="brand-logo-btn"
            onClick={() => navigate("/")}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            <img src="/pictures/logo.png" alt="RenderRCars Logo" />
          </button>
        </div>

        <nav className="nav-links">
          <button
            type="button"
            className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
            onClick={() => handleNavClick("home")}
          >
            <img src="/pictures/home.ico" alt="Home" />
            <span>Home</span>
          </button>

          <button
            type="button"
            className="nav-item"
            onClick={() => handleNavClick("cars")}
          >
            <img src="/pictures/icon multilevel.ico" alt="Fleet" />
            <span>Fleet</span>
          </button>

          <button
            type="button"
            className="nav-item"
            onClick={() => handleNavClick("experience")}
          >
            <span className="nav-icon-text">▶</span>
            <span>Experience</span>
          </button>

          <button
            type="button"
            className="nav-item"
            onClick={() => handleNavClick("deals")}
          >
            <span className="nav-icon-text">%</span>
            <span>Deals</span>
          </button>

          <button
            type="button"
            className="nav-item"
            onClick={() => handleNavClick("faq")}
          >
            <span className="nav-icon-text">?</span>
            <span>FAQ</span>
          </button>

          <button
            type="button"
            className={`nav-item ${location.pathname === "/status" ? "active" : ""}`}
            onClick={() => navigate("/status")}
          >
            <span className="nav-icon-text">📍</span>
            <span>Status</span>
          </button>

          <button
            type="button"
            className={`nav-item ${location.pathname === "/help" || location.pathname === "/help-center" ? "active" : ""}`}
            onClick={() => navigate("/help")}
            style={{ color: "var(--accent-gold)" }}
          >
            <span className="nav-icon-text">🚨</span>
            <span>Help SOS</span>
          </button>
        </nav>

        <form className="search-container" onSubmit={handleSearchSubmit}>
          <img src="/pictures/search.ico" alt="Search" className="search-icon" />
          <input
            type="text"
            id="searchInput"
            placeholder="Search M4, Fortuner, R8..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" aria-label="Search cars">
            <span>→</span>
          </button>
        </form>

        <div className="nav-actions">
          {/* QUICK MODE SELECTOR PILL */}
          <div className="nav-mode-selector" title="Switch Access Mode">
            <button
              type="button"
              className={`mode-btn ${currentMode === "driver" ? "active" : ""}`}
              id="btnNavDriverMode"
              onClick={() => switchMode("driver")}
            >
              🏎️ Driver
            </button>
            <button
              type="button"
              className={`mode-btn ${currentMode === "admin" ? "active" : ""}`}
              id="btnNavAdminMode"
              onClick={() => switchMode("admin")}
            >
              🛡️ Admin
            </button>
          </div>

          {/* WISHLIST BUTTON */}
          <button
            className="icon-button"
            type="button"
            title="Saved Wishlist Garage"
            onClick={() => navigate("/wishlist")}
            style={{ position: "relative" }}
          >
            ❤️
            {favorites.length > 0 && (
              <span style={{
                position: "absolute",
                top: "-4px",
                right: "-4px",
                background: "var(--primary-red)",
                color: "#fff",
                fontSize: "10px",
                fontWeight: 800,
                borderRadius: "50%",
                width: "16px",
                height: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                {favorites.length}
              </span>
            )}
          </button>

          {/* SETTINGS BUTTON */}
          <button
            className="icon-button"
            type="button"
            title="Settings"
            onClick={() => showToast("RenderRCars v2.8 Ultra Edition - React Native Engine Active")}
          >
            <img src="/pictures/setting.ico" alt="Settings" />
          </button>

          {/* LOGIN & ACCOUNT DROPDOWN */}
          <div className="login-dropdown-wrapper" ref={dropdownRef}>
            <button
              className="login-button"
              id="mainNavLoginBtn"
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span id="navLoginText">
                {user
                  ? `${userRole === "admin" ? "🛡️ " : "🏎️ "}${user.split("@")[0].toUpperCase()}`
                  : "LOGIN"}
              </span> ▾
            </button>

            {dropdownOpen && (
              <div className="login-dropdown-menu show" id="loginDropdownMenu">
                <div className="dropdown-header">
                  <span>SELECT LOGIN / PORTAL</span>
                </div>

                <button
                  type="button"
                  className="dropdown-item"
                  onClick={() => {
                    setDropdownOpen(false);
                    openLoginModal("driver");
                  }}
                >
                  <span className="item-icon">🏎️</span>
                  <div className="item-content">
                    <strong>Driver Member Mode</strong>
                    <small>VIP pricing & instant checkout</small>
                  </div>
                </button>

                <button
                  type="button"
                  className="dropdown-item"
                  onClick={() => {
                    setDropdownOpen(false);
                    openLoginModal("admin");
                  }}
                >
                  <span className="item-icon">🛡️</span>
                  <div className="item-content">
                    <strong>Admin Command Console</strong>
                    <small>Fleet controls & live telemetry</small>
                  </div>
                </button>

                <div className="dropdown-divider"></div>

                <button
                  type="button"
                  className="dropdown-item"
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/status");
                  }}
                >
                  <span className="item-icon">🛰️</span>
                  <div className="item-content">
                    <strong>Live Status Tracker</strong>
                    <small>Track vehicle telemetry & PIN</small>
                  </div>
                </button>

                <button
                  type="button"
                  className="dropdown-item"
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/help");
                  }}
                >
                  <span className="item-icon">🚨</span>
                  <div className="item-content">
                    <strong style={{ color: "var(--accent-gold)" }}>Help & Emergency SOS</strong>
                    <small>Roadside flatbed & fuel data</small>
                  </div>
                </button>

                <button
                  type="button"
                  className="dropdown-item"
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/my-bookings");
                  }}
                >
                  <span className="item-icon">📑</span>
                  <div className="item-content">
                    <strong>My Bookings</strong>
                    <small>View past trips & vouchers</small>
                  </div>
                </button>

                <button
                  type="button"
                  className="dropdown-item"
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/wishlist");
                  }}
                >
                  <span className="item-icon">❤️</span>
                  <div className="item-content">
                    <strong>Saved Wishlist ({favorites.length})</strong>
                    <small>Your dream garage</small>
                  </div>
                </button>

                {user && (
                  <>
                    <div className="dropdown-divider"></div>
                    <button
                      type="button"
                      className="dropdown-item logout-item"
                      onClick={() => {
                        setDropdownOpen(false);
                        logoutUser();
                      }}
                    >
                      <span className="item-icon">🔒</span>
                      <div className="item-content">
                        <strong>Sign Out Terminal</strong>
                        <small>Log out of active session</small>
                      </div>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
          {/* MOBILE HAMBURGER TOGGLE */}
          <button
            type="button"
            className="mobile-hamburger-btn"
            aria-label="Toggle Navigation Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {/* MOBILE NAV DRAWER & BACKDROP */}
      {mobileMenuOpen && (
        <div className="mobile-nav-backdrop" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-nav-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <img src="/pictures/logo.png" alt="RenderRCars" style={{ height: "30px", width: "auto" }} />
              <button
                type="button"
                className="mobile-close-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                ✕
              </button>
            </div>

            <form className="mobile-search-form" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search M4, Fortuner, R8..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button type="submit">GO</button>
            </form>

            <div className="mobile-drawer-links">
              <button
                type="button"
                className="mobile-link"
                onClick={() => handleNavClick("home")}
              >
                <span>🏎️ Home</span>
                <span>→</span>
              </button>
              <button
                type="button"
                className="mobile-link"
                onClick={() => handleNavClick("cars")}
              >
                <span>⚡ Master Fleet</span>
                <span>→</span>
              </button>
              <button
                type="button"
                className="mobile-link"
                onClick={() => handleNavClick("experience")}
              >
                <span>▶ Experience Video</span>
                <span>→</span>
              </button>
              <button
                type="button"
                className="mobile-link"
                onClick={() => handleNavClick("deals")}
              >
                <span>🏷️ VIP Deals & Coupons</span>
                <span>→</span>
              </button>
              <button
                type="button"
                className="mobile-link"
                onClick={() => handleNavClick("faq")}
              >
                <span>❓ FAQ & Help</span>
                <span>→</span>
              </button>
              <button
                type="button"
                className="mobile-link"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/help");
                }}
                style={{ color: "var(--accent-gold)" }}
              >
                <span>🚨 24/7 Help Center & SOS</span>
                <span>→</span>
              </button>
              <button
                type="button"
                className="mobile-link"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/status");
                }}
              >
                <span>📍 Live Status Tracker</span>
                <span>→</span>
              </button>
              <button
                type="button"
                className="mobile-link"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/my-bookings");
                }}
              >
                <span>📑 My Bookings</span>
                <span>→</span>
              </button>
              <button
                type="button"
                className="mobile-link"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/wishlist");
                }}
              >
                <span>❤️ Saved Wishlist ({favorites.length})</span>
                <span>→</span>
              </button>
            </div>

            <div className="mobile-drawer-footer">
              <div className="mobile-mode-switch">
                <button
                  type="button"
                  className={currentMode === "driver" ? "active" : ""}
                  onClick={() => {
                    switchMode("driver");
                    setMobileMenuOpen(false);
                  }}
                >
                  🏎️ Driver
                </button>
                <button
                  type="button"
                  className={currentMode === "admin" ? "active" : ""}
                  onClick={() => {
                    switchMode("admin");
                    setMobileMenuOpen(false);
                  }}
                >
                  🛡️ Admin
                </button>
              </div>

              {user ? (
                <button
                  type="button"
                  className="mobile-auth-btn mobile-logout"
                  onClick={() => {
                    logoutUser();
                    setMobileMenuOpen(false);
                  }}
                >
                  🔒 Sign Out ({user.split("@")[0].toUpperCase()})
                </button>
              ) : (
                <button
                  type="button"
                  className="mobile-auth-btn mobile-login"
                  onClick={() => {
                    openLoginModal("driver");
                    setMobileMenuOpen(false);
                  }}
                >
                  ⚡ Member Login / Register
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
