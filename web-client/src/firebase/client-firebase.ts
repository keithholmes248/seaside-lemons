"use client";

import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import FirebaseConfig from "./firebase-config";

const hasInitializedFirebaseApp = getApps().length !== 0;

console.log("FirebaseConfig", FirebaseConfig);

export const FirebaseClientApp = hasInitializedFirebaseApp ? getApps()[0] : initializeApp(FirebaseConfig);
export const FirebaseClientAuth = getAuth(FirebaseClientApp);

console.log("CurrentUser:", FirebaseClientAuth?.currentUser);
