import firebase from "firebase";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAP3zmJDsqEP9qWwCRBg8YrRviIH-MXeN8",
    authDomain: "e-clone-80e95.firebaseapp.com",
    projectId: "e-clone-80e95",
    storageBucket: "e-clone-80e95.appspot.com",
    messagingSenderId: "636323276851",
    appId: "1:636323276851:web:1eb889b254535ada685b46",
    measurementId: "G-T8L970HHRX"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };