import { manifestoProto } from '../../data/manifestoProto'
//  temporary
import '../textExplorer/textExplorer.styles.css'
import './textCanvas.styles.css'
import { textSplitter } from '../textSplitter'
//  temporary

export function setupTextCanvas(element) {
  const textCanvas = document.createElement('div')
  textCanvas.classList.add('text-canvas')
  // append text splitted into elements

  manifestoProto.forEach((text, index) => {
    const textElement = document.createElement('p')
    textElement.appendChild(textSplitter(text))
    textCanvas.appendChild(textElement)
  })
  element.appendChild(textCanvas)
}
