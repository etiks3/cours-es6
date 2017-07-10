/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   28-06-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 10-07-2017
 */

import { UserPage } from '../user/user'
import { homeSkeleton } from './home-ui'
import { Database } from '../../providers/firebase/database.js'
import * as firebase from "firebase";

export class HomePage {
  constructor(app) {
    this.app = app
    this.database = new Database();
    this.initUI()
    this.loadEventUI()
  }

  initUI(){
    // remove all section before display UI
    if(document.getElementsByTagName("section")[0]){
      document.getElementsByTagName("section")[0].parentNode.removeChild(document.getElementsByTagName("section")[0])
    }
    let data = {};
    // import skeleton from home-ui.js
    let skeleton = homeSkeleton(data);
    // add sjkeleton to DOM
    this.app.insertAdjacentHTML('beforeend', skeleton) ;
  }

  loadEventUI(){
    console.log('load Event UI');
    // event listener
    // user if() to test if element is already in DOM
    if(document.forms[0]){
      document.forms[0].addEventListener('submit', event => this.onSignIn(event))
    }
  }

  onSignIn(event){
    // prevent window reload on form submit
    event.preventDefault();
    // Select Google provider
    let googleProvider = new firebase.auth.GoogleAuthProvider();
    // user firebase.auth() to sign in with selected provider
    // .signInWithPopup() retur a simple Promise,
    // use .then() to get response data or .catch() to get error
    firebase.auth().signInWithPopup(googleProvider)
    .then((result) =>{
      let token = result.credential.accessToken;
      let user = result.user;
      //console.log(result);
      // Store user data into firebase.database.ref('userProfil/userID')
      this.database.set('userProfil',user)
    })
    .catch((error)=> {
      console.log(error);
      let errorCode = error.code;
      let errorMessage = error.message;
      let email = error.email;
      let credential = error.credential;
      // display alert if have error
      altert(errorMessage)
    });

  }
}
