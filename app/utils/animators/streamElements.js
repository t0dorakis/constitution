// Utility function to wait for a given amount of milliseconds
import { Link } from '../../components/Link'
import { store } from '../state/store'
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const typingDelay = 10

// Function to simulate human typing with optional spans for each character
const humanTextSimulator = async (text, element, wrapInSpans = false) => {
    const wildnessLevel = store.getState().wildernessLevel
    for (let i = 0; i < text.length; i++) {
        let char = text[i]

        // Simulate errors based on wildness level
        if (Math.random() < wildnessLevel / 500) {
            // Higher wildness level means more frequent mistakes
            if (Math.random() < 0.5 && i < text.length - 1) {
                // Flip characters
                char = text[i + 1] + text[i]
                i++
            } else {
                // Insert a random character mistake
                const possibleChars = 'abcdefghijklmnopqrstuvwxyz'
                char =
                    possibleChars[
                        Math.floor(Math.random() * possibleChars.length)
                    ]
            }
        }

        if (wrapInSpans) {
            const span = document.createElement('span')
            span.textContent = char
            element.appendChild(span)
        } else {
            element.innerHTML += char
        }

        await wait(Math.random() * typingDelay) // Random delay between each character
    }
}

// Function to animate elements while preserving HTML structure
export const streamElements = async (elementArray, container) => {
    for (const element of elementArray) {
        const newElement = document.createElement(element.tagName)
        newElement.className = element.className // Preserve class
        container.appendChild(newElement)

        for (const child of element.childNodes) {
            if (child.nodeType === Node.TEXT_NODE) {
                await humanTextSimulator(child.textContent, newElement)
            } else if (
                child.nodeType === Node.ELEMENT_NODE &&
                child.tagName === 'A'
            ) {
                const linkElement = document.createElement('a')
                linkElement.dataset.originalText = child.textContent
                linkElement.dataset.id = child.dataset.id
                linkElement.dataset.pictureId = child.dataset.pictureId
                linkElement.className = child.className // Preserve class
                newElement.appendChild(linkElement)
                await humanTextSimulator(child.textContent, linkElement, true)
            }
        }
    }

    // Attach event listeners to links after animation is done
    container.querySelectorAll('a[data-id]').forEach((link) => {
        // const originalElement = {
        //     dataset: {
        //         id: link.dataset.id,
        //     },
        //     className: link.className,
        //     textContent: link.dataset.originalText,
        // }
        const linkElement = Link(link, container)
        link.replaceWith(linkElement)
    })
}
