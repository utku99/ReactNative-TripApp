// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD5Lm1s1vO3oNM-RiFYdfDSpweydxH-nDw",
    authDomain: "react-native-d9632.firebaseapp.com",
    projectId: "react-native-d9632",
    storageBucket: "react-native-d9632.appspot.com",
    messagingSenderId: "592246650707",
    appId: "1:592246650707:web:b166617136e5111123d3a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)

export const tripsRef = collection(db, "trips")
export const expensesRef = collection(db, "expenses")

export default app