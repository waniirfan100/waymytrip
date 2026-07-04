/*=========================================================
                WAYMYTRIP V2
            TOUR BOOKING ENGINE
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

const bookingForm = document.getElementById("tourBookingForm");
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");

/*=========================================================
                TODAY DATE
=========================================================*/

const today = new Date().toISOString().split("T")[0];
startDateInput.min = today;
endDateInput.min = today;

// Auto-set end date to +1 day when start date changes
startDateInput.addEventListener("change", function() {
    if (this.value) {
        const nextDay = new Date(this.value);
        nextDay.setDate(nextDay.getDate() + 1);
        const nextDayStr = nextDay.toISOString().split("T")[0];
        endDateInput.min = nextDayStr;
        if (!endDateInput.value || endDateInput.value < nextDayStr) {
            endDateInput.value = nextDayStr;
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
    const tourType = document.getElementById("tourType").value;
    const destination = document.getElementById("destination").value.trim();
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
    const adults = document.getElementById("adults").value;
    const children = document.getElementById("children").value;
    const infants = document.getElementById("infants").value;
    const request = document.getElementById("request").value.trim();

    // --- Validation ---


    if (endDate && startDate >= endDate) {
        showToast("⚠️ End date must be after start date.");
        document.getElementById("endDate").focus();
        return;
    }

    // --- Build WhatsApp message ---
    const message =
`🌍 *NEW TOUR BOOKING ENQUIRY*


━━━━━━━━━━━━━━━━━━
📌 Tour Type: ${tourType}
📍 Destination: ${destination}
📅 Start Date: ${startDate}
📅 End Date: ${endDate || "N/A"}
━━━━━━━━━━━━━━━━━━
👨 Adults: ${adults}
🧒 Children: ${children}
👶 Infants: ${infants}
━━━━━━━━━━━━━━━━━━
📝 Special Request:
${request || "None"}
━━━━━━━━━━━━━━━━━━
WayMyTrip Tour Enquiry`;

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