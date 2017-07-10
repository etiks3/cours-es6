/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   28-06-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 10-07-2017
 */

import { userSkeleton, UserClassSkeleton } from './user-ui'
import { ProductsList } from '../../components/products-list/products-list'

export class UserPage {
  constructor(app, userFB, pwd) {
    this.app = app
    this.email = userFB.email
    this.user = userFB
    this.pwd = pwd
    this.initUI()
    // init ProductsList component with user data
    new ProductsList(this.user);
    this.loadEventUI()
  }

  initUI(){
    // remove all section before display UI
    if(document.getElementsByTagName("section")[0]){
      document.getElementsByTagName("section")[0].parentNode.removeChild(document.getElementsByTagName("section")[0])
    }
    // defin object to pass data into skeleton
    let data = {
      email: this.email,
      pwd: this.pwd,
      desc: 'demo passage info',
      autreTest: 'Encore des info'
    }
    // add sjkeleton to DOM
    this.app.insertAdjacentHTML('afterbegin', userSkeleton(data))
    //this.app.insertAdjacentHTML('afterbegin', UserClassSkeleton.get(data))
  }

  loadEventUI(){
    // test if element exist befor add EventListener()
    if(document.querySelector('form')){
      document.querySelector('form').addEventListener('submit', e =>{
        e.preventDefault()
      })
    }
  }
}
