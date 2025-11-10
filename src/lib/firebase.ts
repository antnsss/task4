
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhHdtinuDaWaMimDoCPL7Cat-PyG4pugI",
  authDomain: "chat-e608a.firebaseapp.com",
  projectId: "chat-e608a",
  storageBucket: "chat-e608a.appspot.com",
  messagingSenderId: "415123001656",
  appId: "1:415123001656:web:1ccb07bef6084c18bd71cd"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export default app;
