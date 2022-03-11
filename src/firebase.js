// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const provider = new GoogleAuthProvider();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYesYx12f_JjbLe1TjWUW7Y109hX-VlRQ",
  authDomain: "jwnbt-a35bc.firebaseapp.com",
  projectId: "jwnbt-a35bc",
  storageBucket: "jwnbt-a35bc.appspot.com",
  messagingSenderId: "924644212720",
  appId: "1:924644212720:web:f894d10bf4f66f0e45e735"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
console.log(auth);

// const querySnapshot = await getDocs(collection(db, "goals"));
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// });
