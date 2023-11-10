// init firebase
import dotenv from "dotenv";
import { initializeApp, applicationDefault  } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage, ref } from "firebase-admin/storage";

dotenv.config();

const storage = getStorage();
const reference =  await ref(storage, "pills_and_caps.png")

initializeApp({
    credential: applicationDefault()
})

const db = getFirestore();

export { db, reference };
