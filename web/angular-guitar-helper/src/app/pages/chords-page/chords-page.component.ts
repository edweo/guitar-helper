import {Component} from '@angular/core';
import {CHORDS_E} from '../../constants/chords/chords_e';
import {CHORDS_F} from '../../constants/chords/chords_f';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-chords-page',
  imports: [
    RouterOutlet,
  ],
  templateUrl: './chords-page.component.html',
  styleUrl: './chords-page.component.css'
})
export class ChordsPageComponent {
  protected readonly CHORDS_E = CHORDS_E;
  protected readonly CHORDS_F = CHORDS_F;

  practiceChordCardClick() {
    console.log('open practice chords')
  }
}
