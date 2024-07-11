// import { WordElement } from './wordElement/wordElement.js'

const createWordEl = (word) => {
    const span = document.createElement('span')
    span.textContent = word
    // add a space to this inline-block element as the normal space is not visible


    return span
}

const textSplitter = (text) => {
    const words = text.split(' ')
    const fragment = document.createDocumentFragment()
    words.forEach((word, index) => {
        fragment.appendChild(createWordEl(word))
    })
    return fragment
}

export { textSplitter }
