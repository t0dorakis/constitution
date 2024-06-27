import { fetchTextByUrl } from '../textFetcher'
import { streamElements } from '../animators'
import { store } from '../state/store'
// Function to fetch new content and append it after the clicked element

export const inParagraphAppend = async (url, clickedElement, container) => {
    const id = clickedElement.dataset.id
    const wildernessLevel = store.getState().wildernessLevel
    const fetchedText = await fetchTextByUrl('texts/level-1/' + id + '.xml')

    // Create a temporary DOM element to hold fetched HTML
    const tempElement = document.createElement('div')
    tempElement.innerHTML = fetchedText

    // Get all direct children of tempElement
    const children = Array.from(tempElement.children)

    // create a div element to be placed after the clicked element
    const newElement = document.createElement('div')
    newElement.classList.add('inside-paragraph-container')

    // insert the new element after the clicked element
    clickedElement.parentNode.insertBefore(
        newElement,
        clickedElement.nextSibling,
    )

    // Animate the new children elements
    await streamElements(children, newElement)
}
