import {Component, Input} from '@angular/core';
import {ChordCardComponent} from '../chord-card/chord-card.component';
import {Chord} from '../../models/chord';
import {NgClass, NgStyle} from '@angular/common';

@Component({
  selector: 'app-chords-gallery',
  imports: [
    ChordCardComponent,
    NgClass,
    NgStyle
  ],
  templateUrl: './chords-gallery.component.html',
  styleUrl: './chords-gallery.component.css'
})
export class ChordsGalleryComponent {
  @Input({required: true}) chords!: Chord[]
  @Input() chordOnClick?: (chord: Chord) => void;
  @Input() filterChordsPredicate?: (chord: Chord) => boolean;
  @Input() wrapChords = false;
}
