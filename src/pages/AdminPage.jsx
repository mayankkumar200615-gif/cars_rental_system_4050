import React, { useState, useEffect } from "react";
import { useCarRental } from "../context/CarRentalContext";
import { formatCurrency } from "../data/carsData";
import GpsTrackerView from "../components/GpsTrackerView";
import {
  fetchLiveRentalStatus,
  pingApiEndpoints,
  SYSTEM_MICROSERVICES
} from "../utils/statusApi";

export default function AdminPage() {
  const {
    adminAuth,
    user,
    loginUser,
    logoutUser,
    fleet,
    addCarToFleet,
    toggleCarStatus,
    deleteCar,
    bookings,
    updateBookingStatus,
    approveBooking,
    denyBooking,
    repossessBookingCar,
    navigate,
    showToast
  } = useCarRental();

  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard | fleet | bookings | analytics | gps | api
  const [selectedHub, setSelectedHub] = useState("All Hubs");
  const [searchFilter, setSearchFilter] = useState("");
  const [fleetSearch, setFleetSearch] = useState("");
  const [fleetStatusFilter, setFleetStatusFilter] = useState("all");
  const [fleetCategoryFilter, setFleetCategoryFilter] = useState("all");
  const [fleetViewMode, setFleetViewMode] = useState("cards"); // cards | table
  const [bookingsViewMode, setBookingsViewMode] = useState("table"); // table | cards
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Repossession & Order Decision Modals State
  const [repossessionModalOpen, setRepossessionModalOpen] = useState(false);
  const [selectedBookingForRepossess, setSelectedBookingForRepossess] = useState(null);
  const [repossessReason, setRepossessReason] = useState("Track Speeding / Reckless Driving Breach (>200 km/h detected)");
  const [repossessNotes, setRepossessNotes] = useState("");
  const [forfeitDeposit, setForfeitDeposit] = useState(true);
  const [killEngineSignal, setKillEngineSignal] = useState(true);

  const [denialModalOpen, setDenialModalOpen] = useState(false);
  const [selectedBookingForDeny, setSelectedBookingForDeny] = useState(null);
  const [denialReason, setDenialReason] = useState("Driver background / KYC verification declined");
  const [denialNotes, setDenialNotes] = useState("");

  const openRepossessModal = (booking) => {
    setSelectedBookingForRepossess(booking);
    setRepossessReason("Track Speeding / Reckless Driving Breach (>200 km/h detected)");
    setRepossessNotes("");
    setForfeitDeposit(true);
    setKillEngineSignal(true);
    setRepossessionModalOpen(true);
  };

  const handleExecuteRepossess = () => {
    if (!selectedBookingForRepossess) return;
    const fullReason = repossessNotes ? `${repossessReason} — Notes: ${repossessNotes}` : repossessReason;
    repossessBookingCar(selectedBookingForRepossess.bookingId, {
      reason: fullReason,
      forfeitDeposit
    });
    setRepossessionModalOpen(false);
    setSelectedBookingForRepossess(null);
  };

  const openDenyModal = (booking) => {
    setSelectedBookingForDeny(booking);
    setDenialReason("Driver background / KYC verification declined");
    setDenialNotes("");
    setDenialModalOpen(true);
  };

  const handleExecuteDeny = () => {
    if (!selectedBookingForDeny) return;
    const fullReason = denialNotes ? `${denialReason} — Notes: ${denialNotes}` : denialReason;
    denyBooking(selectedBookingForDeny.bookingId, fullReason);
    setDenialModalOpen(false);
    setSelectedBookingForDeny(null);
  };

  // API Status & Testing state
  const [apiEndpoints, setApiEndpoints] = useState(SYSTEM_MICROSERVICES);
  const [pingingApis, setPingingApis] = useState(false);
  const [testBookingId, setTestBookingId] = useState("RRC-2026-894120");
  const [testApiResult, setTestApiResult] = useState(null);
  const [testApiLoading, setTestApiLoading] = useState(false);

  // New car form state
  const [newCarName, setNewCarName] = useState("");
  const [newCarBrand, setNewCarBrand] = useState("");
  const [newCarCategory, setNewCarCategory] = useState("Sports Coupe");
  const [newCarPrice, setNewCarPrice] = useState(5999);
  const [newCarHp, setNewCarHp] = useState("500 HP");
  const [newCarGear, setNewCarGear] = useState("Automatic");
  const [newCarImage, setNewCarImage] = useState("");

  // Auto-run first test API call if bookings exist
  useEffect(() => {
    if (bookings.length > 0) {
      setTestBookingId(bookings[0].bookingId);
    }
  }, [bookings]);

  const handleTestApi = async (idToTest) => {
    const id = (idToTest || testBookingId || "").trim();
    if (!id) {
      showToast("Please enter a Booking ID or email");
      return;
    }
    setTestApiLoading(true);
    try {
      const res = await fetchLiveRentalStatus(id, bookings, fleet);
      setTestApiResult(res);
      if (res.success) {
        showToast(`⚡ Status API returned 200 OK for ${res.booking.bookingId}`);
      } else {
        showToast(res.error || "Booking not found");
      }
    } catch (e) {
      showToast("API connection error");
    } finally {
      setTestApiLoading(false);
    }
  };

  const handlePingApis = async () => {
    setPingingApis(true);
    showToast("Pinging 5 microservice endpoints...");
    try {
      const results = await pingApiEndpoints();
      setApiEndpoints(results);
      showToast("All microservices online & healthy! ✨");
    } catch (e) {
      showToast("Failed to ping endpoints");
    } finally {
      setPingingApis(false);
    }
  };

  // UN-AUTHENTICATED STATE WITH QUICK DEMO ACCESS
  if (!adminAuth) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-main)",
        padding: "20px"
      }}>
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          borderRadius: "20px",
          padding: "40px",
          textAlign: "center",
          maxWidth: "480px"
        }}>
          <div style={{ fontSize: "52px", marginBottom: "15px" }}>🛡️</div>
          <h2 style={{ fontFamily: "var(--font-heading)", color: "#fff", marginBottom: "10px" }}>
            ADMINISTRATOR ACCESS REQUIRED
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "25px", lineHeight: 1.6 }}>
            Please authenticate to access central fleet dispatch, live OBD-II telemetry, and customer status API controls.
          </p>

          <button
            type="button"
            className="primary-btn"
            style={{ width: "100%", padding: "14px", marginBottom: "12px" }}
            onClick={() => navigate("/login?role=admin")}
          >
            Authenticate Admin Terminal →
          </button>

          <button
            type="button"
            className="secondary-btn"
            style={{
              width: "100%",
              padding: "12px",
              background: "linear-gradient(135deg, rgba(0, 242, 254, 0.15), rgba(0, 112, 243, 0.15))",
              border: "1px solid var(--primary-cyan)",
              color: "var(--primary-cyan)"
            }}
            onClick={() => {
              loginUser("admin@renderrcars.com", "admin");
              showToast("🛡️ Admin Terminal Authenticated! Welcome Administrator.");
            }}
          >
            ⚡ 1-Click Quick Unlock (Demo Admin)
          </button>

          <button
            type="button"
            className="secondary-btn"
            style={{ width: "100%", marginTop: "12px", border: "none", background: "none", color: "var(--text-muted)" }}
            onClick={() => navigate("/")}
          >
            ← Return to Fleet Showroom
          </button>
        </div>
      </div>
    );
  }

  // Filtered Bookings by search term AND selected hub
  const filteredBookings = bookings.filter(b => {
    const term = searchFilter.toLowerCase().trim();
    const matchesSearch = !term || (
      b.bookingId?.toLowerCase().includes(term) ||
      b.customerName?.toLowerCase().includes(term) ||
      b.carName?.toLowerCase().includes(term) ||
      b.email?.toLowerCase().includes(term) ||
      b.pickupLocation?.toLowerCase().includes(term)
    );
    const matchesHub = selectedHub === "All Hubs" ||
      (b.pickupLocation && b.pickupLocation.toLowerCase().includes(selectedHub.toLowerCase()));
    return matchesSearch && matchesHub;
  });

  // Filtered Fleet by search term, status AND category
  const filteredFleet = fleet.filter(car => {
    const term = fleetSearch.toLowerCase().trim();
    const matchesSearch = !term || (
      car.name?.toLowerCase().includes(term) ||
      car.brand?.toLowerCase().includes(term) ||
      car.category?.toLowerCase().includes(term) ||
      car.id?.toLowerCase().includes(term)
    );
    const matchesStatus = fleetStatusFilter === "all" || car.status?.toLowerCase() === fleetStatusFilter.toLowerCase();
    const matchesCategory = fleetCategoryFilter === "all" ||
      car.categoryKey === fleetCategoryFilter ||
      (car.category && car.category.toLowerCase().includes(fleetCategoryFilter.toLowerCase()));
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Calculate KPI metrics
  const totalVehicles = fleet.length;
  const rentedVehicles = fleet.filter(c => c.status === "Rented").length;
  const totalRevenue = bookings.reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 125000);
  const utilization = totalVehicles > 0 ? Math.round((rentedVehicles / totalVehicles) * 100) : 75;

  const handleAddCarSubmit = (e) => {
    e.preventDefault();
    if (!newCarName.trim()) {
      showToast("Please enter vehicle name");
      return;
    }

    const id = newCarName.toLowerCase().replace(/\s+/g, "-");
    const carObj = {
      id,
      name: newCarName.trim(),
      brand: newCarBrand.trim() || "Exotic",
      category: newCarCategory,
      price: Number(newCarPrice) || 4999,
      hp: newCarHp.trim() || "450 HP",
      transmission: newCarGear,
      status: "Available",
      image: newCarImage.trim() || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=85",
      trips: 0
    };

    addCarToFleet(carObj);
    setAddModalOpen(false);
    setNewCarName("");
    setNewCarBrand("");
    setNewCarImage("");
  };

  return (
    <div className="admin-layout">
      {/* MOBILE BACKDROP OVERLAY */}
      {mobileSidebarOpen && (
        <div
          className="admin-mobile-overlay"
          onClick={() => setMobileSidebarOpen(false)}
        ></div>
      )}

      {/* SIDEBAR NAVIGATION */}
      <aside className={`admin-sidebar ${mobileSidebarOpen ? "mobile-open" : ""}`}>
        <div>
          <div className="sidebar-logo">
            <button
              type="button"
              onClick={() => navigate("/")}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              <img src="/pictures/logo.png" alt="RenderRCars Logo" />
            </button>
            <span className="admin-tag-badge">ADMIN</span>
            {mobileSidebarOpen && (
              <button
                type="button"
                className="admin-close-sidebar-btn"
                onClick={() => setMobileSidebarOpen(false)}
                title="Close Navigation"
              >
                ✕
              </button>
            )}
          </div>

          <nav className="sidebar-nav">
            <button
              type="button"
              className={`nav-link-btn ${activeTab === "dashboard" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("dashboard");
                setMobileSidebarOpen(false);
              }}
            >
              📊 Overview
            </button>
            <button
              type="button"
              className={`nav-link-btn ${activeTab === "fleet" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("fleet");
                setMobileSidebarOpen(false);
              }}
            >
              🏎️ Fleet Inventory ({fleet.length})
            </button>
            <button
              type="button"
              className={`nav-link-btn ${activeTab === "bookings" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("bookings");
                setMobileSidebarOpen(false);
              }}
            >
              📑 Live Bookings ({bookings.length})
            </button>
            <button
              type="button"
              className={`nav-link-btn ${activeTab === "gps" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("gps");
                setMobileSidebarOpen(false);
              }}
            >
              🛰️ Fleet GPS Radar
            </button>
            <button
              type="button"
              className={`nav-link-btn ${activeTab === "api" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("api");
                setMobileSidebarOpen(false);
              }}
            >
              ⚡ API Health & Status
            </button>
            <button
              type="button"
              className={`nav-link-btn ${activeTab === "analytics" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("analytics");
                setMobileSidebarOpen(false);
              }}
            >
              📈 Revenue & Growth
            </button>
            <button
              type="button"
              className="nav-link-btn"
              onClick={() => {
                navigate("/help");
                setMobileSidebarOpen(false);
              }}
              style={{ color: "var(--accent-gold)" }}
            >
              🚨 Help & SOS Center ↗
            </button>
            <button
              type="button"
              className="nav-link-btn"
              onClick={() => {
                navigate("/status");
                setMobileSidebarOpen(false);
              }}
            >
              📍 User Status Tracker ↗
            </button>
            <button
              type="button"
              className="nav-link-btn"
              onClick={() => {
                navigate("/");
                setMobileSidebarOpen(false);
              }}
            >
              🌐 View Live Fleet ↗
            </button>
          </nav>
        </div>

        <div className="sidebar-footer">
          <div className="admin-user-card">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div className="admin-avatar">AD</div>
              <div className="admin-user-info">
                <h4>{user ? user.split("@")[0].toUpperCase() : "ADMIN"}</h4>
                <span>Super Administrator</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn-logout"
            onClick={() => {
              logoutUser();
              navigate("/");
            }}
          >
            🔒 Sign Out Terminal
          </button>
        </div>
      </aside>

      {/* MAIN ADMIN CONTENT AREA */}
      <main className="admin-main">
        {/* TOP HEADER BAR */}
        <header className="admin-header-bar">
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <button
              type="button"
              className="admin-menu-toggle-btn"
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              title="Toggle Navigation Menu"
            >
              ☰
            </button>
            <div>
              <div className="section-label" style={{ fontSize: "11px" }}>CENTRAL FLEET DISPATCH</div>
              <h1 style={{ margin: 0 }}>Fleet Control <span>Center</span></h1>
            </div>
          </div>

          <div className="admin-top-actions">
            <div className="admin-telemetry-badge">
              <span className="pulse-dot"></span>
              <span>100% ONLINE</span>
            </div>

            <select
              className="hub-select"
              value={selectedHub}
              onChange={(e) => {
                setSelectedHub(e.target.value);
                showToast(`Filtered by ${e.target.value}`);
              }}
            >
              <option value="All Hubs">All Regional Hubs (7)</option>
              <option value="Vijayawada">Vijayawada City Hub</option>
              <option value="Hyderabad">Hyderabad Airport (HYD)</option>
              <option value="Bangalore">Bangalore Central (BLR)</option>
              <option value="Mumbai">Mumbai Airport (BOM)</option>
              <option value="Delhi">Delhi NCR Hub (DEL)</option>
              <option value="Goa">Goa Coastal Hub</option>
            </select>

            <button
              type="button"
              className="btn-add-car"
              style={{
                background: "linear-gradient(135deg, rgba(0, 242, 254, 0.2), rgba(0, 112, 243, 0.2))",
                border: "1px solid var(--primary-cyan)",
                color: "var(--primary-cyan)"
              }}
              onClick={() => setActiveTab("api")}
            >
              <span>⚡</span> API Check
            </button>

            <button
              type="button"
              className="btn-add-car"
              onClick={() => setAddModalOpen(true)}
            >
              <span>+</span> Add Vehicle
            </button>
          </div>
        </header>

        {/* RESPONSIVE MOBILE TABS BAR (VISIBLE ON MOBILE / TABLET) */}
        <div className="admin-mobile-tabs-bar">
          <button
            type="button"
            className={`mobile-tab-chip ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            📊 Overview
          </button>
          <button
            type="button"
            className={`mobile-tab-chip ${activeTab === "fleet" ? "active" : ""}`}
            onClick={() => setActiveTab("fleet")}
          >
            🏎️ Fleet ({fleet.length})
          </button>
          <button
            type="button"
            className={`mobile-tab-chip ${activeTab === "bookings" ? "active" : ""}`}
            onClick={() => setActiveTab("bookings")}
          >
            📑 Bookings ({bookings.length})
          </button>
          <button
            type="button"
            className={`mobile-tab-chip ${activeTab === "gps" ? "active" : ""}`}
            onClick={() => setActiveTab("gps")}
          >
            🛰️ Radar
          </button>
          <button
            type="button"
            className={`mobile-tab-chip ${activeTab === "api" ? "active" : ""}`}
            onClick={() => setActiveTab("api")}
          >
            ⚡ API
          </button>
          <button
            type="button"
            className={`mobile-tab-chip ${activeTab === "analytics" ? "active" : ""}`}
            onClick={() => setActiveTab("analytics")}
          >
            📈 Growth
          </button>
        </div>

        {/* ADMIN CONTENT BODY */}
        <div className="admin-content-body">
          {/* KPI METRICS ROW */}
          <section className="kpi-grid">
            <div className="kpi-card">
              <div className="kpi-icon red">🏎️</div>
              <div className="kpi-details">
                <small>Total Fleet Size</small>
                <h3>{totalVehicles} Vehicles</h3>
                <div className="kpi-subtext">
                  <span style={{ color: "var(--status-green)" }}>● {fleet.filter(c => c.status === "Available").length} Ready</span>
                  <span style={{ color: "var(--primary-cyan)", marginLeft: "8px" }}>● {rentedVehicles} On Road</span>
                </div>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon blue">⚡</div>
              <div className="kpi-details">
                <small>Active Trips & Missions</small>
                <h3>{rentedVehicles + bookings.filter(b => b.paymentStatus === "Active").length} In Transit</h3>
                <div className="kpi-subtext">
                  <span>GPS Telemetry: 100% Locked</span>
                </div>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon green">💰</div>
              <div className="kpi-details">
                <small>Gross Bookings Revenue</small>
                <h3>{formatCurrency(totalRevenue)}</h3>
                <div className="kpi-subtext">
                  <span style={{ color: "var(--status-green)" }}>↑ +18.4% this quarter</span>
                </div>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon gold">📈</div>
              <div className="kpi-details">
                <small>Fleet Utilization</small>
                <h3>{utilization}%</h3>
                <div className="utilization-bar-track">
                  <div
                    className="utilization-bar-fill"
                    style={{ width: `${Math.min(utilization, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </section>

          {/* TAB 1: OVERVIEW & DASHBOARD */}
          {activeTab === "dashboard" && (
            <section className="admin-tab-section active">
              {/* RECENT RESERVATIONS */}
              <div className="dashboard-card">
                <div className="card-top-bar" style={{ flexWrap: "wrap", gap: "10px" }}>
                  <div>
                    <h2>Live Customer Reservations</h2>
                    <p style={{ color: "var(--text-secondary)", fontSize: "13px", margin: 0 }}>
                      {selectedHub !== "All Hubs" ? `Filtered for ${selectedHub} • ` : ""}
                      {filteredBookings.length} bookings displayed
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <input
                      type="text"
                      placeholder="Filter customer, ID, or hub..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      style={{
                        padding: "8px 14px",
                        borderRadius: "10px",
                        border: "1px solid var(--border-color)",
                        background: "rgba(255, 255, 255, 0.05)",
                        color: "#fff",
                        fontSize: "13px"
                      }}
                    />
                    {searchFilter && (
                      <button
                        type="button"
                        className="btn-action-icon"
                        onClick={() => setSearchFilter("")}
                        title="Clear Filter"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                <div className="custom-table-wrapper">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Booking ID</th>
                        <th>Driver / Customer</th>
                        <th>Vehicle</th>
                        <th>Schedule & Hub</th>
                        <th>Total Fare</th>
                        <th>Method</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.length === 0 ? (
                        <tr>
                          <td colSpan="8" style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
                            No reservations match the filter "{searchFilter || selectedHub}".
                          </td>
                        </tr>
                      ) : (
                        filteredBookings.map((b) => {
                          let statusClass = "status-paid";
                          if (b.paymentStatus === "Active" || b.paymentStatus === "Approved") statusClass = "status-active";
                          else if (b.paymentStatus === "Cancelled") statusClass = "status-cancelled";
                          else if (b.paymentStatus === "Denied") statusClass = "status-denied";
                          else if (b.paymentStatus?.includes("Repossessed") || b.paymentStatus?.includes("Terminated")) statusClass = "status-repossessed";

                          const isRepossessable = !b.paymentStatus?.includes("Repossessed") && !b.paymentStatus?.includes("Denied") && b.paymentStatus !== "Cancelled";

                          return (
                            <tr key={b.bookingId}>
                              <td>
                                <strong style={{ color: "var(--primary-cyan)" }}>{b.bookingId}</strong>
                              </td>
                              <td>
                                <div style={{ color: "#fff", fontWeight: 700 }}>{b.customerName}</div>
                                <small style={{ color: "var(--text-muted)" }}>{b.phone || b.email}</small>
                              </td>
                              <td>{b.carName}</td>
                              <td>
                                <small style={{ color: "var(--text-secondary)" }}>{b.pickupDate} → {b.returnDate}</small>
                                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{b.pickupLocation}</div>
                              </td>
                              <td><strong>{formatCurrency(b.totalAmount)}</strong></td>
                              <td><small>{b.paymentMethod}</small></td>
                              <td><span className={`status-badge ${statusClass}`}>{b.paymentStatus}</span></td>
                              <td>
                                <div className="action-btn-group">
                                  {b.paymentStatus !== "Approved" && (
                                    <button
                                      type="button"
                                      className="btn-action-icon"
                                      title="Accept / Approve Order"
                                      style={{ color: "var(--status-green)", borderColor: "rgba(0, 230, 118, 0.4)" }}
                                      onClick={() => approveBooking(b.bookingId)}
                                    >
                                      ✓
                                    </button>
                                  )}
                                  {b.paymentStatus !== "Denied" && (
                                    <button
                                      type="button"
                                      className="btn-action-icon"
                                      title="Deny / Reject Order"
                                      style={{ color: "var(--primary-red)", borderColor: "rgba(255, 23, 68, 0.4)" }}
                                      onClick={() => openDenyModal(b)}
                                    >
                                      ✕
                                    </button>
                                  )}
                                  {isRepossessable && (
                                    <button
                                      type="button"
                                      className="btn-action-icon"
                                      title="Emergency Repossession & Remote Engine Kill"
                                      style={{ color: "#ffd700", borderColor: "rgba(255, 215, 0, 0.5)", background: "rgba(255, 23, 68, 0.15)" }}
                                      onClick={() => openRepossessModal(b)}
                                    >
                                      🚨
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    className="btn-action-icon"
                                    title="Inspect Live Status API"
                                    style={{ color: "var(--primary-cyan)", borderColor: "rgba(0, 242, 254, 0.4)" }}
                                    onClick={() => navigate(`/status?bookingId=${b.bookingId}`)}
                                  >
                                    🛰️
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* FLEET INVENTORY QUICK SUMMARY */}
              <div className="dashboard-card" style={{ marginTop: "24px" }}>
                <div className="card-top-bar">
                  <h2>Fleet Vehicle Inventory ({fleet.length})</h2>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      type="button"
                      className="btn-action-icon"
                      onClick={() => setActiveTab("fleet")}
                      style={{ padding: "6px 14px", borderRadius: "8px" }}
                    >
                      View Full Fleet Tab →
                    </button>
                    <button
                      type="button"
                      className="btn-add-car"
                      onClick={() => setAddModalOpen(true)}
                    >
                      + Add New Supercar
                    </button>
                  </div>
                </div>

                <div className="custom-table-wrapper">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Vehicle Model</th>
                        <th>Daily Tariff</th>
                        <th>Output</th>
                        <th>Transmission</th>
                        <th>Status</th>
                        <th>Trips Done</th>
                        <th>Manage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fleet.slice(0, 6).map((car) => {
                        let statusClass = "status-available";
                        if (car.status === "Rented") statusClass = "status-rented";
                        else if (car.status === "Maintenance") statusClass = "status-maintenance";

                        return (
                          <tr key={car.id}>
                            <td>
                              <div className="car-cell">
                                <img src={car.image} alt={car.name} className="car-thumb" />
                                <div>
                                  <strong style={{ color: "#fff", display: "block" }}>{car.name}</strong>
                                  <small style={{ color: "var(--text-muted)" }}>{car.brand} • {car.category}</small>
                                </div>
                              </div>
                            </td>
                            <td><strong>{formatCurrency(car.price)}</strong> / Day</td>
                            <td>⚡ {car.hp || car.horsepower}</td>
                            <td>⚙️ {car.transmission}</td>
                            <td>
                              <span className={`status-badge ${statusClass}`}>{car.status}</span>
                            </td>
                            <td>{car.trips || 0} Trips</td>
                            <td>
                              <div className="action-btn-group">
                                <button
                                  type="button"
                                  className="btn-action-icon"
                                  title="Toggle Status (Available/Rented/Maintenance)"
                                  onClick={() => toggleCarStatus(car.id)}
                                >
                                  🔄
                                </button>
                                <button
                                  type="button"
                                  className="btn-action-icon"
                                  title="Remove Car"
                                  style={{ color: "var(--primary-red)" }}
                                  onClick={() => deleteCar(car.id)}
                                >
                                  🗑️
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {/* TAB 2: FLEET INVENTORY FULL */}
          {activeTab === "fleet" && (
            <section className="admin-tab-section active">
              <div className="dashboard-card">
                <div className="card-top-bar" style={{ flexWrap: "wrap", gap: "15px" }}>
                  <div>
                    <h2>Master Fleet Inventory Management ({filteredFleet.length})</h2>
                    <p style={{ color: "var(--text-secondary)", fontSize: "14px", margin: "4px 0 0" }}>
                      Configure vehicle availability, tariffs, and technical specifications across all regional hubs.
                    </p>
                  </div>

                  <div className="admin-controls-row">
                    <input
                      type="text"
                      placeholder="Search model, brand, or status..."
                      value={fleetSearch}
                      onChange={(e) => setFleetSearch(e.target.value)}
                      className="admin-search-input"
                    />

                    <select
                      value={fleetStatusFilter}
                      onChange={(e) => setFleetStatusFilter(e.target.value)}
                      className="admin-select-input"
                    >
                      <option value="all">All Statuses</option>
                      <option value="available">Available (Ready)</option>
                      <option value="rented">Rented (On Road)</option>
                      <option value="maintenance">Maintenance</option>
                    </select>

                    {/* VIEW MODE TOGGLE BUTTONS */}
                    <div className="admin-view-toggle">
                      <button
                        type="button"
                        className={`view-toggle-btn ${fleetViewMode === "cards" ? "active" : ""}`}
                        onClick={() => setFleetViewMode("cards")}
                        title="Grid Cards View"
                      >
                        🗂️ Cards
                      </button>
                      <button
                        type="button"
                        className={`view-toggle-btn ${fleetViewMode === "table" ? "active" : ""}`}
                        onClick={() => setFleetViewMode("table")}
                        title="Tabular View"
                      >
                        📑 Table
                      </button>
                    </div>

                    <button type="button" className="btn-add-car" onClick={() => setAddModalOpen(true)}>
                      + Induct Vehicle
                    </button>
                  </div>
                </div>

                {/* CATEGORY FILTER CHIPS */}
                <div className="admin-category-chips">
                  <button
                    type="button"
                    className={`admin-chip ${fleetCategoryFilter === "all" ? "active" : ""}`}
                    onClick={() => setFleetCategoryFilter("all")}
                  >
                    All Fleet ({fleet.length})
                  </button>
                  <button
                    type="button"
                    className={`admin-chip ${fleetCategoryFilter === "sports" ? "active" : ""}`}
                    onClick={() => setFleetCategoryFilter("sports")}
                  >
                    🏎️ Sports & Supercars ({fleet.filter(c => c.categoryKey === "sports" || c.category?.toLowerCase().includes("sports") || c.category?.toLowerCase().includes("supercar")).length})
                  </button>
                  <button
                    type="button"
                    className={`admin-chip ${fleetCategoryFilter === "luxury" ? "active" : ""}`}
                    onClick={() => setFleetCategoryFilter("luxury")}
                  >
                    💎 Executive Luxury ({fleet.filter(c => c.categoryKey === "luxury" || c.category?.toLowerCase().includes("luxury")).length})
                  </button>
                  <button
                    type="button"
                    className={`admin-chip ${fleetCategoryFilter === "suv" ? "active" : ""}`}
                    onClick={() => setFleetCategoryFilter("suv")}
                  >
                    🚙 4x4 & Super SUVs ({fleet.filter(c => c.categoryKey === "suv" || c.category?.toLowerCase().includes("suv")).length})
                  </button>
                </div>

                {/* CONDITIONAL RENDERING: CARDS VIEW VS TABLE VIEW */}
                {fleetViewMode === "cards" ? (
                  <div className="admin-fleet-cards-grid">
                    {filteredFleet.length === 0 ? (
                      <div className="admin-empty-state">
                        <p>No vehicles found matching "{fleetSearch}".</p>
                      </div>
                    ) : (
                      filteredFleet.map((car) => {
                        let statusClass = "status-available";
                        if (car.status === "Rented") statusClass = "status-rented";
                        else if (car.status === "Maintenance") statusClass = "status-maintenance";

                        return (
                          <div key={car.id} className="admin-car-card">
                            <div className="admin-car-card-img">
                              <img src={car.image} alt={car.name} loading="lazy" />
                              <span className={`status-badge ${statusClass}`}>
                                {car.status === "Rented" ? "● ON TRIP" : car.status === "Maintenance" ? "● SERVICE" : "● AVAILABLE"}
                              </span>
                              <span className="admin-car-price-pill">
                                {formatCurrency(car.price)} <span>/day</span>
                              </span>
                            </div>

                            <div className="admin-car-card-content">
                              <div className="admin-car-header">
                                <h3>{car.name}</h3>
                                <span className="admin-car-sub">{car.model || `${car.brand} • ${car.category}`}</span>
                              </div>

                              <div className="admin-car-specs-row">
                                <span>⚡ {car.hp || car.horsepower}</span>
                                <span>⚙️ {car.transmission}</span>
                                <span>👤 {car.seats || "4-5 Seats"}</span>
                                <span>🛣️ {car.trips || 0} Trips</span>
                              </div>

                              <div className="admin-car-card-actions">
                                <button
                                  type="button"
                                  className="admin-card-action-btn status-btn"
                                  onClick={() => toggleCarStatus(car.id)}
                                >
                                  🔄 Switch Status
                                </button>
                                <button
                                  type="button"
                                  className="admin-card-action-btn view-btn"
                                  onClick={() => navigate(`/details/${car.id}`)}
                                >
                                  👁️ Details
                                </button>
                                <button
                                  type="button"
                                  className="admin-card-action-btn delete-btn"
                                  onClick={() => deleteCar(car.id)}
                                  title="Delete from fleet"
                                >
                                  🗑️
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                ) : (
                  <div className="custom-table-wrapper" style={{ marginTop: "15px" }}>
                    <table className="custom-table">
                      <thead>
                        <tr>
                          <th>Vehicle Model</th>
                          <th>Daily Tariff</th>
                          <th>Output</th>
                          <th>Transmission</th>
                          <th>Status</th>
                          <th>Trips Done</th>
                          <th>Manage</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredFleet.length === 0 ? (
                          <tr>
                            <td colSpan="7" style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
                              No vehicles found matching "{fleetSearch}".
                            </td>
                          </tr>
                        ) : (
                          filteredFleet.map((car) => {
                            let statusClass = "status-available";
                            if (car.status === "Rented") statusClass = "status-rented";
                            else if (car.status === "Maintenance") statusClass = "status-maintenance";

                            return (
                              <tr key={car.id}>
                                <td>
                                  <div className="car-cell">
                                    <img src={car.image} alt={car.name} className="car-thumb" />
                                    <div>
                                      <strong style={{ color: "#fff", display: "block" }}>{car.name}</strong>
                                      <small style={{ color: "var(--text-muted)" }}>{car.brand} • {car.category}</small>
                                    </div>
                                  </div>
                                </td>
                                <td><strong>{formatCurrency(car.price)}</strong> / Day</td>
                                <td>⚡ {car.hp || car.horsepower}</td>
                                <td>⚙️ {car.transmission}</td>
                                <td>
                                  <span className={`status-badge ${statusClass}`}>{car.status}</span>
                                </td>
                                <td>{car.trips || 0} Trips</td>
                                <td>
                                  <div className="action-btn-group">
                                    <button
                                      type="button"
                                      className="btn-action-icon"
                                      title="Toggle Status"
                                      onClick={() => toggleCarStatus(car.id)}
                                    >
                                      🔄 Status
                                    </button>
                                    <button
                                      type="button"
                                      className="btn-action-icon"
                                      title="Inspect Details"
                                      onClick={() => navigate(`/details/${car.id}`)}
                                    >
                                      👁️
                                    </button>
                                    <button
                                      type="button"
                                      className="btn-action-icon"
                                      title="Remove Car"
                                      style={{ color: "var(--primary-red)" }}
                                      onClick={() => deleteCar(car.id)}
                                    >
                                      🗑️
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* TAB 3: BOOKINGS FULL */}
          {activeTab === "bookings" && (
            <section className="admin-tab-section active">
              <div className="dashboard-card">
                <div className="card-top-bar" style={{ flexWrap: "wrap", gap: "10px" }}>
                  <div>
                    <h2>All Customer Reservations ({filteredBookings.length})</h2>
                    <p style={{ color: "var(--text-secondary)", fontSize: "14px", margin: "4px 0 0" }}>
                      Manage customer reservations, inspect live status endpoints, and trigger dispatch overrides.
                    </p>
                  </div>

                  <div className="admin-controls-row">
                    <input
                      type="text"
                      placeholder="Search bookings, phone, email..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="admin-search-input"
                    />

                    <div className="admin-view-toggle">
                      <button
                        type="button"
                        className={`view-toggle-btn ${bookingsViewMode === "table" ? "active" : ""}`}
                        onClick={() => setBookingsViewMode("table")}
                        title="Tabular View"
                      >
                        📑 Table
                      </button>
                      <button
                        type="button"
                        className={`view-toggle-btn ${bookingsViewMode === "cards" ? "active" : ""}`}
                        onClick={() => setBookingsViewMode("cards")}
                        title="Cards View"
                      >
                        🗂️ Cards
                      </button>
                    </div>
                  </div>
                </div>

                {bookingsViewMode === "cards" ? (
                  <div className="admin-bookings-cards-grid" style={{ marginTop: "18px" }}>
                    {filteredBookings.length === 0 ? (
                      <div className="admin-empty-state">
                        <p>No reservations found matching "{searchFilter}".</p>
                      </div>
                    ) : (
                      filteredBookings.map((b) => {
                        let statusClass = "status-paid";
                        if (b.paymentStatus === "Active" || b.paymentStatus === "Approved") statusClass = "status-active";
                        else if (b.paymentStatus === "Cancelled") statusClass = "status-cancelled";
                        else if (b.paymentStatus === "Denied") statusClass = "status-denied";
                        else if (b.paymentStatus?.includes("Repossessed") || b.paymentStatus?.includes("Terminated")) statusClass = "status-repossessed";

                        const isRepossessable = !b.paymentStatus?.includes("Repossessed") && !b.paymentStatus?.includes("Denied") && b.paymentStatus !== "Cancelled";

                        return (
                          <div key={b.bookingId} className="admin-booking-card">
                            <div className="booking-card-top">
                              <strong style={{ color: "var(--primary-cyan)" }}>{b.bookingId}</strong>
                              <span className={`status-badge ${statusClass}`}>{b.paymentStatus}</span>
                            </div>

                            <div className="booking-card-customer">
                              <h4>{b.customerName}</h4>
                              <small>{b.phone || b.email}</small>
                            </div>

                            <div className="booking-card-details">
                              <div>
                                <small>CAR</small>
                                <strong>{b.carName}</strong>
                              </div>
                              <div>
                                <small>FARE</small>
                                <strong style={{ color: "var(--status-green)" }}>{formatCurrency(b.totalAmount)}</strong>
                              </div>
                            </div>

                            <div className="booking-card-route">
                              <small>DATES & LOCATION</small>
                              <p>{b.pickupDate} → {b.returnDate} • {b.pickupLocation}</p>
                            </div>

                            <div className="booking-card-actions" style={{ flexWrap: "wrap", gap: "6px" }}>
                              {b.paymentStatus !== "Approved" && (
                                <button
                                  type="button"
                                  className="admin-card-action-btn"
                                  style={{ background: "rgba(0, 230, 118, 0.15)", color: "var(--status-green)", border: "1px solid rgba(0, 230, 118, 0.4)" }}
                                  onClick={() => approveBooking(b.bookingId)}
                                  title="Accept & Confirm Order"
                                >
                                  ✓ Accept
                                </button>
                              )}
                              {b.paymentStatus !== "Denied" && (
                                <button
                                  type="button"
                                  className="admin-card-action-btn"
                                  style={{ background: "rgba(255, 23, 68, 0.12)", color: "var(--primary-red)", border: "1px solid rgba(255, 23, 68, 0.4)" }}
                                  onClick={() => openDenyModal(b)}
                                  title="Deny & Restore Vehicle"
                                >
                                  ✕ Deny
                                </button>
                              )}
                              {isRepossessable && (
                                <button
                                  type="button"
                                  className="admin-card-action-btn"
                                  style={{ background: "linear-gradient(135deg, rgba(255, 23, 68, 0.25), rgba(255, 183, 3, 0.2))", color: "#fff", border: "1px solid #ff1744" }}
                                  onClick={() => openRepossessModal(b)}
                                  title="Emergency Repossession & Cut Engine"
                                >
                                  🚨 Repossess
                                </button>
                              )}
                              <button
                                type="button"
                                className="admin-card-action-btn view-btn"
                                onClick={() => navigate(`/status?bookingId=${b.bookingId}`)}
                              >
                                🛰️ Telemetry
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                ) : (
                  <div className="custom-table-wrapper" style={{ marginTop: "15px" }}>
                    <table className="custom-table">
                      <thead>
                        <tr>
                          <th>Booking ID</th>
                          <th>Driver / Customer</th>
                          <th>Vehicle</th>
                          <th>Schedule & Hub</th>
                          <th>Total Fare</th>
                          <th>Method</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredBookings.map((b) => {
                          let statusClass = "status-paid";
                          if (b.paymentStatus === "Active" || b.paymentStatus === "Approved") statusClass = "status-active";
                          else if (b.paymentStatus === "Cancelled") statusClass = "status-cancelled";
                          else if (b.paymentStatus === "Denied") statusClass = "status-denied";
                          else if (b.paymentStatus?.includes("Repossessed") || b.paymentStatus?.includes("Terminated")) statusClass = "status-repossessed";

                          const isRepossessable = !b.paymentStatus?.includes("Repossessed") && !b.paymentStatus?.includes("Denied") && b.paymentStatus !== "Cancelled";

                          return (
                            <tr key={b.bookingId}>
                              <td><strong style={{ color: "var(--primary-cyan)" }}>{b.bookingId}</strong></td>
                              <td>
                                <div style={{ color: "#fff", fontWeight: 700 }}>{b.customerName}</div>
                                <small style={{ color: "var(--text-muted)" }}>{b.phone || b.email}</small>
                              </td>
                              <td>{b.carName}</td>
                              <td>
                                <small style={{ color: "var(--text-secondary)" }}>{b.pickupDate} → {b.returnDate}</small>
                                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{b.pickupLocation}</div>
                              </td>
                              <td><strong>{formatCurrency(b.totalAmount)}</strong></td>
                              <td><small>{b.paymentMethod}</small></td>
                              <td><span className={`status-badge ${statusClass}`}>{b.paymentStatus}</span></td>
                              <td>
                                <div className="action-btn-group">
                                  {b.paymentStatus !== "Approved" && (
                                    <button
                                      type="button"
                                      className="btn-action-icon"
                                      title="Accept / Approve Order"
                                      style={{ color: "var(--status-green)", borderColor: "rgba(0, 230, 118, 0.4)" }}
                                      onClick={() => approveBooking(b.bookingId)}
                                    >
                                      ✓
                                    </button>
                                  )}
                                  {b.paymentStatus !== "Denied" && (
                                    <button
                                      type="button"
                                      className="btn-action-icon"
                                      title="Deny / Reject Order"
                                      style={{ color: "var(--primary-red)", borderColor: "rgba(255, 23, 68, 0.4)" }}
                                      onClick={() => openDenyModal(b)}
                                    >
                                      ✕
                                    </button>
                                  )}
                                  {isRepossessable && (
                                    <button
                                      type="button"
                                      className="btn-action-icon"
                                      title="Emergency Repossession & Cut Engine"
                                      style={{ color: "#ffd700", borderColor: "rgba(255, 215, 0, 0.5)", background: "rgba(255, 23, 68, 0.15)" }}
                                      onClick={() => openRepossessModal(b)}
                                    >
                                      🚨
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    className="btn-action-icon"
                                    title="Inspect Live Status API"
                                    style={{ color: "var(--primary-cyan)", borderColor: "rgba(0, 242, 254, 0.4)" }}
                                    onClick={() => navigate(`/status?bookingId=${b.bookingId}`)}
                                  >
                                    🛰️
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* TAB 4: API HEALTH & LIVE STATUS TESTING */}
          {activeTab === "api" && (
            <section className="admin-tab-section active">
              {/* API MICROSERVICES HEALTH */}
              <div className="dashboard-card" style={{ marginBottom: "25px" }}>
                <div className="card-top-bar" style={{ flexWrap: "wrap", gap: "10px" }}>
                  <div>
                    <div className="section-label" style={{ fontSize: "11px" }}>BACKEND GATEWAY HEALTH</div>
                    <h2>Microservices & Telemetry API Registry</h2>
                  </div>
                  <button
                    type="button"
                    className="primary-btn"
                    style={{ padding: "8px 18px", fontSize: "13px" }}
                    onClick={handlePingApis}
                    disabled={pingingApis}
                  >
                    {pingingApis ? "🔄 Pinging Endpoints..." : "⚡ Ping All API Endpoints Now"}
                  </button>
                </div>

                <div style={{ display: "grid", gap: "15px", marginTop: "20px" }}>
                  {apiEndpoints.map((svc) => (
                    <div
                      key={svc.id}
                      style={{
                        background: "rgba(255, 255, 255, 0.02)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "14px",
                        padding: "16px 20px",
                        display: "grid",
                        gridTemplateColumns: "1.2fr 1fr 120px 100px",
                        gap: "20px",
                        alignItems: "center"
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{
                            display: "inline-block",
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: "#22c55e",
                            boxShadow: "0 0 8px #22c55e"
                          }}></span>
                          <strong style={{ color: "#fff", fontSize: "15px" }}>{svc.name}</strong>
                        </div>
                        <p style={{ color: "var(--text-secondary)", fontSize: "12px", margin: "4px 0 0" }}>
                          {svc.description}
                        </p>
                      </div>

                      <div style={{ fontFamily: "monospace", fontSize: "12px" }}>
                        <span style={{ color: "var(--primary-cyan)", fontWeight: 700 }}>{svc.method}</span>{" "}
                        <span style={{ color: "#fff" }}>{svc.endpoint}</span>
                      </div>

                      <div>
                        <small style={{ color: "var(--text-muted)", display: "block", fontSize: "10px" }}>LATENCY</small>
                        <strong style={{ color: "var(--primary-cyan)", fontSize: "14px" }}>{svc.latency}</strong>
                      </div>

                      <div>
                        <span style={{
                          background: "rgba(34, 197, 94, 0.15)",
                          color: "#22c55e",
                          border: "1px solid rgba(34, 197, 94, 0.4)",
                          padding: "4px 10px",
                          borderRadius: "100px",
                          fontSize: "11px",
                          fontWeight: 700
                        }}>
                          {svc.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* LIVE CUSTOMER STATUS API TEST CONSOLE */}
              <div className="dashboard-card">
                <div className="card-top-bar" style={{ flexWrap: "wrap", gap: "10px" }}>
                  <div>
                    <div className="section-label" style={{ fontSize: "11px" }}>DEVELOPER CONSOLE</div>
                    <h2>Test Customer Reservation Status API</h2>
                    <p style={{ color: "var(--text-secondary)", fontSize: "13px", margin: "4px 0 0" }}>
                      Simulate real-time query to <code>/api/v1/bookings/status/:id</code> and inspect payload.
                    </p>
                  </div>
                </div>

                <div style={{
                  marginTop: "20px",
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap"
                }}>
                  <input
                    type="text"
                    placeholder="Enter Booking ID (e.g. RRC-2026-894120) or Email..."
                    value={testBookingId}
                    onChange={(e) => setTestBookingId(e.target.value)}
                    style={{
                      flex: 1,
                      minWidth: "260px",
                      padding: "12px 18px",
                      borderRadius: "12px",
                      border: "1px solid var(--border-color)",
                      background: "rgba(255, 255, 255, 0.05)",
                      color: "#fff",
                      fontSize: "14px"
                    }}
                  />
                  <button
                    type="button"
                    className="primary-btn"
                    onClick={() => handleTestApi(testBookingId)}
                    disabled={testApiLoading}
                    style={{ padding: "12px 24px" }}
                  >
                    {testApiLoading ? "Querying..." : "Execute API Call ⚡"}
                  </button>
                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={() => navigate(`/status?bookingId=${testBookingId}`)}
                    style={{ padding: "12px 20px" }}
                  >
                    Open in Public Tracker ↗
                  </button>
                </div>

                {/* TEST RESULT OUTPUT */}
                {testApiResult && (
                  <div style={{
                    marginTop: "20px",
                    background: "#080811",
                    border: "1px solid rgba(0, 242, 254, 0.3)",
                    borderRadius: "14px",
                    padding: "20px",
                    fontFamily: "monospace",
                    fontSize: "12px",
                    color: "#38bdf8",
                    overflowX: "auto"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "8px" }}>
                      <span style={{ color: "#22c55e", fontWeight: 700 }}>
                        HTTP/2 {testApiResult.statusCode} OK • {testApiResult.apiMeta?.endpoint}
                      </span>
                      <span style={{ color: "var(--text-muted)" }}>{testApiResult.apiMeta?.server}</span>
                    </div>
                    <pre style={{ margin: 0, lineHeight: 1.5 }}>
                      {JSON.stringify(testApiResult, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* TAB 5: ANALYTICS */}
          {activeTab === "analytics" && (
            <section className="admin-tab-section active">
              <div className="dashboard-card">
                <div className="card-top-bar">
                  <h2>Revenue & Telemetry Analytics</h2>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginTop: "20px" }}>
                  <div style={{ background: "rgba(255, 23, 68, 0.06)", border: "1px solid rgba(255, 23, 68, 0.2)", borderRadius: "16px", padding: "24px" }}>
                    <h3 style={{ color: "var(--primary-red)", fontSize: "14px", textTransform: "uppercase" }}>Monthly Run-Rate</h3>
                    <div style={{ fontSize: "32px", fontWeight: 800, color: "#fff", margin: "10px 0" }}>₹4,85,000</div>
                    <p style={{ color: "var(--text-secondary)", fontSize: "13px" }}>+24.6% growth over previous cycle.</p>
                  </div>

                  <div style={{ background: "rgba(0, 112, 243, 0.06)", border: "1px solid rgba(0, 112, 243, 0.2)", borderRadius: "16px", padding: "24px" }}>
                    <h3 style={{ color: "var(--primary-blue)", fontSize: "14px", textTransform: "uppercase" }}>Average Trip Duration</h3>
                    <div style={{ fontSize: "32px", fontWeight: 800, color: "#fff", margin: "10px 0" }}>3.4 Days</div>
                    <p style={{ color: "var(--text-secondary)", fontSize: "13px" }}>Sports & Supercar rentals driving highest yield.</p>
                  </div>

                  <div style={{ background: "rgba(0, 242, 254, 0.06)", border: "1px solid rgba(0, 242, 254, 0.2)", borderRadius: "16px", padding: "24px" }}>
                    <h3 style={{ color: "var(--primary-cyan)", fontSize: "14px", textTransform: "uppercase" }}>VIP Member Retention</h3>
                    <div style={{ fontSize: "32px", fontWeight: 800, color: "#fff", margin: "10px 0" }}>88.4%</div>
                    <p style={{ color: "var(--text-secondary)", fontSize: "13px" }}>Direct re-booking within 45 days.</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* TAB 6: FLEET GPS SATELLITE RADAR */}
          {activeTab === "gps" && (
            <section className="admin-tab-section active">
              <GpsTrackerView />
            </section>
          )}
        </div>
      </main>

      {/* ADD VEHICLE MODAL */}
      {addModalOpen && (
        <div className="modal active" id="addCarModal">
          <div className="modal-box">
            <button className="close" type="button" onClick={() => setAddModalOpen(false)}>×</button>
            <div className="modal-label">FLEET ADDITION</div>
            <h2>DEPLOY NEW VEHICLE</h2>

            {/* QUICK PRESET PICKER */}
            <div style={{ marginTop: "12px", marginBottom: "16px" }}>
              <label style={{ fontSize: "12px", color: "var(--primary-cyan)" }}>⚡ Quick Presets (Auto-fill Spec)</label>
              <select
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  background: "rgba(0, 242, 254, 0.08)",
                  border: "1px solid rgba(0, 242, 254, 0.3)",
                  color: "#fff",
                  fontSize: "13px",
                  marginTop: "4px"
                }}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "defender") {
                    setNewCarName("Land Rover Defender");
                    setNewCarBrand("Land Rover");
                    setNewCarCategory("Premium SUV");
                    setNewCarPrice(4799);
                    setNewCarHp("395 HP");
                    setNewCarGear("8-Speed Auto");
                    setNewCarImage("https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=85");
                  } else if (val === "m340i") {
                    setNewCarName("BMW M340i xDrive");
                    setNewCarBrand("BMW");
                    setNewCarCategory("Sports Coupe");
                    setNewCarPrice(4499);
                    setNewCarHp("382 HP");
                    setNewCarGear("8-Speed Steptronic");
                    setNewCarImage("https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=85");
                  } else if (val === "cayman") {
                    setNewCarName("Porsche 718 Cayman");
                    setNewCarBrand("Porsche");
                    setNewCarCategory("Supercar");
                    setNewCarPrice(6499);
                    setNewCarHp("350 HP");
                    setNewCarGear("7-Speed PDK");
                    setNewCarImage("https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85");
                  }
                }}
              >
                <option value="">Choose a quick vehicle preset or enter custom below...</option>
                <option value="defender">🚙 Land Rover Defender 110 (₹4,799 / day)</option>
                <option value="m340i">🏎️ BMW M340i xDrive 382 HP (₹4,499 / day)</option>
                <option value="cayman">💎 Porsche 718 Cayman GTS (₹6,499 / day)</option>
              </select>
            </div>

            <form onSubmit={handleAddCarSubmit} style={{ marginTop: "15px" }}>
              <label>Vehicle Name *</label>
              <input
                type="text"
                placeholder="e.g. Porsche 911 GT3"
                value={newCarName}
                onChange={(e) => setNewCarName(e.target.value)}
                required
              />

              <label>Brand Manufacturer *</label>
              <input
                type="text"
                placeholder="e.g. Porsche"
                value={newCarBrand}
                onChange={(e) => setNewCarBrand(e.target.value)}
                required
              />

              <div className="form-grid-2">
                <div>
                  <label>Category</label>
                  <select
                    value={newCarCategory}
                    onChange={(e) => setNewCarCategory(e.target.value)}
                  >
                    <option value="Sports Coupe">Sports Coupe</option>
                    <option value="Supercar">Supercar</option>
                    <option value="Luxury Performance">Luxury Performance</option>
                    <option value="Premium SUV">Premium SUV</option>
                  </select>
                </div>
                <div>
                  <label>Daily Price (₹) *</label>
                  <input
                    type="number"
                    value={newCarPrice}
                    onChange={(e) => setNewCarPrice(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div>
                  <label>Horsepower Output</label>
                  <input
                    type="text"
                    placeholder="e.g. 502 HP"
                    value={newCarHp}
                    onChange={(e) => setNewCarHp(e.target.value)}
                  />
                </div>
                <div>
                  <label>Transmission</label>
                  <input
                    type="text"
                    placeholder="e.g. 7-Speed PDK Auto"
                    value={newCarGear}
                    onChange={(e) => setNewCarGear(e.target.value)}
                  />
                </div>
              </div>

              <label>High-Res Image URL</label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={newCarImage}
                onChange={(e) => setNewCarImage(e.target.value)}
              />

              <button
                type="submit"
                className="confirm-button"
                style={{ marginTop: "18px" }}
              >
                DEPLOY VEHICLE TO FLEET 🚀
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ORDER DENIAL MODAL */}
      {denialModalOpen && selectedBookingForDeny && (
        <div className="modal active" id="denyOrderModal">
          <div className="modal-box" style={{ maxWidth: "460px" }}>
            <button className="close" type="button" onClick={() => setDenialModalOpen(false)}>×</button>
            <div className="modal-label" style={{ color: "var(--primary-red)" }}>ADMIN ACCESS • ORDER REJECTION</div>
            <h2>DENY BOOKING ORDER</h2>

            <div style={{ background: "rgba(255, 255, 255, 0.04)", border: "1px solid var(--border-color)", borderRadius: "12px", padding: "14px", margin: "14px 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>BOOKING ID</span>
                <strong style={{ color: "var(--primary-cyan)" }}>{selectedBookingForDeny.bookingId}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>RENTER</span>
                <strong style={{ color: "#fff" }}>{selectedBookingForDeny.customerName}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>CHARTER VEHICLE</span>
                <strong style={{ color: "var(--accent-gold)" }}>{selectedBookingForDeny.carName}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>TOTAL CHARTER FARE</span>
                <strong>{formatCurrency(selectedBookingForDeny.totalAmount)}</strong>
              </div>
            </div>

            <div style={{ marginBottom: "14px" }}>
              <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase" }}>
                Reason for Denial *
              </label>
              <select
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  background: "var(--bg-input)",
                  border: "1px solid var(--border-color)",
                  color: "#fff",
                  fontSize: "13px",
                  marginTop: "6px"
                }}
                value={denialReason}
                onChange={(e) => setDenialReason(e.target.value)}
              >
                <option value="Driver background / KYC verification declined">Driver background / KYC verification declined</option>
                <option value="Security deposit payment declined by bank">Security deposit payment declined by bank</option>
                <option value="Vehicle unavailable at hub due to urgent service">Vehicle unavailable at hub due to urgent service</option>
                <option value="High fraud risk / Blacklisted renter profile">High fraud risk / Blacklisted renter profile</option>
                <option value="Customer requested cancellation before dispatch">Customer requested cancellation before dispatch</option>
              </select>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase" }}>
                Internal Audit Notes (Optional)
              </label>
              <textarea
                rows={2}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  background: "var(--bg-input)",
                  border: "1px solid var(--border-color)",
                  color: "#fff",
                  fontSize: "13px",
                  marginTop: "6px",
                  resize: "vertical"
                }}
                placeholder="Log internal explanation for customer record..."
                value={denialNotes}
                onChange={(e) => setDenialNotes(e.target.value)}
              />
            </div>

            <div style={{ background: "rgba(0, 242, 254, 0.06)", border: "1px dashed rgba(0, 242, 254, 0.3)", borderRadius: "10px", padding: "10px 14px", marginBottom: "20px", fontSize: "12px", color: "var(--text-secondary)" }}>
              💡 <strong>Action effect:</strong> Vehicle <strong>{selectedBookingForDeny.carName}</strong> will immediately be restored to <strong>Available</strong> status in the Fleet inventory for other drivers.
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <button
                type="button"
                className="btn-agree-back"
                onClick={() => setDenialModalOpen(false)}
                style={{ padding: "12px", borderRadius: "10px", textAlign: "center" }}
              >
                DISMISS
              </button>
              <button
                type="button"
                className="confirm-button"
                onClick={handleExecuteDeny}
                style={{
                  padding: "12px",
                  background: "linear-gradient(135deg, #ff1744 0%, #b71c1c 100%)",
                  boxShadow: "0 0 15px rgba(255, 23, 68, 0.4)",
                  marginTop: 0
                }}
              >
                🚫 CONFIRM DENIAL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EMERGENCY VEHICLE REPOSSESSION & MID-TRIP CANCELLATION MODAL */}
      {repossessionModalOpen && selectedBookingForRepossess && (
        <div className="modal active" id="repossessCarModal">
          <div className="modal-box" style={{ maxWidth: "520px", border: "1.5px solid #ff1744", boxShadow: "0 0 40px rgba(255, 23, 68, 0.3)" }}>
            <button className="close" type="button" onClick={() => setRepossessionModalOpen(false)}>×</button>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <span style={{ fontSize: "20px", animation: "pulse 1.2s infinite" }}>🚨</span>
              <span className="modal-label" style={{ color: "#ff1744", letterSpacing: "1px" }}>
                EMERGENCY FLEET INTERVENTION • REPOSSESSION PROTOCOL
              </span>
            </div>
            <h2 style={{ fontSize: "22px", margin: "4px 0 10px" }}>CANCEL MID-TRIP & REPOSSESS</h2>

            {/* LIVE TELEMETRY BREACH BOX */}
            <div style={{ background: "rgba(255, 23, 68, 0.08)", border: "1px solid rgba(255, 23, 68, 0.35)", borderRadius: "12px", padding: "14px", margin: "14px 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <div>
                  <strong style={{ color: "#fff", fontSize: "15px" }}>{selectedBookingForRepossess.carName}</strong>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>ID: {selectedBookingForRepossess.bookingId} • Plate: {selectedBookingForRepossess.carId}</div>
                </div>
                <span style={{ background: "rgba(255, 23, 68, 0.2)", border: "1px solid #ff1744", color: "#ff1744", padding: "4px 8px", borderRadius: "8px", fontSize: "11px", fontWeight: 800 }}>
                  ● LIVE TRIP BREACH
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "8px" }}>
                <div>
                  <span style={{ color: "var(--text-muted)" }}>Renter: </span>
                  <strong style={{ color: "#fff" }}>{selectedBookingForRepossess.customerName}</strong>
                </div>
                <div>
                  <span style={{ color: "var(--text-muted)" }}>Phone: </span>
                  <strong style={{ color: "var(--primary-cyan)" }}>{selectedBookingForRepossess.phone || "+91 98450 11223"}</strong>
                </div>
                <div>
                  <span style={{ color: "var(--text-muted)" }}>Live Telemetry Speed: </span>
                  <strong style={{ color: "#ff1744" }}>214 KM/H ⚠️</strong>
                </div>
                <div>
                  <span style={{ color: "var(--text-muted)" }}>GPS Location: </span>
                  <strong style={{ color: "#fff" }}>Sector 4 Express Corridor</strong>
                </div>
              </div>
            </div>

            {/* REASON SELECTOR */}
            <div style={{ marginBottom: "14px" }}>
              <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase" }}>
                Reason for Repossession / Miscellaneous Violation *
              </label>
              <select
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  background: "var(--bg-input)",
                  border: "1px solid var(--border-color)",
                  color: "#fff",
                  fontSize: "13px",
                  marginTop: "6px"
                }}
                value={repossessReason}
                onChange={(e) => setRepossessReason(e.target.value)}
              >
                <option value="Track Speeding / Reckless Driving Breach (>200 km/h detected)">
                  ⚡ Track Speeding / Reckless Driving Breach (&gt;200 km/h detected)
                </option>
                <option value="Geofence Boundary Breach (Vehicle taken outside authorized territory)">
                  🗺️ Geofence Boundary Breach (Vehicle taken outside authorized territory)
                </option>
                <option value="Unauthorized Third-Party Sub-Renting / Commercial Misconduct">
                  🚫 Unauthorized Third-Party Sub-Renting / Commercial Misconduct
                </option>
                <option value="Telematics OBD-II Tampering / GPS Jammer Signal Detected">
                  🛰️ Telematics OBD-II Tampering / GPS Jammer Signal Detected
                </option>
                <option value="Aggressive Launch Control Abuse / Dangerous Drifting Stunts">
                  🛑 Aggressive Launch Control Abuse / Dangerous Drifting Stunts
                </option>
                <option value="Contractual Default / Serious Miscellaneous Violation">
                  ⚠️ Contractual Default / Serious Miscellaneous Violation
                </option>
              </select>
            </div>

            <div style={{ marginBottom: "14px" }}>
              <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase" }}>
                Incident Description & Evidence Notes
              </label>
              <textarea
                rows={2}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  background: "var(--bg-input)",
                  border: "1px solid var(--border-color)",
                  color: "#fff",
                  fontSize: "13px",
                  marginTop: "6px",
                  resize: "vertical"
                }}
                placeholder="Log telemetry timestamp, radar evidence, or witness details..."
                value={repossessNotes}
                onChange={(e) => setRepossessNotes(e.target.value)}
              />
            </div>

            {/* ENFORCEMENT CHECKBOXES */}
            <div style={{ background: "rgba(0, 0, 0, 0.3)", border: "1px solid var(--border-color)", borderRadius: "10px", padding: "12px", marginBottom: "18px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "12.5px", color: "#fff", margin: 0 }}>
                <input
                  type="checkbox"
                  checked={killEngineSignal}
                  onChange={(e) => setKillEngineSignal(e.target.checked)}
                  style={{ width: "16px", height: "16px", accentColor: "#ff1744" }}
                />
                <span>Transmit Remote Engine Immobilizer Kill-Signal (Cuts fuel pump & ignition)</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "12.5px", color: "#fff", margin: 0 }}>
                <input
                  type="checkbox"
                  checked={forfeitDeposit}
                  onChange={(e) => setForfeitDeposit(e.target.checked)}
                  style={{ width: "16px", height: "16px", accentColor: "#ff1744" }}
                />
                <span>Forfeit Security Deposit (₹{selectedBookingForRepossess.securityDeposit || 5000}) for violation fine</span>
              </label>
              <div style={{ fontSize: "11.5px", color: "var(--status-green)", paddingLeft: "26px" }}>
                ✓ Vehicle will automatically be reclaimed and returned to <strong>Available</strong> fleet inventory.
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <button
                type="button"
                className="btn-agree-back"
                onClick={() => setRepossessionModalOpen(false)}
                style={{ padding: "12px", borderRadius: "10px", textAlign: "center" }}
              >
                ABORT
              </button>
              <button
                type="button"
                className="confirm-button"
                onClick={handleExecuteRepossess}
                style={{
                  padding: "12px",
                  background: "linear-gradient(135deg, #d50000 0%, #ff1744 100%)",
                  boxShadow: "0 0 20px rgba(255, 23, 68, 0.6)",
                  marginTop: 0,
                  fontWeight: 900
                }}
              >
                🚨 EXECUTE ENGINE KILL & REPOSSESS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



