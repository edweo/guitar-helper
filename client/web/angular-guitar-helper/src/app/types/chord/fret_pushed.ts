import {FretNote} from './fret_note';
import {GuitarFinger} from '../guitar_finger';

export interface FretPushed {
  fretNote: FretNote,
  fingerNumber: GuitarFinger
}
