import {ChordOpenClose} from './chord_open_close';
import {FretPushed} from './fret_pushed';
import {FretNote} from './fret_note';
import {BarreFrets} from './barre_frets';

export interface Chord {
  id: string,
  title: string,
  chordOpenClose: ChordOpenClose,
  pushedFretNotes: Map<FretNote, FretPushed>,
  barreFrets: BarreFrets,
  fretStartingReference: number,
}
