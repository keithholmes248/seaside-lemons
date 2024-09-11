import { getFirestore } from "firebase-admin/firestore";

let FirestoreDb: FirebaseFirestore.Firestore | undefined;

export function getFirestoreDb(): FirebaseFirestore.Firestore {
  if (!FirestoreDb) {
    FirestoreDb = getFirestore();
  }

  return FirestoreDb;
}
