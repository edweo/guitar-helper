import {Component} from '@angular/core';
import {ChordCardComponent} from '../../components/chord-card/chord-card.component';
import {Chord} from '../../../models/chord';
import {CHORDS_E} from '../../constants/chords';

@Component({
  selector: 'app-chords-page',
  imports: [
    ChordCardComponent,
  ],
  templateUrl: './chords-page.component.html',
  styleUrl: './chords-page.component.css'
})
export class ChordsPageComponent {

  chordCards: Chord[] = CHORDS_E
}
