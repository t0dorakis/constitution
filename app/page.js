import Manifesto from './data/Manifesto_1.1'
import { setupTextThrower } from './components/textThrower/textThrower'
export default function Page() {
  document.querySelector("#app").innerHTML = `
    <main>
      <div id="text_thrower"></div>
    </main>
  `;
console.log(document.querySelector('#text_thrower'))
  setupTextThrower(document.querySelector('#text_thrower'), Manifesto)

}