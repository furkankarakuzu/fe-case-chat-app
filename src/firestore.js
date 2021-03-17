import firebase from 'firebase'
const config = {
//YOUR CONFIG
};

let fire = firebase.initializeApp(config);

const db = fire.database()
export default db
