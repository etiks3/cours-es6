/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   30-06-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 06-07-2017
 */

export function homeSkeleton(data){
  return `

    <section  class="row grey lighten-3">
      <div class="col s8 offset-s2">
        <h1>Hello</h1>
        <form>
          <input type="email" name="" id="email" placeholder="your email"> <br>
          <input type="password" name="" id="password" placeholder="your pwd"><br>
          <button class="deep-orange lighten-2 waves-effect waves-light btn">Submit</button>
        </form>

      </div>

    </section>

  `;
}
