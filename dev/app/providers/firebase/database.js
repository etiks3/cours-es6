/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   05-07-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 07-07-2017
 */

// import Firebase node module
import * as firebase from "firebase";

export class Database {
  constructor() {
    // Use database() service from Firebase
    this.productList =  [];
    this.database = firebase.database();
    console.log(this.database);
  }

  read(){
    return this.database.ref('productList').once('value')
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

  update( uid, pID, statut ){
    //console.log(product.key, product.val());
    this.database.ref('productList/'+ uid + '/'+ pID).update({
      statut: statut
    });
  }

  child_added(uid){
    // more advenced technique with EventEmitter:
    // https://www.npmjs.com/package/event-emitter
    this.database.ref('productList').child(uid).on('child_added', snapshot => {
    //this.database.ref('productList').orderByChild('statut').equalTo(true).on('child_added', snapshot => {
      console.log('child_added', snapshot.val());
      let newProduct = `
      <li data-fbid="${snapshot.key}" class="collection-item">
         <div class="${(snapshot.val().statut === true)? 'lineThrough' : ''}">
            ${snapshot.val().name}
            <a href="#!" class="secondary-content">
              <i class="edit material-icons">mode_edit</i>
              <i class="del material-icons  red-text text-darken-1">delete_forever</i>
            </a>
          </div>
      </li>
      `;
      document.querySelector('ul.collection').insertAdjacentHTML('beforeend', newProduct)
    });
  }

  child_changed(uid){
    // more advenced technique with EventEmitter:
    // https://www.npmjs.com/package/event-emitter
      this.database.ref('productList').child(uid).on('child_changed', snapshot => {
        console.log('child_changed->', snapshot.key ,snapshot.val());


        document.querySelector('[data-fbid="'+snapshot.key+'"]')
                                                                .childNodes[1]
                                                                .classList
                                                                .toggle('lineThrough')

      });
  }

  child_remove(uid){
    this.database.ref('productList').child(uid).on('child_removed', snapshot => {
      let elementLI = document.querySelector('[data-fbid="'+snapshot.key+'"]');
      console.log('child_removed ->', elementLI);
      if(elementLI){
        elementLI.parentNode.removeChild(elementLI)
      }
    })
  }

  delete(uid, pID){
    console.log('data', pID);
    this.database.ref('productList').child(uid).child(pID).remove();
    // this.database.ref('productList/'+pID).remove();
  }

}
