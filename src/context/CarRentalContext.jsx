import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CARS_DATA, INITIAL_FLEET_DATA, INITIAL_BOOKINGS_DATA, getCarById, formatCurrency } from "../data/carsData";

const CarRentalContext = createContext();

export function CarRentalProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Auth & Session
  const [user, setUser] = useState(() => localStorage.getItem("renderUser") || null);
  const [userRole, setUserRole] = useState(() => localStorage.getItem("renderUserRole") || null);
  const [adminAuth, setAdminAuth] = useState(() => localStorage.getItem("renderAdminAuth") === "true");
  const [currentMode, setCurrentMode] = useState(() => localStorage.getItem("renderCurrentMode") || "driver");

  // Fleet state initialized from localStorage
  const [fleet, setFleet] = useState(() => {
    const stored = localStorage.getItem("adminFleetData");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const parsedIds = new Set(parsed.map(c => c.id));
          const missingInitial = INITIAL_FLEET_DATA.filter(c => !parsedIds.has(c.id));
          const merged = parsed.map(c => {
            const initial = CARS_DATA[c.id];
            return initial ? { ...initial, ...c } : c;
          });
          return [...merged, ...missingInitial];
        }
      } catch (e) {}
    }
    return INITIAL_FLEET_DATA;
  });

  // Active Car & Booking
  const [selectedCar, setSelectedCarState] = useState(() => {
    const stored = localStorage.getItem("selectedCar");
    if (stored) {
      try { return JSON.parse(stored); } catch (e) {}
    }
    return CARS_DATA["bmw-m4"];
  });

  const [searchCriteria, setSearchCriteria] = useState(() => {
    const today = new Date().toISOString().split("T")[0];
    const threeDaysLater = new Date(Date.now() + 3 * 86400000).toISOString().split("T")[0];
    return {
      location: "Vijayawada City Hub",
      pickupDate: today,
      returnDate: threeDaysLater,
      vehicleClass: "all"
    };
  });

  const [bookingData, setBookingDataState] = useState(() => {
    const stored = localStorage.getItem("bookingData");
    if (stored) {
      try { return JSON.parse(stored); } catch (e) {}
    }
    const today = new Date().toISOString().split("T")[0];
    const threeDaysLater = new Date(Date.now() + 3 * 86400000).toISOString().split("T")[0];
    return {
      customerName: "Mayank Kumar",
      email: "driver@renderrcars.com",
      phone: "+91 98765 43210",
      license: "DL-0420110012345",
      pickupLocation: "Vijayawada Experience Hub (Benz Circle)",
      pickupDate: today,
      pickupTime: "09:00 AM",
      returnDate: threeDaysLater,
      returnTime: "08:00 PM",
      rentalDays: 3,
      dailyPrice: 4999,
      basePrice: 14997,
      securityDeposit: 5000,
      tax: 2700,
      totalAmount: 22697,
      agreementAccepted: false
    };
  });

  const [confirmedBooking, setConfirmedBooking] = useState(() => {
    const stored = localStorage.getItem("confirmedBooking");
    if (stored) {
      try { return JSON.parse(stored); } catch (e) {}
    }
    return null;
  });

  const [bookings, setBookings] = useState(() => {
    const stored = localStorage.getItem("allBookings");
    if (stored) {
      try { return JSON.parse(stored); } catch (e) {}
    }
    return INITIAL_BOOKINGS_DATA;
  });

  // Favorites
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("renderFavorites");
    if (stored) {
      try { return JSON.parse(stored); } catch (e) {}
    }
    return ["bmw-m4"];
  });

  // Toast notification
  const [toast, setToast] = useState({ show: false, message: "" });
  let toastTimer = null;

  const showToast = (message) => {
    setToast({ show: true, message });
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 3200);
  };

  // Modals
  const [rentModal, setRentModal] = useState({ open: false, car: null });
  const [loginModal, setLoginModal] = useState({ open: false, role: "driver" });

  const openRentModal = (car) => {
    setRentModal({ open: true, car: car || selectedCar });
  };
  const closeRentModal = () => {
    setRentModal({ open: false, car: null });
  };

  const [rentedModalCar, setRentedModalCar] = useState(null);
  const openRentedModal = (car) => {
    setRentedModalCar(car || selectedCar);
  };
  const closeRentedModal = () => {
    setRentedModalCar(null);
  };

  const openLoginModal = (role = "driver") => {
    setLoginModal({ open: true, role });
  };
  const closeLoginModal = () => {
    setLoginModal({ open: false, role: "driver" });
  };

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem("adminFleetData", JSON.stringify(fleet));
  }, [fleet]);

  useEffect(() => {
    localStorage.setItem("allBookings", JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem("renderFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (carId) => {
    setFavorites(prev => {
      const exists = prev.includes(carId);
      if (exists) {
        showToast("Removed from Wishlist");
        return prev.filter(id => id !== carId);
      } else {
        showToast("Car added to Wishlist ❤️");
        return [...prev, carId];
      }
    });
  };

  const setSelectedCar = (car) => {
    setSelectedCarState(car);
    localStorage.setItem("selectedCar", JSON.stringify(car));
  };

  const setBookingData = (data) => {
    setBookingDataState(data);
    localStorage.setItem("bookingData", JSON.stringify(data));
  };

  const selectCarForDetails = (carId) => {
    const car = getCarById(carId, fleet);
    if (car) {
      setSelectedCar(car);
      navigate(`/details/${car.id}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const selectCarForBooking = (carId) => {
    const car = getCarById(carId, fleet);
    if (car) {
      setSelectedCar(car);

      // Carry search criteria into booking payload
      const current = { ...bookingData };
      if (searchCriteria.location) current.pickupLocation = searchCriteria.location;
      if (searchCriteria.pickupDate) current.pickupDate = searchCriteria.pickupDate;
      if (searchCriteria.returnDate) current.returnDate = searchCriteria.returnDate;

      // Recalculate duration & price
      let days = 1;
      if (current.pickupDate && current.returnDate) {
        const d1 = new Date(current.pickupDate);
        const d2 = new Date(current.returnDate);
        const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
        days = diff > 0 ? diff : 1;
      }

      const basePrice = (car.price || 4999) * days;
      const securityDeposit = car.securityDeposit || 5000;
      const tax = Math.round(basePrice * 0.18);
      const totalAmount = basePrice + securityDeposit + tax;

      const updatedBooking = {
        ...current,
        carName: car.name,
        carId: car.id,
        carImage: car.image,
        dailyPrice: car.price,
        rentalDays: days,
        basePrice,
        securityDeposit,
        tax,
        totalAmount
      };

      setBookingData(updatedBooking);
      navigate(`/booking?car=${car.id}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const loginUser = (email, role = "driver") => {
    setUser(email);
    setUserRole(role);
    localStorage.setItem("renderUser", email);
    localStorage.setItem("renderUserRole", role);

    if (role === "admin") {
      setAdminAuth(true);
      setCurrentMode("admin");
      localStorage.setItem("renderAdminAuth", "true");
      localStorage.setItem("renderCurrentMode", "admin");
      showToast("🛡️ Admin authentication verified! Welcome Administrator.");
    } else {
      setCurrentMode("driver");
      localStorage.setItem("renderCurrentMode", "driver");
      showToast(`🏎️ Welcome back, Driver ${email.split("@")[0]}! Member benefits unlocked.`);
    }
    closeLoginModal();
  };

  const logoutUser = () => {
    setUser(null);
    setUserRole(null);
    setAdminAuth(false);
    setCurrentMode("driver");
    localStorage.removeItem("renderUser");
    localStorage.removeItem("renderUserRole");
    localStorage.removeItem("renderAdminAuth");
    localStorage.setItem("renderCurrentMode", "driver");
    showToast("Successfully logged out of portal session");
    if (location.pathname === "/admin") {
      navigate("/");
    }
  };

  const switchMode = (mode) => {
    setCurrentMode(mode);
    localStorage.setItem("renderCurrentMode", mode);
    if (mode === "admin") {
      if (!adminAuth) {
        showToast("🛡️ Admin mode selected. Please authenticate terminal.");
        openLoginModal("admin");
      } else {
        showToast("🛡️ Switched to Fleet Admin Mode");
      }
    } else {
      showToast("🏎️ Switched to Driver Portal Mode");
    }
  };

  // Add new vehicle with complete specs
  const addCarToFleet = (newCarData) => {
    const fullCar = {
      id: newCarData.id || `car-${Date.now()}`,
      name: newCarData.name || "Exotic Supercar",
      brand: newCarData.brand || "Render",
      model: `${newCarData.name} Edition`,
      category: newCarData.category || "Sports Coupe",
      categoryKey: (newCarData.category || "sports").toLowerCase().includes("suv") ? "suv" : (newCarData.category || "").toLowerCase().includes("luxury") ? "luxury" : "sports",
      price: Number(newCarData.price) || 5999,
      securityDeposit: Number(newCarData.price) * 1.5 || 7500,
      rating: 5.0,
      reviews: 12,
      tag: "⚡ NEW ARRIVAL",
      tagClass: "tag-hot",
      image: newCarData.image || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85",
      horsepower: newCarData.hp || "500 HP",
      transmission: newCarData.transmission || "Automatic",
      seats: "2 Seats",
      fuel: "Petrol",
      status: "Available",
      trips: 0,
      performance: {
        engine: "High Performance Twin-Turbocharged V8",
        displacement: "3,996 cc",
        horsepower: newCarData.hp || "500 HP",
        torque: "620 Nm @ 3,000 RPM",
        acceleration: "3.2s (0-100 km/h)",
        topSpeed: "310 km/h",
        fuelType: "Super High Octane Petrol",
        mileage: "8.5 km/l"
      },
      drivetrain: {
        transmission: newCarData.transmission || "Dual-Clutch Automatic",
        driveType: "All-Wheel Drive",
        gearbox: "Sequential Paddle Shift",
        steering: "Speed-sensitive Dynamic Power Steering"
      },
      dimensions: {
        length: "4,600 mm",
        width: "1,920 mm",
        height: "1,280 mm",
        wheelbase: "2,700 mm",
        bootSpace: "200 Litres"
      },
      capacity: {
        seating: "2 Persons",
        doors: "2 Doors",
        fuelTank: "70 Litres"
      },
      features: [
        { name: "Air Conditioning", desc: "Dual-Zone Climate Control", icon: "❄️" },
        { name: "Apple CarPlay", desc: "Wireless Smartphone Mirroring", icon: "📱" },
        { name: "Bluetooth 5.2", desc: "HD Audio Streaming", icon: "📶" },
        { name: "Sport Mode", desc: "Dynamic Exhaust & Track Throttle", icon: "⚡" },
        { name: "Camera System", desc: "360° Parking Assist", icon: "📹" },
        { name: "Leather Seats", desc: "Fine Nappa Bucket Seats", icon: "💺" }
      ],
      safety: [
        "High Performance Carbon-Ceramic ABS Brakes",
        "Multi-stage SRS Airbag Protection System",
        "Dynamic Traction & Stability Control (DSC)",
        "Automated Forward Collision Warning & Braking"
      ],
      description: `${newCarData.name} joins the RenderRCars luxury fleet with commanding road presence, track-tuned aerodynamics, and blistering throttle response.`
    };

    setFleet(prev => [fullCar, ...prev]);
    showToast(`Vehicle ${fullCar.name} successfully inducted to Fleet! 🚀`);
  };

  // Toggle car status (supports carId string or array index)
  const toggleCarStatus = (identifier) => {
    setFleet(prev => {
      const copy = [...prev];
      let targetIdx = -1;
      if (typeof identifier === "number") {
        targetIdx = identifier;
      } else {
        targetIdx = copy.findIndex(c => c.id === identifier);
      }
      if (targetIdx >= 0 && targetIdx < copy.length) {
        const current = copy[targetIdx].status || "Available";
        if (current === "Available") copy[targetIdx].status = "Rented";
        else if (current === "Rented") copy[targetIdx].status = "Maintenance";
        else copy[targetIdx].status = "Available";
      }
      return copy;
    });
    showToast("Vehicle operational status updated");
  };

  // Delete car (supports carId string or array index)
  const deleteCar = (identifier) => {
    setFleet(prev => {
      if (typeof identifier === "number") {
        return prev.filter((_, i) => i !== identifier);
      }
      return prev.filter(c => c.id !== identifier);
    });
    showToast("Vehicle removed from active fleet");
  };

  // Update booking status (supports bookingId string or array index)
  const updateBookingStatus = (identifier, status) => {
    setBookings(prev => {
      const copy = [...prev];
      let targetIdx = -1;
      if (typeof identifier === "number") {
        targetIdx = identifier;
      } else {
        targetIdx = copy.findIndex(b => b.bookingId === identifier);
      }
      if (targetIdx >= 0 && targetIdx < copy.length) {
        copy[targetIdx].paymentStatus = status;
      }
      return copy;
    });
    showToast(`Booking marked as ${status}`);
  };

  // Admin Action: Accept / Approve Order
  const approveBooking = (bookingId) => {
    let affectedCarId = null;
    setBookings(prev => {
      return prev.map(b => {
        if (b.bookingId === bookingId) {
          affectedCarId = b.carId;
          return {
            ...b,
            paymentStatus: "Approved",
            approvalStatus: "Approved",
            adminDecisionDate: new Date().toLocaleString()
          };
        }
        return b;
      });
    });

    if (affectedCarId) {
      setFleet(prev => prev.map(c => {
        if (c.id === affectedCarId) {
          return { ...c, status: "Rented" };
        }
        return c;
      }));
    }
    showToast(`Order ${bookingId} has been ACCEPTED & DISPATCHED by Admin! 🚗✨`);
  };

  // Admin Action: Deny / Reject Order
  const denyBooking = (bookingId, reason = "Security verification rejected") => {
    let affectedCarId = null;
    setBookings(prev => {
      return prev.map(b => {
        if (b.bookingId === bookingId) {
          affectedCarId = b.carId;
          return {
            ...b,
            paymentStatus: "Denied",
            approvalStatus: "Denied",
            denialReason: reason,
            adminDecisionDate: new Date().toLocaleString()
          };
        }
        return b;
      });
    });

    // Revert car back to Available so others can book
    if (affectedCarId) {
      setFleet(prev => prev.map(c => {
        if (c.id === affectedCarId) {
          return { ...c, status: "Available" };
        }
        return c;
      }));
    }
    showToast(`Order ${bookingId} has been DENIED by Admin. Vehicle restored to Available inventory. 🛑`);
  };

  // Admin Action: Mid-Trip Repossession & Cancel due to Miscellaneous Act
  const repossessBookingCar = (bookingId, breachData = {}) => {
    const reason = breachData.reason || "Reckless driving & contract breach detected";
    let affectedCarId = null;
    let carName = "Vehicle";

    setBookings(prev => {
      return prev.map(b => {
        if (b.bookingId === bookingId) {
          affectedCarId = b.carId;
          carName = b.carName || carName;
          return {
            ...b,
            paymentStatus: "Terminated (Repossessed)",
            approvalStatus: "Terminated",
            repossessed: true,
            repossessedAt: new Date().toLocaleString(),
            breachReason: reason,
            engineKilled: true,
            securityDepositStatus: breachData.forfeitDeposit ? "Forfeited for damages / contractual penalty" : "Refund Processed"
          };
        }
        return b;
      });
    });

    // Repossess vehicle: return back to Available in fleet
    if (affectedCarId) {
      setFleet(prev => prev.map(c => {
        if (c.id === affectedCarId) {
          return {
            ...c,
            status: "Available",
            lastIncident: `Repossessed from trip on ${new Date().toLocaleDateString()}: ${reason}`
          };
        }
        return c;
      }));
    }

    showToast(`🚨 ENGINE IMMOBILIZED! ${carName} (${bookingId}) repossessed and returned to Fleet inventory!`);
  };

  // Record completed booking
  const completeBooking = (bookingPayload) => {
    setConfirmedBooking(bookingPayload);
    localStorage.setItem("confirmedBooking", JSON.stringify(bookingPayload));
    setBookings(prev => [bookingPayload, ...prev]);

    // Update car status to Rented in fleet
    if (bookingPayload.carId) {
      setFleet(prev => {
        return prev.map(c => {
          if (c.id === bookingPayload.carId) {
            return { ...c, status: "Rented", trips: (c.trips || 0) + 1 };
          }
          return c;
        });
      });
    }

    navigate("/confirmation");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <CarRentalContext.Provider
      value={{
        navigate,
        location,
        user,
        userRole,
        adminAuth,
        currentMode,
        switchMode,
        loginUser,
        logoutUser,
        selectedCar,
        setSelectedCar,
        searchCriteria,
        setSearchCriteria,
        bookingData,
        setBookingData,
        confirmedBooking,
        setConfirmedBooking,
        completeBooking,
        fleet,
        addCarToFleet,
        toggleCarStatus,
        deleteCar,
        bookings,
        updateBookingStatus,
        approveBooking,
        denyBooking,
        repossessBookingCar,
        favorites,
        toggleFavorite,
        toast,
        showToast,
        rentModal,
        openRentModal,
        closeRentModal,
        loginModal,
        openLoginModal,
        closeLoginModal,
        rentedModalCar,
        openRentedModal,
        closeRentedModal,
        selectCarForDetails,
        selectCarForBooking,
        formatCurrency
      }}
    >
      {children}
    </CarRentalContext.Provider>
  );
}

export function useCarRental() {
  const context = useContext(CarRentalContext);
  if (!context) {
    throw new Error("useCarRental must be used within a CarRentalProvider");
  }
  return context;
}
