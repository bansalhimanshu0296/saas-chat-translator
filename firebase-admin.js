import { initFirestore } from "@auth/firebase-adapter";
import admin from "firebase-admin";

let app;
let credential = admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY
});

if(!admin.apps.length){
    app = admin.initializeApp({
        credential: credential
    });
}

const adminDb = initFirestore({
    credential: credential
});

const adminAuth = admin.auth(app);

export { adminDb, adminAuth };