import { EnvironmentalVariables } from "@/environmental-variables";

const FirebaseConfig = {
  apiKey: EnvironmentalVariables.FIREBASE_API_KEY,
  authDomain: EnvironmentalVariables.FIREBASE_AUTH_DOMAIN,
  projectId: EnvironmentalVariables.FIREBASE_PROJECT_ID,
  storageBucket: EnvironmentalVariables.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: EnvironmentalVariables.FIREBASE_MESSAGING_SENDER_ID,
  appId: EnvironmentalVariables.FIREBASE_APP_ID,
};
Object.freeze(FirebaseConfig);

export default FirebaseConfig;
