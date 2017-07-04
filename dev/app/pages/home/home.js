/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   28-06-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 30-06-2017
 */

import { UserPage } from '../user/user'
import { homeSkeleton } from './home-ui'

export class HomePage {
  constructor(app) {
    this.app = app
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
    document.forms[0].addEventListener('submit', event => this.onLogin(event))
  }

  onLogin(event){
    event.preventDefault()
    console.log(
      document.forms[0][0].value,  // document.getElementById('email').value
      document.forms[0][1].value // document.getElementById('password').value
    );
    new UserPage(this.app, document.forms[0][0].value, document.forms[0][1].value)
    // let dataReady = {};
    // let formData = document.forms[0]
    // for (var i = 0; i < formData.length; i++) {
    //   if(formData[i].value && formData[i].value !== ''){
    //     console.log(formData[i].value);
    //     dataReady[formData[i].id] = formData[i].value
    //   }
    // }
    // new UserPage(dataReady)
  }
}
