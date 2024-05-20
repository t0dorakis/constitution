import { createStore } from "zustand/vanilla";

const SCENES = ["human", "ai", null];

const store = createStore((set) => ({
  visibleScene: null,
  setVisibleScene: (type) => set((state) => ({ visibleScene: type })),
  clearVisibleScene: () => set((state) => ({ visibleScene: null })),
}));

const { getState, setState, subscribe, getInitialState } = store;

export default store;
