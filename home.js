// home.js
import { auth, db } from "./firebase-app.js";
import {
    collection,
    addDoc,
    query,
    where,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// Display username
auth.onAuthStateChanged(async (user) => {
    if (user) {
        document.getElementById("username").textContent = user.email;

        // Fetch and display previous sessions
        const userRooms = query(
            collection(db, "rooms"),
            where("members", "array-contains", user.uid)
        );
        onSnapshot(userRooms, (snapshot) => {
            const roomList = document.getElementById("roomList");
            roomList.innerHTML = "<h2>Previous Collaborative Sessions</h2>";
            snapshot.forEach((doc) => {
                const room = doc.data();
                const userRole = room.roles[user.uid] || "Visitor";
                roomList.innerHTML += `
                    <div class="room">
                        <span>${room.name}</span>
                        <span>${userRole}</span>
                    </div>`;
            });
        });
    } else {
        window.location.href = "index.html";
    }
});

// Create a new room
document.getElementById("createRoomButton").addEventListener("click", async () => {
    const roomName = prompt("Enter the name of the room:");
    if (roomName) {
        try {
            const user = auth.currentUser;
            const newRoom = {
                name: roomName,
                createdBy: user.uid,
                members: [user.uid],
                roles: { [user.uid]: "Admin" }
            };
            await addDoc(collection(db, "rooms"), newRoom);
            alert("Room created successfully!");
        } catch (error) {
            console.error("Error creating room:", error.message);
        }
    }
});

// Logout
document.getElementById("logoutButton").addEventListener("click", async () => {
    try {
        await auth.signOut();
        window.location.href = "index.html";
    } catch (error) {
        console.error("Error logging out:", error.message);
    }
});
roomList.addEventListener("click", (event) => {
    if (event.target.closest(".room")) {
        const roomName = event.target.closest(".room").querySelector("span").textContent;
        window.location.href = `room.html?name=${encodeURIComponent(roomName)}`;
    }
});
