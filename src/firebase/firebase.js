import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDVZlGDF6A1y1XetjSiUqtE38eSTtpeBNg",
    authDomain: "fptshop-78b9f.firebaseapp.com",
    projectId: "fptshop-78b9f",
    storageBucket: "fptshop-78b9f.appspot.com",
    messagingSenderId: "365168783134",
    appId: "1:365168783134:web:447634232967263bcea30f",
    measurementId: "G-2E1GNK0MB6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };