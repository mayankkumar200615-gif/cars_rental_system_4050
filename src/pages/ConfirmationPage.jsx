import React from "react";
import { useCarRental } from "../context/CarRentalContext";
import { formatCurrency } from "../data/carsData";

export default function ConfirmationPage() {
  const {
    confirmedBooking,
    bookingData,
    selectedCar,
    navigate,
    adminAuth,
    showToast
  } = useCarRental();

  const booking = confirmedBooking || bookingData || {
    bookingId: "RRC-2026-894120",
    customerName: "Mayank Kumar",
    email: "driver@renderrcars.com",
    phone: "+91 98765 43210",
    license: "DL-0420110012345",
    pickupLocation: "Vijayawada Experience Hub (Benz Circle)",
    pickupDate: new Date().toISOString().split("T")[0],
    pickupTime: "09:00 AM",
    returnDate: new Date(Date.now() + 3 * 86400000).toISOString().split("T")[0],
    returnTime: "08:00 PM",
    rentalDays: 3,
    paymentMethod: "UPI / Instant Transfer",
    totalAmount: 22696,
    paidTimestamp: new Date().toLocaleString("en-IN")
  };

  const car = selectedCar || {
    name: booking.carName || "BMW M4 Competition",
    brand: "BMW",
    category: "Sports Coupe",
    image: booking.carImage || "/pictures/hero-supercar.jpg",
    registrationPlate: "TS-09-EX-7788"
  };

  const handoverPin = "8492";
  const insurancePolicy = "HDFC-ERGO-COMM-LUXE-889412";
  const conciergeLead = "Aditya Rathore (Chief Fleet Concierge #RRC-EXEC-882)";

  // Print voucher
  const handlePrint = () => {
    showToast("Preparing printable invoice receipt...");
    setTimeout(() => {
      window.print();
    }, 400);
  };

  // Download standalone luxury HTML receipt
  const handleDownloadReceipt = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>RenderRCars Official Voucher - ${booking.bookingId}</title>
  <style>
    body { font-family: 'Segoe UI', -apple-system, Roboto, sans-serif; background: #0c0f18; color: #ffffff; padding: 40px; margin: 0; }
    .voucher-card { max-width: 780px; margin: 0 auto; background: #121624; border: 2px solid #ff1744; border-radius: 16px; padding: 36px; box-shadow: 0 20px 50px rgba(0,0,0,0.8); }
    .header { text-align: center; border-bottom: 1px solid rgba(255,255,255,0.15); padding-bottom: 20px; margin-bottom: 24px; }
    .seal { color: #ffb703; font-size: 13px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; }
    h1 { margin: 0; font-size: 28px; color: #ffffff; letter-spacing: 1px; }
    .booking-ref { background: rgba(0,242,254,0.15); border: 1px solid #00f2fe; color: #00f2fe; padding: 10px 18px; border-radius: 8px; font-size: 18px; font-weight: 800; display: inline-block; margin: 16px 0; }
    .pin-box { background: rgba(255,23,68,0.15); border: 1px dashed #ff1744; border-radius: 10px; padding: 14px; text-align: center; margin-bottom: 24px; }
    .pin-box strong { font-size: 22px; color: #ff1744; letter-spacing: 4px; display: block; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
    .field { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 12px 14px; border-radius: 8px; }
    .field small { color: #8892b0; font-size: 11px; text-transform: uppercase; display: block; margin-bottom: 4px; font-weight: 700; }
    .field strong { font-size: 14px; color: #ffffff; }
    .total-strip { background: linear-gradient(135deg, rgba(255,23,68,0.3), rgba(0,242,254,0.3)); border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .total-strip span { font-size: 15px; font-weight: 800; }
    .total-strip strong { font-size: 26px; color: #00f2fe; }
    .footer { text-align: center; font-size: 11px; color: #6c757d; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 18px; }
    @media print { body { background: #fff; color: #000; padding: 0; } .voucher-card { background: #fff; color: #000; border: 2px solid #000; box-shadow: none; } .field { background: #f8f9fa; border: 1px solid #ddd; } .field strong, h1, .total-strip strong { color: #000; } }
  </style>
</head>
<body>
  <div class="voucher-card">
    <div class="header">
      <div class="seal">★ RENDER R CARS LUXURY AUTOMOTIVE DIVISION ★</div>
      <h1>OFFICIAL RESERVATION PASSPORT</h1>
      <div class="booking-ref">REF: ${booking.bookingId}</div>
    </div>

    <div class="pin-box">
      <small style="color: #a0aec0; text-transform: uppercase; font-weight: 700;">DIGITAL VEHICLE HANDOVER PIN</small>
      <strong>${handoverPin}</strong>
      <small style="color: #cbd5e0; font-size: 11px;">Present this PIN to the concierge upon physical vehicle key delivery</small>
    </div>

    <div class="grid">
      <div class="field" style="grid-column: 1 / -1;">
        <small>Reserved Supercar</small>
        <strong style="color: #00f2fe; font-size: 16px;">${booking.carName || car.name} (${car.brand} • ${car.category})</strong>
      </div>
      <div class="field">
        <small>Renter Full Name</small>
        <strong>${booking.customerName}</strong>
      </div>
      <div class="field">
        <small>Driving Licence No.</small>
        <strong>${booking.license}</strong>
      </div>
      <div class="field">
        <small>Pickup Hub & Date</small>
        <strong>${booking.pickupLocation} — ${booking.pickupDate} (${booking.pickupTime || "09:00 AM"})</strong>
      </div>
      <div class="field">
        <small>Return Hub & Date</small>
        <strong>${booking.pickupLocation} — ${booking.returnDate} (${booking.returnTime || "08:00 PM"})</strong>
      </div>
      <div class="field">
        <small>Assigned Delivery Lead</small>
        <strong>${conciergeLead}</strong>
      </div>
      <div class="field">
        <small>Commercial Insurance Cover</small>
        <strong style="color: #00e676;">Active (Policy #${insurancePolicy})</strong>
      </div>
    </div>

    <div class="total-strip">
      <span>TOTAL AMOUNT PAID (${booking.paymentMethod || "UPI / Cards"})</span>
      <strong>${formatCurrency(booking.totalAmount)}</strong>
    </div>

    <div class="footer">
      RenderRCars India • 24/7 Roadside Assistance: +91 98765 43210 • support@renderrcars.com<br>
      Pre-delivery 50-point inspection certified. 100% sanitized vehicle with full fuel tank.
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `RenderRCars-Voucher-${booking.bookingId || "RRC-VIP"}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Luxury Voucher downloaded for ${booking.bookingId}! 📥`);
  };

  return (
    <main className="confirmation-page">
      {/* STEP PROGRESS BAR */}
      <div className="step-progress">
        <div className="step-item completed">
          <div className="step-num">✓</div>
          <div className="step-name">Vehicle & Form</div>
        </div>
        <div className="step-item completed">
          <div className="step-num">✓</div>
          <div className="step-name">Agreement</div>
        </div>
        <div className="step-item completed">
          <div className="step-num">✓</div>
          <div className="step-name">Payment</div>
        </div>
        <div className="step-item active">
          <div className="step-num">✓</div>
          <div className="step-name">Confirmation</div>
        </div>
      </div>

      {/* LUXURY RESERVATION CERTIFICATE CARD */}
      <section className="confirmation-card" style={{ maxWidth: "860px", margin: "0 auto", position: "relative" }}>
        {/* GOLD SEAL OF AUTHENTICITY */}
        <div style={{
          textAlign: "center",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          paddingBottom: "24px",
          marginBottom: "28px"
        }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(255, 183, 3, 0.15)",
            border: "1px solid rgba(255, 183, 3, 0.4)",
            color: "var(--accent-gold)",
            fontSize: "11px",
            fontWeight: 800,
            letterSpacing: "1.5px",
            padding: "5px 14px",
            borderRadius: "20px",
            textTransform: "uppercase",
            marginBottom: "12px"
          }}>
            <span>★</span> RENDER VIP AUTOMOTIVE CONCIERGE <span>★</span>
          </div>

          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "30px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "1px", margin: 0 }}>
            EXECUTIVE RESERVATION <span style={{ color: "var(--primary-cyan)" }}>PASSPORT</span>
          </h1>

          <p style={{ color: "var(--text-secondary)", fontSize: "13.5px", marginTop: "6px" }}>
            Official certified self-drive booking voucher with GPS live dispatch priority.
          </p>
        </div>

        {/* BOOKING REFERENCE & DIGITAL PIN DUAL STRIP */}
        <div className="confirmation-ref-dual">
          {/* REF CODE */}
          <div style={{
            background: "rgba(0, 242, 254, 0.08)",
            border: "1px solid rgba(0, 242, 254, 0.3)",
            borderRadius: "14px",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}>
            <small style={{ fontSize: "10.5px", fontWeight: 800, color: "var(--text-muted)", letterSpacing: "1px", textTransform: "uppercase" }}>
              Official Booking Reference
            </small>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: "24px", fontWeight: 900, color: "var(--primary-cyan)", letterSpacing: "1px", marginTop: "2px" }}>
              {booking.bookingId || "RRC-2026-894120"}
            </div>
          </div>

          {/* HANDOVER PIN */}
          <div style={{
            background: "linear-gradient(135deg, rgba(255, 23, 68, 0.15), rgba(138, 43, 226, 0.15))",
            border: "1px dashed var(--primary-red)",
            borderRadius: "14px",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center"
          }}>
            <small style={{ fontSize: "10px", fontWeight: 800, color: "var(--primary-red)", letterSpacing: "1px", textTransform: "uppercase" }}>
              🔑 DIGITAL HANDOVER PIN
            </small>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: "28px", fontWeight: 900, color: "#fff", letterSpacing: "6px", margin: "2px 0" }}>
              {handoverPin}
            </div>
            <span style={{ fontSize: "10.5px", color: "var(--text-secondary)" }}>
              Present to Concierge Lead at Key Delivery
            </span>
          </div>
        </div>

        {/* RECEIPT DETAILS GRID */}
        <div className="receipt-grid" style={{ marginBottom: "28px" }}>
          {/* VEHICLE SHOWCASE CARD */}
          <div className="receipt-vehicle-card" style={{
            background: "linear-gradient(135deg, rgba(16, 20, 32, 0.95), rgba(10, 12, 20, 0.95))",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: "16px",
            padding: "18px",
            display: "flex",
            gap: "20px",
            alignItems: "center"
          }}>
            <img
              src={booking.carImage || car.image}
              alt={booking.carName || car.name}
              style={{ width: "130px", height: "85px", objectFit: "cover", borderRadius: "12px", border: "1px solid var(--border-color)" }}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/pictures/hero-supercar.jpg";
              }}
            />
            <div>
              <span style={{
                background: "rgba(0, 230, 118, 0.15)",
                color: "var(--status-green)",
                border: "1px solid rgba(0, 230, 118, 0.4)",
                fontSize: "10px",
                fontWeight: 800,
                padding: "2px 8px",
                borderRadius: "10px",
                textTransform: "uppercase"
              }}>
                ✓ 50-POINT ROADWORTHINESS VERIFIED
              </span>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "22px", color: "#fff", margin: "6px 0 2px" }}>
                {booking.carName || car.name}
              </h3>
              <span style={{ color: "var(--text-secondary)", fontSize: "12.5px" }}>
                {car.brand} • {car.category} | Plate: <strong style={{ color: "var(--primary-cyan)" }}>{car.registrationPlate || "TS-09-EX-7788"}</strong>
              </span>
            </div>
          </div>

          <div className="receipt-field">
            <small>Customer Legal Name</small>
            <strong>{booking.customerName}</strong>
          </div>

          <div className="receipt-field">
            <small>Driving Licence Number</small>
            <strong>{booking.license}</strong>
          </div>

          <div className="receipt-field">
            <small>Contact Email & Phone</small>
            <strong>{booking.email} | {booking.phone}</strong>
          </div>

          <div className="receipt-field">
            <small>Pickup Hub & Schedule</small>
            <strong>{booking.pickupLocation} — {booking.pickupDate} ({booking.pickupTime || "09:00 AM"})</strong>
          </div>

          <div className="receipt-field">
            <small>Return Hub & Schedule</small>
            <strong>{booking.pickupLocation} — {booking.returnDate} ({booking.returnTime || "08:00 PM"})</strong>
          </div>

          <div className="receipt-field">
            <small>Assigned Delivery Concierge</small>
            <strong style={{ color: "var(--primary-cyan)" }}>{conciergeLead}</strong>
          </div>

          <div className="receipt-field">
            <small>Commercial Insurance Cover</small>
            <strong style={{ color: "var(--status-green)" }}>Active (Policy #{insurancePolicy})</strong>
          </div>

          <div className="receipt-field">
            <small>Payment Method & Auth</small>
            <strong>{booking.paymentMethod || "UPI / Instant"} • Paid at {booking.paidTimestamp || new Date().toLocaleString("en-IN")}</strong>
          </div>
        </div>

        {/* ITEMIZED TOTAL PAID STRIP */}
        <div className="total-paid-strip" style={{
          background: "linear-gradient(135deg, rgba(255, 23, 68, 0.2), rgba(0, 242, 254, 0.2))",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "14px",
          padding: "20px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "28px"
        }}>
          <div>
            <span style={{ fontSize: "12px", fontWeight: 800, color: "var(--text-secondary)", letterSpacing: "1px", textTransform: "uppercase" }}>
              TOTAL AMOUNT PAID (INCL. GST & DEPOSIT HOLD)
            </span>
            <div style={{ fontSize: "11px", color: "var(--status-green)", fontWeight: 700, marginTop: "2px" }}>
              ✓ Commercial Receipt Generated • 100% Refundable Security Deposit Protected
            </div>
          </div>
          <strong style={{ fontFamily: "var(--font-heading)", fontSize: "32px", fontWeight: 900, color: "var(--primary-cyan)" }}>
            {formatCurrency(booking.totalAmount)}
          </strong>
        </div>

        {/* SVG BARCODE & SECURITY QR STRIP */}
        <div style={{
          background: "rgba(0, 0, 0, 0.4)",
          border: "1px solid var(--border-color)",
          borderRadius: "14px",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "32px",
          flexWrap: "wrap",
          gap: "14px"
        }}>
          {/* BARCODE GRAPHIC */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <svg width="220" height="42" style={{ opacity: 0.9 }}>
              <rect x="0" y="0" width="3" height="42" fill="#fff" />
              <rect x="5" y="0" width="2" height="42" fill="#fff" />
              <rect x="10" y="0" width="5" height="42" fill="#fff" />
              <rect x="18" y="0" width="2" height="42" fill="#fff" />
              <rect x="23" y="0" width="4" height="42" fill="#fff" />
              <rect x="30" y="0" width="6" height="42" fill="#fff" />
              <rect x="40" y="0" width="2" height="42" fill="#fff" />
              <rect x="45" y="0" width="4" height="42" fill="#fff" />
              <rect x="52" y="0" width="7" height="42" fill="#fff" />
              <rect x="62" y="0" width="3" height="42" fill="#fff" />
              <rect x="68" y="0" width="5" height="42" fill="#fff" />
              <rect x="76" y="0" width="2" height="42" fill="#fff" />
              <rect x="81" y="0" width="6" height="42" fill="#fff" />
              <rect x="90" y="0" width="3" height="42" fill="#fff" />
              <rect x="96" y="0" width="5" height="42" fill="#fff" />
              <rect x="104" y="0" width="2" height="42" fill="#fff" />
              <rect x="109" y="0" width="6" height="42" fill="#fff" />
              <rect x="118" y="0" width="4" height="42" fill="#fff" />
              <rect x="125" y="0" width="3" height="42" fill="#fff" />
              <rect x="131" y="0" width="7" height="42" fill="#fff" />
              <rect x="141" y="0" width="2" height="42" fill="#fff" />
              <rect x="146" y="0" width="5" height="42" fill="#fff" />
              <rect x="154" y="0" width="3" height="42" fill="#fff" />
              <rect x="160" y="0" width="6" height="42" fill="#fff" />
              <rect x="169" y="0" width="4" height="42" fill="#fff" />
              <rect x="176" y="0" width="2" height="42" fill="#fff" />
              <rect x="181" y="0" width="5" height="42" fill="#fff" />
              <rect x="189" y="0" width="3" height="42" fill="#fff" />
              <rect x="195" y="0" width="6" height="42" fill="#fff" />
              <rect x="204" y="0" width="4" height="42" fill="#fff" />
              <rect x="211" y="0" width="4" height="42" fill="#fff" />
            </svg>
            <span style={{ fontSize: "10px", letterSpacing: "3px", color: "var(--text-muted)", fontFamily: "'Space Grotesk', monospace" }}>
              *{booking.bookingId || "RRC-2026-894120"}*
            </span>
          </div>

          <div style={{ textAlign: "right", fontSize: "11px", color: "var(--text-secondary)" }}>
            <div style={{ color: "var(--primary-cyan)", fontWeight: 800 }}>CRYPTOGRAPHIC SECURITY HASH:</div>
            <code style={{ fontSize: "10px", color: "var(--text-muted)" }}>SHA256: 9f8a42bc...7c2e8810a</code>
          </div>
        </div>

        {/* ACTION BUTTONS (DOWNLOAD & RETURN) */}
        <div className="confirmation-actions" style={{ gap: "14px", flexWrap: "wrap", justifyContent: "center" }}>
          <button
            type="button"
            className="primary-btn"
            style={{
              padding: "14px 24px",
              background: "linear-gradient(135deg, rgba(0, 242, 254, 0.25), rgba(0, 112, 243, 0.25))",
              border: "1px solid var(--primary-cyan)",
              color: "var(--primary-cyan)"
            }}
            onClick={() => navigate(`/status?bookingId=${booking.bookingId || "RRC-2026-894120"}`)}
          >
            <span>🛰️</span> TRACK REAL-TIME STATUS & TELEMETRY
          </button>

          <button
            type="button"
            className="primary-btn"
            style={{ padding: "14px 24px" }}
            onClick={handleDownloadReceipt}
          >
            <span>📥</span> DOWNLOAD LUXURY RECEIPT (.HTML)
          </button>

          <button
            type="button"
            className="secondary-btn"
            style={{ padding: "14px 24px" }}
            onClick={handlePrint}
          >
            <span>🖨️</span> PRINT OFFICIAL VOUCHER
          </button>

          <button
            type="button"
            className="secondary-btn"
            onClick={() => navigate("/")}
          >
            RETURN TO FLEET →
          </button>

          {adminAuth && (
            <button
              type="button"
              className="secondary-btn"
              style={{ borderColor: "var(--primary-cyan)", color: "var(--primary-cyan)" }}
              onClick={() => navigate("/admin")}
            >
              <span>🛡️</span> ADMIN CONSOLE
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
