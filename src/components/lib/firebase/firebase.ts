// Import the functions you need from the SDKs you need
import { deleteApp, getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage} from "firebase/storage";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
let process: any;

const ENVIROMENT = process?.env ? process.env : import.meta.env;

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const dgraph_config = ENVIROMENT.VITE_DGRAPH_ENDPOINT;
const firebaseConfig = {
  apiKey: ENVIROMENT.VITE_FIREBASE_APIKEY,
  authDomain: ENVIROMENT.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: ENVIROMENT.VITE_FIREBASE_PROJECT_ID,
  projectId: ENVIROMENT.VITE_FIREBASE_STORAGE_BUCKET,
  storageBucket: ENVIROMENT.VITE_FIREBASE_MESSAGING_SENDER_ID,
  messagingSenderId: ENVIROMENT.VITE_FIREBASE_APP_ID,
  appId: ENVIROMENT.VITE_FIREBASE_MEASUREMENT_ID,
  measurementId: ENVIROMENT.VITE_DGRAPH_ENDPOINT
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
export const realTimeDb = getDatabase(firebaseApp);