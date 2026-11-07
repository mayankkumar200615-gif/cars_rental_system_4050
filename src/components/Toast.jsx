import React from "react";
import { useCarRental } from "../context/CarRentalContext";

export default function Toast() {
  const { toast } = useCarRental();

  return (
    <div className={`toast ${toast.show ? "show" : ""}`} id="toast">
      <span id="toastMessage">{toast.message}</span>
    </div>
  );
}

