import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyDymZ2S7OQ0VDCEa9urgmKsj2pklttulFY",
  authDomain: "todo-82f67.firebaseapp.com",
  projectId: "todo-82f67",
  storageBucket: "todo-82f67.appspot.com",
  messagingSenderId: "1022100651519",
  appId: "1:1022100651519:web:ce04532edf9a1e04c53bca"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)