/*=========================================================
                WAYMYTRIP V2
            VISA BOOKING ENGINE
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

const bookingForm = document.getElementById("visaBookingForm");
const travelDateInput = document.getElementById("travelDate");

/*=========================================================
                TODAY DATE
=========================================================*/

const today = new Date().toISOString().split("T")[0];
travelDateInput.min = today;

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
    const visaType = document.getElementById("visaType").value;
    const country = document.getElementById("country").value.trim();
    const passport = document.getElementById("passport").value.trim();
    const nationality = document.getElementById("nationality").value.trim();
    const applicants = document.getElementById("applicants").value;
    const travelDate = travelDateInput.value;
    const request = document.getElementById("request").value.trim();

    // --- Validation ---


    // --- Build WhatsApp message ---
    const message =
`🛂 *NEW VISA ENQUIRY*


━━━━━━━━━━━━━━━━━━
📌 Visa Type: ${visaType}
📍 Country: ${country}
🆔 Passport: ${passport}
🌍 Nationality: ${nationality}
👥 Applicants: ${applicants}
📅 Travel Date: ${travelDate}
━━━━━━━━━━━━━━━━━━
📝 Special Request:
${request || "None"}
━━━━━━━━━━━━━━━━━━
WayMyTrip Visa Enquiry`;

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