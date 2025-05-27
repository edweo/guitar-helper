import {Component, inject} from '@angular/core';
import {ChordsPracticeService} from '../../services/chords-pratice-service/chords-practice.service';
import {ChordsGalleryComponent} from '../chords-gallery/chords-gallery.component';
import {Chord} from '../../models/chord';

@Component({
  selector: 'app-chords-reorder',
  imports: [
    ChordsGalleryComponent
  ],
  templateUrl: './chords-reorder.component.html',
  styleUrl: './chords-reorder.component.css'
})
export class ChordsReorderComponent {

  // Services
  readonly chordsPracticeService = inject(ChordsPracticeService);

  onClickChord(chord: Chord): void {
    console.log('clicked chord:', chord.title);
  }
}
