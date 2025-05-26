import {
  AfterViewInit,
  Component,
  computed,
  ElementRef, EventEmitter,
  Input, OnChanges, OnDestroy,
  OnInit, Output,
  signal, SimpleChanges,
  ViewChild,
} from '@angular/core';
import {ChordCardComponent} from '../chord-card/chord-card.component';
import {Chord} from '../../models/chord';
import {NgStyle} from '@angular/common';

export enum ChordsDisplaySequence {
  IN_ORDER,
  RANDOM
}

@Component({
  selector: 'app-chords-carousel',
  imports: [
    ChordCardComponent,
    NgStyle,
  ],
  templateUrl: './chords-carousel.component.html',
  styleUrl: './chords-carousel.component.css'
})
export class ChordsCarouselComponent implements AfterViewInit, OnInit, OnChanges, OnDestroy {
  @Input({required: true}) chords!: Chord[]
  @Input() previousChordsDisplay = 3
  @Input() nextChordsDisplay = 3
  @Input() chordsDisplaySequence? = ChordsDisplaySequence.IN_ORDER
  @Output() carouselWidthEvent = new EventEmitter<number>();

  // Constants
  readonly PREVIOUS_CHORDS_COUNT = 3
  readonly NEXT_CHORDS_SIZE = 3

  // Chords state
  private currentChordIndex = 0
  readonly previousChords = signal<(Chord | undefined)[]>(new Array(this.PREVIOUS_CHORDS_COUNT).fill(undefined))
  readonly currentChord = signal<Chord | undefined>(undefined)
  readonly nextChords = signal<(Chord | undefined)[]>(new Array(this.NEXT_CHORDS_SIZE).fill(undefined))

  // Listener variables to react to width and scale up/down responsive design
  @ViewChild('container') container!: ElementRef<HTMLDivElement>
  private resizeObserver!: ResizeObserver;
  readonly chordsDivScale = computed(() => this._calculateChordsGalleryScale(this.containerWidth()))
  readonly containerWidth = signal(0)
  readonly containerHeight = computed(() => 357.33 * this.chordsDivScale() / 100)
  readonly carouselWidth = computed(
    () => (288 * this.chordsDivScale() * (this.previousChordsDisplay + this.nextChordsDisplay + 1)  / 100)
  )

  ngOnInit(): void {
    this._validateInputs()

    // Initialize starting values
    this.currentChord.set(this.chords[0])
    for (let i = 0; i < (this.NEXT_CHORDS_SIZE); i++) {
      this._nextChordRandom()
    }
  }

  ngAfterViewInit(): void {
    this.containerWidth.set(this.container.nativeElement.offsetWidth)

    // Create a ResizeObserver to monitor width changes
    this.resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        this.containerWidth.set(entry.contentRect.width)
        this.carouselWidthEvent.emit(this.carouselWidth())
      }
    })

    // Start observing the div element
    this.resizeObserver.observe(this.container.nativeElement);
  }

  private _validateInputs() {
    if (this.chords! === undefined || this.chords.length === 0) {
      throw new Error('Chords must be provided to the ChordsCarouselComponent');
    }

    if (this.previousChordsDisplay < 0 || this.nextChordsDisplay < 0) {
      throw new Error('Previous and next chords display counts must be non-negative');
    }

    if (this.previousChordsDisplay > 3 || this.nextChordsDisplay > 3) {
      throw new Error('Previous and next chords display counts must be less than or equal to 3');
    }
  }

  /**
   * Refreshes the component to apply new scaling of chord cards
   */
  refreshContainer(): void {
    if (this.container !== undefined) {
      // Temporarily change the width to force a reflow
      const originalWidth = this.container.nativeElement.style.width;
      this.container.nativeElement.style.width = '99%'; // Change to a different value
      setTimeout(() => {
        this.container.nativeElement.style.width = originalWidth; // Reset to original
      }, 0);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['previousChordsCount']) {
    }

    if (changes['nextChordsCount']) {
    }

    if (changes['carouselNextOrder']) {
    }

    this.refreshContainer()
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect()
  }

  nextChord = () => {
    // Update Previous chords
    this._updatePreviousChords()

    const newCurrentChord = this.nextChords()[0];

    // Update Next chords
    this._updateNextChords()

    // Update Current chord
    this.currentChord.set(newCurrentChord)
  }

  private _updatePreviousChords = () => {
    this.previousChords.set([...this.previousChords().slice(1), this.currentChord()!])
  }

  private _updateNextChords = () => {
    switch (this.chordsDisplaySequence) {
      case ChordsDisplaySequence.IN_ORDER:
        this._nextChordInOrder()
        break
      case ChordsDisplaySequence.RANDOM:
        this._nextChordRandom()
        break
    }
  }

  private _nextChordInOrder() {
    const newNextChords: Chord[] = []
    let currentIndex = this.currentChordIndex
    for (let i = 0; i < this.NEXT_CHORDS_SIZE; i++) {
      currentIndex = (currentIndex + 1) % this.chords.length
      newNextChords.push(this.chords[currentIndex])
    }
    this.nextChords.set(newNextChords)
    this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length
  }

  private _nextChordRandom() {
    // Generate random next chord
    let randomIndex: number;
    randomIndex = Math.floor(Math.random() * this.chords.length)

    let comparisonChord: Chord | undefined;
    if (this.nextChords().length > 0) {
      comparisonChord = this.nextChords()[this.nextChords().length - 1];
    }
    else {
      comparisonChord = this.currentChord()!;
    }

    // Find chord until not the same as previous in line
    let newCord: Chord = this.chords[randomIndex];
    while (newCord === comparisonChord) {
      randomIndex = Math.floor(Math.random() * this.chords.length)
      newCord = this.chords[randomIndex];
    }

    // If there are not enough chords, fill the nextChords with random chords
    if (this.nextChords().length < this.NEXT_CHORDS_SIZE) {
      this.nextChords.set([...this.nextChords(), newCord]);
    }
    // Remove first chord and add the new random chord at the end
    else {
      this.nextChords.set([...this.nextChords().slice(1), newCord!]);
    }
  }

  private _calculateChordsGalleryScale(widthParent: number) {
    const a: number = widthParent / (this.previousChordsDisplay + this.nextChordsDisplay + 1)
    const scale = a / 288 * 100
    return scale > 100 ? 100 : scale
  }

  protected readonly console = console;
}
