/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   03-07-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 10-07-2017
 */

import { productListSkeleton, productItemSkeleton } from './products-list-ui'
import { Database } from '../../providers/firebase/database'

export class ProductsList {
  constructor(user){
    this.user = user;
    // demarer la class Firebase Preso
    this.database = new Database();
    this.initUI()
    this.loadEventUI()
    // Firebase EventListener pour écouter les modification de la base de donnée (BDD).
    this.firebaseEvent(this.user.uid)
  }

  initUI(){
    let skeleton = productListSkeleton([])
    if(document.querySelector('ul')){
      document.querySelector('ul.collection.with-header').innerHTML = '';
    }
    document.querySelector('ul.collection.with-header').insertAdjacentHTML('beforeend', skeleton)
  }

  loadEventUI(){
    // check if all element are in DOM
    if(!document.querySelector('#search') && !document.querySelector('ul')){
      return;
    }
    document.querySelector('#search').addEventListener('keyup', e =>{
      e.preventDefault()
      // catch only if user press ENTER
      if(e.keyCode != 13){
        // if not return and the res of the code with not run ;-)
        return;
      }
      console.log(e.target.value);
      // formater le nouveau produit
      let newProduct = {
        name: e.target.value,
        statut: false
      }
      // ajouter le nouveau produit dans firebase
      this.database.push(this.user.uid, newProduct)
      // initialiser l'input
      e.target.value = ''
    })

    document.querySelector('ul').addEventListener('click',e => {
      // rechercher le parent de type LI pour recupérer son ID
      console.log(e);
      let productItem = e.target.closest('li')
      // tester si l'element cliqué est de type I (i majuscule)
      // && (et)
      if(
        // si le I a la class .del et à le statut à true
        e.target.nodeName === 'I' &&
        //this.productList[productItem.id].statut === true &&
        productItem.childNodes[1].classList.contains('lineThrough') &&
        e.target.classList.contains('del')
      ){
        // supprimer l'element avec firebase
        // console.log('prod', productItem.dataset.fbid);
        this.database.delete(this.user.uid, productItem.dataset.fbid)
      }
      else if (
        // si le I a la class .edit et à le statut à true
        e.target.nodeName === 'I' &&
        e.target.classList.contains('edit')
      ){
        console.log('TODO: edition du produit');
      }
      else {
        // sinon c'est qu'on a pas cliqué sur une icon => donc on trace le produit ;-)
        let statut  = !productItem.childNodes[1].classList.contains('lineThrough');
        let pID = productItem.dataset.fbid;
        let dataToUpdate = {
          statut: statut
        }
        this.database.update('productList', this.user.uid, pID, dataToUpdate);
      }
    })
  }

  firebaseEvent(uid){
    // get firebase collection ref() with .read('YOUR_COLLECTION')
    let productListRef =this.database.read('productList')

    /**
     * Firebase Event for CHILD_ADDED
     */
    productListRef.child(uid).on('child_added', snapshot => {
    //productListRef.orderByChild('statut').equalTo(true).on('child_added', snapshot => {
      console.log('child_added', snapshot.val());
      // Get product item skeleton from ./products-list-ui.js (don't forguet to updat import)
      let newProduct = productItemSkeleton(snapshot)
      // check if element exist before add skeleton
      if(document.querySelector('ul.collection')){
        document.querySelector('ul.collection').insertAdjacentHTML('beforeend', newProduct)
      }
    });

    /**
     * Firebase Event for CHILD_CHANGED
     */
     productListRef.child(uid).on('child_changed', snapshot => {
       console.log('child_changed->', snapshot.key ,snapshot.val());
       // find element in DOM with snapshot.key
       let item = document.querySelector('[data-fbid="'+snapshot.key+'"]')
       // Check if eleme t exist before change class
       if(item){
         item.childNodes[1].classList.toggle('lineThrough')
       }
     });

     /**
      * Firebase Event for CHILD_REMOVED
      */
      productListRef.child(uid).on('child_removed', snapshot => {
        let elementLI = document.querySelector('[data-fbid="'+snapshot.key+'"]');
        console.log('child_removed ->', elementLI);
        // Check if element exist before remove
        if(elementLI){
          elementLI.parentNode.removeChild(elementLI)
        }
      })
  }

}













//
// let p1 = new Promise((resolve,reject)=> {
//   const req = new XMLHttpRequest();
//   req.open('GET', 'http://www.mozilla.org/'+param, false);
//   req.send(null);
//
//   if (req.status === 200) {
//       resolve("Réponse reçu: %s", req.responseText);
//   } else {
//       reject("Status de la réponse: %d (%s)", req.status, req.statusText);
//   }
// });
// let p2 = new Promise((resolve,reject)=> {
//   const req = new XMLHttpRequest();
//   req.open('GET', 'http://www.google.ch/'+param, false);
//   req.send(null);
//
//   if (req.status === 200) {
//       resolve("Réponse reçu: %s", req.responseText);
//   } else {
//       reject("Status de la réponse: %d (%s)", req.status, req.statusText);
//   }
// });
//
// p1.then(res1=> {
//   // tuc ave res1
//   p2.then(res2=> {
//     // truc avec res2 + res1
//   })
// })
// .catch(err => {
//
// })
//
// Promise.all([p1, p2]).then(res => {
//   // [res1, res2]
// })
// .catch(err=> {
//   // [err1, err2]
// })
//
//
