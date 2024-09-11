import { Timestamp } from "firebase-admin/firestore";
import { getFirestoreDb } from "../init-firestore";

export interface ConstituentContactFirebaseDocument {
  firebaseUserId: string;
  createdAt: Timestamp;

  email: string;
  familyName: string;
  givenName: string;
  fullName: string;
  initials: string;
}

let FirestoreDb: FirebaseFirestore.Firestore | undefined = undefined;

const ConstituentContactCollectionName = "constituent-contacts";
let ConstituentContactCollectionRef: FirebaseFirestore.CollectionReference<ConstituentContactFirebaseDocument>;

export function getConstituentContactCollectionRef(): FirebaseFirestore.CollectionReference<
  ConstituentContactFirebaseDocument,
  FirebaseFirestore.DocumentData
> {
  if (!FirestoreDb) {
    FirestoreDb = getFirestoreDb();

    ConstituentContactCollectionRef = FirestoreDb.collection(
      ConstituentContactCollectionName
    ) as FirebaseFirestore.CollectionReference<ConstituentContactFirebaseDocument>;
  }

  return ConstituentContactCollectionRef;
}
