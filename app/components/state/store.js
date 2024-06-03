import { createStore } from 'zustand/vanilla'

const SCENES = ['human', 'ai', null]

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
}))

const { getState, setState, subscribe, getInitialState } = store

export { store }
