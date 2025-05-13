/**
 * Represents the state of open frets on a guitar.
 *
 * @type {ClosedNotes}
 * @property {boolean} 0 - Indicates if note e is open.
 * @property {boolean} 1 - Indicates if note A is open.
 * @property {boolean} 2 - Indicates if note D is open.
 * @property {boolean} 3 - Indicates if note G is open.
 * @property {boolean} 4 - Indicates if note B is open.
 * @property {boolean} 5 - Indicates if note E is open.
 */
export type ClosedNotes = [boolean, boolean, boolean, boolean, boolean, boolean];
