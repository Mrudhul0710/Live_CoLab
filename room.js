import { auth, db } from "./firebase-app.js";
import {
    collection,
    onSnapshot,
    addDoc,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// Get room name from URL query parameters
const roomName = new URLSearchParams(window.location.search).get("name");

// Validate the room name
if (!roomName) {
    alert("Room name is missing or invalid. Redirecting to the home page.");
    window.location.href = "home.html";
}

// Display username and room name
auth.onAuthStateChanged(async (user) => {
    if (user) {
        document.getElementById("username").textContent = user.email;
        document.getElementById("roomName").textContent = roomName;
    } else {
        window.location.href = "index.html";
    }
});

// Chat functionality
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendMessageButton = document.getElementById("sendMessageButton");

// Send message
sendMessageButton.addEventListener("click", async () => {
    const message = chatInput.value.trim();
    console.log("User input:", message);

    if (message) {
        try {
            console.log("Sending message...");
            await addDoc(collection(db, "rooms", roomName, "messages"), {
                text: message,
                user: auth.currentUser.email,
                timestamp: new Date(),
            });
            chatInput.value = ""; // Clear input after sending
            console.log("Message sent successfully!");
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Failed to send the message. Please try again.");
        }
    } else {
        alert("Message cannot be empty!");
    }
});

// Real-time chat updates
onSnapshot(collection(db, "rooms", roomName, "messages"), (snapshot) => {
    chatMessages.innerHTML = ""; // Clear the chat display
    snapshot.forEach((doc) => {
        const message = doc.data();
        chatMessages.innerHTML += `
            <div class="chat-message">
                <strong>${message.user}:</strong> ${message.text}
            </div>`;
    });
}, (error) => {
    console.error("Error fetching chat messages:", error);
    alert("Failed to load chat messages. Please refresh the page.");
});

// Logout
document.getElementById("logoutButton").addEventListener("click", async () => {
    try {
        await auth.signOut();
        window.location.href = "index.html";
    } catch (error) {
        console.error("Error logging out:", error);
        alert("Failed to log out. Please try again.");
    }
});
