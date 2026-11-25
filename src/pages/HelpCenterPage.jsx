import React, { useState } from "react";
import { useCarRental } from "../context/CarRentalContext";

export default function HelpCenterPage() {
  const { navigate, showToast, fleet } = useCarRental();

  const [activeTab, setActiveTab] = useState("emergency"); // emergency | fuel | helplines | ticket | faq
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [sosCountdown, setSosCountdown] = useState(15);
  const [selectedCity, setSelectedCity] = useState("all");
  const [faqExpanded, setFaqExpanded] = useState(0);

  // Ticket Form State
  const [ticketForm, setTicketForm] = useState({
    name: "",
    phone: "",
    carId: "bmw-m4",
    issueType: "Mechanical / Breakdown",
    location: "",
    description: "",
    severity: "High (Within 30 Mins)"
  });
  const [submittedTicket, setSubmittedTicket] = useState(null);

  const handleSosTrigger = () => {
    setSosModalOpen(true);
    setSosCountdown(15);
    showToast("🚨 EMERGENCY SOS SIGNAL TRANSMITTED TO CENTRAL DISPATCH!");
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!ticketForm.name || !ticketForm.phone) {
      showToast("Please provide contact name and phone number");
      return;
    }
    const ticketId = `RRC-SOS-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedTicket({
      id: ticketId,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ...ticketForm
    });
    showToast(`✅ Ticket #${ticketId} dispatched! Priority concierge is calling.`);
  };

  // Regional Helplines Data
  const REGIONAL_HUBS = [
    {
      city: "Vijayawada",
      title: "Vijayawada Central Experience Hub",
      phone: "+91 866 245 9988",
      hotline: "+91 98765 43210",
      manager: "K. Srinivas Rao",
      address: "Benz Circle, Ring Road Intersection, Vijayawada, AP 520008",
      emergencyFlatbed: "Available 24/7 (12-min dispatch)",
      status: "Online • 4 Quick Response Units",
      whatsapp: "https://wa.me/919876543210?text=Emergency%20Roadside%20Assistance%20Vijayawada"
    },
    {
      city: "Hyderabad",
      title: "Hyderabad RGIA Airport & HITEC Terminal",
      phone: "+91 40 6812 5500",
      hotline: "+91 98765 43210",
      manager: "Rahul Varma (Fleet Lead)",
      address: "Terminal 1 Aero-Hub, Shamshabad & HITEC City Phase 2",
      emergencyFlatbed: "Available 24/7 (10-min dispatch)",
      status: "Online • 8 Quick Response Units",
      whatsapp: "https://wa.me/919876543210?text=Emergency%20Roadside%20Assistance%20Hyderabad"
    },
    {
      city: "Bangalore",
      title: "Bangalore Central & Kempegowda Hub",
      phone: "+91 80 4920 3344",
      hotline: "+91 98765 43210",
      manager: "Priya Nair",
      address: "100ft Road, Indiranagar & KIA Express Corridor",
      emergencyFlatbed: "Available 24/7 (15-min dispatch)",
      status: "Online • 6 Quick Response Units",
      whatsapp: "https://wa.me/919876543210?text=Emergency%20Roadside%20Assistance%20Bangalore"
    },
    {
      city: "Mumbai",
      title: "Mumbai Coastal Terminal & CSIA Hub",
      phone: "+91 22 2650 7711",
      hotline: "+91 98765 43210",
      manager: "Vikram Singhania",
      address: "Bandra-Worli Sea Link Promenade & Terminal 2 Aerocity",
      emergencyFlatbed: "Available 24/7 (10-min dispatch)",
      status: "Online • 9 Quick Response Units",
      whatsapp: "https://wa.me/919876543210?text=Emergency%20Roadside%20Assistance%20Mumbai"
    },
    {
      city: "Delhi NCR",
      title: "Delhi Aerocity T3 & Cyber City Gurgaon",
      phone: "+91 11 4100 8822",
      hotline: "+91 98765 43210",
      manager: "Aditya Sharma",
      address: "Hospitality District, Aerocity T3 & DLF Cyber City Hub",
      emergencyFlatbed: "Available 24/7 (14-min dispatch)",
      status: "Online • 7 Quick Response Units",
      whatsapp: "https://wa.me/919876543210?text=Emergency%20Roadside%20Assistance%20Delhi"
    },
    {
      city: "Goa",
      title: "Goa Coastal Express Hub",
      phone: "+91 832 240 1199",
      hotline: "+91 98765 43210",
      manager: "Anthony D'Costa",
      address: "Dabolim International Terminal & Calangute Coastal Hub",
      emergencyFlatbed: "Available 24/7 (20-min dispatch)",
      status: "Online • 5 Quick Response Units",
      whatsapp: "https://wa.me/919876543210?text=Emergency%20Roadside%20Assistance%20Goa"
    },
    {
      city: "Chennai",
      title: "Chennai OMR IT Corridor & Airport Hub",
      phone: "+91 44 2855 6677",
      hotline: "+91 98765 43210",
      manager: "S. Karthik",
      address: "OMR IT Expressway & Meenambakkam Airport Link",
      emergencyFlatbed: "Available 24/7 (15-min dispatch)",
      status: "Online • 6 Quick Response Units",
      whatsapp: "https://wa.me/919876543210?text=Emergency%20Roadside%20Assistance%20Chennai"
    }
  ];

  // Live Fuel Data
  const LIVE_FUEL_PRICES = [
    { city: "Hyderabad", petrol: "₹109.66", diesel: "₹97.82", premium95: "₹118.40", super100: "₹160.00" },
    { city: "Bangalore", petrol: "₹102.86", diesel: "₹88.94", premium95: "₹112.50", super100: "₹160.00" },
    { city: "Mumbai", petrol: "₹104.21", diesel: "₹92.15", premium95: "₹114.80", super100: "₹160.00" },
    { city: "Delhi NCR", petrol: "₹94.72", diesel: "₹87.62", premium95: "₹104.50", super100: "₹160.00" },
    { city: "Vijayawada", petrol: "₹110.48", diesel: "₹98.27", premium95: "₹119.20", super100: "₹160.00" },
    { city: "Goa", petrol: "₹96.58", diesel: "₹88.35", premium95: "₹106.00", super100: "₹160.00" },
    { city: "Chennai", petrol: "₹100.75", diesel: "₹92.34", premium95: "₹110.20", super100: "₹160.00" }
  ];

  const VEHICLE_FUEL_RECOMMENDATIONS = [
    { model: "BMW M4 Competition", fuelReq: "IndianOil XP95 or Speed 97", minOctane: "95 RON", note: "Never use regular 91 RON. Turbo knock protection." },
    { model: "Audi R8 V10", fuelReq: "XP100 / XP95 Ultra Premium", minOctane: "98 RON", note: "Naturally aspirated 5.2L V10 demands top octane." },
    { model: "Porsche 911 Carrera", fuelReq: "XP95 / Power 95 Premium", minOctane: "95 RON", note: "Twin-turbo boxer engine factory tuned for 95+." },
    { model: "Lamborghini Urus", fuelReq: "XP95 / Speed 97", minOctane: "95 RON", note: "High compression 4.0L Bi-Turbo requires pure 95+." },
    { model: "Ford Mustang GT 5.0", fuelReq: "95 Octane Premium Petrol", minOctane: "95 RON", note: "5.0 Coyote V8 active timing unlocks peak 450 HP." },
    { model: "Mercedes-AMG CLA 35", fuelReq: "XP95 / High Octane", minOctane: "95 RON", note: "Twin-scroll turbo requires premium synthetic blend." },
    { model: "BMW 330Li M Sport", fuelReq: "95 Octane or Regular Premium", minOctane: "91-95 RON", note: "TwinPower Turbo runs safely on 95 octane." },
    { model: "Toyota Fortuner", fuelReq: "Ultra-Low Sulfur BS-VI Diesel", minOctane: "Cetane 51+", note: "Fill only premium BS-VI diesel with clean injectors." },
    { model: "Range Rover Evoque", fuelReq: "Automotive Clean BS-VI Diesel", minOctane: "Cetane 51+", note: "Ingenium 2.0D engine requires pure sulfur-free diesel." },
    { model: "Rolls-Royce Silver Cloud (1965)", fuelReq: "XP95 / Speed 97 with Valve Additive", minOctane: "98 RON", note: "Vintage 6.2L V8 requires lead-substitute valve lubricant blend." },
    { model: "Aston Martin DB5 (1964)", fuelReq: "Speed 97 or IndianOil XP100", minOctane: "98-100 RON", note: "Triple Weber 4.0L straight-6 demands pure high octane vintage mix." }
  ];

  const HELP_FAQS = [
    {
      q: "What should I do first in case of an accident or breakdown?",
      a: "1. Ensure passenger safety and turn on vehicle hazard lights. 2. Tap the red 'Trigger Immediate SOS' button on this page or call our 24/7 hotline (+91 98765 43210). 3. Our flatbed recovery unit and replacement vehicle will be dispatched immediately. 4. All rentals include zero-deductible commercial insurance with 100% collision damage waiver."
    },
    {
      q: "What is the RenderRCars Fuel Policy?",
      a: "We operate on a transparent Full-to-Full fuel policy. Every car is delivered with 100% full tank. Please return with a full tank of recommended octane petrol/diesel. If returned with less, we top it up at actual local pump price with ZERO penalty surcharge."
    },
    {
      q: "What happens if a tyre punctures on highway expressways?",
      a: "All vehicles carry run-flat tyres or full-size alloy spares with an automated tyre sealant kit and high-pressure electric inflator in the boot. In addition, our 24/7 roadside assist team arrives within 25 minutes anywhere on major national highway corridors."
    },
    {
      q: "How does the toll FASTag operate?",
      a: "All RenderR cars come pre-fitted with an active VIP Express FASTag on the windshield. Tolls are automatically debited from the vehicle FASTag wallet and settled seamlessly against your rental statement upon return with no toll booth queues."
    },
    {
      q: "What if premium 95 Octane fuel is unavailable at a remote station?",
      a: "If XP95 or Speed95 is not available on rural routes, fill standard 91 RON petrol but do NOT engage Track/Sport Plus launch control modes until you can top up with high octane at the next highway pump."
    }
  ];

  const filteredHubs = selectedCity === "all"
    ? REGIONAL_HUBS
    : REGIONAL_HUBS.filter(h => h.city.toLowerCase() === selectedCity.toLowerCase());

  return (
    <div className="help-center-page">
      {/* HERO BANNER */}
      <section className="help-hero">
        <div className="help-hero-inner">
          <div className="help-badge-pill">
            <span className="pulse-dot"></span>
            24/7 ROAD RESCUE & MISSION CONTROL
          </div>
          <h1>RenderR <span>Help Center</span> & Emergency Dispatch</h1>
          <p>
            Instant roadside dispatch, real-time octane fuel intelligence, direct regional hub helplines,
            and zero-deductible accident support across India.
          </p>

          {/* QUICK SOS ACTION BAR */}
          <div className="help-quick-sos-banner">
            <div className="sos-banner-info">
              <span className="sos-alert-icon">🚨</span>
              <div>
                <h3>Stranded on Road or Need Immediate Assistance?</h3>
                <p>Average response time across 7 city hubs: <strong>14.2 Minutes</strong> • GPS Auto-Telemetry</p>
              </div>
            </div>
            <div className="sos-banner-actions">
              <a href="tel:18008897363" className="sos-call-btn">
                📞 Toll-Free 1800-889-7363
              </a>
              <button
                type="button"
                className="sos-trigger-btn"
                onClick={handleSosTrigger}
              >
                🚨 TRIGGER IMMEDIATE SOS
              </button>
            </div>
          </div>

          {/* NAV JUMP TABS */}
          <div className="help-nav-tabs">
            <button
              type="button"
              className={`help-tab-btn ${activeTab === "emergency" ? "active" : ""}`}
              onClick={() => setActiveTab("emergency")}
            >
              🚨 Emergency & SOS
            </button>
            <button
              type="button"
              className={`help-tab-btn ${activeTab === "fuel" ? "active" : ""}`}
              onClick={() => setActiveTab("fuel")}
            >
              ⛽ Live Fuel & Octane
            </button>
            <button
              type="button"
              className={`help-tab-btn ${activeTab === "helplines" ? "active" : ""}`}
              onClick={() => setActiveTab("helplines")}
            >
              📞 Local Hub Helplines
            </button>
            <button
              type="button"
              className={`help-tab-btn ${activeTab === "ticket" ? "active" : ""}`}
              onClick={() => setActiveTab("ticket")}
            >
              📝 Open Support Ticket
            </button>
            <button
              type="button"
              className={`help-tab-btn ${activeTab === "faq" ? "active" : ""}`}
              onClick={() => setActiveTab("faq")}
            >
              ❓ Emergency FAQ
            </button>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <main className="help-main-container">
        {/* TAB 1: EMERGENCY & ACCIDENT PROTOCOL */}
        {activeTab === "emergency" && (
          <div className="help-section-view">
            <div className="help-grid-two">
              {/* ACCIDENT CHECKLIST CARD */}
              <div className="help-card glass-glow-red">
                <div className="card-header-row">
                  <span className="card-badge-red">CRITICAL SAFETY PROTOCOL</span>
                  <span className="card-indicator">Step-by-Step</span>
                </div>
                <h2>What to Do In Case of Accident or Breakdown</h2>
                <div className="protocol-steps">
                  <div className="step-item">
                    <div className="step-num">1</div>
                    <div className="step-text">
                      <strong>Ensure Physical Safety First</strong>
                      <p>Pull over to shoulder, engage hazard flashers, place warning triangle 50m behind.</p>
                    </div>
                  </div>
                  <div className="step-item">
                    <div className="step-num">2</div>
                    <div className="step-text">
                      <strong>Trigger RenderR 1-Touch SOS</strong>
                      <p>Click SOS button or call <strong>+91 98765 43210</strong>. Location is transmitted via OBD-II.</p>
                    </div>
                  </div>
                  <div className="step-item">
                    <div className="step-num">3</div>
                    <div className="step-text">
                      <strong>Take 360° Photos / Video</strong>
                      <p>Capture vehicle panels, license plates of other vehicles, and road environment.</p>
                    </div>
                  </div>
                  <div className="step-item">
                    <div className="step-num">4</div>
                    <div className="step-text">
                      <strong>Zero-Liability Automatic Claims</strong>
                      <p>Do NOT sign outside settlement papers. Our legal concierge handles insurance & police clearance.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* EMERGENCY SERVICES QUICK DIAL */}
              <div className="help-card glass-glow-blue">
                <div className="card-header-row">
                  <span className="card-badge-blue">24/7 HELPLINE DIRECTORY</span>
                  <span className="card-indicator">Nationwide Active</span>
                </div>
                <h2>Official Highway & Public Helplines</h2>
                <div className="emergency-contacts-list">
                  <a href="tel:18008897363" className="contact-tile">
                    <div className="tile-icon">🏎️</div>
                    <div className="tile-info">
                      <strong>RenderR Central Command</strong>
                      <small>24/7 Supercar Concierge & Flatbed</small>
                    </div>
                    <span className="tile-phone">1800-889-7363 ↗</span>
                  </a>

                  <a href="tel:112" className="contact-tile">
                    <div className="tile-icon">🚨</div>
                    <div className="tile-info">
                      <strong>National Emergency Services</strong>
                      <small>Police, Fire & Unified Rescue (India)</small>
                    </div>
                    <span className="tile-phone">112 ↗</span>
                  </a>

                  <a href="tel:1033" className="contact-tile">
                    <div className="tile-icon">🛣️</div>
                    <div className="tile-info">
                      <strong>NHAI National Highway Helpline</strong>
                      <small>Expressway Towing & Route Assistance</small>
                    </div>
                    <span className="tile-phone">1033 ↗</span>
                  </a>

                  <a href="tel:108" className="contact-tile">
                    <div className="tile-icon">🚑</div>
                    <div className="tile-info">
                      <strong>Medical Ambulance Emergency</strong>
                      <small>Instant Trauma & Paramedic Response</small>
                    </div>
                    <span className="tile-phone">108 ↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* RAPID FLEET STATUS TICKER */}
            <div className="rapid-dispatch-stats">
              <div className="stat-pill">
                <span className="dot-green"></span>
                <strong>Recovery Flatbeds:</strong> 18 Active Nationwide
              </div>
              <div className="stat-pill">
                <span className="dot-green"></span>
                <strong>Average Highway Arrival:</strong> 18.5 Minutes
              </div>
              <div className="stat-pill">
                <span className="dot-green"></span>
                <strong>Zero Deductible Waiver:</strong> 100% Included
              </div>
              <div className="stat-pill">
                <span className="dot-green"></span>
                <strong>On-the-spot Vehicle Swap:</strong> Guaranteed
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LIVE FUEL & EV CHARGING INTELLIGENCE */}
        {activeTab === "fuel" && (
          <div className="help-section-view">
            {/* FUEL PRICES TABLE */}
            <div className="help-card" style={{ marginBottom: "24px" }}>
              <div className="card-header-row">
                <span className="card-badge-gold">REAL-TIME TELEMETRY</span>
                <span className="card-indicator">Updated Daily 06:00 AM IST</span>
              </div>
              <h2>City-Wise Fuel Price Intelligence</h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "16px" }}>
                Reference retail prices across all RenderR operational hubs. We encourage refilling with recommended octane before return.
              </p>

              <div className="table-responsive-wrapper">
                <table className="help-table">
                  <thead>
                    <tr>
                      <th>Operational City</th>
                      <th>Standard Petrol (91 RON)</th>
                      <th>High-Speed Diesel (BS-VI)</th>
                      <th>Premium XP95 / Speed 95</th>
                      <th>100 Octane (XP100)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {LIVE_FUEL_PRICES.map((row, idx) => (
                      <tr key={idx}>
                        <td><strong>📍 {row.city}</strong></td>
                        <td>{row.petrol} / L</td>
                        <td>{row.diesel} / L</td>
                        <td><span className="highlight-tag cyan">{row.premium95} / L</span></td>
                        <td><span className="highlight-tag red">{row.super100} / L</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* VEHICLE FUEL SPECIFICATIONS */}
            <div className="help-card">
              <div className="card-header-row">
                <span className="card-badge-blue">ENGINE COMPATIBILITY</span>
                <span className="card-indicator">Manufacturer Approved</span>
              </div>
              <h2>Recommended Octane & Fuel Spec Per Vehicle</h2>

              <div className="fuel-spec-grid">
                {VEHICLE_FUEL_RECOMMENDATIONS.map((car, idx) => (
                  <div key={idx} className="fuel-spec-card">
                    <div className="spec-card-top">
                      <h3>{car.model}</h3>
                      <span className="min-octane-badge">{car.minOctane}</span>
                    </div>
                    <div className="fuel-detail-row">
                      <span className="lbl">Recommended:</span>
                      <strong className="val">{car.fuelReq}</strong>
                    </div>
                    <p className="fuel-note">💡 {car.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: REGIONAL HUB HELPLINES */}
        {activeTab === "helplines" && (
          <div className="help-section-view">
            <div className="helpline-filter-bar">
              <div className="filter-left">
                <h2>Direct Regional Hub Dispatch Centers</h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "13.5px", margin: 0 }}>
                  Contact your designated city hub manager directly for local pickups, key exchanges, and immediate towing.
                </p>
              </div>
              <div className="city-filter-buttons">
                <button
                  type="button"
                  className={`city-pill ${selectedCity === "all" ? "active" : ""}`}
                  onClick={() => setSelectedCity("all")}
                >
                  All Hubs (7)
                </button>
                {REGIONAL_HUBS.map(h => (
                  <button
                    key={h.city}
                    type="button"
                    className={`city-pill ${selectedCity.toLowerCase() === h.city.toLowerCase() ? "active" : ""}`}
                    onClick={() => setSelectedCity(h.city.toLowerCase())}
                  >
                    {h.city}
                  </button>
                ))}
              </div>
            </div>

            <div className="hub-cards-grid">
              {filteredHubs.map((hub, idx) => (
                <div key={idx} className="hub-card">
                  <div className="hub-top">
                    <div>
                      <span className="hub-city-badge">📍 {hub.city.toUpperCase()}</span>
                      <h3>{hub.title}</h3>
                    </div>
                    <span className="hub-status-pill">{hub.status}</span>
                  </div>

                  <p className="hub-address">🏢 {hub.address}</p>

                  <div className="hub-details-grid">
                    <div>
                      <small>HUB MANAGER</small>
                      <strong>{hub.manager}</strong>
                    </div>
                    <div>
                      <small>FLATBED DISPATCH</small>
                      <strong style={{ color: "var(--status-green)" }}>{hub.emergencyFlatbed}</strong>
                    </div>
                  </div>

                  <div className="hub-actions">
                    <a href={`tel:${hub.phone.replace(/\s+/g, '')}`} className="hub-action-btn primary">
                      📞 Call Direct ({hub.phone})
                    </a>
                    <a href={hub.whatsapp} target="_blank" rel="noreferrer" className="hub-action-btn whatsapp">
                      💬 WhatsApp SOS
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: OPEN SUPPORT TICKET */}
        {activeTab === "ticket" && (
          <div className="help-section-view">
            <div className="help-grid-two">
              {/* TICKET FORM */}
              <div className="help-card">
                <div className="card-header-row">
                  <span className="card-badge-blue">DISPATCH DESK</span>
                  <span className="card-indicator">Direct to Lead Engineer</span>
                </div>
                <h2>Submit Service or Emergency Incident Report</h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "20px" }}>
                  File breakdown details, fuel issues, toll FASTag queries, or reporting minor scratches before trip conclusion.
                </p>

                <form onSubmit={handleTicketSubmit} className="ticket-form">
                  <div className="form-row-two">
                    <div className="input-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mayank Kumar"
                        value={ticketForm.name}
                        onChange={(e) => setTicketForm({ ...ticketForm, name: e.target.value })}
                      />
                    </div>
                    <div className="input-group">
                      <label>Phone Number (with WhatsApp) *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={ticketForm.phone}
                        onChange={(e) => setTicketForm({ ...ticketForm, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row-two">
                    <div className="input-group">
                      <label>Vehicle Model / Registration</label>
                      <select
                        value={ticketForm.carId}
                        onChange={(e) => setTicketForm({ ...ticketForm, carId: e.target.value })}
                      >
                        {fleet.map(c => (
                          <option key={c.id} value={c.id}>{c.name} ({c.brand})</option>
                        ))}
                      </select>
                    </div>

                    <div className="input-group">
                      <label>Issue Classification</label>
                      <select
                        value={ticketForm.issueType}
                        onChange={(e) => setTicketForm({ ...ticketForm, issueType: e.target.value })}
                      >
                        <option value="Mechanical / Breakdown">Mechanical Breakdown / Engine Warning</option>
                        <option value="Flat Tyre / Pressure Alert">Flat Tyre / Low Pressure Alert</option>
                        <option value="Fuel / Octane Query">Fuel Grade / Reimbursement Query</option>
                        <option value="FASTag / Highway Toll Issue">FASTag / Highway Toll Dispute</option>
                        <option value="Minor Scratch / Damage Report">Pre-existing Scratch / Body Damage</option>
                        <option value="Key Fob / Battery Low">Keyless Fob Battery / Door Lock</option>
                      </select>
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Current Location / Highway Marker</label>
                    <input
                      type="text"
                      placeholder="e.g. Hyderabad ORR Exit 12 near Shamshabad Hub"
                      value={ticketForm.location}
                      onChange={(e) => setTicketForm({ ...ticketForm, location: e.target.value })}
                    />
                  </div>

                  <div className="input-group">
                    <label>Incident Details & Observations</label>
                    <textarea
                      rows="4"
                      required
                      placeholder="Describe what happened, any dashboard warning lights, or assistance needed..."
                      value={ticketForm.description}
                      onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                    ></textarea>
                  </div>

                  <button type="submit" className="primary-btn" style={{ width: "100%", padding: "14px" }}>
                    🚀 Dispatch Incident Ticket to Concierge
                  </button>
                </form>
              </div>

              {/* TICKET STATUS PREVIEW */}
              <div>
                {submittedTicket ? (
                  <div className="help-card glass-glow-green" style={{ height: "100%" }}>
                    <div className="card-header-row">
                      <span className="card-badge-green">TICKET ACTIVE & DISPATCHED</span>
                      <span className="card-indicator">{submittedTicket.timestamp}</span>
                    </div>
                    <h2>Incident Ticket #{submittedTicket.id}</h2>

                    <div className="ticket-summary-box">
                      <div className="sum-item">
                        <small>CUSTOMER</small>
                        <strong>{submittedTicket.name} ({submittedTicket.phone})</strong>
                      </div>
                      <div className="sum-item">
                        <small>VEHICLE</small>
                        <strong>{submittedTicket.carId.toUpperCase()}</strong>
                      </div>
                      <div className="sum-item">
                        <small>CATEGORY</small>
                        <strong>{submittedTicket.issueType}</strong>
                      </div>
                      <div className="sum-item">
                        <small>LOCATION</small>
                        <strong>{submittedTicket.location || "Auto-GPS Coordinate Transmitted"}</strong>
                      </div>
                      <div className="sum-item">
                        <small>DETAILS</small>
                        <p>{submittedTicket.description}</p>
                      </div>
                    </div>

                    <div style={{ marginTop: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      <a href="tel:+919876543210" className="primary-btn" style={{ flex: 1, textAlign: "center" }}>
                        📞 Speak with Assigned Engineer
                      </a>
                      <button
                        type="button"
                        className="secondary-btn"
                        onClick={() => {
                          setSubmittedTicket(null);
                          showToast("Ready for new report");
                        }}
                      >
                        Submit Another
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="help-card" style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center", padding: "40px 24px" }}>
                    <div style={{ fontSize: "56px", marginBottom: "16px" }}>📡</div>
                    <h3 style={{ color: "#fff", marginBottom: "8px" }}>Live Dispatch Telemetry Center</h3>
                    <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.6, maxWidth: "380px", margin: "0 auto 24px" }}>
                      Submit your incident ticket on the left to instantly alert the on-duty fleet engineers and track real-time resolution status.
                    </p>
                    <div className="telemetry-badge-row">
                      <span>✓ 24/7 Monitored</span>
                      <span>✓ GPS Linked</span>
                      <span>✓ Fast Flatbed Arrival</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: EMERGENCY FAQ */}
        {activeTab === "faq" && (
          <div className="help-section-view">
            <div className="help-card">
              <div className="card-header-row">
                <span className="card-badge-blue">KNOWLEDGE BASE</span>
                <span className="card-indicator">Frequently Asked Questions</span>
              </div>
              <h2>Emergency & On-Road Operations FAQ</h2>

              <div className="faq-accordion-list">
                {HELP_FAQS.map((faq, idx) => (
                  <div key={idx} className={`faq-card-item ${faqExpanded === idx ? "active" : ""}`}>
                    <button
                      type="button"
                      className="faq-question-btn"
                      onClick={() => setFaqExpanded(faqExpanded === idx ? -1 : idx)}
                    >
                      <span>{faq.q}</span>
                      <span className="faq-toggle-icon">{faqExpanded === idx ? "−" : "+"}</span>
                    </button>
                    {faqExpanded === idx && (
                      <div className="faq-answer-body">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* SOS EMERGENCY MODAL */}
      {sosModalOpen && (
        <div className="modal-overlay" style={{ display: "flex", zIndex: 9999 }}>
          <div className="modal-content sos-modal-box">
            <div className="sos-modal-header">
              <span className="sos-beacon-circle">🚨</span>
              <h2>EMERGENCY SOS BROADCAST ACTIVE</h2>
              <p>GPS coordinates and vehicle OBD-II diagnostics transmitted to Central Command.</p>
            </div>

            <div className="sos-modal-info">
              <div className="sos-info-row">
                <span>Nearest Regional Hub:</span>
                <strong>Vijayawada / Hyderabad Hub (Primary)</strong>
              </div>
              <div className="sos-info-row">
                <span>Assigned Rapid Recovery Unit:</span>
                <strong>Flatbed Unit #04 (En Route)</strong>
              </div>
              <div className="sos-info-row">
                <span>Estimated Arrival:</span>
                <strong style={{ color: "var(--primary-cyan)" }}>14 Minutes</strong>
              </div>
              <div className="sos-info-row">
                <span>Live Priority Helpline:</span>
                <strong style={{ color: "var(--accent-gold)" }}>+91 98765 43210 / 1800-889-7363</strong>
              </div>
            </div>

            <div className="sos-modal-actions">
              <a href="tel:18008897363" className="primary-btn" style={{ flex: 1, textAlign: "center", background: "var(--primary-red)" }}>
                📞 Connect to On-Duty Concierge
              </a>
              <a href="tel:112" className="secondary-btn" style={{ flex: 1, textAlign: "center", color: "#fff", borderColor: "rgba(255,255,255,0.2)" }}>
                🚨 Call 112 (National Police/Ambulance)
              </a>
            </div>

            <button
              type="button"
              className="sos-cancel-btn"
              onClick={() => {
                setSosModalOpen(false);
                showToast("SOS Broadcast paused. Concierge remains on standby.");
              }}
            >
              Close Alert Window (Dispatch Remains Active)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
