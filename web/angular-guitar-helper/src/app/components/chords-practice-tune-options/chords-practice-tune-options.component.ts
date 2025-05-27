import {Component, inject} from '@angular/core';
import {ChordCardComponent} from '../chord-card/chord-card.component';
import {ChordsTuneMenuGroupComponent} from '../chords-tune-menu-group/chords-tune-menu-group.component';
import {SliderBoxComponent} from '../slider-box/slider-box.component';
import {ChordsDisplaySequence} from '../chords-carousel/chords-carousel.component';
import {ChordsPracticeTuneService} from '../../services/chords-practice-tune-service/chords-practice-tune.service';
import {MatIcon} from '@angular/material/icon';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {ChordsPracticeService} from '../../services/chords-pratice-service/chords-practice.service';

@Component({
  selector: 'app-chords-practice-tune-options',
  imports: [
    ChordCardComponent,
    ChordsTuneMenuGroupComponent,
    MatButtonToggle,
    MatButtonToggleGroup,
    MatIcon,
    SliderBoxComponent
  ],
  templateUrl: './chords-practice-tune-options.component.html',
  styleUrl: './chords-practice-tune-options.component.css'
})
export class ChordsPracticeTuneOptionsComponent {

  // Services
  readonly chordsPracticeTuneService = inject(ChordsPracticeTuneService);
  readonly chordsPracticeService = inject(ChordsPracticeService);

  protected readonly ChordsDisplaySequence = ChordsDisplaySequence;
}
