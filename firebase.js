
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import database from 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyBZHNT2vPtIjXU44rAvwcDfquBnjZwkFOk",
  authDomain: "pet-feeder-ccb60.firebaseapp.com",
  projectId: "pet-feeder-ccb60",
  storageBucket: "pet-feeder-ccb60.appspot.com",
  messagingSenderId: "312887184128",
  appId: "1:312887184128:web:6cff3efd6b312dc01c01e5",
  measurementId: "G-N8W699FZ74"
};

let Firebase;

if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
}

export default Firebase;