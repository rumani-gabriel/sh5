// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCPfW4degQAtWAHeuwDTe0-vFLfCi4lzJ0",
    authDomain: "second-hand-v5.firebaseapp.com",
    projectId: "second-hand-v5",
    storageBucket: "second-hand-v5.appspot.com",
    messagingSenderId: "170171570216",
    appId: "1:170171570216:web:584f5311284f549033fd1d",
    measurementId: "G-KYL2QQ5E0R"
  };

  firebase.initializeApp(firebaseConfig);
   const db = firebase.firestore();
   const auth= firebase.auth();
   const storage= firebase.storage();

   export {db, auth , storage};
