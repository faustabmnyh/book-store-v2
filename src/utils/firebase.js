import firebase from "firebase/";

const firebaseConfig = {
  apiKey: "AIzaSyDg9qF8qp0RgF8oi4MN0zozeSs_3zMEjO4",
  authDomain: "my-eccomerce-v2.firebaseapp.com",
  projectId: "my-eccomerce-v2",
  storageBucket: "my-eccomerce-v2.appspot.com",
  messagingSenderId: "72354946536",
  appId: "1:72354946536:web:abd1f722aff2b472ed185d",
  measurementId: "G-MBPXDBXHFG",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.database();
export const auth = firebase.auth();
