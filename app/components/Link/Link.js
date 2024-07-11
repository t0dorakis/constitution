import {
    simpleAppend,
    sideDrawerAppend,
    inParagraphAppend,
    pictureAppend,
    videoAppend,
} from '../../utils/appendors'
import './style.css'
import { store } from '../../utils/state/store'

const handleClick = (type, element, container) => {
    const id = element.dataset.id
    const pictureId = element.dataset.pictureId
    const sideDrawerId = element.dataset.sideDrawerId

    switch (type) {
        case 'simpleAppend':
            simpleAppend(id, container)
            break
        case 'sideDrawer':
            sideDrawerAppend(id)
            break
        case 'inParagraphAppend':
            inParagraphAppend(id, element, container)
            break
        case 'pictureAppend':
            pictureAppend(id, element, container)
            break
        case 'inParagraphAppend+pictureAppend':
            console.log(pictureId)
            inParagraphAppend(id, element, container)
            pictureAppend(pictureId, element, container)
            break
        case 'inParagraphAppend+pictureAppend+sideDrawer':
            inParagraphAppend(id, element, container)
            pictureAppend(pictureId, element, container)
            sideDrawerAppend(id)
            break
        case 'inParagraphAppend+videoAppend':
            inParagraphAppend(id, element, container)
            videoAppend(pictureId || id, element, container)
            break
        case 'videoAppend':
            videoAppend(pictureId || id, element, container)
            break
        default:
            simpleAppend(id, container)
    }
}

const getType = (classList) => {
    const pictureAppend = classList.contains('pictureAppend')
    const inParagraphAppend = classList.contains('inParagraphAppend')
    const sideDrawer = classList.contains('sideDrawer')
    const videoAppend = classList.contains('videoAppend')
    console.log(pictureAppend, inParagraphAppend, sideDrawer)

    if (sideDrawer && inParagraphAppend && pictureAppend) {
        console.log('inParagraphAppend+pictureAppend+sideDrawer')
        return 'inParagraphAppend+pictureAppend+sideDrawer'
    }
    if (videoAppend && inParagraphAppend) {
        return 'inParagraphAppend+videoAppend'
    }
    if (pictureAppend && inParagraphAppend) {
        return 'inParagraphAppend+pictureAppend'
    }

    return classList[0]
}

/**
 * @param {HTMLElement} originalElement
 * @returns {HTMLElement}
 */
export const Link = (originalElement, container) => {
    console.log('CLASS LIST', originalElement.classList)
    const type = getType(originalElement.classList)
    originalElement.addEventListener('click', (e) => {
        // increase wilderness level
        store.getState().increaseWildernessLevel()

        // if it was already visited, return
        if (originalElement.classList.contains('visited')) return
        // add the visited pseudo class to the link
        originalElement.classList.add('visited')
        e.preventDefault()
        handleClick(type, originalElement, container)
    })
    return originalElement
}
