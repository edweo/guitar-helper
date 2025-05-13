import {ClosedNotes} from './closed_notes';
import {FretPushed} from './fret_pushed';
import {FretNote} from './fret_note';

export interface Chord {
  title: string
  closedNotes: ClosedNotes | undefined,
  pushedFretNotes: Map<FretNote, FretPushed>
}
