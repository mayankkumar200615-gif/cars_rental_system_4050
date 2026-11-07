/**
 * RenderRCars Real-Time Status & Telemetry API Client
 * Provides simulated endpoints for user booking status, live GPS coordinates,
 * vehicle OBD-II diagnostics, and system API health checks.
 */

// Microservices health registry
export const SYSTEM_MICROSERVICES = [
  {
    id: "telemetry-api",
    name: "Fleet Satellite Telemetry API",
    endpoint: "/api/v1/telemetry/live",
    method: "GET / WS",
    description: "Broadcasts sub-second GPS coordinates, speed, RPM & battery telemetry",
    status: "HEALTHY",
    statusCode: 200,
    latency: "28ms",
    uptime: "99.98%",
    rateLimit: "10,000 req/min"
  },
  {
    id: "bookings-api",
    name: "Reservation & Status Verification API",
    endpoint: "/api/v1/bookings/status/:id",
    method: "GET",
    description: "Queries real-time customer trip phase, PIN verification & security deposit",
    status: "HEALTHY",
    statusCode: 200,
    latency: "34ms",
    uptime: "100.0%",
    rateLimit: "5,000 req/min"
  },
  {
    id: "obd2-command-api",
    name: "Vehicle OBD-II Remote Command API",
    endpoint: "/api/v1/vehicles/commands",
    method: "POST",
    description: "Encrypted anti-theft killswitch, valet governor & remote door locks",
    status: "HEALTHY",
    statusCode: 200,
    latency: "46ms",
    uptime: "99.95%",
    rateLimit: "1,200 req/min"
  },
  {
    id: "payment-webhook-api",
    name: "UPI & Bank Payment Webhook Gateway",
    endpoint: "/api/v1/payments/verify",
    method: "POST",
    description: "Real-time payment webhook verification & instant refundable deposit hold",
    status: "HEALTHY",
    statusCode: 200,
    latency: "52ms",
    uptime: "99.99%",
    rateLimit: "8,000 req/min"
  },
  {
    id: "concierge-dispatch-api",
    name: "VIP Concierge & WhatsApp Dispatch API",
    endpoint: "/api/v1/notifications/concierge",
    method: "POST",
    description: "Triggers automated driver dispatch, SMS alerts & handover passcodes",
    status: "HEALTHY",
    statusCode: 200,
    latency: "41ms",
    uptime: "99.94%",
    rateLimit: "3,000 req/min"
  }
];

/**
 * Simulates fetching live rental status with async API latency
 */
export async function fetchLiveRentalStatus(bookingId, bookingsList = [], fleetList = []) {
  // Simulate network latency (250ms - 450ms)
  await new Promise(resolve => setTimeout(resolve, 320));

  const cleanId = (bookingId || "").trim().toLowerCase();
  
  // Find matching booking
  let matchedBooking = bookingsList.find(b => 
    b.bookingId?.toLowerCase() === cleanId ||
    b.email?.toLowerCase() === cleanId ||
    b.phone?.includes(cleanId)
  );

  // If no direct match, check if cleanId is empty and pick latest or fallback
  if (!matchedBooking && bookingsList.length > 0) {
    if (!cleanId) {
      matchedBooking = bookingsList[0];
    }
  }

  // If still no booking found
  if (!matchedBooking) {
    return {
      success: false,
      statusCode: 404,
      error: `No reservation found matching "${bookingId}". Please verify your Booking ID (e.g. RRC-2026-894120) or registered email.`,
      endpoint: `/api/v1/bookings/status/${encodeURIComponent(bookingId || "unknown")}`,
      serverTime: new Date().toISOString(),
      latencyMs: 38
    };
  }

  // Find associated car
  const car = fleetList.find(c => c.id === matchedBooking.carId || c.name === matchedBooking.carName) || {
    name: matchedBooking.carName || "BMW M4 Competition",
    brand: "BMW",
    registrationPlate: "TS-09-EX-7788",
    image: matchedBooking.carImage || "/pictures/hero-supercar.jpg",
    hp: "503 HP",
    category: "Sports Coupe",
    price: 4999
  };

  // Determine realistic status step (1 to 5)
  let stage = 3; // 1: Confirmed, 2: Inspected & Prepared, 3: Concierge In Transit, 4: Active On Track, 5: Completed
  let stageLabel = "Concierge In Transit & Delivery";
  let statusBadge = "In Transit";

  if (matchedBooking.paymentStatus === "Cancelled") {
    stage = 0;
    stageLabel = "Reservation Cancelled";
    statusBadge = "Cancelled";
  } else if (matchedBooking.paymentStatus === "Completed") {
    stage = 5;
    stageLabel = "Rental Completed & Returned";
    statusBadge = "Completed";
  } else if (matchedBooking.paymentStatus === "Active" || car.status === "Rented") {
    stage = 4;
    stageLabel = "Active On Track / In Drive";
    statusBadge = "Active";
  } else if (matchedBooking.paymentStatus === "Paid & Confirmed") {
    stage = 3;
    stageLabel = "Concierge Dispatched for Handover";
    statusBadge = "Dispatched";
  }

  // Generate dynamic live telemetry
  const randomSpeed = stage === 4 ? Math.floor(65 + Math.random() * 45) : stage === 3 ? Math.floor(25 + Math.random() * 20) : 0;
  const randomRpm = stage >= 3 ? Math.floor(1800 + Math.random() * 2400) : 0;
  const randomFuel = Math.floor(75 + Math.random() * 20);
  const randomTemp = Math.floor(88 + Math.random() * 8);

  const steps = [
    {
      step: 1,
      title: "Reservation & Deposit Confirmed",
      description: "Payment captured via UPI/Card. Refundable security deposit placed in verified escrow.",
      completed: stage >= 1,
      active: stage === 1,
      timestamp: matchedBooking.paidTimestamp || "Today, 09:30 AM"
    },
    {
      step: 2,
      title: "100-Point Supercar Technical Inspection",
      description: "Tire pressure, brake pads, fluids, sanitized cabin & ceramic coat gloss verified.",
      completed: stage >= 2,
      active: stage === 2,
      timestamp: "Today, 10:15 AM"
    },
    {
      step: 3,
      title: "VIP Valet Concierge En Route",
      description: `Assigned Executive Chauffeur is navigating to ${matchedBooking.pickupLocation}.`,
      completed: stage >= 3,
      active: stage === 3,
      timestamp: stage >= 3 ? "Today, 11:00 AM" : "Estimated in 25 mins"
    },
    {
      step: 4,
      title: "Vehicle Handover & Active Trip",
      description: `Digital signature verified. Key handover completed with security PIN 8492. Supercar active on track.`,
      completed: stage >= 4,
      active: stage === 4,
      timestamp: stage >= 4 ? "Live Active" : "Pending Handover"
    },
    {
      step: 5,
      title: "Hub Return & Instant Escrow Release",
      description: "Odometer check & zero-damage scan. Security deposit unlocked to original payment account.",
      completed: stage >= 5,
      active: stage === 5,
      timestamp: stage >= 5 ? "Trip Finished" : matchedBooking.returnDate || "Scheduled"
    }
  ];

  return {
    success: true,
    statusCode: 200,
    booking: matchedBooking,
    car,
    stage,
    stageLabel,
    statusBadge,
    steps,
    handoverPin: "8492",
    concierge: {
      name: "Rajesh K. Sharma",
      badge: "VIP Concierge #419",
      phone: "+91 98450 77122",
      rating: "4.98 ★ (420+ Deliveries)",
      status: stage >= 4 ? "Handover Completed" : "En Route to Destination",
      etaMinutes: stage === 3 ? 14 : stage === 4 ? 0 : 45,
      distanceKm: stage === 3 ? "4.2 km away" : stage === 4 ? "With Customer" : "At Central Garage"
    },
    telemetry: {
      speedKmH: randomSpeed,
      engineRpm: randomRpm,
      gear: stage >= 3 ? "D5" : "P",
      fuelOrBatteryPct: randomFuel,
      engineTempC: randomTemp,
      tirePressurePsi: "34 PSI (Optimal)",
      gpsCoords: "19.0760° N, 72.8777° E (Mumbai Hub corridor)",
      currentLocation: matchedBooking.pickupLocation || "Vijayawada City Hub",
      antiTheftStatus: "ARMED & ENCRYPTED",
      killswitchReady: true,
      networkLatency: `${Math.floor(25 + Math.random() * 20)}ms`
    },
    apiMeta: {
      endpoint: `/api/v1/bookings/status/${matchedBooking.bookingId}`,
      server: "api-cluster-in-south1.renderrcars.com",
      protocol: "HTTPS / TLS 1.3",
      timestamp: new Date().toISOString(),
      cacheHit: false,
      authorization: "Bearer RRC-LIVE-TOKEN-SECURED"
    }
  };
}

/**
 * Pings all 5 backend APIs and measures live round-trip latency
 */
export async function pingApiEndpoints() {
  await new Promise(resolve => setTimeout(resolve, 400));
  return SYSTEM_MICROSERVICES.map(svc => {
    const jitter = Math.floor(Math.random() * 15) - 7;
    const baseLatency = parseInt(svc.latency, 10) || 35;
    const actualLatency = Math.max(18, baseLatency + jitter);
    return {
      ...svc,
      latency: `${actualLatency}ms`,
      lastPing: new Date().toLocaleTimeString(),
      status: "HEALTHY",
      statusCode: 200
    };
  });
}

