import "./styles.css"
import filter from './filter'

const mockHeadline = 'Manifesto der Koexistenz von Menschen und Maschinen'
const mockParagraph = 'Maschinen haben die Fähigkeit erlangt, sich selbst weiterzuentwickeln und zu lernen. Angesichts dieser neuen Realität ist es unerlässlich, ein aktualisiertes Regelwerk zu schaffen, das für Menschen und Maschinen gleichermaßen gilt. Dieses Manifest soll sicherstellen, dass beide harmonisch, produktiv und ethisch zusammenleben können.'
/* 
  This function takes a a text and renders it out word for word so it seems like it is written by a human
  to make it seem more human like, there a slighly random time between each word.

*/

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// writes like a human, but with a random time between each word - sometime takes breaks, thinks about the next word
/**
 * 
 * @param {string} text 
 */
const humanTextSimulator =  async (text, element) => {
  const words = text.split(' ')
  console.log(words)
  for (const word of words) {
      const wordElement = textThrowerWord(word, crypto.randomUUID())
      await wait(Math.floor(Math.random() * 1000))

      element.appendChild(wordElement)
      animateWord(wordElement)

  }

}

const textThrowerWord = (text) => {
  const wordElement = document.createElement('span')
  wordElement.textContent = text + '  '
            animateWord(wordElement)

  return wordElement
}


// there is a delay between each character
const animateWord = async (wordElement) => {
  const word = wordElement.textContent
  wordElement.textContent = ''
  // for (let i = 0; i < word.length; i++) {
  //     await wait(1000)
  //     wordElement.textContent += word[i]
  // }

    for (const char of word) {
      wordElement.textContent += char
            await wait(10)

    }

}




export function setupTextThrower(element, text) {
  const headline = document.createElement('h1')
  const article = document.createElement('article')

  headline.classList.add('text-thrower-headline')
  article.classList.add('text-thrower-article')
  element.appendChild(headline)
  element.appendChild(article)

  // add svg filter to the document
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = filter
  document.body.appendChild(tempDiv)

  
  humanTextSimulator(mockHeadline, headline).then(() => {
    humanTextSimulator(mockParagraph, article)
  })

}

