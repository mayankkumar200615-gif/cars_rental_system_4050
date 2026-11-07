/* =========================================================
   RENDER R CARS - MASTER VEHICLE DATABASE & HELPER UTILITIES
========================================================= */

export const CARS_DATA = {
  "bmw-m4": {
    id: "bmw-m4",
    name: "BMW M4",
    brand: "BMW",
    model: "M4 Competition Coupe",
    category: "Sports Coupe",
    categoryKey: "sports",
    price: 4999,
    securityDeposit: 5000,
    rating: 4.9,
    reviews: 148,
    tag: "🔥 HOT DEMAND",
    tagClass: "tag-hot",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=85",
    horsepower: "503 HP",
    transmission: "Automatic",
    seats: "4 Seats",
    fuel: "Petrol",
    status: "Available",
    registrationPlate: "TS-09-EX-7788",
    odometer: "12,840 KM",
    trips: 34,
    performance: {
      engine: "3.0L BMW M TwinPower Turbo Inline-6 (S58)",
      displacement: "2,993 cc",
      horsepower: "503 HP @ 6,250 RPM",
      torque: "650 Nm @ 2,750 - 5,500 RPM",
      acceleration: "3.8s (0-100 km/h)",
      topSpeed: "290 km/h (M Driver's Package)",
      fuelType: "High Octane Premium Petrol",
      mileage: "10.1 km/l (Approx. combined)"
    },
    drivetrain: {
      transmission: "8-Speed M Steptronic with Drivelogic",
      driveType: "M xDrive All-Wheel Drive with 2WD mode",
      gearbox: "Dual Clutch Logic Automatic with Paddle Shifters",
      steering: "M Servotronic Speed-sensitive Steering"
    },
    dimensions: {
      length: "4,794 mm",
      width: "1,887 mm",
      height: "1,393 mm",
      wheelbase: "2,857 mm",
      bootSpace: "440 Litres"
    },
    capacity: {
      seating: "4 Persons",
      doors: "2 Doors",
      fuelTank: "59 Litres"
    },
    features: [
      { name: "Air Conditioning", desc: "Dual-Zone Automatic Climate Control", icon: "❄️" },
      { name: "Apple CarPlay", desc: "Wireless Seamless Smartphone Integration", icon: "📱" },
      { name: "Android Auto", desc: "Full Wireless Connectivity", icon: "🤖" },
      { name: "Bluetooth 5.2", desc: "High Definition Audio Streaming", icon: "📶" },
      { name: "Navigation", desc: "BMW Live Cockpit Professional 3D", icon: "🗺️" },
      { name: "Premium Audio", desc: "Harman Kardon 16-Speaker Surround", icon: "🔊" },
      { name: "Cruise Control", desc: "Dynamic Adaptive Radar Cruise", icon: "⚡" },
      { name: "Parking Sensors", desc: "Front & Rear Ultrasonic PDC", icon: "🎯" },
      { name: "Rear Camera", desc: "360° Surround View with Reversing Assist", icon: "📹" },
      { name: "Keyless Entry", desc: "BMW Comfort Access System", icon: "🔑" },
      { name: "Push Start", desc: "M Dynamic Red Engine Start Button", icon: "🔘" },
      { name: "Leather Seats", desc: "Merino Extended High-Grade Leather", icon: "💺" }
    ],
    safety: [
      "ABS with Cornering Brake Control (CBC) & Brake Assist",
      "6 Multi-Stage SRS Airbags (Front, Side & Head Curtain)",
      "Dynamic Stability Control (DSC) with M Dynamic Mode",
      "10-Stage M Traction Control System",
      "Hill Start Assist & Automatic Hold Brake",
      "Front & Rear Acoustic Park Distance Control",
      "High Definition Rear & Surround View Cameras",
      "Active Protection Autonomous Emergency Braking System"
    ],
    description: "The BMW M4 Competition Coupe is a high-performance sports car delivering an exhilarating 503 HP track experience combined with luxury everyday comfort. Featuring an aggressive kidney grille, carbon fiber roof, and precision Bavarian engineering."
  },

  "toyota-fortuner": {
    id: "toyota-fortuner",
    name: "Toyota Fortuner",
    brand: "Toyota",
    model: "Fortuner Legender 4x4",
    category: "Premium SUV",
    categoryKey: "suv",
    price: 3499,
    securityDeposit: 5000,
    rating: 4.7,
    reviews: 215,
    tag: "👑 BESTSELLER",
    tagClass: "tag-popular",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=85",
    horsepower: "201 HP",
    transmission: "Automatic",
    seats: "7 Seats",
    fuel: "Diesel",
    status: "Available",
    registrationPlate: "DL-01-CR-4400",
    odometer: "24,150 KM",
    trips: 58,
    performance: {
      engine: "2.8L 4-Cylinder DOHC Turbocharged Diesel",
      displacement: "2,755 cc",
      horsepower: "201 HP @ 3,400 RPM",
      torque: "500 Nm @ 1,600 - 2,800 RPM",
      acceleration: "9.8s (0-100 km/h)",
      topSpeed: "180 km/h",
      fuelType: "Automotive Diesel",
      mileage: "14.2 km/l (Approx. combined)"
    },
    drivetrain: {
      transmission: "6-Speed Automatic with Sequential Shift",
      driveType: "4x4 with High and Low Range Differential Lock",
      gearbox: "Torque Converter with Paddle Shifters",
      steering: "Hydraulic Power Steering with Variable Flow Control"
    },
    dimensions: {
      length: "4,795 mm",
      width: "1,855 mm",
      height: "1,835 mm",
      wheelbase: "2,745 mm",
      bootSpace: "296 Litres (Expandable to 715L)"
    },
    capacity: {
      seating: "7 Persons",
      doors: "5 Doors",
      fuelTank: "80 Litres"
    },
    features: [
      { name: "Air Conditioning", desc: "Dual-Zone Automatic Climate Control with Rear Vents", icon: "❄️" },
      { name: "Apple CarPlay", desc: "Seamless Apple iPhone Connectivity", icon: "📱" },
      { name: "Android Auto", desc: "Full Android Smartphone Integration", icon: "🤖" },
      { name: "Bluetooth 5.0", desc: "Handsfree Calling & Wireless Audio", icon: "📶" },
      { name: "Navigation", desc: "Built-in Touchscreen Satellite GPS", icon: "🗺️" },
      { name: "Premium Audio", desc: "JBL 11-Speaker High Clarity Sound System", icon: "🔊" },
      { name: "Cruise Control", desc: "Highway Speed Cruise Assist", icon: "⚡" },
      { name: "Parking Sensors", desc: "Front & Rear Ultrasonic Proximity Sensors", icon: "🎯" },
      { name: "Rear Camera", desc: "Back Camera with Dynamic Guidelines", icon: "📹" },
      { name: "Keyless Entry", desc: "Smart Entry Keyless System", icon: "🔑" },
      { name: "Push Start", desc: "Push Button Engine Start/Stop", icon: "🔘" },
      { name: "Leather Seats", desc: "Perforated Dual-tone Premium Leather", icon: "💺" }
    ],
    safety: [
      "ABS with Electronic Brake-force Distribution (EBD) and Brake Assist",
      "7 SRS Airbags (Front, Curtain, Side and Driver Knee Airbag)",
      "Vehicle Stability Control (VSC) with Emergency Stop Signal",
      "Traction Control System (TCS) for All Terrains",
      "Hill-Start Assist Control (HAC) & Downhill Assist Control (DAC)",
      "Front and Rear Parking Sensors with Display Alert",
      "High Clarity Rear View Camera with Dynamic Grid",
      "ISOFIX Child Restraint Anchors and Impact-absorbing Frame"
    ],
    description: "The Toyota Fortuner Legender is an imposing full-size SUV offering rugged off-road capability, commanding road presence, and luxurious seating for 7 passengers. Ideal for long highway cruising and family expeditions."
  },

  "audi-r8": {
    id: "audi-r8",
    name: "Audi R8",
    brand: "Audi",
    model: "R8 V10 Performance Coupe",
    category: "Supercar",
    categoryKey: "sports",
    price: 8999,
    securityDeposit: 10000,
    rating: 5.0,
    reviews: 94,
    tag: "💎 ELITE V10",
    tagClass: "tag-elite",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85",
    horsepower: "602 HP",
    transmission: "Automatic",
    seats: "2 Seats",
    fuel: "Petrol",
    status: "Rented",
    registrationPlate: "MH-02-GT-9911",
    odometer: "7,620 KM",
    activeMission: {
      driver: "Vikram Singhania (VIP Member #RRC-482)",
      route: "Bandra-Worli Sea Link & Coastal Road, Mumbai",
      currentSpeed: "86 km/h",
      returnEta: "Tomorrow at 06:00 PM",
      gpsCity: "Mumbai Hub",
      geofenceStatus: "Inside Coastal Express Corridor",
      inspectionStatus: "Scheduled for 30-Min Detailing Upon Return"
    },
    trips: 22,
    performance: {
      engine: "5.2L Naturally Aspirated V10 FSI",
      displacement: "5,204 cc",
      horsepower: "602 HP @ 8,100 RPM",
      torque: "560 Nm @ 6,300 RPM",
      acceleration: "3.1s (0-100 km/h)",
      topSpeed: "331 km/h",
      fuelType: "Super Plus 98 Octane Petrol",
      mileage: "7.5 km/l (Approx. combined)"
    },
    drivetrain: {
      transmission: "7-Speed S tronic Dual-Clutch Transmission",
      driveType: "Quattro Permanent All-Wheel Drive with Mechanical Diff",
      gearbox: "Lightning Quick Dual-Clutch Automatic",
      steering: "Electromechanical Dynamic Steering"
    },
    dimensions: {
      length: "4,429 mm",
      width: "1,940 mm",
      height: "1,240 mm",
      wheelbase: "2,650 mm",
      bootSpace: "112 Litres (Front Luggage Compartment)"
    },
    capacity: {
      seating: "2 Persons",
      doors: "2 Doors",
      fuelTank: "83 Litres"
    },
    features: [
      { name: "Air Conditioning", desc: "Deluxe Automatic Climate Control", icon: "❄️" },
      { name: "Apple CarPlay", desc: "Integrated in Virtual Cockpit Display", icon: "📱" },
      { name: "Android Auto", desc: "Full Audi Smartphone Interface", icon: "🤖" },
      { name: "Bluetooth 5.2", desc: "Wireless Connectivity & Media Streaming", icon: "📶" },
      { name: "Navigation", desc: "MMI Navigation Plus with MMI Touch", icon: "🗺️" },
      { name: "Premium Audio", desc: "Bang & Olufsen 3D Sound System with Headrest Speakers", icon: "🔊" },
      { name: "Cruise Control", desc: "Performance Cruise System with Speed Limiter", icon: "⚡" },
      { name: "Parking Sensors", desc: "Audi Parking System Plus (Front & Rear)", icon: "🎯" },
      { name: "Rear Camera", desc: "Acoustic & Optical Visual Parking Camera", icon: "📹" },
      { name: "Keyless Entry", desc: "Advanced Key Keyless Access", icon: "🔑" },
      { name: "Push Start", desc: "Steering Wheel Mounted Race Start Engine Button", icon: "🔘" },
      { name: "Leather Seats", desc: "Fine Nappa Leather R8 Sport Bucket Seats", icon: "💺" }
    ],
    safety: [
      "Carbon Ceramic High-Performance Brakes with ABS and EBD",
      "6 Dual-Stage Airbags including Side and Knee Protectors",
      "Electronic Stability Control (ESC) with Sport and Performance Modes",
      "Traction Control (ASR) with Launch Control",
      "Hill Hold Assist",
      "Front and Rear Parking Sensors with Virtual Cockpit Display",
      "High Definition Rear View Camera",
      "Audi Pre-Sense City Collision Mitigation System"
    ],
    description: "The Audi R8 V10 Performance is a purebred mid-engine supercar boasting a roaring naturally aspirated 5.2L V10 engine. With lightning-fast dual-clutch shifting and legendary Quattro grip, it provides an unforgettable exotic driving experience."
  },

  "mercedes-amg": {
    id: "mercedes-amg",
    name: "Mercedes AMG",
    brand: "Mercedes-Benz",
    model: "Mercedes-AMG C63 S Performance",
    category: "Luxury Performance",
    categoryKey: "luxury",
    price: 6999,
    securityDeposit: 7500,
    rating: 4.9,
    reviews: 156,
    tag: "⚡ BI-TURBO V8",
    tagClass: "tag-premium",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=85",
    horsepower: "469 HP",
    transmission: "Automatic",
    seats: "5 Seats",
    fuel: "Petrol",
    status: "Available",
    registrationPlate: "KA-04-MM-8822",
    odometer: "16,300 KM",
    trips: 41,
    performance: {
      engine: "4.0L Handcrafted AMG Bi-Turbo V8",
      displacement: "3,982 cc",
      horsepower: "469 HP @ 5,500 RPM",
      torque: "650 Nm @ 1,750 - 4,500 RPM",
      acceleration: "4.0s (0-100 km/h)",
      topSpeed: "280 km/h (AMG Driver's Package)",
      fuelType: "Super High-Grade Petrol",
      mileage: "11.8 km/l (Approx. combined)"
    },
    drivetrain: {
      transmission: "AMG SPEEDSHIFT MCT 9-Speed Sports Transmission",
      driveType: "AMG Performance 4MATIC+ All-Wheel Drive",
      gearbox: "Multi-Clutch Transmission with Race Start",
      steering: "AMG Speed-Sensitive Sport Power Steering"
    },
    dimensions: {
      length: "4,751 mm",
      width: "1,820 mm",
      height: "1,438 mm",
      wheelbase: "2,865 mm",
      bootSpace: "455 Litres"
    },
    capacity: {
      seating: "5 Persons",
      doors: "4 Doors",
      fuelTank: "66 Litres"
    },
    features: [
      { name: "Air Conditioning", desc: "THERMOTRONIC 3-Zone Automatic Climate Control", icon: "❄️" },
      { name: "Apple CarPlay", desc: "Full Smartphone Integration on MBUX", icon: "📱" },
      { name: "Android Auto", desc: "Wireless Android System Mirroring", icon: "🤖" },
      { name: "Bluetooth 5.2", desc: "HD Audio & Dual-Phone Pairing", icon: "📶" },
      { name: "Navigation", desc: "MBUX Augmented Reality Navigation", icon: "🗺️" },
      { name: "Premium Audio", desc: "Burmester 3D Surround Sound System (15 Speakers)", icon: "🔊" },
      { name: "Cruise Control", desc: "Active Distance Assist DISTRONIC (Adaptive)", icon: "⚡" },
      { name: "Parking Sensors", desc: "PARKTRONIC Active Parking Sensors", icon: "🎯" },
      { name: "Rear Camera", desc: "360° High Resolution Surround View Camera", icon: "📹" },
      { name: "Keyless Entry", desc: "KEYLESS-GO Comfort Access Package", icon: "🔑" },
      { name: "Push Start", desc: "AMG Illuminating Push Button Ignition", icon: "🔘" },
      { name: "Leather Seats", desc: "AMG Performance Heated Nappa Leather Seats", icon: "💺" }
    ],
    safety: [
      "ABS with Brake Assist System Plus (BAS+) and Adaptive Braking",
      "9 Airbags including PRE-SAFE Predictive Safety System",
      "AMG 3-Stage ESP (Electronic Stability Program)",
      "Electronic Traction Support (4ETS) & Dynamic Cornering Assist",
      "Hill Start Assist with Convenient HOLD Function",
      "360-Degree Surround Radar & Optical Sensors",
      "Active Blind Spot Assist & Active Lane Keeping Assist",
      "Active Brake Assist with Cross-Traffic Function"
    ],
    description: "The Mercedes-AMG C63 S combines German executive luxury with handcrafted V8 Bi-Turbo muscle. Featuring 64-color ambient lighting, Burmester acoustics, and brutal AMG throttle response, it dominates city boulevards and open highways alike."
  }
};

export const INITIAL_FLEET_DATA = Object.values(CARS_DATA);

export const INITIAL_BOOKINGS_DATA = [
  {
    bookingId: "RRC-2026-894120",
    customerName: "Vikram Singhania",
    phone: "+91 98450 11223",
    email: "vikram@singhania.in",
    carName: "Audi R8",
    carId: "audi-r8",
    carImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85",
    pickupLocation: "Hyderabad Rajiv Gandhi Intl Airport (RGIA)",
    pickupDate: "2026-09-25",
    pickupTime: "09:00 AM",
    returnDate: "2026-09-28",
    returnTime: "08:00 PM",
    rentalDays: 3,
    totalAmount: 31856,
    paymentMethod: "UPI / GPay",
    paymentStatus: "Paid & Confirmed",
    paidTimestamp: "24 Sep 2026, 02:15 PM"
  },
  {
    bookingId: "RRC-2026-773419",
    customerName: "Aditya Verma",
    phone: "+91 99201 88344",
    email: "aditya.v@gmail.com",
    carName: "BMW M4",
    carId: "bmw-m4",
    carImage: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=85",
    pickupLocation: "Vijayawada Experience Hub (Benz Circle)",
    pickupDate: "2026-09-26",
    pickupTime: "11:00 AM",
    returnDate: "2026-09-27",
    returnTime: "08:00 PM",
    rentalDays: 1,
    totalAmount: 11798,
    paymentMethod: "Credit Card (Visa)",
    paymentStatus: "Paid & Confirmed",
    paidTimestamp: "25 Sep 2026, 10:30 AM"
  },
  {
    bookingId: "RRC-2026-652391",
    customerName: "Rahul Deshmukh",
    phone: "+91 98110 55432",
    email: "rahul.d@techcorp.com",
    carName: "Toyota Fortuner",
    carId: "toyota-fortuner",
    carImage: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=85",
    pickupLocation: "Bangalore Central Hub (Indiranagar)",
    pickupDate: "2026-09-24",
    pickupTime: "09:00 AM",
    returnDate: "2026-09-30",
    returnTime: "08:00 PM",
    rentalDays: 6,
    totalAmount: 24773,
    paymentMethod: "Net Banking (HDFC)",
    paymentStatus: "Active",
    paidTimestamp: "24 Sep 2026, 08:45 AM"
  }
];

export function formatCurrency(amount) {
  return "₹" + Number(amount || 0).toLocaleString("en-IN");
}

export function getCarById(id, liveFleet = null) {
  if (!id) return CARS_DATA["bmw-m4"];
  const cleanId = id.toLowerCase().trim();

  // Check live fleet first if provided
  if (liveFleet && Array.isArray(liveFleet)) {
    const found = liveFleet.find(c => c.id === cleanId || c.id?.includes(cleanId) || c.name?.toLowerCase().includes(cleanId));
    if (found) return found;
  }

  // Check static database
  if (CARS_DATA[cleanId]) return CARS_DATA[cleanId];
  for (const key in CARS_DATA) {
    if (CARS_DATA[key].name.toLowerCase() === cleanId || key.includes(cleanId) || cleanId.includes(key)) {
      return CARS_DATA[key];
    }
  }
  return CARS_DATA["bmw-m4"];
}
