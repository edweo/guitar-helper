import {Component} from '@angular/core';
import {ChordCardComponent} from '../../components/chord-card/chord-card.component';
import {CHORDS_E} from '../../constants/chords/chords_e';
import {CHORDS_F} from '../../constants/chords/chords_f';

@Component({
  selector: 'app-chords-page',
  imports: [
    ChordCardComponent,
  ],
  templateUrl: './chords-page.component.html',
  styleUrl: './chords-page.component.css'
})
export class ChordsPageComponent {
  protected readonly CHORDS_E = CHORDS_E;
  protected readonly CHORDS_F = CHORDS_F;
}
