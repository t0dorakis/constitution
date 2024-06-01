import { WordElement } from './wordElement/wordElement.js'

const textSplitter = (text) => {
  const words = text.split(' ')
  const fragment = document.createDocumentFragment()
  words.forEach((word, index) => {
    fragment.appendChild(WordElement(word, crypto.randomUUID()))
  })
  return fragment
}

export { textSplitter }
