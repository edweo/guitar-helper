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
import {NgStyle} from '@angular/common';
import {Chord} from '../../../../../../generated-sources/openapi/chords-service-openapi';

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
  @Input() chordsDisplaySequence = ChordsDisplaySequence.IN_ORDER
  @Output() carouselWidthEvent = new EventEmitter<number>();

  // Constants
  readonly PREVIOUS_CHORDS_COUNT = 3
  readonly NEXT_CHORDS_SIZE = 3

  // Chords state
  private currentChordIndex = 0
  private lastNextChordIndex = 0
  readonly previousChords = signal<(Chord | undefined)[]>(new Array(this.PREVIOUS_CHORDS_COUNT).fill(undefined))
  readonly currentChord = signal<Chord | undefined>(undefined)
  readonly nextChords = signal<(Chord | undefined)[]>(new Array(this.NEXT_CHORDS_SIZE).fill(undefined))

  // Signals
  private readonly _chordsDisplaySequence = signal(this.chordsDisplaySequence);
  // TODO maybe siganl array of chords

  // Listener variables to react to width and scale up/down responsive design
  @ViewChild('container') container!: ElementRef<HTMLDivElement>
  @ViewChild('carouselContainer') carouselContainer!: ElementRef<HTMLDivElement>
  private resizeObserver!: ResizeObserver;
  readonly carouselContainerWidth = signal(0)
  readonly chordsDivScale = computed(() => this._calculateChordsGalleryScale(this.carouselContainerWidth()))
  readonly containerHeight = computed(() => 357.33 * this.chordsDivScale() / 100)
  readonly carouselWidth = computed(
    () => (288 * this.chordsDivScale() * (this.previousChordsDisplay + this.nextChordsDisplay + 1)  / 100)
  )

  ngOnInit(): void {
    this._validateInputs()
    this._initChords()
  }

  ngAfterViewInit(): void {
    this.carouselContainerWidth.set(this.container.nativeElement.offsetWidth)

    // Create a ResizeObserver to monitor width changes
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        this.carouselContainerWidth.set(entry.contentRect.width)
        this.carouselWidthEvent.emit(this.carouselWidth())
      }
    })

    // Start observing the div element
    this.resizeObserver.observe(this.container.nativeElement);
  }

  private _validateInputs() {
    if (this.chords === undefined || this.chords.length === 0) {
      throw new Error('Chords must be provided to the ChordsCarouselComponent');
    }
    if (this.previousChordsDisplay < 0 || this.nextChordsDisplay < 0) {
      throw new Error('Previous and next chords display counts must be non-negative');
    }
    if (this.previousChordsDisplay > 3 || this.nextChordsDisplay > 3) {
      throw new Error('Previous and next chords display counts must be less than or equal to 3');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chordsDisplaySequence']) {
      this._chordsDisplaySequence.set(this.chordsDisplaySequence)
      this._initChords()
    }

    if (changes['chords']) {
      this._initChords()
    }

    this.refreshContainer()
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect()
  }

  /**
   * Refreshes the component to apply new scaling of chord cards
   */
  refreshContainer(): void {
    if (this.carouselContainer !== undefined) {
      this.carouselContainerWidth.set(this.carouselContainer.nativeElement.offsetWidth)
    }
  }

  private _initChords() {
    // Initialize starting chord
    this.currentChordIndex = 0
    this.currentChord.set(this.chords[this.currentChordIndex])

    // Initialize next chords
    const initialNextChords: Chord[] = [];
    for (let i = 0; i < this.NEXT_CHORDS_SIZE; i++) {
      switch (this._chordsDisplaySequence()) {
        case ChordsDisplaySequence.IN_ORDER:
          initialNextChords.push(this._getNextChordByIndex(this.currentChordIndex + i));
          this.lastNextChordIndex++
          break
        case ChordsDisplaySequence.RANDOM:
          initialNextChords.push(this._getRandomChord());
          break
      }
    }
    this.nextChords.set(initialNextChords)
    this.previousChords.set([...new Array(this.PREVIOUS_CHORDS_COUNT).fill(undefined)])
  }

  moveNextChord = () => {
    const newCurrentChord = this.nextChords()[0];
    // Update Previous chords
    this._updatePreviousChords()
    // Update Next chords
    this._moveNextChord()
    // Update Current chord
    this.currentChord.set(newCurrentChord)
  }

  private _updatePreviousChords = () => {
    this.previousChords.set([...this.previousChords().slice(1), this.currentChord()!])
  }

  private _moveNextChord = () => {
    switch (this._chordsDisplaySequence()) {
      case ChordsDisplaySequence.IN_ORDER:
        this._moveNextChordInOrder()
        break
      case ChordsDisplaySequence.RANDOM:
        this._moveNextChordRandom()
        break
    }
  }

  private _moveNextChordInOrder() {
    const nextChord = this._getNextChordByIndex(this.lastNextChordIndex);
    this.lastNextChordIndex = this._wrapIndex(this.lastNextChordIndex + 1);
    this._addLastNextChords(nextChord)
  }

  private _moveNextChordRandom() {
    let comparisonChord: Chord | undefined;
    if (this.nextChords().length > 0) {
      comparisonChord = this.nextChords()[this.nextChords().length - 1];
    }
    else {
      comparisonChord = this.currentChord()!;
    }

    // Find chord until not the same as previous in line
    let newCord: Chord = this._getRandomChord();
    while (newCord === comparisonChord) {
      newCord = this._getRandomChord();
    }

    this._addLastNextChords(newCord!)
  }

  private _addLastNextChords(chord: Chord): void {
    this.nextChords.set([...this.nextChords().slice(1), chord]);
  }

  private _getRandomChord(): Chord {
    const randomIndex= Math.floor(Math.random() * this.chords.length)
    return this.chords[randomIndex];
  }

  private _getNextChordByIndex(index: number): Chord {
    return this.chords[this._wrapIndex(index + 1)]
  }

  private _wrapIndex(index: number): number {
    return index % this.chords.length;
  }

  private _calculateChordsGalleryScale(widthParent: number) {
    const a: number = widthParent / (this.previousChordsDisplay + this.nextChordsDisplay + 1)
    const scale = a / 288 * 100
    return scale > 100 ? 100 : scale
  }
}
