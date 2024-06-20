import { store } from '../../utils/state/store'
import './style.css'

export const SideDrawer = () => {
    let element
    const _render = () => {
        if (!element) return
        // clear the element
        element.innerHTML = ''
        // testButton(element)

        const sideNotes = store.getState().sideNotes

        // if there are notes add the class 'has-notes'
        if (sideNotes.length > 0) {
            element.classList.add('has-notes')
        }
        // add the notes
        for (const note of sideNotes) {
            element.appendChild(note)
        }
    }

    // rerenders the component whenever the state changes
    store.subscribe(({ sideNotes }) => {
        _render()
    })
    // expose prototype function .create
    return {
        /** @param {HTMLElement} container */
        init: (container) => {
            element = container
            container.classList.add('side-drawer')
            _render()
        },
    }
}
