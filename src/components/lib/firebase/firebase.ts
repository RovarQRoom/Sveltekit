// Import the functions you need from the SDKs you need
import { deleteApp, getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUOeZTSqNIXYSD9c975zKyAzGXRgIFUoA",
  authDomain: "online-shopping-995e6.firebaseapp.com",
  projectId: "online-shopping-995e6",
  storageBucket: "online-shopping-995e6.appspot.com",
  messagingSenderId: "529263171472",
  appId: "1:529263171472:web:cd42991cd021ab32edc515",
  measurementId: "G-MJW8RMBMJD"
};

// Initialize Firebase
let firebaseApp;
if(!getApps().length){
    firebaseApp = initializeApp(firebaseConfig);
}else{
    firebaseApp = getApp();
    deleteApp(firebaseApp);
    firebaseApp = initializeApp(firebaseConfig);
}

export const database = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);