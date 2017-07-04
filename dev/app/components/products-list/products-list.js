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
    this.productList = ['aa', 'bb', 'cc']
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
  }
}
