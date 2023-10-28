import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyALMf-SdABbbwOTD2AbhfhjiPpnzzq83TE",
    authDomain: "saas-translator-8bb29.firebaseapp.com",
    projectId: "saas-translator-8bb29",
    storageBucket: "saas-translator-8bb29.appspot.com",
    messagingSenderId: "370213072359",
    appId: "1:370213072359:web:5f5d2d6a4efcdc6ae6e142"
  };

  const app = getApps().length ?  getApp() : initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const functions = getFunctions(app);

  export { db, auth, functions };