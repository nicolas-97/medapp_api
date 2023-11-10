// init firebase
import dotenv from "dotenv";
import { initializeApp, applicationDefault  } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage, ref } from "firebase-admin/storage";

dotenv.config();

const storage = getStorage();
const reference =  await ref(storage, "pills_and_caps.png")

initializeApp({
    credential: admin.credential.cert({
      "project_id": process.env.FIREBASE_PROJECT_ID,
      "private_key": process.env.FIREBASE_PRIVATE_KEY,
      "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    }),
    databaseURL: "https://my-firebase-app.firebaseio.com"
  })

const db = getFirestore();

export { db, reference };
