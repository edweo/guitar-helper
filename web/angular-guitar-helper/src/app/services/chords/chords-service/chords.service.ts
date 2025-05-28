import {Injectable, signal, WritableSignal} from '@angular/core';
import {CHORDS_E} from '../../../data/chords/chords_e';
import {ChordGroup} from '../../../types/chord_group';
import {CHORDS_F} from '../../../data/chords/chords_f';
import {DefaultChordGroups} from '../../../types/default_chord_groups';
import {toObservable} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ChordsService {
  // Default chord groups
  readonly chordGroupsDefault = new Map<string, WritableSignal<ChordGroup>>
  readonly keysChordGroupsDefault = signal<string[]>([])
  readonly keysChordGroupsDefault$ = toObservable(this.keysChordGroupsDefault)

  // Custom chord groups
  readonly chordGroupsCustom = new Map<string, WritableSignal<ChordGroup>>
  readonly keysChordGroupsCustom = signal<string[]>([])
  readonly keysChordGroupsCustom$ = toObservable(this.keysChordGroupsCustom)

  constructor() {
     // Default chord groups - A B C D E F G
    this._addChordGroupDefault({name: DefaultChordGroups.CHORDS_A, chords: []})
    this._addChordGroupDefault({name: DefaultChordGroups.CHORDS_B, chords: []})
    this._addChordGroupDefault({name: DefaultChordGroups.CHORDS_C, chords: []})
    this._addChordGroupDefault({name: DefaultChordGroups.CHORDS_D, chords: []})
    this._addChordGroupDefault({name: DefaultChordGroups.CHORDS_E, chords: CHORDS_E})
    this._addChordGroupDefault({name: DefaultChordGroups.CHORDS_F, chords: CHORDS_F})
    this._addChordGroupDefault({name: DefaultChordGroups.CHORDS_G, chords: []})

    // TODO Custom user chord groups fetch
  }

  addChordGroupCustom(chordGroup: ChordGroup) {
    this._addChordGroup(chordGroup, this.chordGroupsCustom, this.keysChordGroupsCustom)
  }

  getChordGroupCustom(groupName: string): Readonly<WritableSignal<ChordGroup>> | undefined {
    return this.chordGroupsCustom.get(groupName)
  }

  getChordGroupDefault(groupName: string): Readonly<WritableSignal<ChordGroup>> | undefined {
    return this.chordGroupsDefault.get(groupName)
  }

  private _addChordGroup(
    chordGroup: ChordGroup,
    groups: Map<string, WritableSignal<ChordGroup>>,
    keys: WritableSignal<string[]>
  ) {
    if (groups.has(chordGroup.name)) return

    // Add new signal for group of chords for auto updates
    groups.set(
      chordGroup.name,
      signal({
        name: chordGroup.name,
        chords: chordGroup.chords
      })
    )

    // Add key entry
    keys.update(current => {
      return [...current, chordGroup.name]
    })
  }

  private _addChordGroupDefault(chordGroup: ChordGroup) {
    this._addChordGroup(chordGroup, this.chordGroupsDefault, this.keysChordGroupsDefault)
  }
}
