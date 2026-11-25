import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { CarRentalProvider } from "./context/CarRentalContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import RentModal from "./components/RentModal";
import LoginModal from "./components/LoginModal";
import RentedCarModal from "./components/RentedCarModal";
import { useCarRental } from "./context/CarRentalContext";
import HomePage from "./pages/HomePage";
import CarDetailsPage from "./pages/CarDetailsPage";
import BookingPage from "./pages/BookingPage";
import AgreementPage from "./pages/AgreementPage";
import PaymentPage from "./pages/PaymentPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import WishlistPage from "./pages/WishlistPage";
import StatusTrackerPage from "./pages/StatusTrackerPage";
import HelpCenterPage from "./pages/HelpCenterPage";

function MainApp() {
  const location = useLocation();
  const { rentedModalCar, closeRentedModal } = useCarRental();
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const isStandalone = location.pathname === "/login" || location.pathname === "/admin";

  return (
    <>
      {/* BACKGROUND AMBIENT EFFECTS */}
      {!isStandalone && (
        <>
          <div className="bg-grid"></div>
          <div className="glow glow-red"></div>
          <div className="glow glow-blue"></div>
          <div className="glow glow-purple"></div>
          <Navbar onSearch={(term) => setSearchFilter(term)} />
        </>
      )}

      {/* REACT ROUTER ROUTES */}
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              searchFilter={searchFilter}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          }
        />
        <Route path="/details" element={<CarDetailsPage />} />
        <Route path="/details/:carId" element={<CarDetailsPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/agreement" element={<AgreementPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
        <Route path="/status" element={<StatusTrackerPage />} />
        <Route path="/track" element={<StatusTrackerPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/help" element={<HelpCenterPage />} />
        <Route path="/help-center" element={<HelpCenterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* FOOTER & MODALS */}
      {!isStandalone && (
        <Footer onCategorySelect={(cat) => setSelectedCategory(cat)} />
      )}

      <RentModal />
      <LoginModal />
      <RentedCarModal car={rentedModalCar} isOpen={Boolean(rentedModalCar)} onClose={closeRentedModal} />
      <Toast />
    </>
  );
}

export default function App() {
  return (
    <CarRentalProvider>
      <MainApp />
    </CarRentalProvider>
  );
}
