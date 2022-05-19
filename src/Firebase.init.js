import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDTBeuNiZiUdP1X14AGarVckC0YQa3VRn8",
  authDomain: "todo-6a543.firebaseapp.com",
  projectId: "todo-6a543",
  storageBucket: "todo-6a543.appspot.com",
  messagingSenderId: "725360345076",
  appId: "1:725360345076:web:06b1a42b47ce523d2103a1",
  measurementId: "G-0WNC1HDX20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export default auth;