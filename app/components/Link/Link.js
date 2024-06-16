import { simpleAppend, sideDrawerAppend } from '../../utils/appendors'
import './style.css'

const handleClick = (type, id, container) => {
    switch (type) {
        case 'simpleAppend':
            simpleAppend(id, container)
            break
        case 'sideDrawer':
            sideDrawerAppend(id)
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
        handleClick(type, originalElement.dataset.id, container)
    })
    return originalElement
}
