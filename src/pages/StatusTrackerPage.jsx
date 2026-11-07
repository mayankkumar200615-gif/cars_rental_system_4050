import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useCarRental } from "../context/CarRentalContext";
import { fetchLiveRentalStatus, pingApiEndpoints } from "../utils/statusApi";
import { formatCurrency } from "../data/carsData";

export default function StatusTrackerPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { bookings, fleet, user, navigate, showToast } = useCarRental();

  const [inputQuery, setInputQuery] = useState(() => {
    return searchParams.get("bookingId") || searchParams.get("id") || "";
  });

  const [loading, setLoading] = useState(false);
  const [statusData, setStatusData] = useState(null);
  const [apiRawOpen, setApiRawOpen] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState(null);

  // Auto-load status on mount or searchParam change
  useEffect(() => {
    const bookingParam = searchParams.get("bookingId") || searchParams.get("id");
    let queryToRun = bookingParam;

    if (!queryToRun) {
      if (user && bookings.length > 0) {
        // Find user's latest booking
        const userBooking = bookings.find(b => b.email?.toLowerCase() === user.toLowerCase());
        queryToRun = userBooking ? userBooking.bookingId : bookings[0].bookingId;
      } else if (bookings.length > 0) {
        queryToRun = bookings[0].bookingId;
      }
    }

    if (queryToRun) {
      setInputQuery(queryToRun);
      loadStatus(queryToRun);
    }
  }, [searchParams, user]);

  const loadStatus = async (query) => {
    if (!query || !query.trim()) {
      showToast("Please enter a Booking ID or email address");
      return;
    }
    setLoading(true);
    try {
      const response = await fetchLiveRentalStatus(query.trim(), bookings, fleet);
      setStatusData(response);
      setLastRefreshed(new Date().toLocaleTimeString());
      if (response.success) {
        showToast(`⚡ Telemetry & status synchronized for ${response.booking.bookingId}`);
      } else {
        showToast(response.error || "Reservation not found");
      }
    } catch (err) {
      showToast("API Connection failed. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (inputQuery.trim()) {
      setSearchParams({ bookingId: inputQuery.trim() });
      loadStatus(inputQuery.trim());
    }
  };

  return (
    <main className="booking-page" style={{ padding: "40px 20px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* HEADER SECTION */}
      <div className="section-top" style={{ marginBottom: "25px", flexWrap: "wrap", gap: "15px" }}>
        <div>
          <div className="section-label" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{
              display: "inline-block",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#00f2fe",
              boxShadow: "0 0 10px #00f2fe"
            }}></span>
            LIVE API SATELLITE TRACKER
          </div>
          <h2>REAL-TIME <span>RESERVATION STATUS</span></h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "4px" }}>
            Direct encrypted link to RenderRCars Fleet Dispatch & OBD-II Telemetry API
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button
            type="button"
            className="secondary-btn"
            style={{ padding: "10px 18px", fontSize: "13px" }}
            onClick={() => loadStatus(inputQuery)}
            disabled={loading}
          >
            {loading ? "🔄 Syncing API..." : "⚡ Refresh Live Telemetry"}
          </button>

          <button
            type="button"
            className="primary-btn"
            style={{ padding: "10px 18px", fontSize: "13px" }}
            onClick={() => navigate("/my-bookings")}
          >
            📑 All Bookings
          </button>
        </div>
      </div>

      {/* SEARCH / QUERY BAR */}
      <div style={{
        background: "linear-gradient(135deg, rgba(20, 20, 32, 0.95), rgba(12, 12, 20, 0.98))",
        border: "1px solid var(--border-color)",
        borderRadius: "18px",
        padding: "20px",
        marginBottom: "30px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "15px"
      }}>
        <form onSubmit={handleSearchSubmit} style={{ display: "flex", gap: "10px", flex: 1, minWidth: "280px" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <input
              type="text"
              placeholder="Enter Booking ID (e.g. RRC-2026-894120) or Email..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 18px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid var(--border-color)",
                borderRadius: "12px",
                color: "#fff",
                fontSize: "14px"
              }}
            />
          </div>
          <button
            type="submit"
            className="primary-btn"
            style={{ padding: "12px 24px", whiteSpace: "nowrap" }}
            disabled={loading}
          >
            {loading ? "Connecting..." : "Query Status API 🔍"}
          </button>
        </form>

        {/* API STATUS BADGE */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          background: "rgba(0, 242, 254, 0.08)",
          border: "1px solid rgba(0, 242, 254, 0.25)",
          padding: "8px 16px",
          borderRadius: "100px",
          fontSize: "12px"
        }}>
          <span style={{ color: "var(--primary-cyan)", fontWeight: 700 }}>
            🟢 API Uplink: Online (200 OK)
          </span>
          <span style={{ color: "var(--text-muted)" }}>•</span>
          <span style={{ color: "var(--text-secondary)" }}>
            Latency: {statusData?.telemetry?.networkLatency || "28ms"}
          </span>
          {lastRefreshed && (
            <>
              <span style={{ color: "var(--text-muted)" }}>•</span>
              <span style={{ color: "var(--text-muted)" }}>Updated {lastRefreshed}</span>
            </>
          )}
        </div>
      </div>

      {/* LOADING STATE */}
      {loading && !statusData && (
        <div style={{
          background: "var(--bg-card)",
          borderRadius: "20px",
          padding: "80px 20px",
          textAlign: "center",
          border: "1px solid var(--border-color)"
        }}>
          <div style={{ fontSize: "48px", animation: "spin 1.5s linear infinite" }}>🔄</div>
          <h3 style={{ color: "#fff", marginTop: "15px" }}>Querying Fleet Telemetry API...</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
            Establishing encrypted handshake with vehicle OBD-II transponder
          </p>
        </div>
      )}

      {/* NOT FOUND ERROR */}
      {!loading && statusData && !statusData.success && (
        <div style={{
          background: "rgba(255, 23, 68, 0.08)",
          border: "1px solid rgba(255, 23, 68, 0.3)",
          borderRadius: "20px",
          padding: "50px 20px",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "48px", marginBottom: "15px" }}>⚠️</div>
          <h3 style={{ color: "var(--primary-red)", marginBottom: "8px" }}>API Query Returned 404 Not Found</h3>
          <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto 20px auto", fontSize: "14px" }}>
            {statusData.error}
          </p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <button
              type="button"
              className="secondary-btn"
              onClick={() => {
                if (bookings.length > 0) {
                  setInputQuery(bookings[0].bookingId);
                  loadStatus(bookings[0].bookingId);
                }
              }}
            >
              Load Demo Booking ({bookings[0]?.bookingId})
            </button>
            <button type="button" className="primary-btn" onClick={() => navigate("/")}>
              Explore Master Fleet
            </button>
          </div>
        </div>
      )}

      {/* LIVE STATUS DETAILS */}
      {!loading && statusData && statusData.success && (
        <div style={{ display: "grid", gap: "25px" }}>
          {/* TOP MISSION BANNER */}
          <div style={{
            background: "linear-gradient(135deg, rgba(16, 16, 28, 0.95), rgba(8, 8, 16, 0.98))",
            border: "1px solid var(--border-color)",
            borderRadius: "20px",
            padding: "24px 30px",
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            gap: "24px",
            alignItems: "center"
          }}>
            <img
              src={statusData.car.image || "/pictures/hero-supercar.jpg"}
              alt={statusData.car.name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/pictures/hero-supercar.jpg";
              }}
              style={{
                width: "160px",
                height: "110px",
                objectFit: "cover",
                borderRadius: "14px",
                border: "1px solid var(--border-color)"
              }}
            />

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px", flexWrap: "wrap" }}>
                <span style={{
                  background: "rgba(0, 242, 254, 0.15)",
                  color: "var(--primary-cyan)",
                  padding: "4px 12px",
                  borderRadius: "6px",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: "13px"
                }}>
                  {statusData.booking.bookingId}
                </span>

                <span style={{
                  background: statusData.stage === 4 ? "rgba(0, 242, 254, 0.2)" : "rgba(34, 197, 94, 0.2)",
                  color: statusData.stage === 4 ? "var(--primary-cyan)" : "#22c55e",
                  border: `1px solid ${statusData.stage === 4 ? "var(--primary-cyan)" : "#22c55e"}`,
                  padding: "4px 12px",
                  borderRadius: "100px",
                  fontSize: "12px",
                  fontWeight: 700,
                  textTransform: "uppercase"
                }}>
                  ● {statusData.stageLabel}
                </span>

                <span style={{
                  background: "rgba(255, 184, 0, 0.15)",
                  color: "var(--primary-gold)",
                  border: "1px solid rgba(255, 184, 0, 0.3)",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontWeight: 700
                }}>
                  PIN: {statusData.handoverPin}
                </span>
              </div>

              <h2 style={{ color: "#fff", fontSize: "24px", fontFamily: "var(--font-heading)", marginBottom: "6px" }}>
                {statusData.car.name}
              </h2>

              <div style={{ color: "var(--text-secondary)", fontSize: "13px", display: "flex", gap: "15px", flexWrap: "wrap" }}>
                <span>📍 {statusData.booking.pickupLocation}</span>
                <span>📅 {statusData.booking.pickupDate} → {statusData.booking.returnDate}</span>
                <span>👤 Driver: {statusData.booking.customerName}</span>
                <span>💳 Total: {formatCurrency(statusData.booking.totalAmount)}</span>
              </div>
            </div>

            <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: "10px" }}>
              <button
                type="button"
                className="secondary-btn"
                style={{ padding: "10px 18px", fontSize: "12px", whiteSpace: "nowrap" }}
                onClick={() => setApiRawOpen(!apiRawOpen)}
              >
                {apiRawOpen ? "Hide API Raw JSON ◂" : "Inspect Raw API JSON ▸"}
              </button>

              <button
                type="button"
                className="primary-btn"
                style={{ padding: "10px 18px", fontSize: "12px", whiteSpace: "nowrap" }}
                onClick={() => navigate("/confirmation")}
              >
                📥 Luxury Passport
              </button>
            </div>
          </div>

          {/* COLLAPSIBLE RAW API JSON INSPECTOR */}
          {apiRawOpen && (
            <div style={{
              background: "#080811",
              border: "1px solid rgba(0, 242, 254, 0.3)",
              borderRadius: "16px",
              padding: "20px",
              fontFamily: "monospace",
              fontSize: "12px",
              color: "#a0aec0",
              overflowX: "auto"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "8px" }}>
                <span style={{ color: "var(--primary-cyan)", fontWeight: 700 }}>
                  GET {statusData.apiMeta.endpoint} • HTTP/2 200 OK
                </span>
                <span style={{ color: "var(--text-muted)" }}>{statusData.apiMeta.timestamp}</span>
              </div>
              <pre style={{ margin: 0, color: "#38bdf8", lineHeight: 1.5 }}>
                {JSON.stringify(statusData, null, 2)}
              </pre>
            </div>
          )}

          {/* 5-STAGE PROGRESS TIMELINE */}
          <div style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            borderRadius: "20px",
            padding: "28px"
          }}>
            <h3 style={{
              color: "#fff",
              fontFamily: "var(--font-heading)",
              fontSize: "18px",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}>
              <span>🏁</span> LIVE MISSION TIMELINE
            </h3>

            <div style={{ display: "grid", gap: "20px" }}>
              {statusData.steps.map((st) => (
                <div
                  key={st.step}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "40px 1fr auto",
                    gap: "20px",
                    alignItems: "center",
                    padding: "16px",
                    borderRadius: "14px",
                    background: st.active
                      ? "rgba(0, 242, 254, 0.08)"
                      : st.completed
                      ? "rgba(34, 197, 94, 0.04)"
                      : "rgba(255, 255, 255, 0.02)",
                    border: st.active
                      ? "1px solid var(--primary-cyan)"
                      : st.completed
                      ? "1px solid rgba(34, 197, 94, 0.2)"
                      : "1px solid var(--border-color)"
                  }}
                >
                  <div style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: "14px",
                    background: st.completed
                      ? "#22c55e"
                      : st.active
                      ? "var(--primary-cyan)"
                      : "rgba(255, 255, 255, 0.1)",
                    color: st.completed || st.active ? "#000" : "#fff",
                    boxShadow: st.active ? "0 0 15px var(--primary-cyan)" : "none"
                  }}>
                    {st.completed ? "✓" : st.step}
                  </div>

                  <div>
                    <h4 style={{
                      color: st.active ? "var(--primary-cyan)" : st.completed ? "#fff" : "var(--text-muted)",
                      fontSize: "15px",
                      marginBottom: "4px"
                    }}>
                      {st.title}
                    </h4>
                    <p style={{ color: "var(--text-secondary)", fontSize: "13px", margin: 0 }}>
                      {st.description}
                    </p>
                  </div>

                  <div style={{
                    fontSize: "12px",
                    color: st.active ? "var(--primary-cyan)" : "var(--text-muted)",
                    fontWeight: 700,
                    whiteSpace: "nowrap"
                  }}>
                    {st.timestamp}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TELEMETRY & CONCIERGE DUAL GRID */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "25px" }}>
            {/* CONCIERGE CARD */}
            <div style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              borderRadius: "20px",
              padding: "25px"
            }}>
              <div className="section-label" style={{ fontSize: "11px", marginBottom: "12px" }}>
                ASSIGNED VALET CONCIERGE
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
                <div style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #00f2fe, #0070f3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "26px",
                  color: "#000",
                  fontWeight: 800
                }}>
                  👨‍✈️
                </div>
                <div>
                  <h4 style={{ color: "#fff", fontSize: "18px", margin: 0 }}>{statusData.concierge.name}</h4>
                  <div style={{ color: "var(--primary-cyan)", fontSize: "12px", marginTop: "2px" }}>
                    {statusData.concierge.badge} • {statusData.concierge.rating}
                  </div>
                  <div style={{ color: "var(--text-secondary)", fontSize: "12px", marginTop: "4px" }}>
                    Status: <strong style={{ color: "#22c55e" }}>{statusData.concierge.status}</strong>
                  </div>
                </div>
              </div>

              <div style={{
                background: "rgba(255, 255, 255, 0.03)",
                borderRadius: "12px",
                padding: "16px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                marginBottom: "20px"
              }}>
                <div>
                  <small style={{ color: "var(--text-muted)", display: "block" }}>DISTANCE</small>
                  <strong style={{ color: "#fff", fontSize: "15px" }}>{statusData.concierge.distanceKm}</strong>
                </div>
                <div>
                  <small style={{ color: "var(--text-muted)", display: "block" }}>ESTIMATED ARRIVAL</small>
                  <strong style={{ color: "var(--primary-gold)", fontSize: "15px" }}>
                    {statusData.concierge.etaMinutes > 0 ? `~${statusData.concierge.etaMinutes} Mins` : "On Site"}
                  </strong>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <a
                  href={`tel:${statusData.concierge.phone}`}
                  className="secondary-btn"
                  style={{ flex: 1, textAlign: "center", padding: "10px", fontSize: "13px", textDecoration: "none" }}
                >
                  📞 Call Concierge
                </a>
                <a
                  href={`https://wa.me/919845077122?text=Hi%20Concierge,%20regarding%20booking%20${statusData.booking.bookingId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="primary-btn"
                  style={{
                    flex: 1,
                    textAlign: "center",
                    padding: "10px",
                    fontSize: "13px",
                    background: "linear-gradient(135deg, #25D366, #128C7E)",
                    textDecoration: "none"
                  }}
                >
                  💬 WhatsApp VIP
                </a>
              </div>
            </div>

            {/* LIVE OBD-II TELEMETRY CARD */}
            <div style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              borderRadius: "20px",
              padding: "25px"
            }}>
              <div className="section-label" style={{ fontSize: "11px", marginBottom: "12px" }}>
                OBD-II LIVE TELEMETRY VITAL FEED
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                <div style={{
                  background: "rgba(255, 23, 68, 0.06)",
                  border: "1px solid rgba(255, 23, 68, 0.2)",
                  borderRadius: "14px",
                  padding: "16px"
                }}>
                  <small style={{ color: "var(--primary-red)", display: "block", fontSize: "11px", fontWeight: 700 }}>
                    CURRENT VELOCITY
                  </small>
                  <div style={{ fontSize: "28px", fontWeight: 800, color: "#fff", marginTop: "4px" }}>
                    {statusData.telemetry.speedKmH} <span style={{ fontSize: "14px", color: "var(--text-muted)" }}>KM/H</span>
                  </div>
                </div>

                <div style={{
                  background: "rgba(0, 242, 254, 0.06)",
                  border: "1px solid rgba(0, 242, 254, 0.2)",
                  borderRadius: "14px",
                  padding: "16px"
                }}>
                  <small style={{ color: "var(--primary-cyan)", display: "block", fontSize: "11px", fontWeight: 700 }}>
                    ENGINE REV
                  </small>
                  <div style={{ fontSize: "28px", fontWeight: 800, color: "#fff", marginTop: "4px" }}>
                    {statusData.telemetry.engineRpm} <span style={{ fontSize: "14px", color: "var(--text-muted)" }}>RPM</span>
                  </div>
                </div>

                <div style={{
                  background: "rgba(34, 197, 94, 0.06)",
                  border: "1px solid rgba(34, 197, 94, 0.2)",
                  borderRadius: "14px",
                  padding: "16px"
                }}>
                  <small style={{ color: "#22c55e", display: "block", fontSize: "11px", fontWeight: 700 }}>
                    FUEL / BATTERY SOC
                  </small>
                  <div style={{ fontSize: "28px", fontWeight: 800, color: "#fff", marginTop: "4px" }}>
                    {statusData.telemetry.fuelOrBatteryPct}%
                  </div>
                </div>

                <div style={{
                  background: "rgba(255, 184, 0, 0.06)",
                  border: "1px solid rgba(255, 184, 0, 0.2)",
                  borderRadius: "14px",
                  padding: "16px"
                }}>
                  <small style={{ color: "var(--primary-gold)", display: "block", fontSize: "11px", fontWeight: 700 }}>
                    OIL TEMP / TIRES
                  </small>
                  <div style={{ fontSize: "28px", fontWeight: 800, color: "#fff", marginTop: "4px" }}>
                    {statusData.telemetry.engineTempC}°C
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "16px", fontSize: "12px", color: "var(--text-secondary)" }}>
                <div>📍 GPS Coords: <strong style={{ color: "#fff" }}>{statusData.telemetry.gpsCoords}</strong></div>
                <div style={{ marginTop: "4px" }}>
                  🛡️ Security Transponder: <strong style={{ color: "#22c55e" }}>{statusData.telemetry.antiTheftStatus}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

