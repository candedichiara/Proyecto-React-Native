import app from "firebase/app";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAJQcPGkGN7SjaljumxdfvFcqxmh4M_fgE",
  authDomain: "programacion-3--tt.firebaseapp.com",
  projectId: "programacion-3--tt",
  storageBucket: "programacion-3--tt.appspot.com",
  messagingSenderId: "795822975919",
  appId: "1:795822975919:web:18a40c70769adfc0e95d5a"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
