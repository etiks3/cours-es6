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
          this.productList.push(e.target.value)
          console.log(this.productList);
          this.initUI()
          e.target.value = ''
      }
    })

    document.querySelector('ul').addEventListener('click',e => {
      // rechercher le parent de type LI pour recupérer son ID
      let productItem = e.target.closest('li')
      console.log(this.productList[productItem.id])
      // supprimer l'element (avec index) du tableau de produits
      //this.productList.splice(productItem.id, 1)
      this.productList[productItem.id].statut = !this.productList[productItem.id].statut
      console.log(this.productList[productItem.id]);
      // recharger la vue
      this.initUI()
    })
  }
}
