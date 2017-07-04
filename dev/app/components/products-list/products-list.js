/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   03-07-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 04-07-2017
 */

import { productListSkeleton } from './products-list-ui'

export class ProductsList {
  constructor(){
    this.productList = [
      {
        name: 'pomme',
        statut: false
      },
      {
        name: 'poire',
        statut: false
      },
      {
        name: 'choco',
        statut: false
      }
    ]
    this.initUI()
    this.loadEventUI()
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
        this.productList[productItem.id].statut = !this.productList[productItem.id].statut
        console.log(this.productList[productItem.id]);
      }
      // Et on recharger la vue dans tous les cas
      this.initUI()
    })
  }
}
