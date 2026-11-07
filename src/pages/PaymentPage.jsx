import React, { useState } from "react";
import { useCarRental } from "../context/CarRentalContext";
import { formatCurrency } from "../data/carsData";

export default function PaymentPage() {
  const {
    bookingData,
    selectedCar,
    completeBooking,
    navigate,
    showToast
  } = useCarRental();

  const car = selectedCar;

  const [activeMethod, setActiveMethod] = useState("upi");

  // Promo discount
  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [discountCode, setDiscountCode] = useState("");

  // Card details state
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState(bookingData.customerName ? bookingData.customerName.toUpperCase() : "CARDHOLDER NAME");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // UPI state
  const [upiId, setUpiId] = useState("driver@icici");

  // Net banking & wallet & EMI
  const [selectedBank, setSelectedBank] = useState("HDFC Bank");
  const [selectedEmi, setSelectedEmi] = useState("3");
  const [selectedWallet, setSelectedWallet] = useState("Paytm Wallet");

  // OTP Modal state
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [processing, setProcessing] = useState(false);

  // Fare calculation
  const baseRental = bookingData.basePrice || (car?.price ? car.price * (bookingData.rentalDays || 1) : 14997);
  const securityDeposit = bookingData.securityDeposit || 5000;
  const discountedBase = Math.max(0, baseRental - appliedDiscount);
  const tax = Math.round(discountedBase * 0.18);
  const cgst = Math.round(tax / 2);
  const sgst = tax - cgst;
  const totalAmount = discountedBase + securityDeposit + tax;

  const applyPromo = (codeOverride) => {
    const code = (codeOverride || promoCode).trim().toUpperCase();
    if (!code) {
      showToast("Please enter a promo code");
      return;
    }
    if (code === "RENDERVIP20" || code === "RENDER20") {
      const disc = Math.round(baseRental * 0.20);
      setAppliedDiscount(disc);
      setDiscountCode(code);
      showToast(`Promo Applied! 20% Discount (- ${formatCurrency(disc)}) 🎉`);
    } else if (code === "FIRSTDRIVE") {
      setAppliedDiscount(1000);
      setDiscountCode(code);
      showToast(`Promo Applied! ₹1,000 First Drive Bonus 🎉`);
    } else if (code === "SUPERCAR500") {
      setAppliedDiscount(500);
      setDiscountCode(code);
      showToast(`Promo Applied! ₹500 Track Voucher 🎉`);
    } else {
      showToast("Invalid or expired coupon code. Try RENDERVIP20");
    }
    setPromoCode(code);
  };

  // Card formatting
  const handleCardNumberChange = (e) => {
    let raw = e.target.value.replace(/\D/g, "").substring(0, 16);
    let formatted = raw.match(/.{1,4}/g)?.join(" ") || raw;
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e) => {
    let inputVal = e.target.value;
    if (cardExpiry.endsWith("/") && inputVal.length === cardExpiry.length - 1) {
      setCardExpiry(inputVal.slice(0, -1));
      return;
    }
    let digits = inputVal.replace(/\D/g, "").substring(0, 4);
    if (digits.length >= 2) {
      setCardExpiry(digits.substring(0, 2) + "/" + digits.substring(2));
    } else {
      setCardExpiry(digits);
    }
  };

  const getCardBrand = () => {
    const raw = cardNumber.replace(/\s/g, "");
    if (raw.startsWith("4")) return "VISA";
    if (raw.startsWith("5") || raw.startsWith("2")) return "MASTERCARD";
    if (raw.startsWith("3")) return "AMEX";
    if (raw.startsWith("6")) return "RUPAY";
    return "VISA";
  };

  const handleInitiatePayment = (e) => {
    e.preventDefault();

    if (activeMethod === "card") {
      const cleanNum = cardNumber.replace(/\s/g, "");
      if (cleanNum.length < 15) {
        showToast("Please enter a valid 16-digit card number");
        return;
      }
      if (!cardName.trim()) {
        showToast("Please enter cardholder name");
        return;
      }
      if (cardExpiry.length < 5) {
        showToast("Please enter valid expiry date (MM/YY)");
        return;
      }
      if (cardCvv.length < 3) {
        showToast("Please enter 3-digit CVV");
        return;
      }
    }

    if (activeMethod === "pickup") {
      finalizeBooking("Pay at Hub Pickup (Cash / POS)");
      return;
    }

    // Open OTP modal for online methods
    setOtpModalOpen(true);
    setOtpDigits(["", "", "", "", "", ""]);
  };

  const handleOtpDigitChange = (index, value) => {
    const val = value.slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = val;
    setOtpDigits(newDigits);

    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleAutoFillOtp = () => {
    setOtpDigits(["1", "2", "3", "4", "5", "6"]);
    showToast("OTP Auto-Filled: 123456 ⚡");
  };

  const handleVerifyOtp = () => {
    const fullOtp = otpDigits.join("");
    if (fullOtp.length < 6) {
      showToast("Please enter 6-digit OTP (use '123456')");
      return;
    }

    setOtpModalOpen(false);

    const methodNames = {
      upi: "UPI / Instant Transfer",
      card: `Credit/Debit Card (${getCardBrand()})`,
      netbanking: `Net Banking (${selectedBank})`,
      emi: `No-Cost EMI (${selectedEmi} Months)`,
      wallets: `Digital Wallet (${selectedWallet})`
    };

    finalizeBooking(methodNames[activeMethod] || "Online Gateway");
  };

  const finalizeBooking = (methodTitle) => {
    setProcessing(true);
    showToast("Transaction authorized! Finalizing vehicle reservation...");

    setTimeout(() => {
      const randomHex = Math.floor(100000 + Math.random() * 900000);
      const bookingId = `RRC-2026-${randomHex}`;

      const completedBookingPayload = {
        ...bookingData,
        bookingId,
        carName: car?.name || "BMW M4 Competition",
        carId: car?.id || "bmw-m4",
        carImage: car?.image || "/pictures/hero-supercar.jpg",
        paymentMethod: methodTitle,
        paymentStatus: "Paid & Confirmed",
        totalAmount,
        appliedDiscount,
        discountCode,
        tax,
        paidTimestamp: new Date().toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        })
      };

      setProcessing(false);
      showToast("Booking Successful! Generating official invoice...");
      completeBooking(completedBookingPayload);
    }, 1200);
  };

  const upiQrUri = `upi://pay?pa=renderrcars@icici&pn=RenderRCars&am=${totalAmount}&cu=INR&tn=CarRentalBooking`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(upiQrUri)}`;

  return (
    <main className="payment-page">
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
        <div className="step-item active">
          <div className="step-num">3</div>
          <div className="step-name">Secure Payment</div>
        </div>
        <div className="step-item">
          <div className="step-num">4</div>
          <div className="step-name">Confirmation</div>
        </div>
      </div>

      <div className="payment-layout">
        {/* LEFT: PAYMENT METHOD SELECTION & FORMS */}
        <section className="payment-main-card">
          <div className="payment-title-box">
            <div className="section-label">256-BIT ENCRYPTED CHECKOUT</div>
            <h1>Select Payment <span>Method</span></h1>
          </div>

          {/* 6 PAYMENT METHOD TABS */}
          <div className="payment-methods-tabs">
            <div
              className={`method-tab ${activeMethod === "upi" ? "active" : ""}`}
              onClick={() => setActiveMethod("upi")}
            >
              <span className="tab-icon">⚡</span>
              <span className="tab-name">UPI / QR</span>
            </div>

            <div
              className={`method-tab ${activeMethod === "card" ? "active" : ""}`}
              onClick={() => setActiveMethod("card")}
            >
              <span className="tab-icon">💳</span>
              <span className="tab-name">Cards</span>
            </div>

            <div
              className={`method-tab ${activeMethod === "netbanking" ? "active" : ""}`}
              onClick={() => setActiveMethod("netbanking")}
            >
              <span className="tab-icon">🏦</span>
              <span className="tab-name">Net Banking</span>
            </div>

            <div
              className={`method-tab ${activeMethod === "emi" ? "active" : ""}`}
              onClick={() => setActiveMethod("emi")}
            >
              <span className="tab-icon">📊</span>
              <span className="tab-name">No-Cost EMI</span>
            </div>

            <div
              className={`method-tab ${activeMethod === "wallets" ? "active" : ""}`}
              onClick={() => setActiveMethod("wallets")}
            >
              <span className="tab-icon">👛</span>
              <span className="tab-name">Wallets</span>
            </div>

            <div
              className={`method-tab ${activeMethod === "pickup" ? "active" : ""}`}
              onClick={() => setActiveMethod("pickup")}
            >
              <span className="tab-icon">📍</span>
              <span className="tab-name">Pay at Hub</span>
            </div>
          </div>

          {/* METHOD 1: UPI & DYNAMIC QR */}
          {activeMethod === "upi" && (
            <div className="method-content-panel active" id="panel-upi">
              <div className="form-group" style={{ marginBottom: "20px" }}>
                <label htmlFor="upiId">Virtual Payment Address (UPI ID) *</label>
                <div style={{ display: "flex", gap: "10px" }}>
                  <input
                    type="text"
                    id="upiId"
                    placeholder="e.g. mobile@okhdfcbank or yourname@paytm"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn-apply-coupon"
                    onClick={() => {
                      navigator.clipboard.writeText(upiId);
                      showToast(`UPI ID "${upiId}" copied!`);
                    }}
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Copy ID 📋
                  </button>
                </div>
              </div>

              <div style={{ fontSize: "11px", fontWeight: 700, color: "#a0a5b5", textTransform: "uppercase", marginBottom: "8px" }}>
                Quick Select UPI App
              </div>
              <div className="upi-apps-row">
                <button
                  type="button"
                  className={`upi-app-btn ${upiId.includes("okaxis") ? "selected" : ""}`}
                  onClick={() => { setUpiId("customer@okaxis"); showToast("Google Pay selected"); }}
                >
                  <span>🔵</span> Google Pay
                </button>
                <button
                  type="button"
                  className={`upi-app-btn ${upiId.includes("ybl") ? "selected" : ""}`}
                  onClick={() => { setUpiId("customer@ybl"); showToast("PhonePe selected"); }}
                >
                  <span>🟣</span> PhonePe
                </button>
                <button
                  type="button"
                  className={`upi-app-btn ${upiId.includes("paytm") ? "selected" : ""}`}
                  onClick={() => { setUpiId("customer@paytm"); showToast("Paytm selected"); }}
                >
                  <span>🔷</span> Paytm
                </button>
                <button
                  type="button"
                  className={`upi-app-btn ${upiId.includes("cred") ? "selected" : ""}`}
                  onClick={() => { setUpiId("customer@cred"); showToast("CRED selected"); }}
                >
                  <span>🖤</span> CRED UPI
                </button>
              </div>

              <div className="qr-placeholder-card">
                <div className="qr-box">
                  <img id="upiQrImg" src={qrCodeUrl} alt="UPI QR Code" />
                </div>
                <div className="qr-amount-badge" id="qrAmountText">Amount: {formatCurrency(totalAmount)}</div>
                <span style={{ fontSize: "13px", color: "#a0a5b5" }}>
                  Scan with Any UPI App (GPay, PhonePe, Paytm, BHIM, CRED)
                </span>
              </div>
            </div>
          )}

          {/* METHOD 2: CARDS */}
          {activeMethod === "card" && (
            <div className="method-content-panel active" id="panel-card">
              <div className="card-visual-preview">
                <div className="card-top-row">
                  <div className="card-chip"></div>
                  <div className="card-brand-badge" id="previewCardBrand">{getCardBrand()}</div>
                </div>
                <div className="card-num-display" id="previewCardNum">
                  {cardNumber || "•••• •••• •••• ••••"}
                </div>
                <div className="card-bottom-info">
                  <div>
                    <small>CARDHOLDER</small>
                    <strong id="previewCardName">{cardName || "CARDHOLDER NAME"}</strong>
                  </div>
                  <div>
                    <small>EXPIRES</small>
                    <strong id="previewCardExp">{cardExpiry || "MM/YY"}</strong>
                  </div>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: "16px" }}>
                <label htmlFor="cardNumber">Card Number (16 Digits) *</label>
                <input
                  type="text"
                  id="cardNumber"
                  placeholder="4532 8901 2345 6789"
                  maxLength={19}
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                />
              </div>

              <div className="form-group" style={{ marginBottom: "16px" }}>
                <label htmlFor="cardName">Cardholder Name *</label>
                <input
                  type="text"
                  id="cardName"
                  placeholder="Full name as printed on card"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value.toUpperCase())}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div className="form-group">
                  <label htmlFor="cardExpiry">Expiry Date *</label>
                  <input
                    type="text"
                    id="cardExpiry"
                    placeholder="MM/YY"
                    maxLength={5}
                    value={cardExpiry}
                    onChange={handleExpiryChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cardCvv">CVV Code *</label>
                  <input
                    type="password"
                    id="cardCvv"
                    placeholder="•••"
                    maxLength={3}
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").substring(0, 3))}
                  />
                </div>
              </div>

              <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#a0a5b5", cursor: "pointer" }}>
                <input type="checkbox" defaultChecked style={{ accentColor: "var(--primary-red)" }} />
                Securely save card token for 1-click future vehicle bookings
              </label>
            </div>
          )}

          {/* METHOD 3: NET BANKING */}
          {activeMethod === "netbanking" && (
            <div className="method-content-panel active" id="panel-netbanking">
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#a0a5b5", textTransform: "uppercase", marginBottom: "10px" }}>
                Popular Banking Institutions
              </div>
              <div className="banks-quick-grid">
                {["HDFC Bank", "State Bank of India", "ICICI Bank", "Axis Bank", "Kotak Mahindra Bank", "Punjab National Bank"].map(b => (
                  <button
                    key={b}
                    type="button"
                    className={`bank-card-btn ${selectedBank === b ? "selected" : ""}`}
                    onClick={() => { setSelectedBank(b); showToast(`Selected: ${b}`); }}
                  >
                    <span>🏛️</span> {b}
                  </button>
                ))}
              </div>

              <div className="form-group" style={{ marginBottom: "15px" }}>
                <label htmlFor="netBankSelect">All Other Banks</label>
                <select
                  id="netBankSelect"
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                >
                  <option value="HDFC Bank">HDFC Bank</option>
                  <option value="State Bank of India">State Bank of India (SBI)</option>
                  <option value="ICICI Bank">ICICI Bank</option>
                  <option value="Axis Bank">Axis Bank</option>
                  <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                  <option value="Punjab National Bank">Punjab National Bank</option>
                  <option value="Bank of Baroda">Bank of Baroda</option>
                  <option value="IndusInd Bank">IndusInd Bank</option>
                  <option value="Yes Bank">Yes Bank</option>
                  <option value="IDFC FIRST Bank">IDFC FIRST Bank</option>
                </select>
              </div>
            </div>
          )}

          {/* METHOD 4: NO-COST EMI */}
          {activeMethod === "emi" && (
            <div className="method-content-panel active" id="panel-emi">
              <div style={{ fontSize: "13px", color: "#a0a5b5", marginBottom: "15px" }}>
                Convert your supercar rental into convenient No-Cost Monthly Installments. Zero processing fee.
              </div>
              <div className="emi-tenure-grid">
                {[
                  { tenure: "3", label: "3 Months", monthly: Math.round(totalAmount / 3) },
                  { tenure: "6", label: "6 Months", monthly: Math.round(totalAmount / 6) },
                  { tenure: "9", label: "9 Months", monthly: Math.round(totalAmount / 9) },
                  { tenure: "12", label: "12 Months", monthly: Math.round(totalAmount / 12) }
                ].map(item => (
                  <div
                    key={item.tenure}
                    className={`emi-card ${selectedEmi === item.tenure ? "selected" : ""}`}
                    onClick={() => { setSelectedEmi(item.tenure); showToast(`Selected ${item.label} EMI`); }}
                  >
                    <strong>{item.label}</strong>
                    <small>{formatCurrency(item.monthly)} / mo</small>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* METHOD 5: DIGITAL WALLETS */}
          {activeMethod === "wallets" && (
            <div className="method-content-panel active" id="panel-wallets">
              <div className="banks-quick-grid">
                {["Paytm Wallet", "Amazon Pay", "PhonePe Wallet", "MobiKwik", "Airtel Money", "Freecharge"].map(w => (
                  <button
                    key={w}
                    type="button"
                    className={`bank-card-btn ${selectedWallet === w ? "selected" : ""}`}
                    onClick={() => { setSelectedWallet(w); showToast(`Selected: ${w}`); }}
                  >
                    <span>🔷</span> {w}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* METHOD 6: PAY AT HUB */}
          {activeMethod === "pickup" && (
            <div className="method-content-panel active" id="panel-pickup">
              <div style={{ background: "rgba(255, 23, 68, 0.08)", border: "1px solid rgba(255, 23, 68, 0.25)", borderRadius: "16px", padding: "20px", marginBottom: "20px" }}>
                <h4 style={{ color: "#ff1744", fontFamily: "var(--font-heading)", fontSize: "16px", marginBottom: "6px" }}>
                  📍 Pay Upon Vehicle Handover
                </h4>
                <p style={{ fontSize: "13.5px", color: "#a0a5b5", lineHeight: "1.6" }}>
                  Pay directly at our Hub or to the concierge executive upon doorstep vehicle delivery via Cash, POS Debit/Credit Card, or UPI scan. No online charge required today.
                </p>
              </div>
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="button"
            className="pay-btn-complete"
            id="btnCompletePay"
            disabled={processing}
            onClick={handleInitiatePayment}
            style={{ marginTop: "30px" }}
          >
            <span id="btnPayLabel">
              {processing ? "PROCESSING TRANSACTION..." : `AUTHORIZE & COMPLETE RESERVATION (${formatCurrency(totalAmount)})`}
            </span>
            <span>→</span>
          </button>
        </section>

        {/* RIGHT: SIDEBAR SUMMARY & FARE BREAKDOWN */}
        <aside className="payment-sidebar">
          <div className="summary-card">
            {/* VEHICLE MINI PREVIEW */}
            <div className="vehicle-mini-preview">
              <img src={car?.image} alt={car?.name} className="vehicle-mini-img" />
              <div className="vehicle-mini-info">
                <h3>{car?.name}</h3>
                <span>{car?.brand} • {car?.category}</span>
                <div style={{ color: "var(--primary-cyan)", fontSize: "12px", fontWeight: 700, marginTop: "4px" }}>
                  {bookingData.rentalDays || 1} Day{(bookingData.rentalDays || 1) > 1 ? "s" : ""} Rental
                </div>
              </div>
            </div>

            {/* ITINERARY DETAILS */}
            <div className="itinerary-list">
              <div className="itinerary-item">
                <span>Driver Name:</span>
                <strong>{bookingData.customerName || "Verified Member"}</strong>
              </div>
              <div className="itinerary-item">
                <span>Contact Phone:</span>
                <strong>{bookingData.phone || "+91 98765 43210"}</strong>
              </div>
              <div className="itinerary-item">
                <span>Pickup Hub:</span>
                <strong>{bookingData.pickupLocation || "Vijayawada Hub"}</strong>
              </div>
              <div className="itinerary-item">
                <span>Schedule:</span>
                <strong>{bookingData.pickupDate} to {bookingData.returnDate}</strong>
              </div>
              <div className="itinerary-item">
                <span>Distance Allowance:</span>
                <strong>{(bookingData.rentalDays || 1) * 300} km (300 km/day)</strong>
              </div>
            </div>

            {/* PROMO CODE BOX */}
            <div className="coupon-container">
              <label style={{ fontSize: "11px", fontWeight: 700, color: "#a0a5b5", textTransform: "uppercase" }}>
                Have a Promo / VIP Coupon?
              </label>
              <div className="coupon-input-group">
                <input
                  type="text"
                  placeholder="e.g. RENDERVIP20"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                />
                <button type="button" className="btn-apply-coupon" onClick={() => applyPromo()}>
                  APPLY
                </button>
              </div>
              <div className="coupon-tags-row">
                <span className="coupon-chip" onClick={() => applyPromo("RENDERVIP20")}>
                  🏷️ RENDERVIP20 (20% OFF)
                </span>
                <span className="coupon-chip" onClick={() => applyPromo("FIRSTDRIVE")}>
                  🏷️ FIRSTDRIVE (₹1,000 OFF)
                </span>
              </div>
            </div>

            {/* DETAILED TRANSPARENT FARE BREAKDOWN */}
            <div className="price-breakdown">
              <div className="price-row-item">
                <span>Base Rental Amount</span>
                <strong>{formatCurrency(baseRental)}</strong>
              </div>

              <div className="price-row-item" style={{ color: "#10b981" }}>
                <span>Collision Protection Plan</span>
                <strong>FREE (Included)</strong>
              </div>

              <div className="price-row-item" style={{ color: "#10b981" }}>
                <span>24/7 Roadside Assistance</span>
                <strong>FREE (Included)</strong>
              </div>

              {appliedDiscount > 0 && (
                <div className="price-row-item" style={{ color: "var(--primary-cyan)" }}>
                  <span>Promo Discount Applied ({discountCode})</span>
                  <strong>- {formatCurrency(appliedDiscount)}</strong>
                </div>
              )}

              <div className="price-row-item">
                <span>Security Deposit (100% Refundable)</span>
                <strong>{formatCurrency(securityDeposit)}</strong>
              </div>

              <div className="price-row-item">
                <span>Central GST (CGST 9%)</span>
                <strong>{formatCurrency(cgst)}</strong>
              </div>

              <div className="price-row-item">
                <span>State GST (SGST 9%)</span>
                <strong>{formatCurrency(sgst)}</strong>
              </div>
            </div>

            {/* TOTAL PAYABLE */}
            <div className="total-amount-box">
              <span>TOTAL PAYABLE</span>
              <strong>{formatCurrency(totalAmount)}</strong>
            </div>

            <div className="trust-badges">
              <span>🔒 256-Bit SSL</span>
              <span>⚡ Guaranteed Vehicle</span>
              <span>🛡️ 48-Hr Deposit Refund</span>
            </div>
          </div>
        </aside>
      </div>

      {/* 3D SECURE OTP SIMULATION MODAL */}
      {otpModalOpen && (
        <div className="otp-modal active" id="otpModal">
          <div className="otp-box">
            <div style={{ fontSize: "38px", marginBottom: "10px" }}>🔐</div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "22px", fontWeight: 800, textTransform: "uppercase" }}>
              3D Secure Verification
            </h2>
            <p style={{ fontSize: "13px", color: "#a0a5b5", marginTop: "6px" }}>
              A simulated demo One-Time Password (OTP) has been sent to your registered phone.
            </p>

            <div style={{ background: "rgba(0, 242, 254, 0.08)", border: "1px solid rgba(0, 242, 254, 0.25)", borderRadius: "12px", padding: "10px", margin: "15px 0", fontSize: "12px", color: "var(--primary-cyan)" }}>
              Demo Passcode: <strong>123456</strong>
            </div>

            <div className="otp-inputs">
              {otpDigits.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  className="otp-digit"
                  maxLength={1}
                  placeholder="•"
                  value={digit}
                  onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  autoFocus={idx === 0}
                />
              ))}
            </div>

            <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "15px" }}>
              <button type="button" className="btn-apply-coupon" onClick={handleAutoFillOtp}>
                Auto-Fill "123456" ⚡
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "20px" }}>
              <button
                type="button"
                className="btn-agree-back"
                onClick={() => setOtpModalOpen(false)}
                style={{ textAlign: "center", padding: "12px", borderRadius: "12px" }}
              >
                CANCEL
              </button>
              <button
                type="button"
                className="pay-btn-complete"
                onClick={handleVerifyOtp}
                style={{ padding: "12px", marginTop: 0 }}
              >
                AUTHORIZE →
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
