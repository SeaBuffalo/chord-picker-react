import { NoteLetter } from "../types/NoteLetter";
import { NoteArgs } from "../interfaces/NoteArgs";
import { isValidNote, getEnumKeyFromValue } from "../utils/commonUtils";
import { NoteValue } from "../enums/NoteValue";

export class Note {
  readonly stringPosition: number;
  readonly fret: number;
  readonly stringRoot: NoteLetter;
  readonly noteValue: number;
  readonly noteString: NoteLetter;
  public isRoot: boolean = false;
  public hasInlay: boolean = false;
  public is12Fret: boolean = false;
  public isNoteSelected: boolean = false;
  public noteId: string | null = null;

  constructor({ stringPosition, fret, stringRoot }: NoteArgs) {
    if (!isValidNote(stringRoot)) {
      const error: string =
        'Something went wrong. Invalid string root note provided to note constructor.';
      alert(error);
      throw new Error(error);
    }

    this.stringPosition = stringPosition;
    this.stringRoot = stringRoot;
    this.fret = fret;
    if (
      this.fret == 3 ||
      this.fret == 5 ||
      this.fret == 7 ||
      this.fret == 9 ||
      this.fret == 15 ||
      this.fret == 17
    ) {
      this.hasInlay = true;
    }
    this.is12Fret = this.fret == 12;
    this.noteValue = NoteValue[this.stringRoot as keyof typeof NoteValue];

    for (let i = 0; i < fret; i++) {
      if (this.noteValue != 11) {
        this.noteValue++;
      } else {
        this.noteValue = 0;
      }
    }

    this.noteString = this.getNoteLetterFromValue(this.noteValue);
  }

  private getNoteLetterFromValue(val: number): NoteLetter {
    return getEnumKeyFromValue(NoteValue, val) as NoteLetter;
  }

  public deselectNoteExplicitly(): void {
    this.isNoteSelected = false;
  }

}
