import { store } from '../state/store'

//  this listens to the state of the store and changes the position of the text canvas
const zoomState = store.subscribe(({zoom}) => {
  const target = document.querySelector('#text_canvas')
    transformTarget(target, zoom.x, zoom.y, zoom.level)
})


const switchScale = (level) => {
  switch (level) {
    case 0:
      return 1
    case 1:
      return 1.75
    case 2:
      return 1.5
    case 3:
      return 1.75
    case 4:
      return 2
    default:
      return 1
  }
}

const transformTarget = (target, x, y, level) => {
  // delay the animation
  setTimeout(() => {
    const scale = switchScale(level)
    target.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
  }, 800)
}

export const setupZoomer = (element, target) => {

  const zoomOutButton = document.createElement('button')
  zoomOutButton.innerHTML = 'Reset'
  zoomOutButton.onclick = () => {
    console.log('RESET')
    store.getState().setZoom({ x: 0, y: 0, level: 0 })
  }
  element.appendChild(zoomOutButton)
}