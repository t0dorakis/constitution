import { store } from '../../utils/state/store'

export const HeroText = () => {
    const _render = () => {
        const heroText = document.querySelector('.hero-text')
        heroText.innerHTML = `
            How to Co-Exist
<br/> Harmoniously
        `

        if (store.getState().wildernessLevel > 3) {
            heroText.style.minHeight = '240px'
            heroText.innerHTML = `
            How to Co-Exist <s>Harmoniously</s> Hormonally
<br/> 
        `
        }
    }
    return {
        /** @param {HTMLElement} container */
        init: (container) => {
            _render()
            store.subscribe(({ wildernessLevel }) => {
                console.log('WILDNESS LEVEL SUB', wildernessLevel)
                _render()
            })
        },
    }
}
