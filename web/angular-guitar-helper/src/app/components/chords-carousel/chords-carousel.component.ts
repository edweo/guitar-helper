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

enum CarouselNextOrder {
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
  @Input() previousChordsCount = 1
  @Input() nextChordsCount = 1
  @Input() carouselNextOrder? = CarouselNextOrder.IN_ORDER

  @Output() carouselWidthEvent = new EventEmitter<number>();

  private currentChordIndex = 0

  readonly previousChords = signal<Chord[]>([])
  readonly currentChord = signal<Chord | undefined>(undefined)
  readonly nextChords = signal<Chord[]>([])

  // Listener variables to react to width and scale up/down responsive design
  @ViewChild('container') container!: ElementRef<HTMLDivElement>
  private resizeObserver!: ResizeObserver;
  readonly chordsDivScale = computed(() => this._calculateChordsGalleryScale(this.containerWidth()))
  readonly containerWidth = signal(0)
  readonly containerHeight = computed(() => 357.33 * this.chordsDivScale() / 100)
  readonly carouselWidth = computed(
    () => (288 * this.chordsDivScale() * (this.previousChordsCount + this.nextChordsCount + 1)  / 100)
  )

  ngOnInit(): void {
    // Initialize starting values
    this.currentChord.set(this.chords[0])
    this._updateNextChords()
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
      // TODO check prev, current if smaller or higher
      // TODO update chords collections size
    }


    // TODO same for remaining inputs
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
    switch (this.carouselNextOrder) {
      case CarouselNextOrder.IN_ORDER:
        this._nextChordInOrder()
        break
      case CarouselNextOrder.RANDOM:
        this._nextChordRandom()
        break
    }
  }

  private _nextChordInOrder = () => {
    // Update Previous chords
    this._updatePreviousChords()

    // Update Current chord
    this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length
    this.currentChord.set(this.chords[this.currentChordIndex])

    // Update Next chords
    this._updateNextChords()
  }

  private _nextChordRandom = () => {
    // TODO Update Previous chords

    // TODO Update Current chord

    // TODO Update Next chords
  }

  private _updatePreviousChords = () => {
    if (this.previousChordsCount > 1) {
      this.previousChords.set([...this.previousChords().slice((this.previousChordsCount - 1) * -1), this.currentChord()!])
    } else {
      this.previousChords.set([this.currentChord()!])
    }
  }

  private _updateNextChords = () => {
    const newNextChords: Chord[] = []
    let currentIndex = this.currentChordIndex
    for (let i = 0; i < this.nextChordsCount; i++) {
      currentIndex = (currentIndex + 1) % this.chords.length
      newNextChords.push(this.chords[currentIndex])
    }
    this.nextChords.set(newNextChords)
  }

  private _calculateChordsGalleryScale(widthParent: number) {
    // const width = widthParent <= 850 ? widthParent : 850
    const a: number = widthParent / (this.previousChordsCount + this.nextChordsCount + 1)
    const scale = a / 288 * 100
    return scale > 100 ? 100 : scale
  }
}
