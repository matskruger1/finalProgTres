import app from 'firebase/app';
import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAoqjIyusoX_Nn6Z2_2059pqpj2-2F5x-E",
    authDomain: "finalprogatres.firebaseapp.com",
    projectId: "finalprogatres",
    storageBucket: "finalprogatres.appspot.com",
    messagingSenderId: "1087558747686",
    appId: "1:1087558747686:web:7cc3d7c8c46d4c903b48e7",
    measurementId: "G-5WL7EWJHS7"
  };  

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = firebase.storage();
export const db = app.firestore();