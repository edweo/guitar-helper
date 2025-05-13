import {GuitarNote} from './guitarNote';
import {GuitarFinger} from './guitar_finger';

/**
 * Represents the state of barre frets on a guitar.
 *
 * @type {BarreFrets}
 * @property {Barre} 0 - barre on fret 1.
 * @property {Barre} 2 - barre on fret 2.
 * @property {Barre} 2 - barre on fret 3.
 * @property {Barre} 3 - barre on fret 4.
 * @property {Barre} 4 - barre on fret 5.
 */
export type BarreFrets = [
  Barre | null,
  Barre | null,
  Barre | null,
  Barre | null,
  Barre | null,
]

/**
 * Starting from the e note towards E
 */
export interface Barre {
  startNote: GuitarNote,
  endNote: GuitarNote,
  fingerNumber: GuitarFinger,
}

