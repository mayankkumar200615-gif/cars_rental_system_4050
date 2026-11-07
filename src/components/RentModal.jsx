import React, { useState, useEffect } from "react";
import { useCarRental } from "../context/CarRentalContext";

export default function RentModal() {
  const { rentModal, closeRentModal, formatCurrency, selectCarForBooking, showToast } = useCarRental();
  const [pickupDate, setPickupDate] = useState("");
  const [rentalDays, setRentalDays] = useState(1);

  const car = rentModal.car;

  useEffect(() => {
    if (rentModal.open) {
      const today = new Date().toISOString().split("T")[0];
      setPickupDate(today);
      setRentalDays(1);
    }
  }, [rentModal.open]);

  if (!rentModal.open || !car) return null;

  const handleDaysChange = (e) => {
    let days = Number(e.target.value) || 1;
    if (days < 1) days = 1;
    if (days > 30) days = 30;
    setRentalDays(days);
  };

  const handleConfirm = () => {
    if (!pickupDate) {
      showToast("Please select pickup date");
      return;
    }
    closeRentModal();
    selectCarForBooking(car.id);
  };

  const total = (car.price || 0) * rentalDays;

  return (
    <div className="modal active" id="rentModal" onClick={(e) => {
      if (e.target.id === "rentModal") closeRentModal();
    }}>
      <div className="modal-box">
        <button className="close" type="button" onClick={closeRentModal}>×</button>
        <div className="modal-label">QUICK ESTIMATE & CALCULATION</div>
        <h2 id="selectedCar">{car.name}</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "15px" }}>
          Daily Rate: <strong style={{ color: "#fff" }}>{formatCurrency(car.price)}</strong>
        </p>

        <label htmlFor="modalDate">PICKUP DATE</label>
        <input
          type="date"
          id="modalDate"
          value={pickupDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setPickupDate(e.target.value)}
        />

        <label htmlFor="rentalDays">RENTAL DURATION (DAYS)</label>
        <input
          type="number"
          id="rentalDays"
          value={rentalDays}
          min="1"
          max="30"
          onChange={handleDaysChange}
        />

        <div className="rental-total">
          <span>ESTIMATED TOTAL</span>
          <strong id="totalPrice">{formatCurrency(total)}</strong>
        </div>

        <button className="confirm-button" type="button" onClick={handleConfirm}>
          CONFIRM & PROCEED TO BOOKING →
        </button>
      </div>
    </div>
  );
}

