// scripts/firebase-config.js:

// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAHOSjv-XCmq9A54HMs1e0f78WkqswwpBI",
    authDomain: "ariane-e34cf.firebaseapp.com",
    projectId: "ariane-e34cf",
    storageBucket: "ariane-e34cf.firebasestorage.app",
    messagingSenderId: "127746485352",
    appId: "1:127746485352:web:42cb9b5a00636e50255fdd",
    measurementId: "G-QWNL5MRVK4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize services
const auth = firebase.auth();
const db = firebase.firestore();

