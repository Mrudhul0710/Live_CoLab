// firebase-app.js

// Import required Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js'
import { getAuth } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js'
import { getFirestore, collection, addDoc, getDocs, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";


// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBFkgX_JuzuR6i0hQD2vYBzJax-earlEHA",
    authDomain: "colab-e2d0a.firebaseapp.com",
    projectId: "colab-e2d0a",
    storageBucket: "colab-e2d0a.firebasestorage.app",
    messagingSenderId: "463315556133",
    appId: "1:463315556133:web:bde9339f2bc6257ec7accc",
    measurementId: "G-G3GC0PG4NP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export auth to be used in other scripts
export { auth };
export { db }
