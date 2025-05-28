/**
 * Represents the state of open frets on a guitar.
 *
 * @type {ChordOpenClose}
 * @property {ChordAddition} 0 - Indicates if note e is open.
 * @property {ChordAddition} 1 - Indicates if note A is open.
 * @property {ChordAddition} 2 - Indicates if note D is open.
 * @property {ChordAddition} 3 - Indicates if note G is open.
 * @property {ChordAddition} 4 - Indicates if note B is open.
 * @property {ChordAddition} 5 - Indicates if note E is open.
 */
export type ChordOpenClose = [
  ChordAddition,
  ChordAddition,
  ChordAddition,
  ChordAddition,
  ChordAddition,
  ChordAddition
];

export enum ChordAddition {
  MUTED_NOTE,
  OPEN_NOTE,
  NO_CHANGE
}
