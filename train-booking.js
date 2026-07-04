/*=========================================================
                WAYMYTRIP V2
            TRAIN BOOKING ENGINE
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

const bookingForm = document.getElementById("trainBookingForm");
const departureInput = document.getElementById("departure");
const returnInput = document.getElementById("returnDate");
const tripRadios = document.querySelectorAll('input[name="tripType"]');

/*=========================================================
                TODAY DATE
=========================================================*/

const today = new Date().toISOString().split("T")[0];
departureInput.min = today;
returnInput.min = today;

/*=========================================================
            TRIP TYPE TOGGLE
=========================================================*/

tripRadios.forEach(radio => {
    radio.addEventListener("change", () => {
        if (radio.value === "One Way" && radio.checked) {
            returnInput.disabled = true;
            returnInput.value = "";
        } else {
            returnInput.disabled = false;
        }
    });
});
returnInput.disabled = true; // default

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
    const from = document.getElementById("fromCity").value.trim();
    const to = document.getElementById("toCity").value.trim();
    const departure = departureInput.value;
    const returning = returnInput.value;
    const classType = document.getElementById("classType").value;
    const adults = document.getElementById("adults").value;
    const children = document.getElementById("children").value;
    const infants = document.getElementById("infants").value;
    const request = document.getElementById("request").value.trim();
    const trip = document.querySelector('input[name="tripType"]:checked').value;

    // --- Validation ---


    if (trip === "Round Trip" && !returning) {
        showToast("⚠️ Please select a return date for Round Trip.");
        document.getElementById("returnDate").focus();
        return;
    }

    // --- Build WhatsApp message ---
    const message =
`🚆 *NEW TRAIN BOOKING ENQUIRY*

━━━━━━━━━━━━━━━━━━
🛤 From: ${from}
📍 To: ${to}
🧭 Trip: ${trip}
📅 Departure: ${departure}
📅 Return: ${returning || "N/A"}
━━━━━━━━━━━━━━━━━━
💺 Class: ${classType}
👨 Adults: ${adults}
🧒 Children: ${children}
👶 Infants: ${infants}
━━━━━━━━━━━━━━━━━━
📝 Special Request:
${request || "None"}
━━━━━━━━━━━━━━━━━━
WayMyTrip Train Enquiry`;

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