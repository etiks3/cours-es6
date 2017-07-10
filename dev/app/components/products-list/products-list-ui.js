/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   03-07-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 10-07-2017
 */

export function productListSkeleton(productList){
  return `
    ${productList.map((product, index)=> productItemSkeleton(product)).join('')}
  `;
}

export function productItemSkeleton(productItem){
  return `
        <li data-fbid="${productItem.key}" class="collection-item">
           <div class="${(productItem.val().statut === true)? 'lineThrough' : ''}">
              ${productItem.val().name}
              <a href="#!" class="secondary-content">
                <i class="edit material-icons">mode_edit</i>
                <i class="del material-icons  red-text text-darken-1">delete_forever</i>
              </a>
            </div>
        </li>
      `;
}
