import {Chord} from '../../models/chord';
import {ChordAddition} from '../../models/chord_open_close';
import {FretNote} from '../../models/fret_note';
import {FretPushed} from '../../models/fret_pushed';
import {GuitarFinger} from '../../models/guitar_finger';

export const CHORDS_SKELETON: Chord[] = [
  {
    id: 'aoglbia24',
    title: 'Example',
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
]
