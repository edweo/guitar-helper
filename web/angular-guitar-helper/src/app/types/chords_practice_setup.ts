import {Chord} from '../models/chord';

export interface ChordsPracticeSetup {
  name?: string
  chords: Set<Chord>
}
