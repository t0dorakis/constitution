// Utility function to wait for a given amount of milliseconds
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const wildnessLevel = 0

// Function to simulate human typing with optional spans for each character
const humanTextSimulator = async (text, element, wrapInSpans = false) => {
    for (let i = 0; i < text.length; i++) {
        let char = text[i]

        // Simulate errors based on wildness level
        if (Math.random() < wildnessLevel / 20) {
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

        await wait(Math.random() * 150) // Random delay between each character
    }
}

// Function to animate elements while preserving HTML structure
const streamElements = async (elementArray, container) => {
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
                linkElement.href = child.href
                linkElement.className = child.className // Preserve class
                newElement.appendChild(linkElement)
                await humanTextSimulator(child.textContent, linkElement, true)
            }
        }
    }
}
