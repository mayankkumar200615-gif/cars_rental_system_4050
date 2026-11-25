import React, { useState, useRef } from "react";
import { useCarRental } from "../context/CarRentalContext";
import CarCard from "../components/CarCard";

export default function HomePage({ searchFilter, selectedCategory, setSelectedCategory }) {
  const {
    currentMode,
    switchMode,
    searchCriteria,
    setSearchCriteria,
    showToast,
    fleet,
    bookingData,
    setBookingData
  } = useCarRental();

  const [faqActive, setFaqActive] = useState(0);
  const [sortBy, setSortBy] = useState("default"); // default | price-asc | price-desc | rating | hp
  const [seatFilter, setSeatFilter] = useState("all"); // all | 2 | 4-5 | 7
  const videoRef = useRef(null);

  // Use live reactive fleet from context
  const carsList = fleet && fleet.length > 0 ? fleet : [];

  // Filter cars based on searchFilter, selectedCategory, and seatFilter
  let filteredCars = carsList.filter(car => {
    const matchesSearch = !searchFilter ||
      car.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchFilter.toLowerCase()) ||
      car.category.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesCategory = !selectedCategory ||
      selectedCategory === "all" ||
      car.categoryKey === selectedCategory ||
      (selectedCategory === "antique" && (car.category?.toLowerCase().includes("antique") || car.id === "rolls-royce-silver-cloud" || car.id === "aston-martin-db5"));

    let matchesSeat = true;
    if (seatFilter === "2") matchesSeat = car.seats?.includes("2");
    else if (seatFilter === "4-5") matchesSeat = car.seats?.includes("4") || car.seats?.includes("5");
    else if (seatFilter === "7") matchesSeat = car.seats?.includes("7");

    return matchesSearch && matchesCategory && matchesSeat;
  });

  // Sorting
  if (sortBy === "price-asc") {
    filteredCars.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    filteredCars.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filteredCars.sort((a, b) => (b.rating || 4.8) - (a.rating || 4.8));
  } else if (sortBy === "hp") {
    filteredCars.sort((a, b) => parseInt(b.horsepower || 0) - parseInt(a.horsepower || 0));
  }

  const scrollToCars = () => {
    const el = document.getElementById("cars");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchCriteria.pickupDate) {
      showToast("Please select a pickup date");
      return;
    }
    if (!searchCriteria.returnDate) {
      showToast("Please select a return date");
      return;
    }
    if (new Date(searchCriteria.returnDate) < new Date(searchCriteria.pickupDate)) {
      showToast("Return date must be after pickup date");
      return;
    }

    // Carry criteria into bookingData
    setBookingData({
      ...bookingData,
      pickupLocation: searchCriteria.location,
      pickupDate: searchCriteria.pickupDate,
      returnDate: searchCriteria.returnDate
    });

    showToast(`Searching available cars in ${searchCriteria.location}...`);
    scrollToCars();
  };

  const playExperience = () => {
    if (videoRef.current) {
      videoRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      videoRef.current.play();
    }
  };

  const copyCoupon = () => {
    const code = "RENDERVIP20";
    navigator.clipboard.writeText(code).then(() => {
      showToast(`Coupon ${code} copied to clipboard! 🎉`);
    }).catch(() => {
      showToast(`Coupon ${code} ready to use!`);
    });
  };

  const faqData = [
    {
      q: "What documents are required to rent a supercar or luxury SUV?",
      a: "A valid Indian Driving License (or International Driving Permit), Original Government ID (Aadhaar/Passport), and a verified credit card or UPI for the booking transaction."
    },
    {
      q: "Is comprehensive insurance included with the rental price?",
      a: "Yes! All vehicles in the RenderRCars fleet come with comprehensive bumper-to-bumper commercial insurance, 24/7 roadside assistance, and zero-liability packages for verified members."
    },
    {
      q: "How does doorstep and airport delivery work?",
      a: "When booking, choose your preferred airport terminal or residential address. Our certified fleet executive delivers the washed and fueled car directly to your pin location within 60 minutes."
    },
    {
      q: "What is your cancellation and refund policy?",
      a: "Free cancellations are allowed up to 12 hours prior to scheduled pickup with 100% instant refund back to your original payment method."
    }
  ];

  return (
    <main>
      {/* HERO SECTION */}
      <section className="hero" id="home">
        <div className="hero-content">
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center", marginBottom: "12px" }}>
            <div className="hero-pill-badge" style={{ marginBottom: 0 }}>
              <span className="pulse-dot"></span>
              INDIA'S #1 SUPERCAR & LUXURY FLEET
            </div>

            {/* HERO MODE SWITCHER */}
            <div className="hero-mode-pill" style={{ marginBottom: 0 }}>
              <span className="mode-label">PORTAL:</span>
              <button
                type="button"
                className={`hero-mode-toggle ${currentMode === "driver" ? "active" : ""}`}
                id="heroDriverTab"
                onClick={() => switchMode("driver")}
              >
                🏎️ Driver Mode
              </button>
              <button
                type="button"
                className={`hero-mode-toggle ${currentMode === "admin" ? "active" : ""}`}
                id="heroAdminTab"
                onClick={() => switchMode("admin")}
              >
                🛡️ Admin Mode
              </button>
            </div>
          </div>

          <h1>
            DRIVE
            <span className="gradient-text"> BEYOND LIMITS</span>
          </h1>

          <p className="hero-description">
            Unleash ferocious horsepower, handcrafted exotic luxury, and unforgettable driving euphoria. 
            Choose from our curated fleet of supercars, executive sedans, and commanding 4x4 SUVs with transparent day rates and zero security hold for members.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn" type="button" onClick={scrollToCars}>
              EXPLORE FLEET
              <span>→</span>
            </button>

            <button className="secondary-btn" type="button" onClick={playExperience}>
              <span>▶</span>
              WATCH EXPERIENCE
            </button>
          </div>

          <div className="hero-stats-row">
            <div className="stat-box">
              <strong>500+</strong>
              <span>Supercars & Luxury</span>
            </div>

            <div className="stat-box">
              <strong>50K+</strong>
              <span>Happy Drivers</span>
            </div>

            <div className="stat-box">
              <strong>4.9 ★</strong>
              <span>1,200+ Verified Reviews</span>
            </div>
          </div>
        </div>

        {/* HERO CAR SHOWCASE & TELEMETRY */}
        <div className="hero-car">
          <div className="hero-glow-halo"></div>
          <div className="hero-ring"></div>

          <div className="hero-car-showcase">
            <img
              src="/pictures/hero-supercar.jpg"
              alt="RenderRCars Flagship Supercar"
              className="main-car-img"
            />
          </div>

          {/* Live Telemetry Floaters */}
          <div className="floating-telemetry card-speed">
            <span className="telemetry-label">⚡ Top Speed</span>
            <strong className="telemetry-val">345 <span>KM/H</span></strong>
          </div>

          <div className="floating-telemetry card-power">
            <span className="telemetry-label">🔥 Engine Output</span>
            <strong className="telemetry-val">710 <span>HP V8</span></strong>
          </div>

          <div className="floating-telemetry card-sprint">
            <span className="telemetry-label">🏁 0 - 100 KM/H</span>
            <strong className="telemetry-val">2.8 <span>SEC</span></strong>
          </div>
        </div>
      </section>

      {/* ADVANCED RENTAL SEARCH & BOOKING PANEL */}
      <section className="search-panel-wrapper">
        <form className="search-panel" onSubmit={handleSearchSubmit}>
          <div className="search-header">
            <div className="search-title-group">
              <span className="search-badge">01</span>
              <div>
                <h3>COMMAND YOUR RESERVATION</h3>
                <span className="search-subtitle">Select pickup city & dates for immediate luxury fleet dispatch</span>
              </div>
            </div>
          </div>

          <div className="search-fields">
            <div className="field">
              <label htmlFor="location">📍 PICKUP HUB</label>
              <div className="input-container">
                <select
                  id="location"
                  value={searchCriteria.location}
                  onChange={(e) => setSearchCriteria({ ...searchCriteria, location: e.target.value })}
                >
                  <option value="Vijayawada City Hub">Vijayawada City Hub</option>
                  <option value="Hyderabad Rajiv Gandhi Int'l Airport (HYD)">Hyderabad Airport (HYD)</option>
                  <option value="Bangalore Central Hub (BLR)">Bangalore Central Hub (BLR)</option>
                  <option value="Chennai OMR / Airport Hub (MAA)">Chennai Airport Hub (MAA)</option>
                  <option value="Mumbai Airport Terminal 2 (BOM)">Mumbai Airport (BOM)</option>
                  <option value="Delhi NCR Aerocity Hub (DEL)">Delhi NCR Aerocity (DEL)</option>
                  <option value="Goa Dabolim & Mopa Airport Hub">Goa Coastal Hub</option>
                </select>
              </div>
            </div>

            <div className="field">
              <label htmlFor="pickupDate">📅 PICKUP DATE</label>
              <div className="input-container">
                <input
                  type="date"
                  id="pickupDate"
                  value={searchCriteria.pickupDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setSearchCriteria({ ...searchCriteria, pickupDate: e.target.value })}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="returnDate">📅 RETURN DATE</label>
              <div className="input-container">
                <input
                  type="date"
                  id="returnDate"
                  value={searchCriteria.returnDate}
                  min={searchCriteria.pickupDate || new Date().toISOString().split("T")[0]}
                  onChange={(e) => setSearchCriteria({ ...searchCriteria, returnDate: e.target.value })}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="carTypeSelect">🏎️ VEHICLE CLASS</label>
              <div className="input-container">
                <select
                  id="carTypeSelect"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Fleet Categories</option>
                  <option value="sports">Sports & Supercars</option>
                  <option value="luxury">Luxury Performance</option>
                  <option value="suv">Commanding 4x4 SUVs</option>
                  <option value="antique">👑 Antique & Vintage Heritage</option>
                </select>
              </div>
            </div>

            <button className="search-rent-btn" type="submit">
              SEARCH FLEET
              <span>→</span>
            </button>
          </div>
        </form>
      </section>

      {/* CATEGORIES SELECTOR */}
      <section className="categories">
        <div className="section-top">
          <div>
            <div className="section-label">SELECT YOUR DRIVING STYLE</div>
            <h2>CURATED <span>CATEGORIES</span></h2>
          </div>
          <button
            className="view-all"
            type="button"
            onClick={() => {
              setSelectedCategory("all");
              setSeatFilter("all");
              setSortBy("default");
              showToast("Showing all available cars");
            }}
          >
            RESET FILTERS ↺
          </button>
        </div>

        <div className="category-grid">
          <button
            type="button"
            className={selectedCategory === "sports" ? "active" : ""}
            onClick={() => {
              setSelectedCategory("sports");
              showToast("SPORTS collection filtered");
              scrollToCars();
            }}
          >
            <div className="category-icon">🏎️</div>
            <strong>SPORTS & SUPERCARS</strong>
            <small>Raw Horsepower & Track Agility</small>
          </button>

          <button
            type="button"
            className={selectedCategory === "luxury" ? "active" : ""}
            onClick={() => {
              setSelectedCategory("luxury");
              showToast("LUXURY collection filtered");
              scrollToCars();
            }}
          >
            <div className="category-icon">💎</div>
            <strong>LUXURY PERFORMANCE</strong>
            <small>Executive Comfort & Bi-Turbo Muscle</small>
          </button>

          <button
            type="button"
            className={selectedCategory === "suv" ? "active" : ""}
            onClick={() => {
              setSelectedCategory("suv");
              showToast("SUV collection filtered");
              scrollToCars();
            }}
          >
            <div className="category-icon">🚙</div>
            <strong>COMMANDING SUVs</strong>
            <small>All-Terrain Power & Spacious Comfort</small>
          </button>

          <button
            type="button"
            className={selectedCategory === "antique" ? "active" : ""}
            onClick={() => {
              setSelectedCategory("antique");
              showToast("👑 ANTIQUE & VINTAGE collection filtered");
              scrollToCars();
            }}
          >
            <div className="category-icon">👑</div>
            <strong>ANTIQUE & VINTAGE</strong>
            <small>1960s British Royal Heritage</small>
          </button>

          <button
            type="button"
            className={selectedCategory === "all" ? "active" : ""}
            onClick={() => {
              setSelectedCategory("all");
              showToast("Showing all available cars");
              scrollToCars();
            }}
          >
            <div className="category-icon">🚘</div>
            <strong>ALL FLEET ({carsList.length})</strong>
            <small>Explore Entire Master Collection</small>
          </button>
        </div>
      </section>

      {/* CAR COLLECTION SHOWCASE */}
      <section className="cars-section" id="cars">
        <div className="section-top" style={{ flexWrap: "wrap", gap: "15px" }}>
          <div>
            <div className="section-label">THE RENDERR GARAGE</div>
            <h2>CHOOSE YOUR <span>BEAST</span> ({filteredCars.length})</h2>
          </div>

          {/* ADVANCED SORT & SEATS BAR */}
          <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Sort:</span>
              <select
                className="fleet-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated ★</option>
                <option value="hp">Max Horsepower ⚡</option>
              </select>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Seats:</span>
              <select
                className="fleet-sort-select"
                value={seatFilter}
                onChange={(e) => setSeatFilter(e.target.value)}
              >
                <option value="all">All Seating</option>
                <option value="2">2-Seater Supercars</option>
                <option value="4-5">4 & 5-Seater Coupes</option>
                <option value="7">7-Seater 4x4 SUVs</option>
              </select>
            </div>
          </div>
        </div>

        <div className="car-grid" id="carGrid">
          {filteredCars.length > 0 ? (
            filteredCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))
          ) : (
            <div style={{ textAlign: "center", gridColumn: "1/-1", padding: "40px" }}>
              <p style={{ color: "var(--text-secondary)", fontSize: "16px" }}>
                No vehicles found matching current criteria.
              </p>
              <button
                className="primary-btn"
                style={{ marginTop: "15px" }}
                onClick={() => {
                  setSelectedCategory("all");
                  setSeatFilter("all");
                  setSortBy("default");
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* THE RENDERR ADVANTAGE */}
      <section className="features-section">
        <div className="section-top">
          <div>
            <div className="section-label">UNRIVALED STANDARD</div>
            <h2>THE RENDERR <span>ADVANTAGE</span></h2>
          </div>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">🚀</div>
            <h3>Doorstep Delivery</h3>
            <p>Pristine, sanitized, full-tank supercar delivered directly to your airport terminal or residence in under 60 minutes.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">🛡️</div>
            <h3>Comprehensive Cover</h3>
            <p>100% bumper-to-bumper zero-deductible luxury insurance included with every rental for stress-free spirited driving.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">⚡</div>
            <h3>Zero Security Hold</h3>
            <p>Instant verification with fast refunds and zero arbitrary security deposit holds for verified corporate & club members.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">👨‍✈️</div>
            <h3>24/7 VIP Concierge</h3>
            <p>Dedicated track-side roadside assistance, private chauffeurs on demand, and seamless multi-city return hubs.</p>
          </div>
        </div>
      </section>

      {/* CINEMATIC VIDEO EXPERIENCE */}
      <section className="video-section" id="experience">
        <div className="section-label">EXPERIENCE THE MACHINE</div>
        <h2>FEEL THE <span>ROAR</span></h2>

        <div className="video-wrapper">
          <video
            ref={videoRef}
            id="carVideo"
            autoPlay
            muted
            loop
            playsInline
            controls
            poster="/pictures/poster of login page.png"
          >
            <source src="/pictures/videoplayback (3).webm" type="video/webm" />
            <source src="/pictures/videoplayback (3).webm" type="video/mp4" />
            Your browser does not support video playback.
          </video>

          <div className="video-gradient"></div>

          <div className="video-content">
            <div className="video-tag">⚡ CINEMATIC SHOWCASE</div>
            <h3>YOUR ROAD.<br />YOUR RULES.</h3>
            <button className="primary-btn" type="button" onClick={scrollToCars}>
              RESERVE YOUR DRIVE
              <span>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* LIMITED OFFERS & COUPONS */}
      <section className="deals" id="deals">
        <div className="deal-content">
          <div className="section-label">EXCLUSIVE VIP OFFER</div>
          <h2>UNLOCK <span>20% OFF</span> YOUR NEXT RIDE</h2>
          <p>
            Book for 3+ days and enjoy exclusive weekend rates across our entire performance and luxury supercar fleet. 
            Includes complimentary fuel voucher and priority hub delivery.
          </p>

          <div className="coupon-box">
            <span>CODE:</span>
            <strong className="coupon-code" id="couponCode">RENDERVIP20</strong>
            <button className="copy-btn" type="button" onClick={copyCoupon}>COPY CODE</button>
          </div>

          <button className="primary-btn" type="button" onClick={scrollToCars}>
            APPLY & BROWSE FLEET →
          </button>
        </div>

        <div className="deal-badge">
          20%
          <small>INSTANT DISCOUNT</small>
        </div>
      </section>

      {/* VERIFIED REVIEWS */}
      <section className="reviews-section">
        <div className="section-top">
          <div>
            <div className="section-label">CLIENT EXPERIENCES</div>
            <h2>WHAT DRIVERS <span>SAY</span></h2>
          </div>
        </div>

        <div className="reviews-grid">
          <div className="review-card">
            <div>
              <div className="review-stars">★★★★★</div>
              <p className="review-text">"Renting the Audi R8 for our anniversary trip to Hyderabad was seamless. The car was spotless, throttle response was ferocious, and the concierge dropped it right at the hotel porch."</p>
            </div>
            <div className="reviewer-meta">
              <div className="reviewer-avatar">RK</div>
              <div className="reviewer-info">
                <h4>Rohit K.</h4>
                <span>Rented Audi R8 V10</span>
              </div>
            </div>
          </div>

          <div className="review-card">
            <div>
              <div className="review-stars">★★★★★</div>
              <p className="review-text">"The BMW M4 Competition Coupe is an absolute beast! Seamless booking on RenderRCars, zero deposit friction, and exceptional customer service throughout our 4-day road trip."</p>
            </div>
            <div className="reviewer-meta">
              <div className="reviewer-avatar">AS</div>
              <div className="reviewer-info">
                <h4>Aditya Sharma</h4>
                <span>Rented BMW M4</span>
              </div>
            </div>
          </div>

          <div className="review-card">
            <div>
              <div className="review-stars">★★★★★</div>
              <p className="review-text">"Booked the Fortuner Legender for a 7-day family expedition. Impeccable condition, comfortable seating for 7, and smooth return at the Bangalore airport hub. 10/10 recommended!"</p>
            </div>
            <div className="reviewer-meta">
              <div className="reviewer-avatar">VS</div>
              <div className="reviewer-info">
                <h4>Vikram S.</h4>
                <span>Rented Toyota Fortuner</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section className="faq-section" id="faq">
        <div className="section-top" style={{ justifyContent: "center", textAlign: "center" }}>
          <div>
            <div className="section-label">COMMON INQUIRIES</div>
            <h2>FREQUENTLY ASKED <span>QUESTIONS</span></h2>
          </div>
        </div>

        <div className="faq-list">
          {faqData.map((item, idx) => {
            const isOpen = faqActive === idx;
            return (
              <div key={idx} className={`faq-item ${isOpen ? "active" : ""}`}>
                <button
                  className="faq-question"
                  type="button"
                  onClick={() => setFaqActive(isOpen ? -1 : idx)}
                >
                  <span>{item.q}</span>
                  <span className="faq-icon">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <div className="faq-answer">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
