/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   03-07-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 04-07-2017
 */

export function productListSkeleton(productList){
  return `
    ${productList.map((product, index)=> {
      return `
        <li id="${index}"  class="collection-item">
           <div class="${(product.statut === true)? 'lineThrough' : ''}">
              ${product.name}
              <a href="#!" class="secondary-content">
                <i class="edit material-icons">mode_edit</i>
                <i class="del material-icons  red-text text-darken-1">delete_forever</i>
              </a>
            </div>
        </li>
      `
    }).join('')}
  `;
}
