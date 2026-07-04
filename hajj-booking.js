/*=========================================================
                WAYMYTRIP V2
        HAJJ & UMRAH BOOKING ENGINE
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

const bookingForm = document.getElementById("hajjUmrahBookingForm");
const departureInput = document.getElementById("departure");
const returnInput = document.getElementById("returnDate");

/*=========================================================
                TODAY DATE
=========================================================*/

const today = new Date().toISOString().split("T")[0];
departureInput.min = today;
returnInput.min = today;

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
    const serviceType = document.querySelector('input[name="serviceType"]:checked').value;
    const packageType = document.getElementById("packageType").value;
    const departure = departureInput.value;
    const returning = returnInput.value;
    const adults = document.getElementById("adults").value;
    const children = document.getElementById("children").value;
    const infants = document.getElementById("infants").value;
    const request = document.getElementById("request").value.trim();

    // --- Validation ---

    

    // --- Build WhatsApp message ---
    const message =
`🕋 *NEW ${serviceType.toUpperCase()} BOOKING ENQUIRY*


━━━━━━━━━━━━━━━━━━
📦 Service: ${serviceType}
📦 Package: ${packageType}
📅 Departure: ${departure}
📅 Return: ${returning || "N/A"}
━━━━━━━━━━━━━━━━━━
👨 Adults: ${adults}
🧒 Children: ${children}
👶 Infants: ${infants}
━━━━━━━━━━━━━━━━━━
📝 Special Request:
${request || "None"}
━━━━━━━━━━━━━━━━━━
WayMyTrip Hajj & Umrah Enquiry`;

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