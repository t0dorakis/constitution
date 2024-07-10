import './style.css'
import { dispatchEvent, events } from '../eventBus/eventBus'

export const openModal = (element, options) => {
    const { type, text, cta, image, width, height } = options
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0
    const modal = document.createElement('div')

    const modalWidth = width || 400
    const modalHeight = height || 600
    modal.classList.add('modal')
    // randomize the position of the modal so it does not overlap with the edges of the screen
    modal.style.left = Math.random() * (window.innerWidth - modalWidth) + 'px'
    modal.style.top = Math.random() * (window.innerHeight - modalHeight) + 'px'

    modal.style.width = modalWidth + 'px'
    modal.style.height = modalHeight + 'px'

    // top bar
    const topBar = document.createElement('div')
    topBar.classList.add('modal-top-bar')

    topBar.innerHTML = `
        <div class="mini-btn close-icon"></div>
        <div class="seperator">
          <div class="seperator-line"></div>
                    <div class="seperator-line"></div>
          <div class="seperator-line"></div>

        </div>
                <div class="mini-btn">?</div>

        <div class="mini-btn">
          <div class="chevron-right"></div>
          <div class="chevron-left"></div>
        </div>
        `
    modal.appendChild(topBar)

    const modalContent = document.createElement('div')
    modalContent.classList.add('modal-content')

    const button = cta && `<button id="${type}-btn">${cta}</button>`

    if (text) {
        modalContent.innerHTML = `
            <p>${text}</p>
            ${button}
        `
    }

    if (image) {
        modalContent.innerHTML = `
            <img src="${image}"/>
        `
    }

    if (type === 'dvelve') {
        modalContent.querySelector('#dvelve-btn').onclick = () => {
            dispatchEvent(events.initiateSecondPhase)
        }
    }
    modal.appendChild(modalContent)

    element.appendChild(modal)

    topBar.querySelectorAll('.close-icon').forEach((btn) => {
        btn.onclick = () => {
            if (type === 'dvelve' || type === 'end') {
                openModal(element, options)
            } else {
                // remove the modal from the dom
                element.removeChild(modal)
            }
        }
    })

    // make the element grabbable so it can be dragged around and left in the document
    function dragMouseDown(e) {
        e = e || window.event
        e.preventDefault()
        // get the mouse cursor position at startup:
        pos3 = e.clientX
        pos4 = e.clientY
        document.onmouseup = closeDragElement
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag
    }

    function elementDrag(e) {
        e = e || window.event
        e.preventDefault()
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX
        pos2 = pos4 - e.clientY
        pos3 = e.clientX
        pos4 = e.clientY
        // set the element's new position:
        modal.style.top = modal.offsetTop - pos2 + 'px'
        modal.style.left = modal.offsetLeft - pos1 + 'px'
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null
        document.onmousemove = null
    }

    // on modal remove event
    modal.addEventListener('destroy', () => {
        // remove all event listeners
        modal.removeEventListener('mousedown', dragMouseDown)
    })

    modal.addEventListener('mousedown', dragMouseDown)
}
