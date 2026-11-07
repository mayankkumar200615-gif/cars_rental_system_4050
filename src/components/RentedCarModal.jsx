import React, { useState } from "react";
import { useCarRental } from "../context/CarRentalContext";
import { formatCurrency } from "../data/carsData";

export default function RentedCarModal({ car, isOpen, onClose }) {
  const { navigate, setSelectedCar, setBookingData, bookingData, showToast, fleet } = useCarRental();
  const [phoneInput, setPhoneInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  if (!isOpen || !car) return null;

  const mission = car.activeMission || {
    driver: "Verified VIP Member (#RRC-482)",
    route: "Bandra-Worli Sea Link & Express Highway, Mumbai",
    currentSpeed: "86 km/h",
    returnEta: "Tomorrow at 06:00 PM",
    gpsCity: "Mumbai Hub",
    geofenceStatus: "Inside Authorized High-Speed Corridor"
  };

  // Find an available alternative in the fleet
  const alternativeCar = (fleet || []).find(c => c.id !== car.id && (!c.status || c.status === "Available")) || {
    id: "bmw-m4",
    name: "BMW M4 Competition",
    brand: "BMW",
    price: 4999
  };

  const handlePreBookNext = () => {
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
    const fourDaysLater = new Date(Date.now() + 4 * 86400000).toISOString().split("T")[0];

    setSelectedCar(car);
    setBookingData({
      ...bookingData,
      carId: car.id,
      carName: car.name,
      carImage: car.image,
      pickupDate: tomorrow,
      returnDate: fourDaysLater,
      pickupTime: "06:30 PM"
    });

    onClose();
    showToast(`Pre-booking window locked for ${car.name}! Proceeding to reservation...`);
    navigate("/booking");
  };

  const handleSwitchAlternative = () => {
    setSelectedCar(alternativeCar);
    setBookingData({
      ...bookingData,
      carId: alternativeCar.id,
      carName: alternativeCar.name,
      carImage: alternativeCar.image,
      discountCode: "SWITCHEarly10"
    });

    onClose();
    showToast(`Switched to ${alternativeCar.name} with 10% instant VIP switch privilege! 🎉`);
    navigate(`/details/${alternativeCar.id}`);
  };

  const handleSubscribeNotification = (e) => {
    e.preventDefault();
    if (!phoneInput || phoneInput.trim().length < 10) {
      showToast("Please enter a valid 10-digit mobile number");
      return;
    }
    setSubscribed(true);
    showToast(`SMS & WhatsApp priority alert set for ${phoneInput}! You'll be notified the second ${car.name} finishes return inspection.`);
  };

  return (
    <div className="modal" onClick={onClose} style={{ zIndex: 1100 }}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "560px", padding: "32px" }}>
        <button className="close" onClick={onClose} aria-label="Close">✕</button>

        {/* HEADER BADGE */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
          <span style={{
            background: "rgba(255, 23, 68, 0.2)",
            color: "var(--primary-red)",
            border: "1px solid var(--primary-red)",
            fontSize: "11px",
            fontWeight: 800,
            letterSpacing: "1px",
            padding: "4px 10px",
            borderRadius: "20px",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px"
          }}>
            <span className="pulse-dot"></span> LIVE MISSION TELEMETRY
          </span>
          <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 700 }}>
            PLATE: {car.registrationPlate || "TS-09-EX-7788"}
          </span>
        </div>

        {/* CAR HEADER INFO */}
        <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "20px" }}>
          <img
            src={car.image}
            alt={car.name}
            style={{ width: "110px", height: "72px", objectFit: "cover", borderRadius: "10px", border: "1px solid var(--border-color)" }}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/pictures/hero-supercar.jpg";
            }}
          />
          <div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "22px", color: "#fff", marginBottom: "2px" }}>
              {car.name}
            </h3>
            <span style={{ color: "var(--primary-cyan)", fontSize: "13px", fontWeight: 700 }}>
              {car.brand} • {car.category} ({formatCurrency(car.price)}/day)
            </span>
          </div>
        </div>

        {/* ACTIVE TELEMETRY STATS CARD */}
        <div style={{
          background: "rgba(0, 0, 0, 0.4)",
          border: "1px solid var(--border-color)",
          borderRadius: "14px",
          padding: "16px",
          marginBottom: "24px"
        }}>
          <div style={{ fontSize: "11px", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>
            🛰️ Real-Time On-Road Status
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "13px" }}>
            <div>
              <small style={{ display: "block", color: "var(--text-muted)", fontSize: "10.5px" }}>Current Driver</small>
              <strong style={{ color: "#fff" }}>{mission.driver}</strong>
            </div>

            <div>
              <small style={{ display: "block", color: "var(--text-muted)", fontSize: "10.5px" }}>Live Speed</small>
              <strong style={{ color: "var(--primary-cyan)" }}>⚡ {mission.currentSpeed}</strong>
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <small style={{ display: "block", color: "var(--text-muted)", fontSize: "10.5px" }}>Active Corridor & GPS</small>
              <span style={{ color: "#fff" }}>📍 {mission.route}</span>
            </div>

            <div style={{ gridColumn: "1 / -1", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "8px" }}>
              <small style={{ display: "block", color: "var(--accent-gold)", fontSize: "10.5px", fontWeight: 700 }}>
                Next Handover & Availability:
              </small>
              <strong style={{ color: "#fff", fontSize: "14px" }}>
                🗓️ {mission.returnEta} (Post 50-point inspection)
              </strong>
            </div>
          </div>
        </div>

        {/* ACTION OPTIONS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <button
            type="button"
            className="primary-btn"
            style={{ width: "100%", justifyContent: "center" }}
            onClick={handlePreBookNext}
          >
            🗓️ PRE-BOOK NEXT WINDOW (TOMORROW 6 PM) →
          </button>

          {alternativeCar && (
            <button
              type="button"
              className="secondary-btn"
              style={{
                width: "100%",
                justifyContent: "center",
                background: "rgba(0, 242, 254, 0.08)",
                borderColor: "rgba(0, 242, 254, 0.3)",
                color: "var(--primary-cyan)"
              }}
              onClick={handleSwitchAlternative}
            >
              ⚡ SWITCH TO AVAILABLE {alternativeCar.name.toUpperCase()} (10% OFF)
            </button>
          )}

          {/* NOTIFY ME FORM */}
          {!subscribed ? (
            <form onSubmit={handleSubscribeNotification} style={{ display: "flex", gap: "8px", marginTop: "6px" }}>
              <input
                type="tel"
                placeholder="Enter mobile for instant return SMS"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                style={{
                  flex: 1,
                  background: "var(--bg-input)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "10px",
                  padding: "10px 14px",
                  fontSize: "12.5px",
                  color: "#fff"
                }}
              />
              <button
                type="submit"
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid var(--border-color)",
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: 700,
                  padding: "0 14px",
                  borderRadius: "10px"
                }}
              >
                🔔 Notify Me
              </button>
            </form>
          ) : (
            <div style={{ textAlign: "center", fontSize: "12px", color: "var(--status-green)", fontWeight: 700, marginTop: "6px" }}>
              ✓ SMS alert scheduled for {phoneInput}!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

