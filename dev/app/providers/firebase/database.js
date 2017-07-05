/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   05-07-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 05-07-2017
 */

// import Firebase node module
import * as firebase from "firebase";

export class Database {
  constructor() {
    // Use database() service from Firebase
    this.database = firebase.database();
    console.log(this.database);
  }

  read(){
    return this.database.ref('productList').once('value')
  }

  push(newProduct){
    this.database.ref('productList').push(newProduct);
  }

  set(){

  }

  update( product, statut ){
    //console.log(product.key, product.val());
    this.database.ref('productList/'+ product.key).update({
      statut: statut
    });
  }

  delete(){

  }

}
