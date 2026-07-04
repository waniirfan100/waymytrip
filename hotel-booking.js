/*=========================================================
                WAYMYTRIP V2
            HOTEL BOOKING ENGINE
=========================================================*/

"use strict";

/*=========================================================
                CONFIGURATION
=========================================================*/

// Replace with your WhatsApp number (include country code, no +)
const WHATSAPP_NUMBER = "917006905126";

/*=========================================================
                SELECTORS
=========================================================*/

const bookingForm = document.getElementById("hotelBookingForm");
const checkinInput = document.getElementById("checkin");
const checkoutInput = document.getElementById("checkout");

/*=========================================================
                TODAY DATE
=========================================================*/

const today = new Date().toISOString().split("T")[0];
checkinInput.min = today;
checkoutInput.min = today;

// Auto-set checkout to +1 day when checkin changes
checkinInput.addEventListener("change", function() {
    if (this.value) {
        const nextDay = new Date(this.value);
        nextDay.setDate(nextDay.getDate() + 1);
        const nextDayStr = nextDay.toISOString().split("T")[0];
        checkoutInput.min = nextDayStr;
        if (!checkoutInput.value || checkoutInput.value < nextDayStr) {
            checkoutInput.value = nextDayStr;
        }
    }
});

/*=========================================================
            GLOBAL TOAST FUNCTION
=========================================================*/

function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) {
        alert(message);
        return;
    }
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
        toast.classList.remove("show");
    }, 4000);
}

/*=========================================================
            FORM SUBMISSION
=========================================================*/

bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();
    sendBooking();
});

/*=========================================================
            SEND BOOKING TO WHATSAPP
=========================================================*/

function sendBooking() {
    // --- Get values ---
    const city = document.getElementById("city").value.trim();
    const checkin = checkinInput.value;
    const checkout = checkoutInput.value;
    const adults = document.getElementById("adults").value;
    const children = document.getElementById("children").value;
    const rooms = document.getElementById("rooms").value;
    const request = document.getElementById("request").value.trim();

    // --- Validation ---

   
    if (checkin >= checkout) {
        showToast("⚠️ Check-out date must be after check-in date.");
        document.getElementById("checkout").focus();
        return;
    }

    // --- Build WhatsApp message ---
    const message =
`🏨 *NEW HOTEL BOOKING ENQUIRY*

━━━━━━━━━━━━━━━━━━
📍 Destination: ${city}
📅 Check-in: ${checkin}
📅 Check-out: ${checkout}
━━━━━━━━━━━━━━━━━━
👨 Adults: ${adults}
🧒 Children: ${children}
🛏 Rooms: ${rooms}
━━━━━━━━━━━━━━━━━━
📝 Special Request:
${request || "None"}
━━━━━━━━━━━━━━━━━━
WayMyTrip Hotel Enquiry`;

    // --- Open WhatsApp ---
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    const win = window.open(url, "_blank");

    if (!win || win.closed || typeof win.closed === "undefined") {
        showToast("⚠️ Pop‑up blocked! Please allow pop‑ups or click the link directly.");
        console.log("WhatsApp URL:", url);
    } else {
        showToast("✅ Redirecting to WhatsApp...");
    }

    // Optional: reset form after a delay
    // setTimeout(() => bookingForm.reset(), 3000);
}