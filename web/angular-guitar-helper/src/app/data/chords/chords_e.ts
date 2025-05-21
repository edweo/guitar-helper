import {FretNote} from '../../models/fret_note';
import {Chord} from '../../models/chord';
import {FretPushed} from '../../models/fret_pushed';
import {ChordAddition} from '../../models/chord_open_close';
import {GuitarFinger} from '../../models/guitar_finger';

export const CHORDS_E: Chord[] = [
  {
    title: 'E',
    chordOpenClose: [
      ChordAddition.OPEN_NOTE,
      ChordAddition.NO_CHANGE,
      ChordAddition.NO_CHANGE,
      ChordAddition.NO_CHANGE,
      ChordAddition.OPEN_NOTE,
      ChordAddition.OPEN_NOTE
    ],
    pushedFretNotes: new Map<FretNote, FretPushed>([
      [FretNote.f1_G, {fretNote: FretNote.f1_G, fingerNumber: GuitarFinger.INDEX}],
      [FretNote.f2_A, {fretNote: FretNote.f2_A, fingerNumber: GuitarFinger.MIDDLE}],
      [FretNote.f2_D, {fretNote: FretNote.f2_D, fingerNumber: GuitarFinger.RING}],
    ]),
    barreFrets: [
      null,
      null,
      null,
      null,
      null,
    ],
    fretStartingReference: 1,
  },
  {
    title: 'Em',
    chordOpenClose: [
      ChordAddition.OPEN_NOTE,
      ChordAddition.NO_CHANGE,
      ChordAddition.NO_CHANGE,
      ChordAddition.OPEN_NOTE,
      ChordAddition.OPEN_NOTE,
      ChordAddition.OPEN_NOTE
    ],
    pushedFretNotes: new Map<FretNote, FretPushed>([
      [FretNote.f2_A, {fretNote: FretNote.f2_A, fingerNumber: GuitarFinger.INDEX}],
      [FretNote.f2_D, {fretNote: FretNote.f2_D, fingerNumber: GuitarFinger.MIDDLE}],
    ]),
    barreFrets: [
      null,
      null,
      null,
      null,
      null,
    ],
    fretStartingReference: 1,
  },
  {
    title: 'Emaj7',
    chordOpenClose: [
      ChordAddition.OPEN_NOTE,
      ChordAddition.NO_CHANGE,
      ChordAddition.NO_CHANGE,
      ChordAddition.NO_CHANGE,
      ChordAddition.OPEN_NOTE,
      ChordAddition.OPEN_NOTE
    ],
    pushedFretNotes: new Map<FretNote, FretPushed>([
      [FretNote.f1_D, {fretNote: FretNote.f1_D, fingerNumber: GuitarFinger.INDEX}],
      [FretNote.f1_G, {fretNote: FretNote.f1_G, fingerNumber: GuitarFinger.MIDDLE}],
      [FretNote.f2_A, {fretNote: FretNote.f2_A, fingerNumber: GuitarFinger.RING}],
    ]),
    barreFrets: [
      null,
      null,
      null,
      null,
      null,
    ],
    fretStartingReference: 1,
  },
]
