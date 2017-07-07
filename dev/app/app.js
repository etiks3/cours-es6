/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   28-06-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 07-07-2017
 */

import { HomePage } from './pages/home/home';
// import Firebase node module ($ npm install --save firebase)
import * as firebase from "firebase";
import { Database } from './providers/firebase/database.js'

// Config for Firebase
const CONFIG = {
  apiKey: "AIzaSyAiXE5UwVdApbFFXeXeq2Yux5GgET867HA",
  authDomain: "shopping-es6-demo.firebaseapp.com",
  databaseURL: "https://shopping-es6-demo.firebaseio.com",
  projectId: "shopping-es6-demo",
  storageBucket: "shopping-es6-demo.appspot.com",
  messagingSenderId: "640273745407"
};

// Definition
class MyApp {
  constructor() {
    // Initialize Firebase
    firebase.initializeApp(CONFIG);

    this.database = new Database();
    let googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider)
    .then((result) =>{
      let token = result.credential.accessToken;
      let user = result.user;
      console.log(result);

      this.database.set('userProfil',user)

    }).catch((error)=> {
      console.log(error);
      let errorCode = error.code;
      let errorMessage = error.message;
      let email = error.email;
      let credential = error.credential;
    });


    // App DOM entrie
    this.app = document.querySelector("app")
    // Load HomePage()
    new HomePage(this.app)
  }
}




// utilisation
new MyApp()
