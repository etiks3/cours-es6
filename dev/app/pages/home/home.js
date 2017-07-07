/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   28-06-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 07-07-2017
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
    let skeleton = homeSkeleton(data);
    this.app.insertAdjacentHTML('beforeend', skeleton) ;
    $('.carousel.carousel-slider').carousel({fullWidth: true});
  }

  loadEventUI(){
    console.log('load Event UI');
    document.forms[0].addEventListener('submit', event => this.onSignIn(event))
  }

  onSignIn(event){
    event.preventDefault();
    // console.log(
    //   document.forms[0][0].value,  // document.getElementById('email').value
    //   document.forms[0][1].value // document.getElementById('password').value
    // );
    // new UserPage(this.app, document.forms[0][0].value, document.forms[0][1].value)
    // // let dataReady = {};
    // // let formData = document.forms[0]
    // // for (var i = 0; i < formData.length; i++) {
    // //   if(formData[i].value && formData[i].value !== ''){
    // //     console.log(formData[i].value);
    // //     dataReady[formData[i].id] = formData[i].value
    // //   }
    // // }
    // // new UserPage(dataReady)


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

  }
}
