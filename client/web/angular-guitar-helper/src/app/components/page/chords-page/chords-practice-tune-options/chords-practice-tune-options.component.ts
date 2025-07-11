import {Component, inject} from '@angular/core';
import {ChordCardComponent} from '../chord-card/chord-card.component';
import {ChordsTuneMenuGroupComponent} from '../chords-tune-menu-group/chords-tune-menu-group.component';
import {SliderBoxComponent} from '../../../other/slider-box/slider-box.component';
import {ChordsDisplaySequence} from '../chords-carousel/chords-carousel.component';
import {ChordsPracticeTuneService} from '../../../../services/chords/chords-practice-tune-service/chords-practice-tune.service';
import {MatIcon} from '@angular/material/icon';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {ChordsPracticeService} from '../../../../services/chords/chords-pratice-service/chords-practice.service';
import {NgStyle} from '@angular/common';
import {MobileModeService} from '../../../../services/app/mobile-mode-service/mobile-mode.service';
import {MatDialog} from '@angular/material/dialog';
import {ChordsReorderDialogComponent} from '../../../dialogs/chords-reorder-dialog/chords-reorder-dialog.component';

@Component({
  selector: 'app-chords-practice-tune-options',
  imports: [
    ChordCardComponent,
    ChordsTuneMenuGroupComponent,
    MatButtonToggle,
    MatButtonToggleGroup,
    MatIcon,
    SliderBoxComponent,
    NgStyle
  ],
  templateUrl: './chords-practice-tune-options.component.html',
  styleUrl: './chords-practice-tune-options.component.css'
})
export class ChordsPracticeTuneOptionsComponent {

  // Services
  readonly chordsPracticeTuneService = inject(ChordsPracticeTuneService);
  readonly chordsPracticeService = inject(ChordsPracticeService);
  readonly mobileModeService = inject(MobileModeService);
  readonly dialog = inject(MatDialog);

  protected readonly ChordsDisplaySequence = ChordsDisplaySequence;

  openReorderChordsDialog(): void {
    this.dialog.open(ChordsReorderDialogComponent, {
      minWidth: this.mobileModeService.isMobile() ? '90%' : '704px',
      maxHeight: '80vh',
    });
  }
}
