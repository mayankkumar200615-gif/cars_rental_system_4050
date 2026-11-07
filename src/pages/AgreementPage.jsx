import React, { useState } from "react";
import { useCarRental } from "../context/CarRentalContext";
import { formatCurrency } from "../data/carsData";

export default function AgreementPage() {
  const {
    bookingData,
    setBookingData,
    selectedCar,
    navigate,
    showToast
  } = useCarRental();

  const [agreed, setAgreed] = useState(bookingData.agreementAccepted || false);

  const car = selectedCar;

  const handleAccept = () => {
    if (!agreed) {
      showToast("Please acknowledge and check the agreement terms checkbox to continue.");
      return;
    }

    const updated = {
      ...bookingData,
      agreementAccepted: true,
      agreementTimestamp: new Date().toISOString()
    };

    setBookingData(updated);
    showToast("Agreement signed electronically. Proceeding to Secure Checkout...");
    navigate("/payment");
  };

  return (
    <main className="agreement-page">
      {/* STEP PROGRESS BAR */}
      <div className="step-progress">
        <div className="step-item completed">
          <div className="step-num">✓</div>
          <div className="step-name">Vehicle & Form</div>
        </div>
        <div className="step-item active">
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

      {/* AGREEMENT CONTAINER */}
      <section className="agreement-card">
        {/* HEADER */}
        <div className="agreement-header">
          <div className="section-label">LEGAL CONTRACT & TERMS</div>
          <h1>Master Rental <span>Agreement</span></h1>
          <p>Please review the terms and operational conditions governing this self-drive rental vehicle.</p>
        </div>

        {/* RENTAL META SUMMARY STRIP */}
        <div className="agreement-meta-strip">
          <div className="meta-item">
            <small>Selected Vehicle</small>
            <strong id="agreeCar">{car?.name || "BMW M4"}</strong>
          </div>

          <div className="meta-item">
            <small>Customer Name</small>
            <strong id="agreeCustomer">{bookingData.customerName || "Mayank Kumar"}</strong>
          </div>

          <div className="meta-item">
            <small>Pickup Schedule</small>
            <strong id="agreePickup">{bookingData.pickupDate} ({bookingData.pickupTime || "09:00 AM"})</strong>
          </div>

          <div className="meta-item">
            <small>Return Schedule</small>
            <strong id="agreeReturn">{bookingData.returnDate} ({bookingData.returnTime || "08:00 PM"})</strong>
          </div>

          <div className="meta-item">
            <small>Rental Duration</small>
            <strong id="agreeDuration">{bookingData.rentalDays || 1} Day{(bookingData.rentalDays || 1) > 1 ? "s" : ""}</strong>
          </div>

          <div className="meta-item">
            <small>Total Amount</small>
            <strong id="agreeTotal" style={{ color: "var(--primary-cyan)" }}>
              {formatCurrency(bookingData.totalAmount || 22696)}
            </strong>
          </div>
        </div>

        {/* SCROLL HINT */}
        <div className="clause-scroll-hint">
          <span>📜 11 Mandatory Rental Terms & Insurance Clauses (Scroll to Read)</span>
        </div>

        {/* 11 LEGAL SECTIONS */}
        <div className="agreement-clauses">
          <div className="clause-block">
            <h3><span className="clause-num">01</span> Rental Period & Schedule</h3>
            <p>
              The vehicle must be collected at the designated pickup hub and returned strictly within the agreed rental period specified in this agreement. A maximum courtesy grace period of 45 minutes is allowed before late fees apply. Any extension must be requested at least 6 hours in advance via the customer portal.
            </p>
          </div>

          <div className="clause-block">
            <h3><span className="clause-num">02</span> Driver Requirements & Age Policy</h3>
            <p>
              The renter certifies possessing a valid, non-probationary government-issued driving licence held for a minimum of 2 years. The minimum age for sports and supercar categories (BMW M4, Audi R8) is 23 years, and 21 years for standard categories. Only registered, authorized drivers are legally permitted to operate the vehicle.
            </p>
          </div>

          <div className="clause-block">
            <h3><span className="clause-num">03</span> Vehicle Condition & Handover Inspection</h3>
            <p>
              A joint pre-delivery digital inspection (360° video log and odometer photo) is recorded at pickup. The renter is responsible for returning the vehicle in the same clean mechanical and cosmetic condition, allowing for normal highway dust. Smoking, vaping, and pet transport inside luxury cabins are strictly prohibited.
            </p>
          </div>

          <div className="clause-block">
            <h3><span className="clause-num">04</span> Fuel Policy & Minimum Octane Rating</h3>
            <p>
              RenderRCars operates on a "Same-to-Same" fuel level policy. If collected with a 100% full tank, it must be returned at 100%. Premium performance models (BMW M4, Audi R8, Mercedes AMG) strictly require high-octane 95+ or 98+ octane petrol; original fueling tax invoices must be retained.
            </p>
          </div>

          <div className="clause-block">
            <h3><span className="clause-num">05</span> Included Mileage & Excess Kilometres</h3>
            <p>
              All standard bookings include an allowance of 300 km per rental calendar day (e.g. 900 km for a 3-day reservation). Any excess mileage driven beyond the cumulative allowance will be billed at standard fleet rates: ₹25/km for SUV fleet and ₹65/km for Supercar/Sports categories.
            </p>
          </div>

          <div className="clause-block">
            <h3><span className="clause-num">06</span> Late Return & Unauthorized Hold</h3>
            <p>
              Unscheduled late returns beyond the 45-minute courtesy grace period are billed at standard hourly rates for up to 3 hours, after which a full extra day rental plus a disruption surcharge will be assessed to compensate subsequent waiting renters.
            </p>
          </div>

          <div className="clause-block">
            <h3><span className="clause-num">07</span> Traffic Violations & Electronic Tolls</h3>
            <p>
              The renter is solely responsible for all traffic fines, speeding citations, parking tickets, and FASTag automated toll charges incurred throughout the active rental timeline. All automated challans received via government portals will be settled from the security deposit or billed directly.
            </p>
          </div>

          <div className="clause-block">
            <h3><span className="clause-num">08</span> Damage, Accident & Insurance Coverage</h3>
            <p>
              All RenderRCars vehicles carry comprehensive commercial insurance. In the event of an accident or body damage, the customer's maximum financial liability is capped at the maximum deductible security deposit amount, provided the renter was not operating under intoxication, reckless track driving, or unauthorized driver handover.
            </p>
          </div>

          <div className="clause-block">
            <h3><span className="clause-num">09</span> Security Deposit & Refund Timeline</h3>
            <p>
              A refundable security deposit (ranging from ₹5,000 to ₹10,000 depending on vehicle tier) is held prior to vehicle key handover. Following successful vehicle check-in and automated e-challan clearance, the entire deposit is released back to the customer's original payment method within 48 to 72 bank working hours.
            </p>
          </div>

          <div className="clause-block">
            <h3><span className="clause-num">10</span> Cancellation & Refund Conditions</h3>
            <p>
              Free cancellation with 100% full refund is provided if requested at least 24 hours prior to the scheduled pickup time. Cancellations made within 24 hours of pickup incur a nominal 1-day rental booking fee. Rescheduling dates is free up to 6 hours before dispatch.
            </p>
          </div>

          <div className="clause-block">
            <h3><span className="clause-num">11</span> Privacy & Data Administration</h3>
            <p>
              Customer personal data, driving licence scans, and contact details are securely stored under 256-bit encryption solely for rental authorization, KYC compliance, and roadside emergency assistance. We do not sell or transfer your private information to third-party advertisers.
            </p>
          </div>
        </div>

        {/* ACCEPTANCE CONTROLS */}
        <div className="acceptance-box">
          <label className="checkbox-label" htmlFor="agreeCheckbox">
            <input
              type="checkbox"
              id="agreeCheckbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <span>I have read, understood, and agree to all 11 Master Rental Terms, Insurance Policies & Handover Conditions.</span>
          </label>

          <div className="acceptance-actions">
            <button
              type="button"
              className="btn-agree-back"
              onClick={() => navigate("/booking")}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              ← Back to Booking
            </button>
            <button
              type="button"
              id="btnAccept"
              className="btn-accept"
              disabled={!agreed}
              onClick={handleAccept}
            >
              ACCEPT & CONTINUE TO PAYMENT →
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
