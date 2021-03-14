import firebase from 'firebase'
const config = {
  apiKey: "AIzaSyAs4fKMCwVWF-_mrXqTz6LIDlNZCvSecqY",
  authDomain: "fe-case.firebaseapp.com",
  databaseURL: "https://fe-case-default-rtdb.firebaseio.com",
  projectId: "fe-case",
  storageBucket: "fe-case.appspot.com",
  messagingSenderId: "66719958169",
  appId: "1:66719958169:web:2c8ab0c935a89a8f7ee408"
};

let fire = firebase.initializeApp(config);

const db = fire.database()
export default db