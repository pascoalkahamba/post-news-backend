import { envSchema } from "../schemas";

const env = envSchema.parse(process.env);

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: env.apiKey,
  authDomain: env.authDomain,
  projectId: env.projectId,
  storageBucket: env.storageBucket,
  messagingSenderId: env.messagingSenderId,
  appId: env.appId,
  measurementId: env.measurementId,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export { storage };
