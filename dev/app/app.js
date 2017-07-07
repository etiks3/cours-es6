/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   28-06-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 07-07-2017
 */

import { HomePage } from './pages/home/home';
import { UserPage } from './pages/user/user';
// import Firebase node module ($ npm install --save firebase)
import * as firebase from "firebase";

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
    // App DOM entrie
    this.app = document.querySelector("app")
    // Initialize Firebase
    firebase.initializeApp(CONFIG);

    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        // User is signed in.
        console.log('user auth', user);
        // envoyer l'user sur la page user.js
        new UserPage(this.app, user, '')

      } else {
        // No user is signed in.
        // envoyer l'user sur home.js
        console.log('no user auth');
        new HomePage(this.app)

      }
    });



    // Load HomePage()
  }
}




// utilisation
new MyApp()
