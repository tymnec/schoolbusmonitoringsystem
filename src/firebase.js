// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQA0oZcrt86qCzNZlp0pEEiwkAftvOeZE",
  authDomain: "school-bus-monitoring-sy-ab5a1.firebaseapp.com",
  projectId: "school-bus-monitoring-sy-ab5a1",
  storageBucket: "school-bus-monitoring-sy-ab5a1.appspot.com",
  messagingSenderId: "591896281540",
  appId: "1:591896281540:web:93c8dd817fc1f650f3e491",
  measurementId: "G-Q6KE1BZ0LB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();

export { app, analytics, auth, db };
