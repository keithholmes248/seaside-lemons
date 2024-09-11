import "server-only";

import { headers } from "next/headers";
import { FirebaseServerApp, FirebaseServerAppSettings, initializeServerApp } from "firebase/app";
import { getAuth, User as FirebaseUser } from "firebase/auth";
import FirebaseConfig from "./firebase-config";

export interface AuthenticatedFirebaseAppAndUser {
  firebaseServerApp: FirebaseServerApp;
  currentUser: FirebaseUser | null;
}

export async function getAuthenticatedFirebaseAppForUser(): Promise<AuthenticatedFirebaseAppAndUser> {
  const firebaseServerAppSettings: FirebaseServerAppSettings = {};

  const idTokenString = headers().get("Authorization")?.split("Bearer ")[1];
  if (idTokenString) {
    firebaseServerAppSettings.authIdToken = idTokenString;
  }

  const firebaseServerApp = initializeServerApp(FirebaseConfig, firebaseServerAppSettings);

  const auth = getAuth(firebaseServerApp);
  await auth.authStateReady();

  return { firebaseServerApp, currentUser: auth.currentUser };
}
