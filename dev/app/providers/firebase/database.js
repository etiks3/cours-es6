/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   05-07-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 10-07-2017
 */

// import Firebase node module
import * as firebase from "firebase";

export class Database {
  constructor() {
    // Use database() service from Firebase
    this.database = firebase.database();
    // console.log(this.database);
  }

  read(collection){
    return this.database.ref(collection)
  }

  push(uid, newProduct){
    this.database.ref('productList').child(uid).push(newProduct);
  }

  set(collection, user){
    console.log(collection, user);
    this.database.ref(collection).child(user.uid).set({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email
    });
  }

  update( collection, uid, key, dataToUpdate ){
    //console.log(collection, uid, key, dataToUpdate );
    this.database.ref(collection).child(uid).child(key).update(dataToUpdate);
  }

  delete(uid, pID){
    console.log('data', pID);
    this.database.ref('productList').child(uid).child(pID).remove();
    // this.database.ref('productList/'+pID).remove();
  }

}
