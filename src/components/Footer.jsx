import React from "react";
import { useLocation } from "react-router-dom";
import { useCarRental } from "../context/CarRentalContext";

export default function Footer({ onCategorySelect }) {
  const location = useLocation();
  const { navigate, showToast } = useCarRental();

  const handleFleetFilter = (cat) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        if (onCategorySelect) onCategorySelect(cat);
        const cars = document.getElementById("cars");
        if (cars) cars.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } else {
      if (onCategorySelect) onCategorySelect(cat);
      const cars = document.getElementById("cars");
      if (cars) cars.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="about">
      <div className="footer-inner">
        <div className="footer-logo">
          <img src="/pictures/logo.png" alt="RenderRCars Logo" />
          <p>
            DRIVE BEYOND LIMITS.<br />
            India's foremost luxury supercar and performance car rental ecosystem. Engineered for purists.
          </p>
          <div className="footer-hub-tags">
            <span className="hub-tag">📍 Hyderabad</span>
            <span className="hub-tag">📍 Bangalore</span>
            <span className="hub-tag">📍 Mumbai</span>
            <span className="hub-tag">📍 Delhi NCR</span>
            <span className="hub-tag">📍 Chennai</span>
            <span className="hub-tag">📍 Vijayawada</span>
            <span className="hub-tag">📍 Goa</span>
          </div>
        </div>

        <div className="footer-column">
          <h3>RENDER FLEET</h3>
          <button type="button" className="footer-link-btn" onClick={() => handleFleetFilter("sports")}>
            Supercars & Sports
          </button>
          <button type="button" className="footer-link-btn" onClick={() => handleFleetFilter("luxury")}>
            Luxury Sedans
          </button>
          <button type="button" className="footer-link-btn" onClick={() => handleFleetFilter("suv")}>
            4x4 Executive SUVs
          </button>
          <button type="button" className="footer-link-btn" onClick={() => {
            if (location.pathname !== "/") {
              navigate("/");
              setTimeout(() => {
                const el = document.getElementById("deals");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }, 200);
            } else {
              const el = document.getElementById("deals");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }
          }}>
            Exclusive Weekend Rates
          </button>
          <button type="button" className="footer-link-btn" onClick={() => navigate("/booking")}>
            Instant Reservation
          </button>
        </div>

        <div className="footer-column">
          <h3>LEGAL & SUPPORT</h3>
          <button type="button" className="footer-link-btn" onClick={() => navigate("/agreement")}>
            Rental Terms & Agreement
          </button>
          <button
            type="button"
            className="footer-link-btn"
            onClick={() => navigate("/login?role=admin")}
            style={{ color: "var(--primary-cyan)", fontWeight: 700 }}
          >
            🛡️ Fleet Admin Console
          </button>
          <button type="button" className="footer-link-btn" onClick={() => showToast("24/7 Roadside Assistance Line: +91 98765 43210")}>
            24/7 Roadside Assistance
          </button>
          <button type="button" className="footer-link-btn" onClick={() => showToast("Security Deposit Policy: 100% refundable hold released within 24 hours post vehicle check.")}>
            Security Deposit Policy
          </button>
          <button type="button" className="footer-link-btn" onClick={() => showToast("Damage & Insurance Guide: Comprehensive zero-deductible cover included on all rentals.")}>
            Damage & Insurance Guide
          </button>
        </div>

        <div className="footer-column">
          <h3>VIP CONCIERGE</h3>
          <a href="tel:+919876543210" className="footer-link-btn">📞 +91 98765 43210</a>
          <a href="mailto:vip@renderrcars.com" className="footer-link-btn">✉️ vip@renderrcars.com</a>
          <span className="footer-link-btn">📸 Instagram @renderrcars</span>
          <span className="footer-link-btn">▶️ YouTube Channel</span>
          <span className="footer-link-btn">💬 24/7 WhatsApp Support</span>
        </div>
      </div>

      <div className="copyright">
        <div>© 2026 RenderRCars Technologies Ltd. All rights reserved.</div>
        <div>Crafted for high-performance automotive enthusiasts in React.</div>
      </div>
    </footer>
  );
}
