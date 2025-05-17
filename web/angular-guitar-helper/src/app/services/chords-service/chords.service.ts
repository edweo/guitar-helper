import {Injectable, signal} from '@angular/core';
import {Chord} from '../../models/chord';
import {CHORDS_E} from '../../constants/chords/chords_e';

@Injectable({
  providedIn: 'root'
})
export class ChordsService {

  // A B C D G E F

  readonly CHORDS_E = signal<Chord[]>(CHORDS_E)

  constructor() { }
}
