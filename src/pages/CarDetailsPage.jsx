import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCarRental } from "../context/CarRentalContext";
import { getCarById } from "../data/carsData";
import { playEngineRevSound } from "../utils/soundEffects";

export default function CarDetailsPage() {
  const { carId } = useParams();
  const {
    fleet,
    selectedCar,
    setSelectedCar,
    selectCarForBooking,
    openRentedModal,
    showToast,
    navigate,
    formatCurrency
  } = useCarRental();

  const car = carId ? (getCarById(carId, fleet) || selectedCar) : selectedCar;

  useEffect(() => {
    if (car) {
      setSelectedCar(car);
      document.title = `${car.name} Specs & Rental | RenderRCars`;
    }
  }, [car]);

  if (!car) {
    return (
      <div style={{ textAlign: "center", padding: "100px 20px" }}>
        <h2>Vehicle Not Found</h2>
        <button className="primary-btn" onClick={() => navigate("/")}>
          Return to Fleet
        </button>
      </div>
    );
  }

  const proceedToBooking = () => {
    selectCarForBooking(car.id);
  };

  return (
    <main className="details-page">
      {/* BREADCRUMB */}
      <div className="details-breadcrumb">
        <button
          type="button"
          className="back-btn"
          onClick={() => navigate("/")}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          ← Back to Garage
        </button>
        <div className="breadcrumb-path">
          Fleet / <span>{car.name}</span>
        </div>
      </div>

      {/* 0. ACTIVE MISSION NOTIFICATION (WHEN RENTED) */}
      {car.status === "Rented" && (
        <div style={{
          background: "linear-gradient(135deg, rgba(0, 242, 254, 0.15), rgba(0, 112, 243, 0.15))",
          border: "1px solid var(--primary-cyan)",
          borderRadius: "14px",
          padding: "16px 20px",
          marginBottom: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "14px",
          boxShadow: "0 8px 24px rgba(0, 242, 254, 0.2)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span className="pulse-dot" style={{ background: "var(--primary-cyan)", boxShadow: "0 0 10px var(--primary-cyan)" }}></span>
            <div>
              <strong style={{ color: "var(--primary-cyan)", fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px" }}>
                🔴 Active VIP Mission Telemetry
              </strong>
              <div style={{ color: "#fff", fontSize: "13px", marginTop: "2px" }}>
                Currently on track with verified VIP Member in {car.activeMission?.gpsCity || "Mumbai Hub"} • Returning tomorrow at 06:00 PM
              </div>
            </div>
          </div>

          <button
            type="button"
            className="secondary-btn"
            style={{
              padding: "8px 16px",
              fontSize: "12px",
              background: "var(--primary-cyan)",
              color: "#000",
              fontWeight: 800,
              borderColor: "transparent"
            }}
            onClick={() => openRentedModal(car)}
          >
            Pre-Book Next Slot / Switch Vehicle →
          </button>
        </div>
      )}

      {/* 1. HERO SHOWCASE & BASIC INFO */}
      <section className="detail-hero">
        <div className="detail-gallery">
          <div className="main-image-container">
            <div className="car-badge-overlay">
              <span className={`car-tag ${car.tagClass || "tag-hot"}`}>{car.tag || "HOT"}</span>
            </div>
            <img
              src={car.image}
              alt={car.name}
              id="carImage"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/pictures/hero-supercar.jpg";
              }}
            />
          </div>
        </div>

        <div className="detail-summary">
          <div>
            <div className="detail-header-group">
              <h1 id="carName">{car.name}</h1>
              <div className="detail-subtitle">{car.brand} • {car.category.toUpperCase()}</div>
            </div>

            <div className="detail-rating">
              ★ ★ ★ ★ ★ <span>{car.rating} ({car.reviews} verified reviews)</span>
            </div>

            <p className="detail-description">{car.description}</p>

            <div className="quick-highlights">
              <div className="highlight-box">
                <div className="highlight-icon">⚡</div>
                <div className="highlight-text">
                  <small>Power Output</small>
                  <strong>{car.horsepower}</strong>
                </div>
              </div>

              <div className="highlight-box">
                <div className="highlight-icon">⏱️</div>
                <div className="highlight-text">
                  <small>0 - 100 km/h</small>
                  <strong>{car.performance?.acceleration}</strong>
                </div>
              </div>

              <div className="highlight-box">
                <div className="highlight-icon">⚙️</div>
                <div className="highlight-text">
                  <small>Transmission</small>
                  <strong>{car.transmission}</strong>
                </div>
              </div>

              <div className="highlight-box">
                <div className="highlight-icon">👤</div>
                <div className="highlight-text">
                  <small>Seating</small>
                  <strong>{car.seats}</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-price-action">
            <div className="price-display-lg">
              <small>Daily Self-Drive Rate</small>
              <div className="amount">{formatCurrency(car.price)} <span>/ Day</span></div>
            </div>

            <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
              <button
                type="button"
                className="secondary-btn"
                style={{
                  padding: "12px 18px",
                  fontSize: "13px",
                  fontWeight: 800,
                  background: "rgba(255, 23, 68, 0.12)",
                  borderColor: "rgba(255, 23, 68, 0.4)",
                  color: "var(--primary-red)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px"
                }}
                onClick={() => {
                  playEngineRevSound();
                  showToast(`🔊 Revving ${car.name} twin-turbo engine at 8,200 RPM! 🔥`);
                }}
              >
                <span>🔊</span> REV EXHAUST SOUND
              </button>

              {car.status === "Rented" ? (
                <button
                  className="btn-rent-large"
                  type="button"
                  style={{
                    background: "linear-gradient(135deg, rgba(0, 242, 254, 0.3), rgba(0, 112, 243, 0.3))",
                    border: "1px solid var(--primary-cyan)",
                    color: "var(--primary-cyan)"
                  }}
                  onClick={() => openRentedModal(car)}
                >
                  PRE-BOOK WINDOW 🗓️
                </button>
              ) : (
                <button className="btn-rent-large" type="button" onClick={proceedToBooking}>
                  RENT THIS CAR →
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. PERFORMANCE & POWERTRAIN */}
      <section className="spec-section">
        <div className="spec-section-header">
          <span className="section-icon">⚡</span>
          <h2>Performance & Powertrain</h2>
        </div>
        <div className="spec-grid-layout">
          <div className="spec-tile">
            <span className="spec-tile-title">Engine</span>
            <span className="spec-tile-value">{car.performance?.engine}</span>
          </div>
          <div className="spec-tile">
            <span className="spec-tile-title">Displacement</span>
            <span className="spec-tile-value">{car.performance?.displacement}</span>
          </div>
          <div className="spec-tile">
            <span className="spec-tile-title">Horsepower</span>
            <span className="spec-tile-value">{car.performance?.horsepower}</span>
          </div>
          <div className="spec-tile">
            <span className="spec-tile-title">Max Torque</span>
            <span className="spec-tile-value">{car.performance?.torque}</span>
          </div>
          <div className="spec-tile">
            <span className="spec-tile-title">0 - 100 KM/H</span>
            <span className="spec-tile-value">{car.performance?.acceleration}</span>
          </div>
          <div className="spec-tile">
            <span className="spec-tile-title">Top Speed</span>
            <span className="spec-tile-value">{car.performance?.topSpeed}</span>
          </div>
          <div className="spec-tile">
            <span className="spec-tile-title">Fuel Type</span>
            <span className="spec-tile-value">{car.performance?.fuelType}</span>
          </div>
          <div className="spec-tile">
            <span className="spec-tile-title">Fuel Mileage</span>
            <span className="spec-tile-value">{car.performance?.mileage}</span>
          </div>
        </div>
      </section>

      {/* 3. TRANSMISSION & DRIVETRAIN */}
      <section className="spec-section">
        <div className="spec-section-header">
          <span className="section-icon">⚙️</span>
          <h2>Transmission & Drivetrain</h2>
        </div>
        <div className="spec-grid-layout">
          <div className="spec-tile">
            <span className="spec-tile-title">Transmission</span>
            <span className="spec-tile-value">{car.drivetrain?.transmission}</span>
          </div>
          <div className="spec-tile">
            <span className="spec-tile-title">Drive Type</span>
            <span className="spec-tile-value">{car.drivetrain?.driveType}</span>
          </div>
          <div className="spec-tile">
            <span className="spec-tile-title">Gearbox</span>
            <span className="spec-tile-value">{car.drivetrain?.gearbox}</span>
          </div>
          <div className="spec-tile">
            <span className="spec-tile-title">Steering System</span>
            <span className="spec-tile-value">{car.drivetrain?.steering}</span>
          </div>
        </div>
      </section>

      {/* 4 & 5. DIMENSIONS & CAPACITY */}
      <div className="specs-two-col">
        <section className="spec-section">
          <div className="spec-section-header">
            <span className="section-icon">📐</span>
            <h2>Vehicle Dimensions</h2>
          </div>
          <div className="spec-grid-layout">
            <div className="spec-tile">
              <span className="spec-tile-title">Overall Length</span>
              <span className="spec-tile-value">{car.dimensions?.length}</span>
            </div>
            <div className="spec-tile">
              <span className="spec-tile-title">Overall Width</span>
              <span className="spec-tile-value">{car.dimensions?.width}</span>
            </div>
            <div className="spec-tile">
              <span className="spec-tile-title">Overall Height</span>
              <span className="spec-tile-value">{car.dimensions?.height}</span>
            </div>
            <div className="spec-tile">
              <span className="spec-tile-title">Wheelbase</span>
              <span className="spec-tile-value">{car.dimensions?.wheelbase}</span>
            </div>
            <div className="spec-tile">
              <span className="spec-tile-title">Boot Space</span>
              <span className="spec-tile-value">{car.dimensions?.bootSpace}</span>
            </div>
          </div>
        </section>

        <section className="spec-section">
          <div className="spec-section-header">
            <span className="section-icon">💺</span>
            <h2>Capacity & Fuel Tank</h2>
          </div>
          <div className="spec-grid-layout">
            <div className="spec-tile">
              <span className="spec-tile-title">Seating Capacity</span>
              <span className="spec-tile-value">{car.capacity?.seating}</span>
            </div>
            <div className="spec-tile">
              <span className="spec-tile-title">Doors</span>
              <span className="spec-tile-value">{car.capacity?.doors}</span>
            </div>
            <div className="spec-tile">
              <span className="spec-tile-title">Fuel Tank</span>
              <span className="spec-tile-value">{car.capacity?.fuelTank}</span>
            </div>
          </div>
        </section>
      </div>

      {/* 6. FEATURES */}
      <section className="spec-section">
        <div className="spec-section-header">
          <span className="section-icon">✨</span>
          <h2>Interior & Tech Features</h2>
        </div>
        <div className="features-grid">
          {car.features?.map((f, i) => (
            <div key={i} className="feature-card-item">
              <span className="feat-icon">{f.icon}</span>
              <div>
                <strong>{f.name}</strong>
                <small>{f.desc}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. SAFETY & SECURITY */}
      <section className="spec-section">
        <div className="spec-section-header">
          <span className="section-icon">🛡️</span>
          <h2>Safety & Assistance Systems</h2>
        </div>
        <div className="safety-grid">
          {car.safety?.map((s, i) => (
            <div key={i} className="safety-item">
              <span className="safety-check">✓</span>
              <span>{s}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 8. LIVE VEHICLE HEALTH & DIGITAL CERTIFICATION */}
      <section className="spec-section">
        <div className="spec-section-header">
          <span className="section-icon">📡</span>
          <h2>Live Fleet Telematics & Vehicle Health</h2>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px"
        }}>
          <div className="spec-tile">
            <span className="spec-tile-title">Registration Number</span>
            <span className="spec-tile-value" style={{ color: "var(--primary-cyan)" }}>
              {car.registrationPlate || "TS-09-EX-7788"}
            </span>
          </div>

          <div className="spec-tile">
            <span className="spec-tile-title">Live Odometer</span>
            <span className="spec-tile-value">
              {car.odometer || "12,840 KM"}
            </span>
          </div>

          <div className="spec-tile">
            <span className="spec-tile-title">Fuel Condition</span>
            <span className="spec-tile-value" style={{ color: "var(--status-green)" }}>
              100% 98 RON High-Octane
            </span>
          </div>

          <div className="spec-tile">
            <span className="spec-tile-title">GPS Satellite Tracker</span>
            <span className="spec-tile-value" style={{ color: "var(--primary-cyan)" }}>
              Active & Geofenced
            </span>
          </div>

          <div className="spec-tile">
            <span className="spec-tile-title">Tire Health</span>
            <span className="spec-tile-value">
              Pirelli P-Zero (94% Tread)
            </span>
          </div>

          <div className="spec-tile">
            <span className="spec-tile-title">50-Point Roadworthiness</span>
            <span className="spec-tile-value" style={{ color: "var(--status-green)" }}>
              ✓ Verified & Certified
            </span>
          </div>
        </div>
      </section>

      {/* DEMO DISCLAIMER */}
      <div className="demo-disclaimer-box">
        <span>ℹ️</span>
        <div>
          <strong>Notice:</strong> Specifications, equipment and performance metrics shown above represent demonstration data for the RenderRCars platform. Vehicle availability is subject to physical fleet inspection at the hub.
        </div>
      </div>

      {/* STICKY BOTTOM ACTION BAR */}
      <aside className="bottom-rent-bar">
        <div className="bottom-car-info">
          <img className="bottom-car-thumb" src={car.image} alt={car.name} />
          <div className="bottom-text">
            <h3>{car.name}</h3>
            <span>{car.category}</span>
          </div>
        </div>

        <div className="bottom-price-action">
          <div className="price-display-lg" style={{ marginRight: "10px" }}>
            <small>Daily Rate</small>
            <div className="amount" style={{ fontSize: "24px" }}>
              {formatCurrency(car.price)} <span>/ Day</span>
            </div>
          </div>
          {car.status === "Rented" ? (
            <button
              className="btn-rent-large"
              type="button"
              style={{
                background: "linear-gradient(135deg, rgba(0, 242, 254, 0.3), rgba(0, 112, 243, 0.3))",
                border: "1px solid var(--primary-cyan)",
                color: "var(--primary-cyan)"
              }}
              onClick={() => openRentedModal(car)}
            >
              PRE-BOOK WINDOW 🗓️
            </button>
          ) : (
            <button className="btn-rent-large" type="button" onClick={proceedToBooking}>
              RENT THIS CAR →
            </button>
          )}
        </div>
      </aside>
    </main>
  );
}





