import {inject, Injectable, signal} from '@angular/core';
import {ChordsPracticeService} from '../chords-pratice-service/chords-practice.service';
import {ChordsDisplaySequence} from '../../components/chords-carousel/chords-carousel.component';

@Injectable({
  providedIn: 'root'
})
export class ChordsPracticeTuneService {
  // Chords counts
  readonly previousChordsCount = signal(1)
  readonly nextChordsCount = signal(1)
  readonly timerSpeedSeconds = signal(1)

  // Chords Display Order
  readonly chordsDisplaySequence = signal(ChordsDisplaySequence.IN_ORDER)

  // Services
  private readonly chordsPracticeService = inject(ChordsPracticeService);

  constructor() {
    this.chordsPracticeService.setTimerSpeed(this.timerSpeedSeconds())
  }

  setPreviousChordsCount(value: number): void {
    if (value < 0) {
      throw new Error('Previous chords count cannot be negative.');
    }
    this.previousChordsCount.set(value);
  }

  setNextChordsCount(value: number): void {
    if (value < 0) {
      throw new Error('Next chords count cannot be negative.');
    }
    this.nextChordsCount.set(value);
  }

  setTimerSpeed(seconds: number): void {
    if (seconds < 0) {
      throw new Error('Timer speed cannot be negative.');
    }
    this.timerSpeedSeconds.set(seconds);
    this.chordsPracticeService.setTimerSpeed(seconds); // Convert seconds to milliseconds
  }

  setChordsDisplaySequence(sequence: ChordsDisplaySequence): void {
    this.chordsDisplaySequence.set(sequence);
  }
}
