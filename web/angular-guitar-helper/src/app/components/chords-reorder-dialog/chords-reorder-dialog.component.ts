import {Component, inject, ViewChild} from '@angular/core';
import {ChordsPracticeService} from '../../services/chords-pratice-service/chords-practice.service';
import {ChordsGalleryReorderComponent} from '../chords-gallery-reorder/chords-gallery-reorder.component';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatDialogRef} from '@angular/material/dialog';
import {NgStyle} from '@angular/common';
import {MobileModeService} from '../../services/mobile-mode-service/mobile-mode.service';

@Component({
  selector: 'app-chords-reorder',
  imports: [
    ChordsGalleryReorderComponent,
    MatButton,
    MatIcon,
    NgStyle
  ],
  templateUrl: './chords-reorder-dialog.component.html',
  styleUrl: './chords-reorder-dialog.component.css'
})
export class ChordsReorderDialogComponent {
  @ViewChild('chordsReorder') chordsReorder!: ChordsGalleryReorderComponent
  readonly dialogRef = inject(MatDialogRef<ChordsReorderDialogComponent>);

  // Services
  readonly chordsPracticeService = inject(ChordsPracticeService);
  readonly mobileModeService = inject(MobileModeService);

  onSave = () => {
    this.chordsPracticeService.setChords(this.chordsReorder.getItems())
    this.dialogRef.close()
  }
}
