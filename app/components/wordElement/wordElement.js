import { store } from '../state/store'
import { events, dispatchEvent, subscribeToEvent } from '../eventBus/eventBus'
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

  if (type === 'human') {
          dispatchEvent(`highlight-human`, 'test')
      store.getState().setVisibleScene('human')
    return
  }
  addLevelElement(element, type)
}
// adding this function to the window object so it can be used on basic html attributes


function getProximityDirection(element, senderElement, distance) {
  const directions = []

  //  the space that is neede
  const area = {
    width: 200,
    height: 300,
  }

  const rect1 = element.getBoundingClientRect()
  const rect2 = senderElement.getBoundingClientRect()

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
    if (close && close.length > 0) {
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

  const type = checkIfElementIsHiglighted(word)

  const span = document.createElement('span')
  span.textContent = word + ' ' // Add space after each word
  span.dataset.uuid = uuid // give it a random id
    if (type) {
    span.className = `highlight-${type} level-link`
  }
  span.onclick = () => handleHighlightClick(span, type)
  // write position in custom attributes



  return span
}

const listOfHiglightedWords = [
  'humanity',
  'engineer',
  'human',
]

const checkIfElementIsHiglighted = (word) => {
  const lowerCaseWord = word.toLowerCase()


  
  if (listOfHiglightedWords.includes(lowerCaseWord)) {
    return lowerCaseWord
  }
  if (lowerCaseWord.includes('human')) {
    return 'human'
  }
}
