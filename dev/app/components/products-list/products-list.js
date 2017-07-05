/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   03-07-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 05-07-2017
 */

import { productListSkeleton } from './products-list-ui'
import { Database } from '../../providers/firebase/database'

export class ProductsList {
  constructor(){
    // definir un tableau vide
    this.productList =  [];
    // demarer la class Firebase Preso
    this.database = new Database();
    // utiliser la meth. read() qui retourn une promise
    this.database.read().then(resultatFB => {
      // console.log('productlist->', res.val());
      // parcourir l'objet retourné par Firebase avec un forEach() !! sans le .val()
      resultatFB.forEach(produit => {
        // lors du parcour on utilise le .val() pour afficher les parametres
        // et on .push() dans la liste de produit qui était vide.
        this.productList.push(produit)
      })
      // ensite... on peut afficher la lise ;-)
      this.initUI()
      this.loadEventUI()
    })
  }

  initUI(){
    let skeleton = productListSkeleton(this.productList)
    if(document.querySelector('ul')){
      document.querySelector('ul.collection.with-header').innerHTML = '';
    }
    document.querySelector('ul.collection.with-header').insertAdjacentHTML('beforeend', skeleton)
  }

  loadEventUI(){
    document.querySelector('#search').addEventListener('keyup', e =>{
      e.preventDefault()

      if(e.keyCode === 13){
          console.log(e.target.value);
          // formater le nouveau produit
          let newProduct = {
            name: e.target.value,
            statut: false
          }
          // ajouter le nouveau produit dans la liste
          this.productList.push(newProduct)
          // ajouter a firebase
          this.database.push(newProduct)

          console.log(this.productList);
          this.initUI()
          e.target.value = ''
      }
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
        this.productList[productItem.id].statut === true &&
        e.target.classList.contains('del')
      ){
        // supprimer l'element (avec index) du tableau de produits
        this.productList.splice(productItem.id, 1)
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
        console.log(this.productList[productItem.id])
        // this.productList[productItem.id].val().statut = !this.productList[productItem.id].val().statut
        console.log(this.productList[productItem.id].val());
        let fbProduct = this.productList[productItem.id];
        let statut = !this.productList[productItem.id].val().statut;
        this.database.update(fbProduct, statut);
      }
      // Et on recharger la vue dans tous les cas
      this.initUI()
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
