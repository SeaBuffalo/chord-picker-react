import { create } from "zustand";
import { Note } from "../common/classes/Note";

interface DisplayedNotesStore {
  displayedNotes: Note[][];
  setDisplayedNotes: (notes: Note[][]) => void;
}

export const useDisplayedNotes = create<DisplayedNotesStore>((set) => ({
  displayedNotes: [],
  setDisplayedNotes: (notes) => set(() => ({ displayedNotes: notes }))
}));