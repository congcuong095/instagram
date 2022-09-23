import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseApp = firebase.initializeApp({
    apiKey: 'AIzaSyCojx43ONagkNc9KiGAsr8Q0wLw3yFohLQ',
    authDomain: 'instagram-test-8f839.firebaseapp.com',
    databaseURL: 'https://instagram-test-8f839-default-rtdb.firebaseio.com',
    projectId: 'instagram-test-8f839',
    storageBucket: 'instagram-test-8f839.appspot.com',
    messagingSenderId: '283762426827',
    appId: '1:283762426827:web:9a559a5e63836ed7a62c4e',
    measurementId: 'G-CHVK28KJ2K',
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };
