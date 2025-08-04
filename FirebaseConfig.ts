import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getDatabase } from "firebase/database";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBZeLQhaVn13V7aRJRXzGp4fCO2utWE0o4",
  authDomain: "my-application-f122d.firebaseapp.com",
  databaseURL: "https://my-application-f122d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "my-application-f122d",
  storageBucket: "my-application-f122d.firebasestorage.app",
  messagingSenderId: "601220760885",
  appId: "1:601220760885:web:5de64c53ddedef62adb87c"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const user = auth.currentUser;

// Realtime DB
const database = getDatabase(app);

export { auth, database };

