import {Injectable, signal} from '@angular/core';
import {ChordsPracticeSetup} from '../../types/chords_practice_setup';
import {Chord} from '../../models/chord';

@Injectable({
  providedIn: 'root'
})
export class ChordsPracticeService {

  readonly practiceSetup = signal<ChordsPracticeSetup>({
    name: '',
    chords: []
  })

  setChords(chords: Chord[]): void {
    if (chords.length < 3) {
      throw new Error('At least 3 chords are required for practice.');
    }
    this.practiceSetup.update(setup => ({
      chords: chords,
    }));
  }
}
