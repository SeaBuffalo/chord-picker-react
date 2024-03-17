import { useEffect, useState } from "react";
import { Note } from "../common/classes/Note";
import { NoteLetter } from "../common/types/NoteLetter";
import NoteComponent from "./NoteComponent";
import { useSelectedNotes } from "../state/selectedNotesStore";
import { useDisplayedNotes } from "../state/displayedNotesStore";

const Fretboard = () => {
  const [baseFret, setBaseFret] = useState(0);
  const [fretCount, setFretCount] = useState(6);
  const [tuning, setTuning] = useState<NoteLetter[]>([
    "E",
    "A",
    "D",
    "G",
    "B",
    "E",
  ]);
  // const [displayedNotes, setDisplayedNotes] = useState<Note[][]>([]);
  const [uniqueNotes, setUniqueNotes] = useState<Note[]>([]);
  // const [intervals, setIntervals] = useState<Interval[]>([]);
  const [root, setRoot] = useState<Note>();
  // const [chord, setChord] = useState<Chord>();

  const displayedNotes = useDisplayedNotes((state) => state.displayedNotes);
  const setDisplayedNotes = useDisplayedNotes(
    (state) => state.setDisplayedNotes
  );
  const selectedNotes = useSelectedNotes((state) => state.selectedNotes);

  useEffect(() => {
    console.log(selectedNotes);
  }, [selectedNotes]);

  useEffect(() => {
    generateFretboard();
  }, [tuning, baseFret, fretCount]);

  const generateFretboard = (): void => {
    setDisplayedNotes([]);
    for (let i = 0; i < fretCount; i++) {
      const row: Note[] = [];
      for (let k = 0; k < 6; k++) {
        row.push(
          new Note({
            stringPosition: k,
            fret: baseFret + i,
            stringRoot: tuning[k],
          })
        );
      }
      setDisplayedNotes([...displayedNotes, row]);
    }
  };

  return (
    <section>
      {displayedNotes.map((row, i) => (
        <div key={i} className="row">
          {row.map((note, k) => (
            <NoteComponent key={k} note={note} />
          ))}
        </div>
      ))}
    </section>
  );
};

export default Fretboard;
