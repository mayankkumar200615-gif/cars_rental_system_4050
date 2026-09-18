/* =========================================================
   RENDER R CARS - JAVASCRIPT
   Search • Select • Login • Rental
========================================================= */


/* =========================================================
   GLOBAL VARIABLES
========================================================= */

let selectedCarName = "";
let selectedCarPrice = 0;


/* =========================================================
   PAGE LOAD
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    setMinimumDates();

    setupSearch();

    setupRentalDays();

    setupModalControls();

    checkLogin();

});


/* =========================================================
   SMOOTH SCROLL TO CARS
========================================================= */

function scrollToCars() {

    const cars = document.getElementById("cars");

    if (!cars) return;

    cars.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =========================================================
   SEARCH SETUP
========================================================= */

function setupSearch() {

    const searchInput =
        document.getElementById("searchInput");

    if (!searchInput) return;


    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                searchCars();

            }

        }
    );

}


/* =========================================================
   SEARCH CARS
========================================================= */

function searchCars() {

    const input =
        document.getElementById("searchInput");

    if (!input) return;


    const searchText =
        input.value.trim().toLowerCase();


    const cards =
        document.querySelectorAll(".car-card");


    if (searchText === "") {

        showAllCars();

        return;

    }


    let found = false;


    cards.forEach(function (card) {

        const name =
            card.dataset.name.toLowerCase();

        const category =
            card.dataset.category.toLowerCase();


        if (
            name.includes(searchText) ||
            category.includes(searchText)
        ) {

            card.style.display = "";

            found = true;

        } else {

            card.style.display = "none";

        }

    });


    scrollToCars();


    if (found) {

        showToast(
            "Cars found for: " + input.value
        );

    } else {

        showToast(
            "No cars found for: " + input.value
        );

    }

}


/* =========================================================
   SHOW ALL CARS
========================================================= */

function showAllCars() {

    const cards =
        document.querySelectorAll(".car-card");


    cards.forEach(function (card) {

        card.style.display = "";

    });


    const searchInput =
        document.getElementById("searchInput");


    if (searchInput) {

        searchInput.value = "";

    }

}


/* =========================================================
   CATEGORY FILTER
========================================================= */

function filterCategory(category) {

    const cards =
        document.querySelectorAll(".car-card");


    let found = false;


    cards.forEach(function (card) {

        const cardCategory =
            card.dataset.category;


        if (cardCategory === category) {

            card.style.display = "";

            found = true;

        } else {

            card.style.display = "none";

        }

    });


    scrollToCars();


    if (found) {

        showToast(
            category.toUpperCase() +
            " cars selected"
        );

    }

}


/* =========================================================
   LOCATION SELECT
========================================================= */

const locationSelect =
    document.getElementById("location");


if (locationSelect) {

    locationSelect.addEventListener(
        "change",
        function () {

            const location =
                this.value;


            showToast(
                "Location selected: " +
                location
            );

        }
    );

}


/* =========================================================
   PICKUP DATE
========================================================= */

const pickupDate =
    document.getElementById("pickupDate");


const returnDate =
    document.getElementById("returnDate");


if (pickupDate) {

    pickupDate.addEventListener(
        "change",
        function () {

            if (returnDate) {

                returnDate.min =
                    this.value;

            }

        }
    );

}


/* =========================================================
   RENTAL SEARCH
========================================================= */

const rentalSearchButton =
    document.querySelector(
        ".search-rent-btn"
    );


if (rentalSearchButton) {

    rentalSearchButton.addEventListener(
        "click",
        function () {

            validateRentalSearch();

        }
    );

}


/* =========================================================
   VALIDATE RENTAL SEARCH
========================================================= */

function validateRentalSearch() {

    const location =
        document.getElementById(
            "location"
        );


    const pickup =
        document.getElementById(
            "pickupDate"
        );


    const returnDate =
        document.getElementById(
            "returnDate"
        );


    if (!location || !pickup || !returnDate) {

        scrollToCars();

        return;

    }


    if (!pickup.value) {

        showToast(
            "Please select pickup date"
        );

        pickup.focus();

        return;

    }


    if (!returnDate.value) {

        showToast(
            "Please select return date"
        );

        returnDate.focus();

        return;

    }


    if (
        new Date(returnDate.value) <
        new Date(pickup.value)
    ) {

        showToast(
            "Return date must be after pickup date"
        );

        return;

    }


    showToast(
        "Searching cars in " +
        location.value
    );


    setTimeout(function () {

        scrollToCars();

    }, 500);

}


/* =========================================================
   SET MINIMUM DATES
========================================================= */

function setMinimumDates() {

    const today =
        new Date()
            .toISOString()
            .split("T")[0];


    const pickup =
        document.getElementById(
            "pickupDate"
        );


    const returnDate =
        document.getElementById(
            "returnDate"
        );


    const modalDate =
        document.getElementById(
            "modalDate"
        );


    if (pickup) {

        pickup.min = today;

    }


    if (returnDate) {

        returnDate.min = today;

    }


    if (modalDate) {

        modalDate.min = today;

    }

}


/* =========================================================
   RENT CAR
========================================================= */

function rentCar(name, price) {

    selectedCarName = name;

    selectedCarPrice = Number(price);


    const selectedCar =
        document.getElementById(
            "selectedCar"
        );


    const selectedPrice =
        document.getElementById(
            "selectedPrice"
        );


    const rentalDays =
        document.getElementById(
            "rentalDays"
        );


    const modalDate =
        document.getElementById(
            "modalDate"
        );


    if (selectedCar) {

        selectedCar.textContent =
            selectedCarName;

    }


    if (selectedPrice) {

        selectedPrice.textContent =
            "₹" +
            selectedCarPrice.toLocaleString(
                "en-IN"
            );

    }


    if (rentalDays) {

        rentalDays.value = 1;

    }


    if (modalDate) {

        modalDate.value = "";

    }


    updateTotal();


    const modal =
        document.getElementById(
            "rentModal"
        );


    if (modal) {

        modal.classList.add("active");

    }

}


/* =========================================================
   CLOSE RENTAL MODAL
========================================================= */

function closeModal() {

    const modal =
        document.getElementById(
            "rentModal"
        );


    if (modal) {

        modal.classList.remove("active");

    }

}


/* =========================================================
   RENTAL DAYS
========================================================= */

function setupRentalDays() {

    const days =
        document.getElementById(
            "rentalDays"
        );


    if (!days) return;


    days.addEventListener(
        "input",
        updateTotal
    );

}


/* =========================================================
   UPDATE TOTAL PRICE
========================================================= */

function updateTotal() {

    const daysInput =
        document.getElementById(
            "rentalDays"
        );


    const totalElement =
        document.getElementById(
            "totalPrice"
        );


    if (!daysInput || !totalElement) {

        return;

    }


    let days =
        Number(daysInput.value);


    if (days < 1 || isNaN(days)) {

        days = 1;

    }


    if (days > 30) {

        days = 30;

        daysInput.value = 30;

    }


    const total =
        selectedCarPrice * days;


    totalElement.textContent =
        "₹" +
        total.toLocaleString("en-IN");

}


/* =========================================================
   CONFIRM RENTAL
========================================================= */

function confirmRental() {

    const date =
        document.getElementById(
            "modalDate"
        );


    const daysInput =
        document.getElementById(
            "rentalDays"
        );


    if (!date || !daysInput) {

        return;

    }


    if (!date.value) {

        showToast(
            "Please select pickup date"
        );

        date.focus();

        return;

    }


    const days =
        Number(daysInput.value);


    if (
        isNaN(days) ||
        days < 1
    ) {

        showToast(
            "Please enter valid rental days"
        );

        daysInput.focus();

        return;

    }


    const total =
        selectedCarPrice * days;


    const formattedTotal =
        total.toLocaleString(
            "en-IN"
        );


    closeModal();


    showToast(
        selectedCarName +
        " reserved successfully! Total ₹" +
        formattedTotal
    );

}


/* =========================================================
   MODAL CONTROLS
========================================================= */

function setupModalControls() {

    const rentModal =
        document.getElementById(
            "rentModal"
        );


    const loginModal =
        document.getElementById(
            "loginModal"
        );


    if (rentModal) {

        rentModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    rentModal
                ) {

                    closeModal();

                }

            }
        );

    }


    if (loginModal) {

        loginModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    loginModal
                ) {

                    closeLogin();

                }

            }
        );

    }

}


/* =========================================================
   LOGIN
========================================================= */

function openLogin() {

    const modal =
        document.getElementById(
            "loginModal"
        );


    if (!modal) return;


    modal.classList.add("active");


    const email =
        document.getElementById(
            "email"
        );


    if (email) {

        setTimeout(function () {

            email.focus();

        }, 100);

    }

}


/* =========================================================
   CLOSE LOGIN
========================================================= */

function closeLogin() {

    const modal =
        document.getElementById(
            "loginModal"
        );


    if (modal) {

        modal.classList.remove(
            "active"
        );

    }

}


/* =========================================================
   LOGIN USER
========================================================= */

function loginUser() {

    const email =
        document.getElementById(
            "email"
        );


    const password =
        document.getElementById(
            "password"
        );


    if (!email || !password) {

        return;

    }


    const emailValue =
        email.value.trim();


    const passwordValue =
        password.value.trim();


    if (!emailValue) {

        showToast(
            "Please enter your email"
        );

        email.focus();

        return;

    }


    if (!isValidEmail(emailValue)) {

        showToast(
            "Please enter a valid email"
        );

        email.focus();

        return;

    }


    if (!passwordValue) {

        showToast(
            "Please enter your password"
        );

        password.focus();

        return;

    }


    if (passwordValue.length < 6) {

        showToast(
            "Password must contain 6 characters"
        );

        password.focus();

        return;

    }


    /* -----------------------------------------------------
       DEMO LOGIN
       This stores only the email locally.
       It is NOT real authentication.
    ------------------------------------------------------ */

    localStorage.setItem(
        "renderUser",
        emailValue
    );


    closeLogin();


    showToast(
        "Welcome to RenderRCars!"
    );


    updateLoginButton();

}


/* =========================================================
   EMAIL VALIDATION
========================================================= */

function isValidEmail(email) {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    return pattern.test(email);

}


/* =========================================================
   CHECK LOGIN
========================================================= */

function checkLogin() {

    const user =
        localStorage.getItem(
            "renderUser"
        );


    if (user) {

        updateLoginButton();

    }

}


/* =========================================================
   UPDATE LOGIN BUTTON
========================================================= */

function updateLoginButton() {

    const button =
        document.querySelector(
            ".login-button"
        );


    if (!button) return;


    const user =
        localStorage.getItem(
            "renderUser"
        );


    if (user) {

        button.textContent =
            "ACCOUNT";

        button.onclick =
            showAccount;

    } else {

        button.textContent =
            "LOGIN";

        button.onclick =
            openLogin;

    }

}


/* =========================================================
   ACCOUNT MESSAGE
========================================================= */

function showAccount() {

    const user =
        localStorage.getItem(
            "renderUser"
        );


    if (!user) {

        openLogin();

        return;

    }


    const choice =
        confirm(
            "Logged in as:\n" +
            user +
            "\n\nPress OK to logout."
        );


    if (choice) {

        logoutUser();

    }

}


/* =========================================================
   LOGOUT
========================================================= */

function logoutUser() {

    localStorage.removeItem(
        "renderUser"
    );


    updateLoginButton();


    showToast(
        "You have been logged out"
    );

}


/* =========================================================
   WATCH EXPERIENCE
========================================================= */

function playExperience() {

    const video =
        document.getElementById(
            "carVideo"
        );


    if (!video) {

        showToast(
            "Experience video not found"
        );

        return;

    }


    video.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });


    video.play();


}


/* =========================================================
   TOAST MESSAGE
========================================================= */

let toastTimer;


function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    const toastMessage =
        document.getElementById(
            "toastMessage"
        );


    if (!toast || !toastMessage) {

        alert(message);

        return;

    }


    toastMessage.textContent =
        message;


    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(function () {

            toast.classList.remove(
                "show"
            );

        }, 3000);

}


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key !== "Escape") {

            return;

        }


        closeModal();

        closeLogin();

    }
);


/* =========================================================
   NAVIGATION ACTIVE STATE
========================================================= */

const navItems =
    document.querySelectorAll(
        ".nav-item"
    );


navItems.forEach(function (item) {

    item.addEventListener(
        "click",
        function () {

            navItems.forEach(
                function (nav) {

                    nav.classList.remove(
                        "active"
                    );

                }
            );


            item.classList.add(
                "active"
            );

        }
    );

});


/* =========================================================
   CONSOLE MESSAGE
========================================================= */

console.log(
    "RenderRCars JavaScript loaded successfully 🚗"
);