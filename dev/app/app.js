/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   28-06-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 29-06-2017
 */

import { HomePage } from './pages/home/home';

// Definition
class MyApp {
  constructor() {
    this.app = document.querySelector("app")
    new HomePage(this.app)
  }
}




// utilisation
new MyApp()
