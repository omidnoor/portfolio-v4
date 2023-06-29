import { create } from "zustand";

export const useStore = create((set) => ({
  activeFrame: { name: "" },
  activeFrames: [],
  htmlClicked: false,
  isLetsTalk: false,
  isMenuClicked: false,
  project: 1,

  setActiveFrames: (frames) =>
    set((state) => ({
      ...state,
      activeFrames: [...state.activeFrames, frames],
    })),

  setProject: (project) => set((state) => ({ ...state, project })),

  setIsMenuClicked: (isMenuClicked) =>
    set((state) => ({ ...state, isMenuClicked })),

  setActiveFrame: (frame) =>
    set((state) => {
      return { ...state, activeFrame: frame };
    }),

  setHtmlClicked: (htmlClicked) => set((state) => ({ ...state, htmlClicked })),

  setIsLetsTalk: (isLetsTalk) => set((state) => ({ ...state, isLetsTalk })),
}));
