import React, { useState, useEffect } from "react";
import { useCarRental } from "../context/CarRentalContext";
import { playHornSound, playLockChirp } from "../utils/soundEffects";

export default function GpsTrackerView() {
  const { fleet, showToast } = useCarRental();

  // Initial fleet vehicles with GPS mock telemetry
  const vehiclesGps = [
    {
      id: "bmw-m4",
      name: "BMW M4 Competition",
      plate: "TS-09-EX-7788",
      driver: "Mayank Kumar (VIP #8942)",
      city: "Hyderabad Hub",
      location: "Outer Ring Road (Gachibowli → RGIA Airport)",
      lat: 17.4325,
      lng: 78.4071,
      mapX: 48,
      mapY: 62,
      speed: 94,
      rpm: 4200,
      gear: "4th",
      throttle: 52,
      fuel: 78,
      temp: 92,
      tirePsi: "34 / 35",
      odometer: "12,840 KM",
      status: "Cruising (On Trip)",
      geofence: "SAFE — Inside Express Corridor",
      locked: true,
      valetMode: false,
      killSwitch: false
    },
    {
      id: "audi-r8",
      name: "Audi R8 V10 Performance",
      plate: "MH-02-GT-9911",
      driver: "Vikram Singhania (VIP #RRC-482)",
      city: "Mumbai Hub",
      location: "Bandra-Worli Sea Link & Coastal Road",
      lat: 19.0330,
      lng: 72.8180,
      mapX: 28,
      mapY: 55,
      speed: 86,
      rpm: 4800,
      gear: "3rd",
      throttle: 65,
      fuel: 72,
      temp: 96,
      tirePsi: "33 / 34",
      odometer: "7,620 KM",
      status: "High-Speed Sprint",
      geofence: "SAFE — Coastal Highway Approved",
      locked: true,
      valetMode: false,
      killSwitch: false
    },
    {
      id: "mercedes-amg",
      name: "Mercedes AMG C63 S",
      plate: "KA-04-MM-8822",
      driver: "Unassigned (Fleet Standby)",
      city: "Bangalore Hub",
      location: "Indiranagar Executive Lounge Depot",
      lat: 12.9716,
      lng: 77.5946,
      mapX: 42,
      mapY: 78,
      speed: 0,
      rpm: 800,
      gear: "Park (P)",
      throttle: 0,
      fuel: 98,
      temp: 78,
      tirePsi: "35 / 35",
      odometer: "16,300 KM",
      status: "Parked / Ready for Dispatch",
      geofence: "DEPOT SAFE — Perimeter Guard Active",
      locked: true,
      valetMode: false,
      killSwitch: false
    },
    {
      id: "toyota-fortuner",
      name: "Toyota Fortuner Legender",
      plate: "DL-01-CR-4400",
      driver: "Col. Rajesh Malhotra (Member #9910)",
      city: "Delhi NCR Hub",
      location: "Aerocity & Gurgaon CyberHub Expressway",
      lat: 28.5562,
      lng: 77.1000,
      mapX: 38,
      mapY: 26,
      speed: 68,
      rpm: 2100,
      gear: "5th",
      throttle: 35,
      fuel: 85,
      temp: 88,
      tirePsi: "32 / 33",
      odometer: "24,150 KM",
      status: "Cruising (On Trip)",
      geofence: "SAFE — National Highway Permitted",
      locked: true,
      valetMode: false,
      killSwitch: false
    }
  ];

  const [activeCarId, setActiveCarId] = useState("bmw-m4");
  const [vehiclesState, setVehiclesState] = useState(vehiclesGps);
  const [radarPulse, setRadarPulse] = useState(0);
  const [logs, setLogs] = useState([
    "Satellite link established with GPS constellation (12 satellites locked)",
    "BMW M4 (TS-09-EX-7788): Telemetry healthy on Hyderabad ORR at 94 km/h",
    "Audi R8 (MH-02-GT-9911): Geofence boundary verified on Bandra-Worli Sea Link",
    "Mercedes AMG (KA-04-MM-8822): Standby battery float 100%, doors locked",
    "Toyota Fortuner (DL-01-CR-4400): Delhi Aerocity corridor cruise active"
  ]);

  // Periodic simulated speed variation & log stream
  useEffect(() => {
    const timer = setInterval(() => {
      setRadarPulse(p => (p + 1) % 100);
      setVehiclesState(prev => prev.map(v => {
        if (v.speed > 0) {
          const delta = (Math.random() - 0.48) * 4;
          const newSpeed = Math.max(45, Math.min(135, Math.round(v.speed + delta)));
          return { ...v, speed: newSpeed, rpm: Math.round(newSpeed * 45) };
        }
        return v;
      }));
    }, 2400);

    return () => clearInterval(timer);
  }, []);

  const activeCar = vehiclesState.find(v => v.id === activeCarId) || vehiclesState[0];

  // Remote Actions
  const handleSoundHorn = () => {
    playHornSound();
    showToast(`🚨 Honking horn & strobing LED beacons on ${activeCar.name} (${activeCar.plate})`);
    addLog(`Audible locator beacon broadcasted to ${activeCar.name} (${activeCar.plate})`);
  };

  const handleToggleLock = () => {
    const newLock = !activeCar.locked;
    playLockChirp(newLock);
    setVehiclesState(prev => prev.map(v => v.id === activeCar.id ? { ...v, locked: newLock } : v));
    showToast(`${newLock ? "🔒 Locked" : "🔓 Unlocked"} doors remotely on ${activeCar.name}`);
    addLog(`Remote door actuator command: ${newLock ? "DOORS LOCKED" : "DOORS UNLOCKED"} for ${activeCar.plate}`);
  };

  const handleToggleKillSwitch = () => {
    const newKill = !activeCar.killSwitch;
    setVehiclesState(prev => prev.map(v => v.id === activeCar.id ? { ...v, killSwitch: newKill, speed: newKill ? 0 : 75 } : v));
    if (newKill) {
      showToast(`⚡ EMERGENCY ENGINE KILL SWITCH ACTIVATED on ${activeCar.plate}! Fuel relay tripped.`);
      addLog(`CRITICAL: Anti-Theft Kill-Switch TRIGGERED for ${activeCar.plate}. Engine cut safely.`);
    } else {
      showToast(`✅ Engine immobilizer cleared on ${activeCar.plate}. Ignition restored.`);
      addLog(`Engine immobilizer released for ${activeCar.plate}. Ready to start.`);
    }
  };

  const handleToggleValet = () => {
    const newValet = !activeCar.valetMode;
    setVehiclesState(prev => prev.map(v => v.id === activeCar.id ? { ...v, valetMode: newValet } : v));
    showToast(`🏎️ Speed Governor: ${newValet ? "Valet Limiter Active (Max 80 km/h)" : "Track Mode Unlocked (Unlimited)"}`);
    addLog(`Governor mode set to ${newValet ? "VALET (80 KM/H LIMIT)" : "TRACK UNLIMITED"} for ${activeCar.plate}`);
  };

  const addLog = (msg) => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [`[${time}] ${msg}`, ...prev.slice(0, 7)]);
  };

  return (
    <div className="gps-tracker-view" style={{ animation: "fadeIn 0.3s ease" }}>
      {/* TOP HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span className="pulse-dot" style={{ background: "var(--primary-cyan)", boxShadow: "0 0 10px var(--primary-cyan)" }}></span>
            <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "1.5px", color: "var(--primary-cyan)", textTransform: "uppercase" }}>
              SATELLITE TELEMETRY COMMAND
            </span>
          </div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "28px", color: "#fff", fontWeight: 900 }}>
            LIVE FLEET <span>GPS RADAR</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
            Real-time geofence tracking, speed telemetry & remote anti-theft immobilizer controls.
          </p>
        </div>

        {/* SATELLITE STATUS PILL */}
        <div style={{
          background: "rgba(0, 242, 254, 0.1)",
          border: "1px solid rgba(0, 242, 254, 0.3)",
          borderRadius: "14px",
          padding: "10px 18px",
          display: "flex",
          alignItems: "center",
          gap: "12px"
        }}>
          <span style={{ fontSize: "20px" }}>🛰️</span>
          <div>
            <div style={{ fontSize: "10.5px", fontWeight: 800, color: "var(--primary-cyan)", textTransform: "uppercase" }}>
              IRNSS / NAVIC SATELLITE MESH
            </div>
            <strong style={{ fontSize: "13px", color: "#fff" }}>12 SATELLITES LOCKED • 0.4s LATENCY</strong>
          </div>
        </div>
      </div>

      {/* VEHICLE QUICK SELECTOR CARDS */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
        gap: "14px",
        marginBottom: "24px"
      }}>
        {vehiclesState.map(car => {
          const isSelected = car.id === activeCarId;
          const isMoving = car.speed > 0;
          return (
            <button
              key={car.id}
              type="button"
              onClick={() => setActiveCarId(car.id)}
              style={{
                background: isSelected ? "linear-gradient(135deg, rgba(0, 242, 254, 0.18), rgba(16, 20, 32, 0.95))" : "var(--bg-card)",
                border: isSelected ? "1px solid var(--primary-cyan)" : "1px solid var(--border-color)",
                boxShadow: isSelected ? "0 0 20px rgba(0, 242, 254, 0.25)" : "none",
                borderRadius: "14px",
                padding: "14px 16px",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                cursor: "pointer",
                transition: "all 0.25s ease"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{
                  fontSize: "10px",
                  fontWeight: 800,
                  padding: "2px 8px",
                  borderRadius: "12px",
                  background: isMoving ? "rgba(0, 230, 118, 0.2)" : "rgba(255, 255, 255, 0.08)",
                  color: isMoving ? "var(--status-green)" : "var(--text-muted)",
                  border: isMoving ? "1px solid var(--status-green)" : "1px solid rgba(255, 255, 255, 0.1)"
                }}>
                  {isMoving ? `● ${car.speed} KM/H` : "● PARKED"}
                </span>
                <small style={{ color: "var(--text-muted)", fontSize: "11px", fontWeight: 700 }}>{car.plate}</small>
              </div>

              <strong style={{ fontFamily: "var(--font-heading)", fontSize: "15px", color: "#fff" }}>
                {car.name}
              </strong>

              <span style={{ fontSize: "11.5px", color: "var(--text-secondary)" }}>
                📍 {car.city}
              </span>
            </button>
          );
        })}
      </div>

      {/* GPS RADAR MAP & COCKPIT HUD GRID */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1.3fr 0.9fr",
        gap: "24px",
        marginBottom: "24px"
      }}>
        {/* LEFT: SATELLITE RADAR MAP */}
        <div style={{
          background: "#080b14",
          border: "1px solid var(--border-color)",
          borderRadius: "20px",
          padding: "20px",
          position: "relative",
          minHeight: "440px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6)"
        }}>
          {/* RADAR MAP HEADER OVERLAY */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", zIndex: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "14px", color: "var(--primary-cyan)" }}>🎯</span>
              <strong style={{ fontSize: "12.5px", color: "#fff", letterSpacing: "1px" }}>
                INDIA NATIONAL CORRIDOR RADAR
              </strong>
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-muted)", background: "rgba(255, 255, 255, 0.05)", padding: "4px 10px", borderRadius: "8px" }}>
              GRID: WGS-84 / HIGH-RES SATELLITE
            </div>
          </div>

          {/* SVG SATELLITE RADAR CANVAS */}
          <div style={{ flex: 1, position: "relative", width: "100%", height: "360px", background: "radial-gradient(circle at center, #0f1526 0%, #060810 100%)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
            {/* RADAR SWEEP LINES */}
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
              {/* Concentric distance circles */}
              <circle cx="50%" cy="50%" r="28%" fill="none" stroke="rgba(0, 242, 254, 0.08)" strokeDasharray="4 4" />
              <circle cx="50%" cy="50%" r="44%" fill="none" stroke="rgba(0, 242, 254, 0.08)" strokeDasharray="6 6" />
              <circle cx="50%" cy="50%" r="60%" fill="none" stroke="rgba(0, 242, 254, 0.05)" />

              {/* Crosshair grid */}
              <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="rgba(0, 242, 254, 0.06)" />
              <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="rgba(0, 242, 254, 0.06)" />

              {/* Express Highways & City connecting routes */}
              <path d="M 38% 26% L 28% 55% L 48% 62% L 42% 78%" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="2" strokeDasharray="5 5" />
            </svg>

            {/* CITY HUB LABELS */}
            <div style={{ position: "absolute", top: "24%", left: "37%", fontSize: "10px", color: "rgba(255,255,255,0.4)", fontWeight: 700 }}>DELHI NCR</div>
            <div style={{ position: "absolute", top: "53%", left: "18%", fontSize: "10px", color: "rgba(255,255,255,0.4)", fontWeight: 700 }}>MUMBAI</div>
            <div style={{ position: "absolute", top: "60%", left: "50%", fontSize: "10px", color: "rgba(255,255,255,0.4)", fontWeight: 700 }}>HYDERABAD</div>
            <div style={{ position: "absolute", top: "76%", left: "44%", fontSize: "10px", color: "rgba(255,255,255,0.4)", fontWeight: 700 }}>BANGALORE</div>

            {/* VEHICLE GPS PING MARKERS */}
            {vehiclesState.map(car => {
              const isSelected = car.id === activeCarId;
              const isMoving = car.speed > 0;
              return (
                <div
                  key={car.id}
                  onClick={() => setActiveCarId(car.id)}
                  style={{
                    position: "absolute",
                    top: `${car.mapY}%`,
                    left: `${car.mapX}%`,
                    transform: "translate(-50%, -50%)",
                    cursor: "pointer",
                    zIndex: isSelected ? 30 : 20,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}
                >
                  {/* Concentric Radar Ring */}
                  <div style={{
                    width: isSelected ? "36px" : "24px",
                    height: isSelected ? "36px" : "24px",
                    borderRadius: "50%",
                    background: isSelected ? "rgba(0, 242, 254, 0.25)" : "rgba(255, 23, 68, 0.2)",
                    border: isSelected ? "2px solid var(--primary-cyan)" : "1px solid var(--primary-red)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: isSelected ? "0 0 16px var(--primary-cyan)" : "none",
                    animation: isMoving ? "pulse 1.8s infinite" : "none"
                  }}>
                    <span style={{ fontSize: isSelected ? "14px" : "11px" }}>
                      {car.speed > 0 ? "🏎️" : "🅿️"}
                    </span>
                  </div>

                  {/* Marker Label */}
                  <div style={{
                    background: isSelected ? "var(--primary-cyan)" : "rgba(10, 12, 20, 0.85)",
                    color: isSelected ? "#000" : "#fff",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    fontSize: "9.5px",
                    fontWeight: 800,
                    padding: "2px 6px",
                    borderRadius: "4px",
                    whiteSpace: "nowrap",
                    marginTop: "3px"
                  }}>
                    {car.name.split(" ")[0]} ({car.speed} km/h)
                  </div>
                </div>
              );
            })}
          </div>

          {/* SATELLITE RADAR FOOTER INFO */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px", fontSize: "11px", color: "var(--text-muted)" }}>
            <span>Target Selected: <strong style={{ color: "var(--primary-cyan)" }}>{activeCar.name}</strong></span>
            <span>Live Coordinates: <strong style={{ color: "#fff" }}>{activeCar.lat.toFixed(4)}° N, {activeCar.lng.toFixed(4)}° E</strong></span>
          </div>
        </div>

        {/* RIGHT: HUD COCKPIT TELEMETRY & REMOTE CONTROL CONSOLE */}
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          borderRadius: "20px",
          padding: "26px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          boxShadow: "var(--shadow-card)"
        }}>
          {/* VEHICLE STATUS STRIP */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: "16px", borderBottom: "1px solid var(--border-color)" }}>
            <div>
              <span style={{ fontSize: "11px", fontWeight: 800, color: "var(--primary-red)", letterSpacing: "1px", textTransform: "uppercase" }}>
                {activeCar.plate}
              </span>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "22px", color: "#fff", fontWeight: 900 }}>
                {activeCar.name}
              </h3>
              <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                Driver: <strong style={{ color: "#fff" }}>{activeCar.driver}</strong>
              </span>
            </div>

            <div style={{ textAlign: "right" }}>
              <span style={{
                fontSize: "11px",
                fontWeight: 800,
                padding: "4px 10px",
                borderRadius: "20px",
                background: activeCar.killSwitch ? "rgba(255, 23, 68, 0.2)" : (activeCar.speed > 0 ? "rgba(0, 230, 118, 0.2)" : "rgba(255, 255, 255, 0.1)"),
                color: activeCar.killSwitch ? "var(--primary-red)" : (activeCar.speed > 0 ? "var(--status-green)" : "var(--text-muted)"),
                border: "1px solid currentColor"
              }}>
                {activeCar.killSwitch ? "ENGINE DISABLED" : (activeCar.speed > 0 ? "IN MOTION" : "PARKED")}
              </span>
            </div>
          </div>

          {/* DIGITAL SPEEDOMETER & RPM GAUGE */}
          <div style={{
            background: "linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(16, 20, 32, 0.8))",
            border: "1px solid var(--border-color)",
            borderRadius: "16px",
            padding: "20px",
            textAlign: "center"
          }}>
            <small style={{ fontSize: "10.5px", fontWeight: 800, color: "var(--text-muted)", letterSpacing: "1px" }}>
              INSTANT VELOCITY READOUT
            </small>

            <div style={{ fontFamily: "var(--font-heading)", fontSize: "52px", fontWeight: 900, color: activeCar.speed > 100 ? "var(--primary-red)" : "var(--primary-cyan)", lineHeight: 1.1, margin: "6px 0" }}>
              {activeCar.speed} <span style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-secondary)" }}>KM/H</span>
            </div>

            {/* SPEED PROGRESS BAR */}
            <div style={{ width: "100%", height: "8px", background: "rgba(255, 255, 255, 0.1)", borderRadius: "4px", overflow: "hidden", margin: "10px 0" }}>
              <div style={{
                width: `${Math.min(100, (activeCar.speed / 280) * 100)}%`,
                height: "100%",
                background: activeCar.speed > 120 ? "linear-gradient(90deg, var(--primary-cyan), var(--primary-red))" : "var(--primary-cyan)",
                transition: "width 0.4s ease"
              }}></div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>
              <span>Gear: <strong style={{ color: "#fff" }}>{activeCar.gear}</strong></span>
              <span>RPM: <strong style={{ color: "#fff" }}>{activeCar.rpm}</strong></span>
              <span>Throttle: <strong style={{ color: "#fff" }}>{activeCar.throttle}%</strong></span>
            </div>
          </div>

          {/* TELEMETRY VITALS GRID */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-color)", borderRadius: "10px", padding: "10px", textAlign: "center" }}>
              <small style={{ fontSize: "10px", color: "var(--text-muted)", fontWeight: 700, display: "block" }}>FUEL / SOC</small>
              <strong style={{ fontSize: "14px", color: "var(--status-green)" }}>⚡ {activeCar.fuel}%</strong>
            </div>

            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-color)", borderRadius: "10px", padding: "10px", textAlign: "center" }}>
              <small style={{ fontSize: "10px", color: "var(--text-muted)", fontWeight: 700, display: "block" }}>OIL TEMP</small>
              <strong style={{ fontSize: "14px", color: "#fff" }}>🌡️ {activeCar.temp}°C</strong>
            </div>

            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-color)", borderRadius: "10px", padding: "10px", textAlign: "center" }}>
              <small style={{ fontSize: "10px", color: "var(--text-muted)", fontWeight: 700, display: "block" }}>TIRE PSI</small>
              <strong style={{ fontSize: "14px", color: "var(--primary-cyan)" }}>💨 {activeCar.tirePsi}</strong>
            </div>
          </div>

          {/* LOCATION CORRIDOR & GEOFENCE */}
          <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid var(--border-color)", borderRadius: "12px", padding: "12px 14px", fontSize: "12.5px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <span style={{ color: "var(--text-muted)" }}>Current Route:</span>
              <strong style={{ color: "#fff" }}>{activeCar.location}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text-muted)" }}>Geofence:</span>
              <strong style={{ color: "var(--status-green)" }}>{activeCar.geofence}</strong>
            </div>
          </div>

          {/* REMOTE INTERACTIVE SECURITY COMMANDS */}
          <div>
            <span style={{ fontSize: "11px", fontWeight: 800, color: "var(--text-muted)", letterSpacing: "1px", textTransform: "uppercase", display: "block", marginBottom: "10px" }}>
              REMOTE TELEMATICS ACTUATORS
            </span>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <button
                type="button"
                className="secondary-btn"
                style={{ padding: "10px", fontSize: "12px", justifyContent: "center" }}
                onClick={handleSoundHorn}
              >
                🚨 Sound Horn & Strobes
              </button>

              <button
                type="button"
                className="secondary-btn"
                style={{ padding: "10px", fontSize: "12px", justifyContent: "center" }}
                onClick={handleToggleLock}
              >
                {activeCar.locked ? "🔓 Unlock Doors" : "🔒 Lock Doors"}
              </button>

              <button
                type="button"
                className="secondary-btn"
                style={{
                  padding: "10px",
                  fontSize: "12px",
                  justifyContent: "center",
                  background: activeCar.valetMode ? "rgba(255, 183, 3, 0.2)" : "rgba(255, 255, 255, 0.05)",
                  borderColor: activeCar.valetMode ? "var(--accent-gold)" : "var(--border-color)",
                  color: activeCar.valetMode ? "var(--accent-gold)" : "#fff"
                }}
                onClick={handleToggleValet}
              >
                {activeCar.valetMode ? "⚡ Valet Capped (80 km/h)" : "🏎️ Track Mode (Unlimited)"}
              </button>

              <button
                type="button"
                style={{
                  padding: "10px",
                  fontSize: "12px",
                  fontWeight: 800,
                  borderRadius: "10px",
                  background: activeCar.killSwitch ? "var(--status-green)" : "linear-gradient(135deg, var(--primary-red), #d60032)",
                  color: "#fff",
                  boxShadow: "0 4px 14px rgba(255, 23, 68, 0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px"
                }}
                onClick={handleToggleKillSwitch}
              >
                {activeCar.killSwitch ? "✓ RESTORE IGNITION" : "⚡ REMOTE KILL-SWITCH"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SATELLITE TELEMETRY LOG STREAM */}
      <div style={{
        background: "#080a12",
        border: "1px solid var(--border-color)",
        borderRadius: "16px",
        padding: "18px 24px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
          <span style={{ fontSize: "13px", color: "var(--primary-cyan)" }}>📟</span>
          <strong style={{ fontSize: "12px", color: "#fff", letterSpacing: "1px", textTransform: "uppercase" }}>
            Live Encrypted Telemetry Feed
          </strong>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontFamily: "'Space Grotesk', monospace", fontSize: "12px" }}>
          {logs.map((log, index) => (
            <div key={index} style={{ color: index === 0 ? "var(--primary-cyan)" : "var(--text-muted)" }}>
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

