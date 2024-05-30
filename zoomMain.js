import './style.css'
import { setupTextCanvas } from './components/textCanvas/textCanvas'
import { setupZoomer } from './components/zoomer/zoomer'

document.querySelector('#app').innerHTML = `
  <main>
    <div id="text_canvas"></div>
    <div id="zoomer" class="zoomer"></div>
  </main>
`
setupTextCanvas(document.querySelector('#text_canvas'))
setupZoomer(document.querySelector('#zoomer'), document.querySelector('#text_canvas'))
