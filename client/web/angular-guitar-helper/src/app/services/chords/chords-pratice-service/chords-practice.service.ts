import {Injectable, signal} from '@angular/core';
import {ChordsPracticeSetup} from '../../../types/chords_practice_setup';
import {Chord} from '../../../types/chord/chord';
import {CHORDS_E} from '../../../data/chords/chords_e';
import {delayAwait} from '../../../utilities/delay';

@Injectable({
  providedIn: 'root'
})
export class ChordsPracticeService {
  // Progress bar
  readonly progressBarValue = signal(0)
  readonly progressBarFinished = signal(false)

  // Timer
  private chordRoundTimer: ReturnType<typeof setTimeout> | null = null;
  readonly timerIncrement = signal(1)
  readonly timerIntervalMs = signal(10)

  // Start and Pause
  readonly isPracticeStarted = signal(false)

  // TODO switch back to chords []
  // Practice setup
  readonly practiceSetup = signal<ChordsPracticeSetup>({
    name: '',
    chords: [...CHORDS_E]
    // chords: []
  })

  setChords(chords: Chord[]): void {
    if (chords.length < 3) {
      throw new Error('At least 3 chords are required for practice.');
    }

    this.practiceSetup.set({
      ...this.practiceSetup(),
      chords: chords
    });
  }

  pausePractice(): void {
    this.isPracticeStarted.set(false);
    if (this.chordRoundTimer !== null) {
      clearTimeout(this.chordRoundTimer);
      this.chordRoundTimer = null;
    }
  }

  startPractice(
    onProgressBarFinished: () => Promise<void>
  ): void {
    this.isPracticeStarted.set(true)
    this._startTimerRound(onProgressBarFinished);
  }

  setTimerSpeed(seconds: number): void {
    if (seconds < 1) {
      throw new Error('Timer speed must be at least 1 second.');
    }
    const ms = seconds * 1000;
    // Calculate the interval in milliseconds based on the timer increment
    const interval = Math.floor(ms / 100 * this.timerIncrement())
    this.timerIntervalMs.set(interval)
  }

  /**
   * Increment the progress bar value by a given amount.
   * @param value The amount to increment the progress bar value by.
   * @returns True if the progress bar value reached 100, otherwise false.
   */
  private _incrementProgressBarValue(value: number): boolean {
    const newValue = this.progressBarValue() + value;
    if (newValue >= 100) {
      this.progressBarValue.set(100);
      return true
    }
    this.progressBarValue.set(newValue);
    return false
  }

  private _startTimerRound = (
    onProgressBarFinished: () => Promise<void>
  ) => {
    this.chordRoundTimer = setTimeout(async () => {
      // If progress bar reached 100, reset it and call the callback
      if (this._incrementProgressBarValue(this.timerIncrement())) { // Increment the progress bar by 10
        this.progressBarFinished.set(true); // Set the progress bar as finished when it reaches 100%
        await delayAwait(300) // Wait for the UI to update before calling the callback
        await onProgressBarFinished(); // Call the provided callback when the progress bar reaches 100%
        this.progressBarValue.set(0); // Reset progress bar for the next round
        await delayAwait(150) // Wait for the UI to update before starting the next round
      }
      // Continue the timer if it is still running
      if (this.isPracticeStarted()) {
        this._startTimerRound(onProgressBarFinished);
      }
    }, this.timerIntervalMs())
  }
}
