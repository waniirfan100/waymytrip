/*=========================================================
                WAYMYTRIP V2
            FLIGHT BOOKING ENGINE
=========================================================*/

"use strict";

/*=========================================================
                CONFIGURATION
=========================================================*/

// Replace with your WhatsApp number (include country code, no +)
const WHATSAPP_NUMBER = "917006485461";

/*=========================================================
                SELECTORS
=========================================================*/

const bookingForm = document.getElementById("flightBookingForm");
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
        alert(message); // fallback
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
`✈️ *NEW FLIGHT BOOKING ENQUIRY*


🛫 From: ${from}
📍 Destination: ${to}
🧭 Trip: ${trip}
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
WayMyTrip Flight Enquiry`;

    // --- Open WhatsApp ---
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    // Open in new tab/window
    const win = window.open(url, "_blank");

    if (!win || win.closed || typeof win.closed === "undefined") {
        // Pop‑up blocked: offer fallback
        showToast("⚠️ Pop‑up blocked! Please allow pop‑ups or click the link directly.");
        // Optionally copy to clipboard or show a direct link
        console.log("WhatsApp URL:", url);
        // You could display a clickable link as a fallback
    } else {
        showToast("✅ Redirecting to WhatsApp...");
    }

    // --- Reset form (optional) ---
    // bookingForm.reset();
    // returnInput.disabled = true;
}