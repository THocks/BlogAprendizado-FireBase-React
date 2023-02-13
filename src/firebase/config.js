import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBaFycslRHrj69XfdwtHH8VweLZcxXPdIc",
  authDomain: "miniblogplantas.firebaseapp.com",
  projectId: "miniblogplantas",
  storageBucket: "miniblogplantas.appspot.com",
  messagingSenderId: "811611338653",
  appId: "1:811611338653:web:b203ea537bd4f66996a174",
};

const app = initializeApp(firebaseConfig);
// Importando fireStore
const db = getFirestore(app);

export { db };
