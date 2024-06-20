import {
    simpleAppend,
    sideDrawerAppend,
    inParagraphAppend,
} from '../../utils/appendors'
import './style.css'

const handleClick = (type, element, container) => {
    const id = element.dataset.id
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
        default:
            simpleAppend(id, container)
    }
}

const getType = (classList) => {
    switch (classList[0]) {
        case 'simpleAppend':
            return 'simpleAppend'
        case 'sideDrawer':
            return 'sideDrawer'
        case 'inParagraphAppend':
            return 'inParagraphAppend'
        default:
            return 'simpleAppend'
    }
}

/**
 * @param {HTMLElement} originalElement
 * @returns {HTMLElement}
 */
export const Link = (originalElement, container) => {
    const type = getType(originalElement.classList)
    originalElement.addEventListener('click', (e) => {
        // if it was already visited, return
        if (originalElement.classList.contains('visited')) return
        // add the visited pseudo class to the link
        originalElement.classList.add('visited')
        e.preventDefault()
        handleClick(type, originalElement, container)
    })
    return originalElement
}
