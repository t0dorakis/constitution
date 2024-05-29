import { store } from '../state/store'
import { levelTexts } from '../../data/manifestoProto'
// add a new elment to the document absolutly positioned to the bottom of the clicked element
// the new element has smaller text inside
const addAbsolutePositionedElement = (element, text, level) => {
  const newElement = document.createElement('div')
  
  // get position of the clicked element
  const rect = element.getBoundingClientRect()
  newElement.style.position = 'absolute'
  newElement.style.top = rect.y
  newElement.style.width = 200 + 'px'
  newElement.style.height = 200 + 'px'
  element.classList.add('open-element')
  newElement.classList.add('level-element', `level-${level}`)

  newElement.innerHTML = text

  // TODO: remove the click event from the element that was clicked already
  // TODO: use text splitter again to create subtexts of the level element - recursion

  element.appendChild(newElement)
  
  const { x, y } = calculateZoomTranslate(element)

  store.getState().setZoom({ x: x, y: y, level })
}

export const addLevelElement = (element, type) => {
  // we probably cannot just count up, we need to check on which level the clicked element is
    const currentLevel = store.getState().zoom.level + 1
    
    addAbsolutePositionedElement(element, levelTexts[type], currentLevel)
}


const calculateZoomTranslate = (element) => {
  const standardTarget = document.querySelector('#text_canvas').getBoundingClientRect()

  // TODO: this is not proper math, eyeballed it
  // we want to zoom in on the element and therefore need to calculate the position of the element
  // and the distance to the center of the canvas so we can calculate the zoom
  const xCenter = standardTarget.width / 2
  const yCenter = standardTarget.height / 2
  // x = how far the element is from the center of the canvas
  const x = xCenter - element.getBoundingClientRect().x
  // y = how far the element is from the center of the canvas
  const y = yCenter - element.getBoundingClientRect().y
  
  return { x, y }
}