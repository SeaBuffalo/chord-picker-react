import { Note } from "../common/classes/Note"
import { useSelectedNotes } from "../state/selectedNotesStore";

const NoteComponent = ({ note }: { note: Note }) => {
  const addNote = useSelectedNotes((state) => state.addNote);
  const removeNote = useSelectedNotes((state) => state.removeNote);

  const selectNote = () => {
    note.isNoteSelected = !note.isNoteSelected;
    if (note.isNoteSelected) {
      addNote(note);
    } else {
      removeNote(note);
    }
  }

  return (
    <button className="note" onClick={selectNote}>
      {note.noteString}
    </button>
  )
}

export default NoteComponent;