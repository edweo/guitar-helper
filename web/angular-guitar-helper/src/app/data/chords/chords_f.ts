import {FretNote} from '../../models/fret_note';
import {Chord} from '../../models/chord';
import {FretPushed} from '../../models/fret_pushed';
import {GuitarNote} from '../../models/guitarNote';
import {ChordAddition} from '../../models/chord_open_close';
import {GuitarFinger} from '../../models/guitar_finger';

export const CHORDS_F: Chord[] = [
  {
    id: 'fosfang',
    title: 'F',
    chordOpenClose: [
      ChordAddition.NO_CHANGE,
      ChordAddition.NO_CHANGE,
      ChordAddition.NO_CHANGE,
      ChordAddition.NO_CHANGE,
      ChordAddition.NO_CHANGE,
      ChordAddition.NO_CHANGE
    ],
    pushedFretNotes: new Map<FretNote, FretPushed>([
      [FretNote.f2_G, {fretNote: FretNote.f2_G, fingerNumber: GuitarFinger.MIDDLE}],
      [FretNote.f3_D, {fretNote: FretNote.f3_D, fingerNumber: GuitarFinger.RING}],
      [FretNote.f3_A, {fretNote: FretNote.f3_A, fingerNumber: GuitarFinger.PINKY}],
    ]),
    barreFrets: [
      {startNote: GuitarNote.A, endNote: GuitarNote.E, fingerNumber: GuitarFinger.INDEX},
      null,
      null,
      null,
      null,
    ],
    fretStartingReference: 1,
  },
]
