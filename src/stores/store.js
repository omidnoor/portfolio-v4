import { create } from "zustand";

export const useStore = create((set) => ({
  activeFrame: { name: "" },
  activeFrames: [],
  frameHovered: false,
  htmlClicked: false,
  isMenuClicked: false,
  isSceneClicked: false,
  project: 1,
  activeButton: { name: "" },
  activeMenuButton: "",
  geoNormalArray: [{}],
  arrowButton: "",
  arrowCount: 0,
  dollyCount: 0,
  plateClicked: false,
  lastClick: "",
  backClicked: false,
  imageClicked: false,
  noteClicked: false,
  isContentIcons: false,
  frameRef: [],
  plateRef: [],

  isChatClicked: false,
  messages: [{ role: "", content: "" }],
  isChatLoading: false,

  setIsChatLoading: (value) => set((state) => ({ isChatLoading: value })),
  setMessages: (value) =>
    set((state) => ({ messages: [value, ...state.messages] })),
  setIsChatClicked: (value) => set((state) => ({ isChatClicked: value })),
  setFrameHovered: (value) => set((state) => ({ frameHovered: value })),

  setPlateRef: (ref) =>
    set((state) => {
      if (!state.plateRef.some((item) => item?.name === ref?.name)) {
        const array = [...state.plateRef, ref];
        return {
          plateRef: array,
        };
      }
      return state;
    }),

  setFrameRef: (ref) =>
    set((state) => {
      if (!state.frameRef.some((item) => item?.name === ref?.name)) {
        const array = [...state.frameRef, ref];
        return {
          frameRef: array,
        };
      }
      return state;
    }),
  setIsContentIcons: (value) => set((state) => ({ isContentIcons: value })),
  setNoteClicked: (value) => set((state) => ({ noteClicked: value })),
  setImageClicked: (value) => set((state) => ({ imageClicked: value })),
  setBackClicked: (value) => set((state) => ({ backClicked: value })),
  setLastClick: (value) => set((state) => ({ lastClick: value })),
  setPlateClicked: (value) => set((state) => ({ plateClicked: value })),
  setDollyCount: (count) => set((state) => ({ dollyCount: count })),
  dockHovered: false,
  setDockHovered: (value) => set((state) => ({ dockHovered: value })),
  dockWidth: 0,
  setDockWidth: (width) => set((state) => ({ dockWidth: width })),
  dockDisabled: false,
  setDockDisabled: () => {},
  setIsDockZooming: () => {},
  dockZoomLevel: false,

  setArrowCount: (count) => set((state) => ({ ...state, arrowCount: count })),
  setArrowButton: (name) => set((state) => ({ ...state, arrowButton: name })),
  setGeoNormalArray: (name, normal) =>
    set((state) => {
      if (!state.geoNormalArray.some((item) => item.name === name)) {
        const newObject = { name: name, normal: normal };
        const newArray = [...state.geoNormalArray, newObject];
        return {
          ...state,
          geoNormalArray: newArray,
        };
      }
      return state;
    }),
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

  mode: false,
  setMode: (mode) => set((state) => ({ ...state, mode: mode })),

  isLetsTalk: false,
  setIsLetsTalk: (isLetsTalk) => set((state) => ({ ...state, isLetsTalk })),

  isServices: false,
  setIsServices: (isServices) => set((state) => ({ ...state, isServices })),

  width: 1000,
  setWidth: (width) => set((state) => ({ ...state, width })),

  isDragging: false,
  setIsDragging: (isDragging) => set((state) => ({ ...state, isDragging })),

  question: "",
  setQuestion: (question) => set((state) => ({ ...state, question })),
}));
