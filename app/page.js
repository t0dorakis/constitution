import { setupBasicText } from './components/basicText'
import { Effector } from './components/effector'
import { SideDrawer } from './components/sideDrawer'
import { threeCanvas } from './components/threeCanvas/threeCanvas'
import { setupTextExplorer } from './components/textExplorer'
import filter from './assets/filter/filter'
import { subscribeToEvent, events } from './components/eventBus/eventBus'
import { HelpButton } from './components/helpButton'
export default function Page() {
    document.querySelector('#app').innerHTML = `
      ${filter}
      <div id="text_explorer"></div>
    `
    setupTextExplorer(document.querySelector('#text_explorer'))
    subscribeToEvent(events.initiateSecondPhase, initSecondPhase)
}

const initSecondPhase = () => {
    document.querySelector('#app').innerHTML = `
        <div id="side_drawer"></div>
        <div id="threeCanvas"></div>
        <main>
            <h1 class="hero-text">
              Welcome to the <br/>
              User Manual
            </h1>
            <div id="basic_text" class="basic-text"></div>
        </main>
      `
    SideDrawer().init(document.querySelector('#side_drawer'))
    Effector().init(document.querySelector('#app'))
    setupBasicText(document.querySelector('#basic_text'))
    threeCanvas().init(document.querySelector('#threeCanvas'))
    HelpButton().init(document.querySelector('#app'))
}
