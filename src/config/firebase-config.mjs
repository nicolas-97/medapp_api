// init firebase
import dotenv from "dotenv";
import { initializeApp, applicationDefault  } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

dotenv.config();

initializeApp({
    credential: admin.credential.cert({
      "project_id": process.env.FIREBASE_PROJECT_ID,
      "private_key": process.env.FIREBASE_PRIVATE_KEY,
      "client_email": process.env.FIREBASE_CLIENT_EMAIL,
       "storageBucket": process.env.FIREBASE_PROJECT_ID+".appspot.com"
    }),
    databaseURL: "https://my-firebase-app.firebaseio.com"
  })


const storage = getStorage();
const reference = storage.bucket();

const db = getFirestore();

export { db, reference };
