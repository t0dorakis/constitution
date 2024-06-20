import { setupBasicText } from './components/basicText'
import { SideDrawer } from './components/sideDrawer'
export default function Page() {
    document.querySelector('#app').innerHTML = `
    <div id="side_drawer"></div>
    <main>
        <h1 class="hero-text">
          Welcome to the <br/>
          User Manual
        </h1>
        <div id="basic_text" class="basic-text"></div>
    </main>
  `
    SideDrawer().init(document.querySelector('#side_drawer'))
    setupBasicText(document.querySelector('#basic_text'))
}
