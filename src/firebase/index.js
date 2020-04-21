import firebase from "firebase/app"
import "firebase/storage"


var config = {
    apiKey: "AIzaSyCcHRziSsldf0WZlLV3bl-x9guopK3m8VQ",
    authDomain: "ctstorage-20743.firebaseapp.com",
    databaseURL: "https://ctstorage-20743.firebaseio.com",
    projectId: "ctstorage-20743",
    storageBucket: "ctstorage-20743.appspot.com",
    messagingSenderId: "176476731232",
    appId: "1:176476731232:web:842d1a267823ab983fd005",
    measurementId: "G-W2RK6JSX6M"
  };

  firebase.initializeApp(config)

  const storage = firebase.storage()

  export {
      storage, firebase as default
  }