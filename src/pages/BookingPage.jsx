import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useCarRental } from "../context/CarRentalContext";
import { formatCurrency, getCarById } from "../data/carsData";

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const {
    selectedCar,
    setSelectedCar,
    bookingData,
    setBookingData,
    navigate,
    showToast,
    user,
    fleet
  } = useCarRental();

  // If a car param exists in the URL, pick that vehicle
  useEffect(() => {
    const carParam = searchParams.get("car");
    if (carParam) {
      const foundCar = getCarById(carParam, fleet);
      if (foundCar) {
        setSelectedCar(foundCar);
      }
    }
  }, [searchParams, fleet]);

  const [fullName, setFullName] = useState(bookingData.customerName || "Mayank Kumar");
  const [email, setEmail] = useState(user || bookingData.email || "driver@renderrcars.com");
  const [phone, setPhone] = useState(bookingData.phone || "+91 98765 43210");
  const [license, setLicense] = useState(bookingData.license || "DL-0420110012345");
  const [pickupLocation, setPickupLocation] = useState(bookingData.pickupLocation || "Vijayawada Experience Hub (Benz Circle)");

  const todayStr = new Date().toISOString().split("T")[0];
  const threeDaysLater = new Date(Date.now() + 3 * 86400000).toISOString().split("T")[0];

  const [pickupDate, setPickupDate] = useState(bookingData.pickupDate || todayStr);
  const [pickupTime, setPickupTime] = useState(bookingData.pickupTime || "09:00 AM");
  const [returnDate, setReturnDate] = useState(bookingData.returnDate || threeDaysLater);
  const [returnTime, setReturnTime] = useState(bookingData.returnTime || "08:00 PM");

  const car = selectedCar || (fleet && fleet[0]) || {
    id: "bmw-m4",
    name: "BMW M4 Competition",
    brand: "BMW",
    category: "Sports Coupe",
    price: 4999,
    securityDeposit: 5000,
    image: "/pictures/hero-supercar.jpg"
  };

  const handlePickupDateChange = (val) => {
    setPickupDate(val);
    if (!returnDate || new Date(val) >= new Date(returnDate)) {
      const nextDay = new Date(new Date(val).getTime() + 86400000).toISOString().split("T")[0];
      setReturnDate(nextDay);
    }
  };

  let days = 1;
  if (pickupDate && returnDate) {
    const d1 = new Date(pickupDate);
    const d2 = new Date(returnDate);
    const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
    days = diff > 0 ? diff : 1;
  }

  const dailyPrice = car ? car.price : 4999;
  const baseRental = dailyPrice * days;
  const deposit = car ? (car.securityDeposit || 5000) : 5000;
  const taxes = Math.round(baseRental * 0.18);
  const totalAmount = baseRental + deposit + taxes;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullName || fullName.trim().length < 2) {
      showToast("Please enter your full legal name");
      return;
    }
    if (!email || !email.includes("@")) {
      showToast("Please enter a valid email address");
      return;
    }
    if (!phone || phone.trim().length < 10) {
      showToast("Please enter a valid phone number");
      return;
    }
    if (!license || license.trim().length < 5) {
      showToast("Please enter your Driving License number");
      return;
    }
    if (new Date(returnDate) < new Date(pickupDate)) {
      showToast("Return date cannot be before pickup date");
      return;
    }

    const payload = {
      ...bookingData,
      customerName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      license: license.trim(),
      pickupLocation,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      rentalDays: days,
      dailyPrice,
      basePrice: baseRental,
      securityDeposit: deposit,
      tax: taxes,
      totalAmount,
      carName: car.name,
      carId: car.id,
      carImage: car.image
    };

    setBookingData(payload);
    showToast("Booking schedule configured! Proceeding to Agreement...");
    navigate("/agreement");
  };

  return (
    <main className="booking-page">
      {/* STEP PROGRESS BAR */}
      <div className="step-progress">
        <div className="step-item active">
          <div className="step-num">1</div>
          <div className="step-name">Vehicle & Form</div>
        </div>
        <div className="step-item">
          <div className="step-num">2</div>
          <div className="step-name">Agreement</div>
        </div>
        <div className="step-item">
          <div className="step-num">3</div>
          <div className="step-name">Payment</div>
        </div>
        <div className="step-item">
          <div className="step-num">4</div>
          <div className="step-name">Confirmation</div>
        </div>
      </div>

      <div className="booking-layout">
        {/* LEFT: BOOKING FORM */}
        <section className="booking-form-card">
          <form id="bookingForm" onSubmit={handleSubmit}>
            {/* 1. CUSTOMER INFORMATION */}
            <div className="form-section-title">
              <span>01</span> Customer Information
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label htmlFor="fullName">Full Legal Name *</label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="e.g. Mayank Kumar"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  placeholder="e.g. mayank@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="license">Driving Licence Number *</label>
                <input
                  type="text"
                  id="license"
                  placeholder="e.g. DL-0420110012345"
                  value={license}
                  onChange={(e) => setLicense(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* 2. RENTAL ITINERARY */}
            <div className="form-section-title" style={{ marginTop: "35px" }}>
              <span>02</span> Rental Schedule & Location
            </div>

            <div className="form-grid-2">
              <div className="form-group full-width">
                <label htmlFor="pickupLocation">Pickup & Return Location *</label>
                <select
                  id="pickupLocation"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                >
                  <option value="Vijayawada Experience Hub (Benz Circle)">Vijayawada Experience Hub (Benz Circle)</option>
                  <option value="Hyderabad Rajiv Gandhi Intl Airport (RGIA)">Hyderabad Rajiv Gandhi Intl Airport (RGIA)</option>
                  <option value="Bangalore Central Hub (Indiranagar)">Bangalore Central Hub (Indiranagar)</option>
                  <option value="Chennai Airport & OMR Hub">Chennai Airport & OMR Hub</option>
                  <option value="Mumbai Chhatrapati Shivaji Maharaj T2">Mumbai Chhatrapati Shivaji Maharaj T2</option>
                  <option value="Delhi Aerocity & Gurgaon CyberHub">Delhi Aerocity & Gurgaon CyberHub</option>
                  <option value="Goa Dabolim & Mopa Airport Hub">Goa Dabolim & Mopa Airport Hub</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="pickupDate">Pickup Date *</label>
                <input
                  type="date"
                  id="pickupDate"
                  min={todayStr}
                  value={pickupDate}
                  onChange={(e) => handlePickupDateChange(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="pickupTime">Pickup Time *</label>
                <select
                  id="pickupTime"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                >
                  <option value="09:00 AM">09:00 AM (Morning Hub Opening)</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="02:00 PM">02:00 PM (Afternoon)</option>
                  <option value="05:00 PM">05:00 PM (Evening)</option>
                  <option value="08:00 PM">08:00 PM (Night Pickup)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="returnDate">Return Date *</label>
                <input
                  type="date"
                  id="returnDate"
                  min={pickupDate || todayStr}
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="returnTime">Return Time *</label>
                <select
                  id="returnTime"
                  value={returnTime}
                  onChange={(e) => setReturnTime(e.target.value)}
                >
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                  <option value="08:00 PM">08:00 PM (Night Drop)</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn-proceed" style={{ marginTop: "25px" }}>
              CONTINUE TO AGREEMENT →
            </button>
          </form>
        </section>

        {/* RIGHT: LIVE PRICING SIDEBAR */}
        <aside className="booking-summary-card">
          <div className="summary-heading">
            <span>Selected Vehicle</span>
            <button
              type="button"
              onClick={() => navigate("/")}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: "12px", color: "var(--primary-cyan)" }}
            >
              Change ↺
            </button>
          </div>

          {/* VEHICLE PREVIEW */}
          <div className="summary-car-preview">
            <img id="sumCarImg" src={car.image} alt={car.name} />
            <div className="summary-car-info">
              <h3 id="sumCarName">{car.name}</h3>
              <span id="sumCarCat">{car.brand} • {car.category}</span>
              <div className="day-rate">Rate: <strong id="sumDailyRate">{formatCurrency(dailyPrice)}</strong> / Day</div>
            </div>
          </div>

          {/* DYNAMIC PRICE BREAKDOWN */}
          <div className="price-breakdown">
            <div className="price-row-item">
              <span>Daily Rental Rate</span>
              <strong id="calcDailyPrice">{formatCurrency(dailyPrice)}</strong>
            </div>

            <div className="price-row-item highlight-row">
              <span>Rental Duration</span>
              <strong id="calcRentalDays">{days} Day{days > 1 ? "s" : ""}</strong>
            </div>

            <div className="price-row-item">
              <span>Base Rental Amount</span>
              <strong id="calcBaseRental">{formatCurrency(baseRental)}</strong>
            </div>

            <div className="price-row-item">
              <span>Security Deposit (Refundable)</span>
              <strong id="calcDeposit">{formatCurrency(deposit)}</strong>
            </div>

            <div className="price-row-item">
              <span>GST & Government Taxes (18%)</span>
              <strong id="calcTaxes">{formatCurrency(taxes)}</strong>
            </div>
          </div>

          {/* TOTAL AMOUNT */}
          <div className="total-amount-box">
            <span>TOTAL PAYABLE</span>
            <strong id="calcTotal">{formatCurrency(totalAmount)}</strong>
          </div>

          <div className="trust-badges">
            <span>🔒 256-Bit Encrypted</span>
            <span>⚡ Instant Hold</span>
            <span>🛡️ 100% Refundable Deposit</span>
          </div>
        </aside>
      </div>
    </main>
  );
}