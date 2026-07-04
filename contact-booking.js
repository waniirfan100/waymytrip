/*=========================================================
                WAYMYTRIP V2
            CONTACT FORM ENGINE
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

const contactForm = document.getElementById("contactForm");

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

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    sendContact();
});

/*=========================================================
            SEND CONTACT TO WHATSAPP
=========================================================*/

function sendContact() {
    // --- Get values ---
    const fullName = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value.trim();

    // --- Validation ---

    if (!fullName || !email || !mobile || !message) {
        showToast("⚠️ Please fill all required fields.");
        document.getElementById("fullname").focus();
        return;
    }

    if (mobile.length !== 10 || isNaN(mobile)) {
        showToast("⚠️ Please enter a valid 10-digit mobile number.");
        document.getElementById("mobile").focus();
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        showToast("⚠️ Please enter a valid email address.");
        document.getElementById("email").focus();
        return;
    }

    // --- Build WhatsApp message ---
    const contactMessage =
`📬 *NEW CONTACT ENQUIRY*

━━━━━━━━━━━━━━━━━━
👤 Name: ${fullName}
📧 Email: ${email}
📱 Mobile: ${mobile}
📌 Subject: ${subject}
━━━━━━━━━━━━━━━━━━
💬 Message:
${message}
━━━━━━━━━━━━━━━━━━
WayMyTrip Contact Form`;

    // --- Open WhatsApp ---
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(contactMessage)}`;

    const win = window.open(url, "_blank");

    if (!win || win.closed || typeof win.closed === "undefined") {
        showToast("⚠️ Pop‑up blocked! Please allow pop‑ups or click the link directly.");
        console.log("WhatsApp URL:", url);
    } else {
        showToast("✅ Redirecting to WhatsApp...");
    }

    // Optional: reset form after a delay
    // setTimeout(() => contactForm.reset(), 3000);
}