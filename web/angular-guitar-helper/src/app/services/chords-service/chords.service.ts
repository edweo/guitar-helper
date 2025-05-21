import {Injectable, signal, WritableSignal} from '@angular/core';
import {CHORDS_E} from '../../data/chords/chords_e';
import {ChordGroup} from '../../types/chord_group';
import {CHORDS_F} from '../../data/chords/chords_f';
import {DefaultChordGroups} from '../../types/default_chord_groups';

@Injectable({
  providedIn: 'root'
})
export class ChordsService {

  // TODO refactor into default groups and custom user chord groups

  readonly chordsGroupEntries = signal<Array<string>>([])
  private readonly chordGroups = new Map<string, WritableSignal<ChordGroup>>

  private readonly test = signal<boolean>(true)

  constructor() {
     // Default chord groups - A B C D E F G
    this._addChordGroupDefault({name: DefaultChordGroups.CHORDS_A, chords: []})
    this._addChordGroupDefault({name: DefaultChordGroups.CHORDS_B, chords: []})
    this._addChordGroupDefault({name: DefaultChordGroups.CHORDS_C, chords: []})
    this._addChordGroupDefault({name: DefaultChordGroups.CHORDS_D, chords: []})
    this._addChordGroupDefault({name: DefaultChordGroups.CHORDS_E, chords: CHORDS_E})
    this._addChordGroupDefault({name: DefaultChordGroups.CHORDS_F, chords: CHORDS_F})
    this._addChordGroupDefault({name: DefaultChordGroups.CHORDS_G, chords: []})

    // Custom user chord groups
  }

  private _addChordGroupDefault(chordGroup: ChordGroup) {
    if (this.chordGroups.has(chordGroup.name)) return

    // Add new signal for group of chords for auto updates
    this.chordGroups.set(
      chordGroup.name,
      signal({
        name: chordGroup.name,
        chords: chordGroup.chords
      })
    )
  }

  addChordGroup(chordGroup: ChordGroup) {
    if (this.chordGroups.has(chordGroup.name)) return

    // Add new group name entry and sort in ascending order
    this.chordsGroupEntries.update(current => {
      return [...current, chordGroup.name].sort()
    })

    // Add new signal for group of chords for auto updates
    this.chordGroups.set(
      chordGroup.name,
      signal({
        name: chordGroup.name,
        chords: chordGroup.chords
      })
    )
  }

  getChordGroup(groupName: string): Readonly<WritableSignal<ChordGroup>> | undefined {
    return this.chordGroups.get(groupName)
  }
}
