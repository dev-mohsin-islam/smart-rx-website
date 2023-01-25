// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCWlDdyHw48t0FKBchyI3YxNOHzuOZrJYE",
    authDomain: "doctor-portal-436a9.firebaseapp.com",
    projectId: "doctor-portal-436a9",
    storageBucket: "doctor-portal-436a9.appspot.com",
    messagingSenderId: "793246593140",
    appId: "1:793246593140:web:bb775f3fecbb955894e121"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;