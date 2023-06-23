import { create } from "zustand";

export const useStore = create((set) => ({
  isClicked: false,
  activeButton: { id: "", coordination: {} },

  setActiveButton: (id, coordination) =>
    set((state) => ({
      ...state,
      activeButton: { id: id, coordination: coordination },
    })),
  setIsClicked: (isClicked) => set((state) => ({ ...state, isClicked })),
}));
