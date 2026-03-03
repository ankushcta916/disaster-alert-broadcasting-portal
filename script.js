const BASE_URL = "YOUR_API_GATEWAY_URL";

const ADMIN_PASSWORD = "admin123";  

function login() {
    const enteredPassword = document.getElementById("adminPassword").value;

    if (enteredPassword === ADMIN_PASSWORD) {
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("alertSection").style.display = "block";
    } else {
        document.getElementById("loginError").innerText = "Incorrect password";
    }
}

async function sendAlert() {
    const message = document.getElementById("alertMessage").value;

    if (!message) {
        showPopup("⚠ Please enter an alert message", "#ff9800");
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/send-alert`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });

        const data = await response.json();

        showPopup("Alert sent successfully!", "#4CAF50");

        document.getElementById("alertMessage").value = "";

    } catch (error) {
        showPopup("Failed to send alert", "#f44336");
    }
}

function showPopup(text, color) {
    const popup = document.getElementById("popup");
    popup.innerText = text;
    popup.style.backgroundColor = color;
    popup.style.display = "block";

    setTimeout(() => {
        popup.style.display = "none";
    }, 3000);
}