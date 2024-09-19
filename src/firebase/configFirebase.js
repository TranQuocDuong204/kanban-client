import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBNn90HbXQPIyEbNzGCwrlyL46kFmbIxbo",
  authDomain: "kanban-68886.firebaseapp.com",
  projectId: "kanban-68886",
  storageBucket: "kanban-68886.appspot.com",
  messagingSenderId: "660315969443",
  appId: "1:660315969443:web:4b144f4762b35ea0672c16",
  // measurementId: "G-HK2QD704WP"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const storage = getStorage()
export default auth