import React from "react";
import { useCarRental } from "../context/CarRentalContext";
import { getCarById } from "../data/carsData";
import CarCard from "../components/CarCard";

export default function WishlistPage() {
  const { favorites, fleet, navigate } = useCarRental();

  const favCars = favorites
    .map(id => getCarById(id, fleet))
    .filter(Boolean);

  return (
    <main style={{ padding: "40px 20px 80px", maxWidth: "1200px", margin: "0 auto" }}>
      <div className="section-top" style={{ marginBottom: "30px" }}>
        <div>
          <div className="section-label">SAVED VEHICLES</div>
          <h2>MY <span>WISHLIST</span> ({favorites.length})</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "4px" }}>
            Supercars and luxury SUVs saved to your personal dream garage.
          </p>
        </div>

        <button
          className="view-all"
          type="button"
          onClick={() => navigate("/")}
        >
          EXPLORE ALL CARS →
        </button>
      </div>

      {favCars.length === 0 ? (
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          borderRadius: "20px",
          padding: "60px 20px",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "48px", marginBottom: "15px" }}>❤️</div>
          <h3 style={{ color: "#fff", marginBottom: "8px" }}>Your Wishlist is Empty</h3>
          <p style={{ color: "var(--text-secondary)", marginBottom: "20px" }}>
            Click the heart icon on any supercar card in our fleet to bookmark it here for fast reservation.
          </p>
          <button className="primary-btn" onClick={() => navigate("/")}>
            Explore Fleet →
          </button>
        </div>
      ) : (
        <div className="car-grid">
          {favCars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </main>
  );
}

