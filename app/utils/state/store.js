import { createStore } from 'zustand/vanilla'

const SCENES = ['human', 'ai', null]

const mockedSideNote = document.createElement('div')
mockedSideNote.innerHTML = `<p> Test </p>`

const store = createStore((set) => ({
    visibleScene: null,
    setVisibleScene: (type) => set((state) => ({ visibleScene: type })),
    clearVisibleScene: () => set((state) => ({ visibleScene: null })),
    zoom: {
        x: 0,
        y: 0,
        level: 0,
    },
    setZoom: (zoom) => set((state) => ({ zoom })),
    wildernessLevel: 0,
    increaseWildernessLevel: () =>
        set((state) => ({ wildernessLevel: state.wildernessLevel + 1 })),
    sideNotes: [],
    /**
     * @param {HTMLElement} element
     */
    addSideNote: (element) =>
        set((state) => ({ sideNotes: [...state.sideNotes, element] })),
}))

const { getState, setState, subscribe, getInitialState } = store

export { store }
