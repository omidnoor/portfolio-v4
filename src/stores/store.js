import { create } from "zustand";

export const useStore = create((set) => ({
  activeFrame: { name: "" },
  activeFrames: [],
  htmlClicked: false,
  isLetsTalk: false,
  isMenuClicked: false,
  isSceneClicked: false,
  project: 1,
  activeButton: { name: "" },
  activeMenuButton: "",

  setActiveMenuButton: (name) =>
    set((state) => ({ ...state, activeMenuButton: name })),
  setIsSceneClicked: (isSceneClicked) =>
    set((state) => ({ ...state, isSceneClicked })),
  setActiveButton: (name) =>
    set((state) => {
      return { ...state, activeButton: name };
    }),

  setActiveFrame: (name) =>
    set((state) => {
      return { ...state, activeFrame: name };
    }),

  setActiveFrames: (frames) =>
    set((state) => ({
      ...state,
      activeFrames: [...state.activeFrames, frames],
    })),

  setProject: (project) => set((state) => ({ ...state, project })),

  setIsMenuClicked: (isMenuClicked) =>
    set((state) => ({ ...state, isMenuClicked })),

  setHtmlClicked: (htmlClicked) => set((state) => ({ ...state, htmlClicked })),

  setIsLetsTalk: (isLetsTalk) => set((state) => ({ ...state, isLetsTalk })),
}));
