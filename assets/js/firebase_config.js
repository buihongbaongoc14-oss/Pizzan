// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCONsbaOs64BqBE3YKQWtTrMcTI5L18qtk",
  authDomain: "pizzan-2026.firebaseapp.com",
  projectId: "pizzan-2026",
  storageBucket: "pizzan-2026.firebasestorage.app",
  messagingSenderId: "167827496048",
  appId: "1:167827496048:web:ede6ec6fb2169f603e28b5",
  measurementId: "G-P47W6SN01S"
};

const app = initializeApp(firebaseConfig);
console.log(app.name);
export {app};
