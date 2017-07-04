/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   30-06-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 03-07-2017
 */

export function userSkeleton(data/*, productList*/){
  return `

    <section>

      <nav class="nav-extended">
        <div class="nav-wrapper">
          <a href="#!" class="brand-logo">Shoping List</a>
        </div>
        <div class="nav-content">
          <form>
            <div class="input-field">
              <input id="search" type="search" required>
              <label class="label-icon" for="search"><i class="material-icons">search</i></label>
              <i class="material-icons">close</i>
            </div>
          </form>
        </div>
      </nav>
      <ul class="collection with-header">
        <li class="collection-header"> <h4>Hello ${data.email}</h4></li>
      </ul>
    </section>
  `;
}

export class UserClassSkeleton {
  static get(data){
    return `
      <section style="background:orange;">
        <h1>Salut ${data.email}</h1>
        <p>${data.pwd}</p>
        <p>${data.desc}</p>
        <p>${data.autreTest}</p>
        <ul>
          ${data.listeProduits.map(el => {
            return `
              <li>
                ${el}
              </li>
            `
          }).sort().join('')}
        </ul>
      </section>
    `;
  }
}
