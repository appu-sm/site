import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDt8r9dlFoPAMbLQzbQKau5brq8wWgcoBY",
    authDomain: "appu-sm.firebaseapp.com",
    databaseURL: "https://appu-sm.firebaseio.com",
    projectId: "appu-sm",
    storageBucket: "appu-sm.appspot.com",
    messagingSenderId: "96640527924",
    appId: "1:96640527924:web:3065eab46dbdd6c145e461",
    measurementId: "G-7HS9ZT1M2C"
  };

firebase.initializeApp(config);

export default firebase;