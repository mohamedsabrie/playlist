import { atom } from "recoil";

export const playlistIdAtom = atom({
  key: "playlistIdAtom",
  default: "",
});

export const playlistAtom = atom({
  key: "playlistAtom",
  default: null,
});
export const playlistsAtom = atom({
  key: "playlistsAtom",
  default: [],
});
export const isPlayingAtom = atom({
  key: "isPlayingAtom",
  default: false,
});
export const currentTrackIdAtom = atom({
  key: "currentTrackIdAtom",
  default: null,
});
