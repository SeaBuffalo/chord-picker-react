import { create } from "zustand";
import { Note } from "../common/classes/Note";

interface SelectedNoteStore {
  selectedNotes: Note[];
  addNote: (note: Note) => void;
  removeNote: (note: Note) => void;
};

export const useSelectedNotes = create<SelectedNoteStore>((set) => ({
  selectedNotes: [],
  addNote: (note) =>
    set((state) => ({ selectedNotes: [...state.selectedNotes, note] })),
  removeNote: (note) =>
    set((state) => ({
      selectedNotes: state.selectedNotes.filter((n: Note) => {
        n.noteId !== note.noteId;
      }),
    })),
}));
