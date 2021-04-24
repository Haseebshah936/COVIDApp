import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyB5G9oT1MmaEHJrw4nOhHtCvxg7CrkzbIE",
  authDomain: "covi-46e78.firebaseapp.com",
  projectId: "covi-46e78",
  storageBucket: "covi-46e78.appspot.com",
  messagingSenderId: "183336187277",
  appId: "1:183336187277:web:a4588922ff3b72d253f9c4"
};

let app;
if(firebase.default.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig);
}
else{
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
export {db, auth};