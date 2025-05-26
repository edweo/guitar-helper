import {inject, Injectable, signal} from '@angular/core';
import {ChordsPracticeService} from '../chords-pratice-service/chords-practice.service';

@Injectable({
  providedIn: 'root'
})
export class ChordsPracticeTuneService {
  // Chords counts
  readonly previousChordsCount = signal(1)
  readonly nextChordsCount = signal(1)
  readonly timerSpeed = signal(1)

  // Services
  private readonly chordsPracticeService = inject(ChordsPracticeService);

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
    this.timerSpeed.set(seconds);
    this.chordsPracticeService.setTimerSpeed(seconds); // Convert seconds to milliseconds
  }
}
