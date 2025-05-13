import {FretNote} from '../../models/fret_note';
import {Chord} from '../../models/chord';
import {FretPushed} from '../../models/fret_pushed';

export const CHORDS_E: Chord[] = [
  {
    title: 'E',
    closedNotes: undefined,
    pushedFretNotes: new Map<FretNote, FretPushed>([
      [FretNote.f1_G, {fretNote: FretNote.f1_G, number: 1}],
      [FretNote.f2_A, {fretNote: FretNote.f2_A, number: 2}],
      [FretNote.f2_D, {fretNote: FretNote.f2_D, number: 3}],
    ])
  },
  {
    title: 'Em',
    closedNotes: undefined,
    pushedFretNotes: new Map<FretNote, FretPushed>([
      [FretNote.f2_A, {fretNote: FretNote.f2_A, number: 1}],
      [FretNote.f2_D, {fretNote: FretNote.f2_D, number: 2}],
    ])
  },
  {
    title: 'Emaj7',
    closedNotes: [true, false, true, false, true, false],
    pushedFretNotes: new Map<FretNote, FretPushed>([
      [FretNote.f1_D, {fretNote: FretNote.f1_D, number: 1}],
      [FretNote.f1_G, {fretNote: FretNote.f1_G, number: 2}],
      [FretNote.f2_A, {fretNote: FretNote.f2_A, number: 3}],
    ])
  },
]
