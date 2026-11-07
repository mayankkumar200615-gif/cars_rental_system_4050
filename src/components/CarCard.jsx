import React from "react";
import { useCarRental } from "../context/CarRentalContext";

export default function CarCard({ car }) {
  const {
    selectCarForDetails,
    selectCarForBooking,
    favorites,
    toggleFavorite,
    formatCurrency,
    openRentModal,
    openRentedModal
  } = useCarRental();

  const isFav = favorites.includes(car.id);
  const isAvailable = !car.status || car.status === "Available";

  return (
    <article className="car-card" data-name={car.name} data-category={car.categoryKey}>
      <div className="car-image">
        <div style={{ display: "flex", gap: "6px", position: "absolute", top: "12px", left: "12px", zIndex: 3 }}>
          <span className={`car-tag ${car.tagClass || "tag-hot"}`}>
            {car.tag || "HOT"}
          </span>
          {!isAvailable && (
            <span style={{
              background: car.status === "Rented" ? "rgba(0, 242, 254, 0.2)" : "rgba(255, 183, 3, 0.2)",
              color: car.status === "Rented" ? "var(--primary-cyan)" : "var(--accent-gold)",
              border: `1px solid ${car.status === "Rented" ? "var(--primary-cyan)" : "var(--accent-gold)"}`,
              fontSize: "10.5px",
              fontWeight: 800,
              padding: "4px 8px",
              borderRadius: "20px",
              backdropFilter: "blur(8px)"
            }}>
              {car.status === "Rented" ? "● ON TRIP" : "● SERVICE"}
            </span>
          )}
        </div>

        <button
          className={`card-fav-btn ${isFav ? "active" : ""}`}
          type="button"
          title={isFav ? "Remove from Wishlist" : "Save to Wishlist"}
          onClick={() => toggleFavorite(car.id)}
        >
          {isFav ? "❤️" : "🤍"}
        </button>

        <img
          src={car.image}
          alt={`${car.name} ${car.model || ""}`}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/pictures/hero-supercar.jpg";
          }}
        />
        <div className="car-image-gradient"></div>
      </div>

      <div className="car-info">
        <div className="car-top">
          <div className="car-title-group">
            <h3>{car.name}</h3>
            <span>{car.model || `${car.brand} • ${car.category}`}</span>
          </div>
          <div className="rating">
            ★★★★★ <small>{car.rating || 4.9}</small>
          </div>
        </div>

        <div className="specs-grid">
          <div className="spec-item">
            <span className="spec-label">Power</span>
            <span className="spec-val">⚡ {car.horsepower}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">0 - 100</span>
            <span className="spec-val">⏱ {car.performance ? car.performance.acceleration : "3.8s"}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Seats</span>
            <span className="spec-val">👤 {car.seats}</span>
          </div>
        </div>

        <div className="price-row">
          <div className="price-box">
            <small>DAILY RENTAL RATE</small>
            <div className="price-num">{formatCurrency(car.price)} <span>/ Day</span></div>
          </div>
        </div>

        {car.status === "Rented" && (
          <div style={{
            background: "rgba(0, 242, 254, 0.08)",
            border: "1px dashed rgba(0, 242, 254, 0.35)",
            borderRadius: "8px",
            padding: "8px 10px",
            fontSize: "11px",
            color: "var(--primary-cyan)",
            marginBottom: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <span>🔴 On Active Trip • {car.activeMission?.gpsCity || "Mumbai"}</span>
            <span style={{ fontWeight: 800 }}>Free: Tomorrow 6 PM</span>
          </div>
        )}

        <div className="card-actions">
          <button
            type="button"
            className="btn-details"
            onClick={() => selectCarForDetails(car.id)}
          >
            VIEW SPECS
          </button>

          {isAvailable ? (
            <button
              type="button"
              className="btn-rent"
              onClick={() => selectCarForBooking(car.id)}
            >
              RENT NOW →
            </button>
          ) : (
            <button
              type="button"
              className="btn-rent"
              style={{
                background: "linear-gradient(135deg, rgba(0, 242, 254, 0.2), rgba(0, 112, 243, 0.2))",
                border: "1px solid var(--primary-cyan)",
                color: "var(--primary-cyan)"
              }}
              onClick={() => openRentedModal(car)}
            >
              MISSION STATUS 📡
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
