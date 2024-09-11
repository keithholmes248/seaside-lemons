import { initializeApp, cert } from "firebase-admin/app";

const firebaseServiceAccountCredentials = require("../firebase-admin-key.json");

export function initFirebase() {
  initializeApp({
    credential: cert(firebaseServiceAccountCredentials),
  });
}
