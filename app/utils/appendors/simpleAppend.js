import { streamElements } from '../animators'
import { fetchTextByUrl } from '../textFetcher'
import { store } from '../state/store'

// Function to fetch new content and append it to the container
export const simpleAppend = async (id, container) => {
    const wildernessLevel = store.getState().wildernessLevel
    const fetchedText = await fetchTextByUrl('texts/level-1/' + id + '.xml')

    // Create a temporary DOM element to hold fetched HTML
    const tempElement = document.createElement('div')
    tempElement.innerHTML = fetchedText

    // Get all direct children of tempElement
    const children = Array.from(tempElement.children)

    // Animate the new children elements
    await streamElements(children, container)
}
