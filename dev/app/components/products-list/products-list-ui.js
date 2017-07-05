/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   03-07-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 05-07-2017
 */

export function productListSkeleton(productList){
  return ` 
    ${productList.map((product, index)=> {
      return `
        <li id="${index}" data-fbid="${product.key}" class="collection-item">
           <div class="${(product.val().statut === true)? 'lineThrough' : ''}">
              ${product.val().name}
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
