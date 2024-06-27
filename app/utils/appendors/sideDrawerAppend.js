import { fetchTextByUrl } from '../textFetcher'
import { store } from '../state/store'

// Function to fetch new content and append it to the container
export const sideDrawerAppend = async (id) => {
    // const wildernessLevel = store.getState().wildernessLevel
    const fetchedText = await fetchTextByUrl('texts/sideNotes/' + id + '.xml')
    // Create a temporary DOM element to hold fetched HTML
    const tempElement = document.createElement('div')
    tempElement.classList.add('side-note')
    tempElement.innerHTML = fetchedText
    store.getState().addSideNote(tempElement)
}
