import './style.css'
import { store } from '../../utils/state/store'

const wildnessLevel = store.getState().wildernessLevel
const maxWildernessLevel = 10

function randomMarkTextNode(node) {
    const wildernessLevel = store.getState().wildernessLevel
    const probability = wildernessLevel / 1000
    if (probability === 0) {
        return
    }
    const text = node.textContent
    const markedText = text
        .split('')
        .map((char) => {
            return Math.random() < probability
                ? `<span class="highlight">${char}</span>`
                : char
        })
        .join('')

    // Create a temporary container to hold the marked HTML
    const tempContainer = document.createElement('div')
    tempContainer.innerHTML = markedText

    // Replace the text node with the marked nodes
    const fragment = document.createDocumentFragment()
    while (tempContainer.firstChild) {
        fragment.appendChild(tempContainer.firstChild)
    }
    node.parentNode.replaceChild(fragment, node)
}

function traverseAndMarkTextNodes(element) {
    element.childNodes.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
            randomMarkTextNode(child)
        } else if (child.nodeType === Node.ELEMENT_NODE) {
            traverseAndMarkTextNodes(child)
        }
    })
}

function removeHighlightSpans(element) {
    element.querySelectorAll('span.highlight').forEach((span) => {
        const parent = span.parentNode
        parent.replaceChild(document.createTextNode(span.textContent), span)
        parent.normalize() // Combine adjacent text nodes
    })
}

function applyRandomMarking(element) {
    removeHighlightSpans(element)
    traverseAndMarkTextNodes(element)
}

export const Effector = () => {
    let element
    let interval
    const _render = () => {
        if (!element) return
    }

    const onMouseMove = (event) => {
        const rect = element.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        const distance = Math.sqrt(x * x + y * y)
        const skewX = distance / rect.width
        const skewY = distance / rect.height
        element.style.transform = `skew(${skewX}deg, ${skewY}deg)`
    }

    // expose prototype function .create
    return {
        /** @param {HTMLElement} container */
        init: (container) => {
            element = container
            // track mouse position and change the transform skew value by a tiny amount, depending on the distance from the center

            window.addEventListener('mousemove', onMouseMove)

            interval = setInterval(() => {
                // get main element
                const basicText = element.querySelector('.basic-text')
                const sideDrawer = element.querySelector('#side_drawer')
                if (basicText) {
                    // applyRandomMarking(basicText)
                }
                if (sideDrawer) {
                    applyRandomMarking(sideDrawer)
                }
            }, 100)

            // remove the event listener when the component is destroyed
            element.addEventListener('destroy', () => {
                window.removeEventListener('mousemove', onMouseMove)
                clearInterval(interval)
            })
        },
    }
}
