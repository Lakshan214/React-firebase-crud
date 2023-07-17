import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDLbAWn_FxG51I7-kOrxuJK5tWUDayddCI",
    authDomain: "react-contact-5203e.firebaseapp.com",
    projectId: "react-contact-5203e",
    storageBucket: "react-contact-5203e.appspot.com",
    messagingSenderId: "756837325069",
    appId: "1:756837325069:web:3a4af5b88c88839c307844",
    measurementId: "G-2F4EMWDQ0Q"
};


firebase.initializeApp(firebaseConfig);
const fireDb = firebase.firestore();

export default fireDb;
