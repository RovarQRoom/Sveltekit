// Import the functions you need from the SDKs you need
import { deleteApp, getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYbRRnPqyt29FIg87bz8zjDIsx3VbKOjo",
  authDomain: "online-shopping-f5190.firebaseapp.com",
  databaseURL: "https://online-shopping-f5190-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "online-shopping-f5190",
  storageBucket: "online-shopping-f5190.appspot.com",
  messagingSenderId: "655726050512",
  appId: "1:655726050512:web:db31effb905678296732d5",
  measurementId: "G-4J3XME2BZF"
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
export const storage = getStorage(firebaseApp);