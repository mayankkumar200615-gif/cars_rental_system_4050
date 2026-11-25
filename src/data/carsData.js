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
  },

  "porsche-911": {
    id: "porsche-911",
    name: "Porsche 911",
    brand: "Porsche",
    model: "911 Carrera S Aero",
    category: "Sports Coupe",
    categoryKey: "sports",
    price: 7999,
    securityDeposit: 8000,
    rating: 4.9,
    reviews: 182,
    tag: "🏁 TRACK ICON",
    tagClass: "tag-hot",
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=85",
    horsepower: "443 HP",
    transmission: "Automatic",
    seats: "4 Seats",
    fuel: "Petrol",
    status: "Available",
    registrationPlate: "MH-01-PX-9111",
    odometer: "8,920 KM",
    trips: 28,
    performance: {
      engine: "3.0L Twin-Turbocharged Boxer 6",
      displacement: "2,981 cc",
      horsepower: "443 HP @ 6,500 RPM",
      torque: "530 Nm @ 2,300 - 5,000 RPM",
      acceleration: "3.5s (0-100 km/h)",
      topSpeed: "308 km/h",
      fuelType: "High Octane 98 Unleaded",
      mileage: "11.1 km/l (Approx. combined)"
    },
    drivetrain: {
      transmission: "8-Speed Porsche Doppelkupplung (PDK)",
      driveType: "Rear-Wheel Drive with Electronic Rear Diff Lock",
      gearbox: "Dual-Clutch PDK with Sport Chrono Paddle Shifters",
      steering: "Electromechanical Power Steering with Variable Ratio"
    },
    dimensions: {
      length: "4,519 mm",
      width: "1,852 mm",
      height: "1,300 mm",
      wheelbase: "2,450 mm",
      bootSpace: "132 Litres (Front Luggage)"
    },
    capacity: {
      seating: "4 Persons",
      doors: "2 Doors",
      fuelTank: "64 Litres"
    },
    features: [
      { name: "Air Conditioning", desc: "Dual-Zone Automatic Climate Control with Active Carbon Filter", icon: "❄️" },
      { name: "Apple CarPlay", desc: "Wireless Porsche Communication Management (PCM)", icon: "📱" },
      { name: "Android Auto", desc: "Seamless Android Smartphone Interface", icon: "🤖" },
      { name: "Bluetooth 5.2", desc: "High Definition Audio & Hands-Free Telephony", icon: "📶" },
      { name: "Navigation", desc: "Online Navigation with Real-Time Traffic Info", icon: "🗺️" },
      { name: "Premium Audio", desc: "BOSE Surround Sound System (12 Speakers, 570 Watts)", icon: "🔊" },
      { name: "Cruise Control", desc: "Adaptive Cruise Control with Stop & Go", icon: "⚡" },
      { name: "Parking Sensors", desc: "ParkAssist Front and Rear with Optical Grid", icon: "🎯" },
      { name: "Rear Camera", desc: "Reversing Camera with Dynamic Steering Guide Lines", icon: "📹" },
      { name: "Keyless Entry", desc: "Porsche Entry & Drive Comfort Access", icon: "🔑" },
      { name: "Push Start", desc: "Sport Chrono Dial with Launch Control Ignition", icon: "🔘" },
      { name: "Leather Seats", desc: "14-Way Power Sport Seats with Memory Package", icon: "💺" }
    ],
    safety: [
      "Porsche Ceramic Composite Brake (PCCB) with ABS & Multi-Collision Brake",
      "Full-Size Dual-Stage Front, Thorax and Side Curtain Airbags",
      "Porsche Stability Management (PSM) with Wet Mode Detection",
      "Electronic Differential Lock with Porsche Torque Vectoring Plus (PTV+)",
      "Auto-Deploying Active Rollover Protection System",
      "ParkAssist Front & Rear Ultrasonic Radar Sensors",
      "High Definition Wide-Angle Reverse Camera",
      "Warn and Brake Assist with Pedestrian Detection"
    ],
    description: "The Porsche 911 Carrera S is the benchmark of precision German sports car engineering. Featuring an iconic rear-mounted twin-turbo boxer-6, razor-sharp PDK gearbox, and active aerodynamics, it delivers unmatched connection between driver and tarmac."
  },

  "lamborghini-urus": {
    id: "lamborghini-urus",
    name: "Lamborghini Urus",
    brand: "Lamborghini",
    model: "Urus Performante Super SUV",
    category: "Super SUV",
    categoryKey: "suv",
    price: 9999,
    securityDeposit: 10000,
    rating: 5.0,
    reviews: 142,
    tag: "👑 SUPER SUV",
    tagClass: "tag-elite",
    image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=85",
    horsepower: "657 HP",
    transmission: "Automatic",
    seats: "5 Seats",
    fuel: "Petrol",
    status: "Available",
    registrationPlate: "KA-01-LU-0001",
    odometer: "6,410 KM",
    trips: 19,
    performance: {
      engine: "4.0L Twin-Turbocharged V8 Engine",
      displacement: "3,996 cc",
      horsepower: "657 HP @ 6,000 RPM",
      torque: "850 Nm @ 2,250 - 4,500 RPM",
      acceleration: "3.3s (0-100 km/h)",
      topSpeed: "306 km/h",
      fuelType: "High Octane 98 Premium Petrol",
      mileage: "7.8 km/l (Approx. combined)"
    },
    drivetrain: {
      transmission: "8-Speed Automatic Transmission with ANIMA Selector",
      driveType: "Permanent 4WD with Active Torque Vectoring",
      gearbox: "Electro-Hydraulic 8-Speed with Carbon Paddle Shifters",
      steering: "Lamborghini Dynamic Steering (LDS) with Rear-Wheel Steering"
    },
    dimensions: {
      length: "5,137 mm",
      width: "2,026 mm",
      height: "1,618 mm",
      wheelbase: "3,006 mm",
      bootSpace: "616 Litres (Expandable to 1,596L)"
    },
    capacity: {
      seating: "5 Persons",
      doors: "5 Doors",
      fuelTank: "85 Litres"
    },
    features: [
      { name: "Air Conditioning", desc: "Four-Zone Automatic Climate Control System", icon: "❄️" },
      { name: "Apple CarPlay", desc: "Lamborghini Infotainment System III Wireless", icon: "📱" },
      { name: "Android Auto", desc: "Full Wireless Android Integration", icon: "🤖" },
      { name: "Bluetooth 5.2", desc: "Dual Phone Bluetooth with Streaming", icon: "📶" },
      { name: "Navigation", desc: "3D Virtual Cockpit with Real-Time Satellite Maps", icon: "🗺️" },
      { name: "Premium Audio", desc: "Bang & Olufsen 3D Sound System with 21 Speakers", icon: "🔊" },
      { name: "Cruise Control", desc: "Adaptive Cruise with Stop & Go & Highway Assist", icon: "⚡" },
      { name: "Parking Sensors", desc: "Front & Rear Ultrasonic PDC with Auto Brake", icon: "🎯" },
      { name: "Rear Camera", desc: "Top View 360° 3D Bird-Eye Camera System", icon: "📹" },
      { name: "Keyless Entry", desc: "Keyless Go Smart Access with Handsfree Tailgate", icon: "🔑" },
      { name: "Push Start", desc: "Fighter-Jet Style Red Anima Start/Stop Lever", icon: "🔘" },
      { name: "Leather Seats", desc: "Q-Citura Hexagonal Quilted Alcantara & Fine Leather", icon: "💺" }
    ],
    safety: [
      "Carbon Ceramic Brakes (CCB) with 10-Piston Calipers & ABS",
      "8 Multistage Airbags including Knee and Side Pelvic Protectors",
      "Electronic Stability Control (ESC) with Strada, Sport, Corsa & Sabbia Modes",
      "Active Roll Stabilization with 48V Electromechanical Actuators",
      "Lamborghini ANIMA Drive Dynamic Control with Hill Descent Assist",
      "Full 360° Surround Camera & Proximity Radar System",
      "Night Vision Camera with Thermal Imaging Pedestrian Alert",
      "Urban Road Assist with Blind Spot Detection & Rear Cross Traffic Alert"
    ],
    description: "The Lamborghini Urus Performante merges the soul of a super sports car with the versatility of an SUV. Powered by a thunderous 657 HP twin-turbo V8, it accelerates like a missile while comfortably seating 5 with unmatched road presence."
  },

  "ford-mustang-gt": {
    id: "ford-mustang-gt",
    name: "Ford Mustang GT",
    brand: "Ford",
    model: "Mustang GT 5.0 V8 Fastback",
    category: "American Muscle",
    categoryKey: "sports",
    price: 4299,
    securityDeposit: 5000,
    rating: 4.8,
    reviews: 164,
    tag: "🔥 5.0L V8 MUSCLE",
    tagClass: "tag-hot",
    image: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=85",
    horsepower: "450 HP",
    transmission: "Automatic",
    seats: "4 Seats",
    fuel: "Petrol",
    status: "Available",
    registrationPlate: "TS-07-MG-5005",
    odometer: "14,200 KM",
    trips: 38,
    performance: {
      engine: "5.0L Naturally Aspirated Ti-VCT V8 Coyote",
      displacement: "5,038 cc",
      horsepower: "450 HP @ 7,000 RPM",
      torque: "529 Nm @ 4,600 RPM",
      acceleration: "4.3s (0-100 km/h)",
      topSpeed: "250 km/h",
      fuelType: "High Octane Unleaded Petrol",
      mileage: "8.9 km/l (Approx. combined)"
    },
    drivetrain: {
      transmission: "SelectShift 10-Speed Automatic with Paddle Shifters",
      driveType: "Rear-Wheel Drive with Torsen Limited Slip Differential",
      gearbox: "Electronic 10-Speed with Drag Strip Mode",
      steering: "Electric Power-Assisted Steering (EPAS) with Selectable Modes"
    },
    dimensions: {
      length: "4,784 mm",
      width: "1,916 mm",
      height: "1,381 mm",
      wheelbase: "2,720 mm",
      bootSpace: "382 Litres"
    },
    capacity: {
      seating: "4 Persons",
      doors: "2 Doors",
      fuelTank: "61 Litres"
    },
    features: [
      { name: "Air Conditioning", desc: "Dual-Zone Electronic Automatic Temperature Control", icon: "❄️" },
      { name: "Apple CarPlay", desc: "SYNC 3 Touchscreen with Wireless Smartphone Mirror", icon: "📱" },
      { name: "Android Auto", desc: "Full Android Integration with Voice Commands", icon: "🤖" },
      { name: "Bluetooth 5.0", desc: "Streaming Audio & Handsfree Telephony", icon: "📶" },
      { name: "Navigation", desc: "Voice-Activated Touchscreen Navigation System", icon: "🗺️" },
      { name: "Premium Audio", desc: "B&O 12-Speaker 1,000-Watt Sound System with Subwoofer", icon: "🔊" },
      { name: "Cruise Control", desc: "Adaptive Cruise Control with Pre-Collision Warning", icon: "⚡" },
      { name: "Parking Sensors", desc: "Rear Ultrasonic Ultrasonic Sensors with Grid", icon: "🎯" },
      { name: "Rear Camera", desc: "High Resolution Reversing Camera with Active Guidelines", icon: "📹" },
      { name: "Keyless Entry", desc: "Intelligent Access with Push-Button Ignition", icon: "🔑" },
      { name: "Push Start", desc: "Illuminated Engine Start/Stop Switch", icon: "🔘" },
      { name: "Leather Seats", desc: "Heated & Cooled Climate-Controlled Front Leather Seats", icon: "💺" }
    ],
    safety: [
      "Brembo 6-Piston Front Caliper Power Brakes with ABS and EBD",
      "8 Airbags including Dual Front, Knee, Side Curtain and Thorax",
      "AdvanceTrac Electronic Stability Control (ESC)",
      "Active Valve Performance Exhaust System with Quiet Mode",
      "Pre-Collision Assist with Autonomous Emergency Braking",
      "Lane-Keeping Alert and Lane-Keeping Aid",
      "Electronic Line-Lock & Track Apps Telemetry",
      "SOS Post-Crash Alert System with Auto Fuel Shutoff"
    ],
    description: "The legendary Ford Mustang GT delivers thunderous American V8 muscle with 450 HP from its 5.0L Coyote engine. Featuring an active quad exhaust, iconic fastback silhouette, and thrilling rear-wheel-drive dynamics, it provides pure high-octane theater at an accessible exotic daily rate."
  },

  "bmw-3-series": {
    id: "bmw-3-series",
    name: "BMW 3 Series",
    brand: "BMW",
    model: "330Li M Sport Gran Limousine",
    category: "Executive Sedan",
    categoryKey: "luxury",
    price: 3899,
    securityDeposit: 5000,
    rating: 4.9,
    reviews: 198,
    tag: "✨ EXECUTIVE VIP",
    tagClass: "tag-popular",
    image: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1200&q=85",
    horsepower: "255 HP",
    transmission: "Automatic",
    seats: "5 Seats",
    fuel: "Petrol",
    status: "Available",
    registrationPlate: "DL-03-BM-3300",
    odometer: "18,450 KM",
    trips: 47,
    performance: {
      engine: "2.0L BMW TwinPower Turbo Inline 4-Cylinder",
      displacement: "1,998 cc",
      horsepower: "255 HP @ 5,000 RPM",
      torque: "400 Nm @ 1,550 - 4,400 RPM",
      acceleration: "6.2s (0-100 km/h)",
      topSpeed: "250 km/h",
      fuelType: "Premium High-Grade Petrol",
      mileage: "15.3 km/l (Approx. combined)"
    },
    drivetrain: {
      transmission: "8-Speed Steptronic Sport Automatic with Shift Paddles",
      driveType: "Rear-Wheel Drive with Dynamic Traction Control (DTC)",
      gearbox: "Torque Converter with Launch Control & Sport Modes",
      steering: "Variable Sport Steering with Servotronic Assist"
    },
    dimensions: {
      length: "4,819 mm",
      width: "1,827 mm",
      height: "1,441 mm",
      wheelbase: "2,961 mm (Extended Limousine Wheelbase)",
      bootSpace: "480 Litres"
    },
    capacity: {
      seating: "5 Persons",
      doors: "4 Doors",
      fuelTank: "59 Litres"
    },
    features: [
      { name: "Air Conditioning", desc: "3-Zone Automatic Climate Control with Rear Digital Display", icon: "❄️" },
      { name: "Apple CarPlay", desc: "Wireless Seamless Apple Ecosystem Integration", icon: "📱" },
      { name: "Android Auto", desc: "Wireless Full Screen Android Auto", icon: "🤖" },
      { name: "Bluetooth 5.2", desc: "Dual Phone Bluetooth with Hi-Res Audio", icon: "📶" },
      { name: "Navigation", desc: "BMW Live Cockpit Professional with 14.9-inch Curved Glass", icon: "🗺️" },
      { name: "Premium Audio", desc: "Harman Kardon 16-Speaker 464W Surround Sound", icon: "🔊" },
      { name: "Cruise Control", desc: "Dynamic Radar Cruise with Braking Function", icon: "⚡" },
      { name: "Parking Sensors", desc: "Park Distance Control Front and Rear with Auto Brake", icon: "🎯" },
      { name: "Rear Camera", desc: "Surround Parking Assistant with 50-Meter Auto Reverse", icon: "📹" },
      { name: "Keyless Entry", desc: "BMW Comfort Access with Digital Smartphone Key", icon: "🔑" },
      { name: "Push Start", desc: "Start/Stop Engine Button with M Sport Center Console", icon: "🔘" },
      { name: "Leather Seats", desc: "Vernasca Cognac Luxury Leather with Memory Seats", icon: "💺" }
    ],
    safety: [
      "ABS with Cornering Brake Control (CBC) & Dynamic Brake Assist",
      "6 Airbags including Head Airbags for Front & Rear Passengers",
      "Dynamic Stability Control (DSC) with Cornering Stability",
      "Attentiveness Assistant with Driver Fatigue Warning",
      "Run-Flat Tyres with Active Tyre Pressure Indicator (TPMS)",
      "Reversing Assistant with Automated Steering Memory",
      "ISOFIX Child Restraint Seat Mountings",
      "Crash Sensor with Automatic Door Unlock & Hazard Flash"
    ],
    description: "The BMW 330Li M Sport Gran Limousine pairs extended rear lounge legroom with razor-sharp Bavarian driving dynamics. Featuring a panoramic glass roof, curved widescreen iDrive 8, and refined 255 HP turbocharged thrust, it represents the gold standard of accessible luxury sedans."
  },

  "range-rover-evoque": {
    id: "range-rover-evoque",
    name: "Range Rover Evoque",
    brand: "Land Rover",
    model: "Evoque R-Dynamic HSE Luxury",
    category: "Luxury Compact SUV",
    categoryKey: "suv",
    price: 3999,
    securityDeposit: 5000,
    rating: 4.8,
    reviews: 152,
    tag: "💎 BRITISH LUXURY",
    tagClass: "tag-premium",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=85",
    horsepower: "246 HP",
    transmission: "Automatic",
    seats: "5 Seats",
    fuel: "Diesel",
    status: "Available",
    registrationPlate: "KA-05-RR-9009",
    odometer: "15,100 KM",
    trips: 33,
    performance: {
      engine: "2.0L Turbocharged Ingenium 4-Cylinder Diesel",
      displacement: "1,997 cc",
      horsepower: "246 HP @ 5,500 RPM",
      torque: "365 Nm @ 1,300 - 4,500 RPM",
      acceleration: "7.5s (0-100 km/h)",
      topSpeed: "230 km/h",
      fuelType: "Automotive Ultra-Low Sulfur Diesel",
      mileage: "15.8 km/l (Approx. combined)"
    },
    drivetrain: {
      transmission: "9-Speed Automatic Transmission with Satin Chrome Paddles",
      driveType: "Intelligent All-Wheel Drive with Driveline Disconnect",
      gearbox: "Smooth 9-Speed with Terrain Response 2 Modes",
      steering: "Electric Power Assisted Steering (EPAS) with Speed Sensitivity"
    },
    dimensions: {
      length: "4,371 mm",
      width: "1,996 mm",
      height: "1,649 mm",
      wheelbase: "2,681 mm",
      bootSpace: "591 Litres (Expandable to 1,383L)"
    },
    capacity: {
      seating: "5 Persons",
      doors: "5 Doors",
      fuelTank: "67 Litres"
    },
    features: [
      { name: "Air Conditioning", desc: "Two-Zone Climate Control with Cabin Air Purification Plus", icon: "❄️" },
      { name: "Apple CarPlay", desc: "Wireless Pivi Pro Apple CarPlay Connectivity", icon: "📱" },
      { name: "Android Auto", desc: "Wireless Android Smartphone Projection", icon: "🤖" },
      { name: "Bluetooth 5.2", desc: "Multi-Device Audio Pairing with Noise Suppression", icon: "📶" },
      { name: "Navigation", desc: "Pivi Pro 11.4-inch Floating Curved Glass Touchscreen GPS", icon: "🗺️" },
      { name: "Premium Audio", desc: "Meridian 14-Speaker 400W High Fidelity Sound System", icon: "🔊" },
      { name: "Cruise Control", desc: "Adaptive Cruise Control with Speed Limiter", icon: "⚡" },
      { name: "Parking Sensors", desc: "360-Degree Parking Aid with Proximity Distance Display", icon: "🎯" },
      { name: "Rear Camera", desc: "3D Surround Camera with ClearSight Ground View (See-through Bonnet)", icon: "📹" },
      { name: "Keyless Entry", desc: "Keyless Entry with Flush Deployable Door Handles", icon: "🔑" },
      { name: "Push Start", desc: "Push Button Engine Ignition Switch", icon: "🔘" },
      { name: "Leather Seats", desc: "Grained Windsor Perforated Heated Leather Seats", icon: "💺" }
    ],
    safety: [
      "Emergency Braking with Pedestrian and Cyclist Detection",
      "7 Airbags including Pedestrian Airbag System",
      "All-Terrain Progress Control (ATPC) and Hill Descent Control",
      "Wade Sensing Sensor System (600mm Water Fording Capacity)",
      "Blind Spot Assist with Rear Cross Traffic Monitor",
      "Lane Keep Assist with Road Edge Detection",
      "Driver Condition Monitor with Alert Notification",
      "ISOFIX Child Seat Anchors and Rollover Stability Control (RSC)"
    ],
    description: "The Range Rover Evoque HSE pairs unmistakable British avant-garde styling with legendary Land Rover all-weather AWD capability. Featuring flush deployable handles, dual interactive touchscreens, and Meridian acoustics, it commands urban high streets with pure class."
  },

  "mercedes-cla": {
    id: "mercedes-cla",
    name: "Mercedes CLA AMG",
    brand: "Mercedes-Benz",
    model: "AMG CLA 35 4MATIC 4-Door Coupe",
    category: "Luxury Sport Coupe",
    categoryKey: "luxury",
    price: 3699,
    securityDeposit: 5000,
    rating: 4.9,
    reviews: 176,
    tag: "⚡ AMG TURBO",
    tagClass: "tag-hot",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=85",
    horsepower: "302 HP",
    transmission: "Automatic",
    seats: "5 Seats",
    fuel: "Petrol",
    status: "Available",
    registrationPlate: "MH-12-MB-3535",
    odometer: "11,800 KM",
    trips: 29,
    performance: {
      engine: "2.0L Turbocharged AMG Enhanced Inline-4",
      displacement: "1,991 cc",
      horsepower: "302 HP @ 5,800 RPM",
      torque: "400 Nm @ 3,000 - 4,000 RPM",
      acceleration: "4.9s (0-100 km/h)",
      topSpeed: "250 km/h",
      fuelType: "High Octane 98 Petrol",
      mileage: "13.5 km/l (Approx. combined)"
    },
    drivetrain: {
      transmission: "AMG SPEEDSHIFT DCT 7-Speed Dual-Clutch Transmission",
      driveType: "AMG Performance 4MATIC Variable All-Wheel Drive",
      gearbox: "Lightning 7-Speed Dual Clutch with Race Start Launch",
      steering: "AMG Speed-Sensitive Sport Power Steering"
    },
    dimensions: {
      length: "4,695 mm",
      width: "1,834 mm",
      height: "1,404 mm",
      wheelbase: "2,729 mm",
      bootSpace: "460 Litres"
    },
    capacity: {
      seating: "5 Persons",
      doors: "4 Doors",
      fuelTank: "51 Litres"
    },
    features: [
      { name: "Air Conditioning", desc: "THERMOTRONIC Automatic Climate Control with Illuminated Turbine Vents", icon: "❄️" },
      { name: "Apple CarPlay", desc: "Full Wireless Smartphone Integration on Dual Widescreen", icon: "📱" },
      { name: "Android Auto", desc: "Seamless Android Auto with Google Assistant", icon: "🤖" },
      { name: "Bluetooth 5.2", desc: "High Definition Audio Streaming with Dual Microphones", icon: "📶" },
      { name: "Navigation", desc: "MBUX Augmented Reality Navigation with 3D Landmarks", icon: "🗺️" },
      { name: "Premium Audio", desc: "Burmester Surround Sound System with 12 Speakers", icon: "🔊" },
      { name: "Cruise Control", desc: "Active Distance Assist DISTRONIC with Speed Limit Assist", icon: "⚡" },
      { name: "Parking Sensors", desc: "PARKTRONIC Ultrasonic Proximity Sensors Front & Rear", icon: "🎯" },
      { name: "Rear Camera", desc: "Reversing Camera with 180° Wide-Angle Parking View", icon: "📹" },
      { name: "Keyless Entry", desc: "KEYLESS-GO Hands-Free Access Package", icon: "🔑" },
      { name: "Push Start", desc: "AMG Engine Start/Stop Illuminated Button", icon: "🔘" },
      { name: "Leather Seats", desc: "ARTICO / DINAMICA Two-Tone Sport Seats with Red Contrast Stitching", icon: "💺" }
    ],
    safety: [
      "AMG High-Performance Braking System with Ventilated Perforated Discs",
      "7 Airbags including Driver Knee Airbag and Windowbags",
      "Active Brake Assist with Autonomous Emergency Braking",
      "ATTENTION ASSIST Driver Drowsiness Monitor",
      "Electronic Stability Program (ESP) with 3-Stage Sport Mode",
      "Tyre Pressure Monitoring System (TPMS) with Live PSI Readouts",
      "Active Bonnet Pedestrian Safety Impact System",
      "Mercedes-Benz Emergency Call eCall System"
    ],
    description: "The Mercedes-AMG CLA 35 4MATIC provides heart-racing AMG thrills wrapped in a seductive 4-door frameless coupe profile. With 302 HP, twin digital cockpit displays, turbine air vents with 64-color ambient illumination, and rapid launch control, it delivers genuine supercar prestige at an accessible price."
  },
  "rolls-royce-silver-cloud": {
    id: "rolls-royce-silver-cloud",
    name: "Rolls-Royce Silver Cloud",
    brand: "Rolls-Royce",
    model: "1965 Silver Cloud III Flying Spur Vintage Limousine",
    category: "Antique Luxury Classic",
    categoryKey: "luxury",
    price: 24999,
    securityDeposit: 25000,
    rating: 5.0,
    reviews: 94,
    tag: "👑 1965 ROYAL ANTIQUE",
    tagClass: "tag-gold",
    image: "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1200&q=85",
    horsepower: "220 HP V8",
    transmission: "Vintage Automatic",
    seats: "5 Seats",
    fuel: "Vintage High-Octane Petrol",
    status: "Available",
    registrationPlate: "DL-01-VINTAGE-01",
    odometer: "48,200 KM",
    trips: 16,
    performance: {
      engine: "6.23L Rolls-Royce Aluminium-Alloy V8 OHV",
      displacement: "6,230 cc",
      horsepower: "220 HP @ 4,500 RPM",
      torque: "450 Nm @ 2,500 RPM",
      acceleration: "10.1s (0-100 km/h) • Regal Magic Carpet Glide",
      topSpeed: "187 km/h (Smooth Aristocratic Cruising)",
      fuelType: "High Octane 98 RON with Valve Lubricant Additive",
      mileage: "6.8 km/l (Approx. combined)"
    },
    drivetrain: {
      transmission: "4-Speed GM-Licensed Hydramatic Vintage Automatic",
      driveType: "Rear-Wheel Drive with Hypoid Bevel Rear Axle",
      gearbox: "Column-Mounted Selector with Fluid Flywheel",
      steering: "Vintage Power-Assisted Cam & Peg Steering"
    },
    dimensions: {
      length: "5,378 mm",
      width: "1,899 mm",
      height: "1,626 mm",
      wheelbase: "3,124 mm",
      bootSpace: "510 Litres (Leather Strap Vintage Trunk)"
    },
    capacity: {
      seating: "5 Persons",
      doors: "4 Coach Doors",
      fuelTank: "82 Litres"
    },
    features: [
      { name: "Vintage Climate", desc: "Dual-Zone Restored Frigiking Vintage Air Conditioning", icon: "❄️" },
      { name: "Burr Walnut Wood", desc: "Hand-Crafted Book-Matched Picnic Tables & Dash Panel", icon: "🪵" },
      { name: "Connolly Leather", desc: "Original Hand-Stitched Vaumol Blue-Grey Hide", icon: "💺" },
      { name: "Audio System", desc: "Classic Becker Tube Radio with Concealed Bluetooth 5.2", icon: "📻" },
      { name: "Royal Mascot", desc: "Solid Sterling Silver Flying Lady (Spirit of Ecstasy)", icon: "👑" },
      { name: "Champagne Service", desc: "Crystal Flutes & Chilled Armrest Compartment", icon: "🍾" },
      { name: "Lambswool Rugs", desc: "Deep-Pile English Wilton Carpets with Lambswool Rugs", icon: "✨" },
      { name: "White Glove Chauffeur", desc: "Complimentary Royal Chauffeur on Request", icon: "👨‍✈️" }
    ],
    safety: [
      "Girling Hydraulic/Mechanical Dual-Servo Drum Braking System",
      "Welded Box-Section Heavy Gauge Steel Chassis",
      "Hidden 3-Point Inertia Lap-Sash Classic Belts",
      "Lucas Dual Sealed-Beam Vintage Headlamps",
      "Under-Hood Automatic Fire Suppression System",
      "Live GPS Telematics OBD Unit"
    ],
    description: "The crown jewel of British aristocratic elegance. The 1965 Rolls-Royce Silver Cloud III is an irreplaceable antique collector masterpiece featuring quad headlamps, hand-shaped aluminum coachwork, book-matched burr walnut picnic tables, and pure Connolly leather. Handcrafted in Crewe, England, it glides in near-absolute silence, offering a peerless regal entrance for high-profile galas, royal weddings, and VIP film productions."
  },
  "aston-martin-db5": {
    id: "aston-martin-db5",
    name: "Aston Martin DB5",
    brand: "Aston Martin",
    model: "1964 DB5 Vantage 4.0L Heritage Collector Coupe",
    category: "Antique Grand Tourer",
    categoryKey: "sports",
    price: 28999,
    securityDeposit: 30000,
    rating: 5.0,
    reviews: 112,
    tag: "🏆 1964 JAMES BOND ICON",
    tagClass: "tag-gold",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=85",
    horsepower: "325 HP",
    transmission: "ZF 5-Speed Manual",
    seats: "4 Seats",
    fuel: "Vintage High-Octane Petrol",
    status: "Available",
    registrationPlate: "MH-01-BOND-007",
    odometer: "32,400 KM",
    trips: 19,
    performance: {
      engine: "4.0L Tadek Marek DOHC All-Aluminium Straight-6",
      displacement: "3,995 cc",
      horsepower: "325 HP @ 5,500 RPM (Vantage Triple Webers)",
      torque: "390 Nm @ 4,500 RPM",
      acceleration: "6.5s (0-100 km/h) • Pure Mechanical Thoroughbred",
      topSpeed: "245 km/h",
      fuelType: "98/100 RON Octane Petrol (Speed97 / XP100)",
      mileage: "7.2 km/l (Approx. combined)"
    },
    drivetrain: {
      transmission: "ZF 5-Speed Full Synchromesh Manual Gearbox",
      driveType: "Rear-Wheel Drive with Limited-Slip Differential",
      gearbox: "Solid Wood/Alloy Short Throw Floor Shifter",
      steering: "Rack and Pinion with Period Wooden Mota-Lita Wheel"
    },
    dimensions: {
      length: "4,572 mm",
      width: "1,676 mm",
      height: "1,346 mm",
      wheelbase: "2,489 mm",
      bootSpace: "360 Litres"
    },
    capacity: {
      seating: "4 Persons (2+2 Classic GT)",
      doors: "2 Doors",
      fuelTank: "86 Litres Dual Tank"
    },
    features: [
      { name: "Superleggera Body", desc: "Patented Lightweight Tubular Magnesium-Alloy Coachwork", icon: "🏎️" },
      { name: "Connolly Leather", desc: "Hand-Carved Black Connolly Hide & English Wool Headliner", icon: "💺" },
      { name: "Smiths Gauges", desc: "Chrome-Bezel Chronometric Instrumentation & Tachometer", icon: "⏱️" },
      { name: "Borrani Wire Wheels", desc: "72-Spoke Chrome Wire Wheels with Knock-Off Hubs", icon: "🔘" },
      { name: "Tuned Exhaust", desc: "Stainless Steel Dual Manifold Exhaust with Resonant Roar", icon: "🔊" },
      { name: "Concealed Audio", desc: "Motorola Classic Radio with Hidden Focal Hi-Fi Speakers", icon: "📻" },
      { name: "Air Conditioning", desc: "Discreet High-Capacity Modern Vintage Climate System", icon: "❄️" },
      { name: "007 Silver Birch", desc: "Original Factory Silver Birch Metallic Finish", icon: "🍸" }
    ],
    safety: [
      "Dunlop Servo-Assisted Four-Wheel Disc Brakes",
      "Reinforced Steel Platform with Superleggera Structural Cage",
      "Competition 4-Point Harnesses + Period Inertia Lap Belts",
      "High-Intensity Quartz Halogen Headlamps",
      "Under-Chassis Dual Electric Fuel Pump Redundancy",
      "Discreet Modern GPS Tracker & Engine Cut-Off Telematics"
    ],
    description: "Widely regarded as the most famous car in the world and an immortal silver-screen legend. Hand-built at Newport Pagnell under Carrozzeria Touring's Superleggera technique, the 1964 Aston Martin DB5 finished in Silver Birch is the crown jewel of classic automotive design. Powered by the legendary 4.0L twin-cam straight-six with triple Weber carburetors, it delivers an intoxicating soundtrack, mechanical purity, and timeless swagger that modern machinery cannot replicate."
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
