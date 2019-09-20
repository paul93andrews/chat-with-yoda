import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAlJu3G0YDX9M8Baxnly8V9xyHxfGEOHiQ",
    authDomain: "project5-redo.firebaseapp.com",
    databaseURL: "https://project5-redo.firebaseio.com",
    projectId: "project5-redo",
    storageBucket: "",
    messagingSenderId: "46694739525",
    appId: "1:46694739525:web:523ea2d7db054ef6a63d2c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
