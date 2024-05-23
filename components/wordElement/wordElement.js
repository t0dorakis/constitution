import { store } from '../state/store'

const handleHighlightClick = (type) => {
  store.getState().setVisibleScene(type)
  dispatchEvent(`highlight-${type}`, 'test')
}
// adding this function to the window object so it can be used on basic html attributes

// window.handleHighlightClick = handleHighlightClick;

export const WordElement = (word, index) => {
  const lowerCaseWord = word.toLowerCase()
  const isHuman = lowerCaseWord.includes('human') ? 'human' : false
  const isAi =
    lowerCaseWord === 'ai' || lowerCaseWord.includes('machine') ? 'ai' : false
  const type = isHuman || isAi

  const span = document.createElement('span')
  span.textContent = word + ' ' // Add space after each word
  span.dataset.index = index

  if (type) {
    span.className = `highlight-${type}`
    span.onclick = () => handleHighlightClick(type)
  }

  return span
}
