import React from "react";
import { useCarRental } from "../context/CarRentalContext";
import { formatCurrency } from "../data/carsData";

export default function MyBookingsPage() {
  const { bookings, user, navigate, showToast } = useCarRental();

  // Filter bookings for current logged in user or show all active bookings
  const userBookings = user
    ? bookings.filter(b => b.email?.toLowerCase() === user.toLowerCase())
    : bookings;

  const handlePrint = (booking) => {
    showToast(`Opening printable voucher for ${booking.bookingId}...`);
    setTimeout(() => {
      window.print();
    }, 400);
  };

  return (
    <main className="booking-page driver-reservations-page">
      <div className="section-top" style={{ marginBottom: "32px" }}>
        <div>
          <div className="section-label">VIP TELEMETRY & GARAGE LOG</div>
          <h2>MY <span>RESERVATIONS</span></h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "6px" }}>
            {user ? `Active account: ${user}` : "Showing all recent vehicle bookings on this terminal"}
          </p>
        </div>

        <button
          className="primary-btn"
          type="button"
          onClick={() => navigate("/")}
        >
          EXPLORE FLEET 🏎️
        </button>
      </div>

      {userBookings.length === 0 ? (
        <div className="driver-booking-empty">
          <div className="empty-icon">🏎️</div>
          <h3>No Active Reservations In Vault</h3>
          <p>
            You haven't reserved any luxury supercars yet. Browse our master fleet and command your first drive.
          </p>
          <button className="primary-btn" onClick={() => navigate("/")}>
            Browse Available Fleet →
          </button>
        </div>
      ) : (
        <div className="driver-bookings-list">
          {userBookings.map((b, idx) => {
            let statusBadgeClass = "status-paid";
            if (b.paymentStatus === "Active" || b.paymentStatus === "Approved") statusBadgeClass = "status-active";
            else if (b.paymentStatus === "Cancelled") statusBadgeClass = "status-cancelled";
            else if (b.paymentStatus === "Denied") statusBadgeClass = "status-denied";
            else if (b.paymentStatus?.includes("Repossessed") || b.paymentStatus?.includes("Terminated")) statusBadgeClass = "status-repossessed";

            return (
              <div key={b.bookingId || idx} className="driver-booking-card">
                <div className="driver-booking-thumb-wrapper">
                  <img
                    src={b.carImage || "/pictures/hero-supercar.jpg"}
                    alt={b.carName}
                    className="driver-booking-thumb"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/pictures/hero-supercar.jpg";
                    }}
                  />
                  <span className="driver-booking-tag">VIP CHARTER</span>
                </div>

                <div className="driver-booking-info">
                  <div className="driver-booking-header">
                    <span className="booking-ref-code">{b.bookingId}</span>
                    <span className={`status-badge ${statusBadgeClass}`}>
                      ● {b.paymentStatus || "Confirmed"}
                    </span>
                  </div>

                  <h3 className="driver-booking-title">{b.carName}</h3>

                  <div className="driver-booking-meta">
                    <span className="meta-pill">📍 {b.pickupLocation}</span>
                    <span className="meta-pill">📅 {b.pickupDate} ({b.pickupTime || "09:00 AM"}) → {b.returnDate}</span>
                    <span className="meta-pill">⏱ {b.rentalDays || 1} Day{(b.rentalDays || 1) > 1 ? "s" : ""}</span>
                  </div>

                  <div className="driver-booking-subtext">
                    Renter: <strong>{b.customerName}</strong> • Method: <strong>{b.paymentMethod || "UPI"}</strong> • Dispatch: <span style={{ color: "var(--status-green)" }}>Instant Key Handover</span>
                  </div>

                  {b.denialReason && (
                    <div style={{ background: "rgba(255, 23, 68, 0.1)", border: "1px solid rgba(255, 23, 68, 0.3)", borderRadius: "8px", padding: "8px 12px", marginTop: "10px", fontSize: "12px", color: "#ff3366" }}>
                      🚫 <strong>Order Denied by Fleet Admin:</strong> {b.denialReason}
                    </div>
                  )}

                  {b.breachReason && (
                    <div style={{ background: "rgba(255, 23, 68, 0.15)", border: "1.5px solid #ff1744", borderRadius: "8px", padding: "10px 14px", marginTop: "10px", fontSize: "12px", color: "#ff1744" }}>
                      🚨 <strong>VEHICLE REPOSSESSED & IMMOBILIZED:</strong> Rental terminated by Fleet Admin due to: <em>{b.breachReason}</em>. Engine kill switch engaged at {b.repossessedAt || "Mid-Trip"}.
                    </div>
                  )}
                </div>

                <div className="driver-booking-actions">
                  <div className="driver-booking-fare">
                    <small>TOTAL CHARTER</small>
                    <div className="fare-amount">{formatCurrency(b.totalAmount)}</div>
                  </div>

                  <button
                    type="button"
                    className="telemetry-live-btn"
                    onClick={() => navigate(`/status?bookingId=${b.bookingId}`)}
                  >
                    🛰️ Live Telemetry API ↗
                  </button>

                  <button
                    type="button"
                    className="secondary-btn voucher-btn"
                    onClick={() => handlePrint(b)}
                  >
                    🖨️ Voucher Receipt
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
