/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   03-07-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 03-07-2017
 */

export function productListSkeleton(productList){
  return `
    ${productList.map(el => {
      return `
        <li class="collection-item">
           <div>
              ${el}
              <a href="#!" class="secondary-content">
                <i class="material-icons">send</i>
              </a>
            </div>
        </li>
      `
    }).join('')}
  `;
}
