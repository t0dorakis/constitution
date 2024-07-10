import './style.css'
import { dispatchEvent, events } from '../eventBus/eventBus'

export const HelpButton = () => {
    const callHelp = () => {
        dispatchEvent(events.callHelp)
        console.log('HELP')
    }
    return {
        /** @param {HTMLElement} container */
        init: (container) => {
            const helpButton = document.createElement('button')
            helpButton.innerHTML = '?'
            helpButton.classList.add('help-button')
            helpButton.onclick = () => {
                callHelp()
            }
            container.appendChild(helpButton)
        },
    }
}
