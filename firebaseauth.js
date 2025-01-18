import { auth } from "./firebase-app.js";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// Sign-Up Logic
document.getElementById("submitSignUp").addEventListener("click", async () => {
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        document.getElementById("signUpMessage").textContent = "Sign-up successful!";
    } catch (error) {
        document.getElementById("signUpMessage").textContent = error.message;
    }
});

// Login Logic
// Redirect to the Home Page after successful login
document.getElementById("submitSignIn").addEventListener("click", async () => {
    const email = document.getElementById("signin-email").value;
    const password = document.getElementById("signin-password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Redirect to the home page
        window.location.href = "home.html";
    } catch (error) {
        document.getElementById("signInMessage").textContent = error.message;
    }
});


// Toggle Between Login and Sign-Up
document.getElementById("goToSignIn").addEventListener("click", () => {
    document.getElementById("signup").style.display = "none";
    document.getElementById("signIn").style.display = "block";
});

document.getElementById("goToSignUp").addEventListener("click", () => {
    document.getElementById("signIn").style.display = "none";
    document.getElementById("signup").style.display = "block";
});
