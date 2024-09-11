import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, NextOrObserver, User } from "firebase/auth";
import { FirebaseClientAuth } from "./client-firebase";

export function onFirebaseAuthStateChanged(callback: NextOrObserver<User>) {
  return onAuthStateChanged(FirebaseClientAuth, callback);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(FirebaseClientAuth, provider);
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

export async function signOut() {
  try {
    return FirebaseClientAuth.signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}
