import { store } from '../state/store'
import { events, dispatchEvent, subscribeToEvent } from '../eventBus/eventBus'
import { levelTexts } from '../../data/manifestoProto'
import { addLevelElement } from '../levelUtils/addLevelElement'
const setPositionAttributes = (element) => {
  const rect = element.getBoundingClientRect()
  element.setAttribute('data-x', rect.x)
  element.setAttribute('data-y', rect.y)
  element.setAttribute('data-width', rect.width)
  element.setAttribute('data-height', rect.height)
}



const handleHighlightClick = (element, type) => {
  //  get current position of the element
  if (type) {
    dispatchEvent(events.openArea, element)
  }

  addLevelElement(element, type)
  store.getState().setVisibleScene(type)
  dispatchEvent(`highlight-${type}`, 'test')
}
// adding this function to the window object so it can be used on basic html attributes

// window.handleHighlightClick = handleHighlightClick;

function getProximityDirection(element, senderElement, distance) {
  const directions = []

  //  the space that is neede
  const area = {
    width: 200,
    height: 250,
  }

  const rect1 = element.getBoundingClientRect()
  const rect2 = senderElement.getBoundingClientRect()

  // Calculate distances between the edges
  // const leftDistance = Math.abs(rect1.right - rect2.left)
  // const rightDistance = Math.abs(rect2.right - rect1.left)
  // const topDistance = Math.abs(rect1.bottom - rect2.top)
  // const bottomDistance = Math.abs(rect2.bottom - rect1.top)

  // const horizontalClose =
  //   Math.abs(rect1.left - rect2.right) <= distance ||
  //   Math.abs(rect1.right - rect1.width - rect2.left) <= distance

  // const verticalClose =
  //   Math.abs(rect1.top - rect2.bottom) <= distance ||
  //   Math.abs(rect1.bottom - rect2.top) <= distance

  const senderCenter = {
    x: (rect2.left + rect2.right) / 2,
    y: (rect2.top + rect2.bottom) / 2,
  }

  // if same element return
  if (senderElement === element) {
    return
  }

  const isInProjectedArea =
    rect1.top > senderCenter.y - rect2.height && // only elements that are in the way of the area that gets projected on rect2
    rect1.bottom < rect2.top + area.height &&
    rect1.right > senderCenter.x - area.width / 2 &&
    rect1.left < senderCenter.x + area.width / 2
  
  if (isInProjectedArea && rect1.right - distance < rect2.right) {
    directions.push('left')
  }
  if (isInProjectedArea && rect1.left + distance > rect2.left) {
    directions.push('right')
  }

  return directions
}
export const WordElement = (word, uuid) => {
  subscribeToEvent(events.openArea, ({ detail: sender }) => {
    // console.log('RECEIVING', receiver)
    // get position of the element
    const element = document.querySelector(`[data-uuid='${uuid}']`)
    if (element) setPositionAttributes(element)

    const close = getProximityDirection(element, sender, 10)
    if (close.length > 0) {
      //  element should get red border
      // element.style.border = '1px solid red'
      // if left of it add margin-left of 100px
      if (close.includes('left')) {
        element.classList.add('brother-left')
      } else if (close.includes('right')) {
        element.classList.add('brother-right')
      }
    }
  })
  const lowerCaseWord = word.toLowerCase()
  const isHuman = lowerCaseWord.includes('human') ? 'human' : false
  const isAi =
    lowerCaseWord === 'ai' || lowerCaseWord.includes('machine') ? 'ai' : false
  const type = isHuman || isAi

  const span = document.createElement('span')
  span.textContent = word + ' ' // Add space after each word
  span.dataset.uuid = uuid // give it a random id
  span.onclick = () => handleHighlightClick(span, type)
  // write position in custom attributes

  if (type) {
    span.className = `highlight-${type} level-link`
  }

  return span
}
