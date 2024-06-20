import './styles.css'
import filter from './filter'
import { fetchTextByUrl } from '../textFetcher'



// Function to setup the text thrower
export async function setupTextThrower(element) {
    const fetchedText = await fetchTextByUrl('texts/start.xml')

    // Create a temporary DOM element to hold fetched HTML
    const tempElement = document.createElement('div')
    tempElement.innerHTML = fetchedText

    // Get all direct children of tempElement
    const children = Array.from(tempElement.children)

    // Append the temporary element with filter to the body
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = filter
    document.body.appendChild(tempDiv)

    // Animate the children elements
    await animateElements(children, element)
}
