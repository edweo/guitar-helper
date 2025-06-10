import {Component, Input} from '@angular/core';
import {ChordsGalleryComponent} from '../chords-gallery/chords-gallery.component';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {Chord} from '../../../../../../generated-sources/openapi/chords-service-openapi';

@Component({
  selector: 'app-chords-tab-gallery',
  imports: [
    ChordsGalleryComponent,
    MatTab,
    MatTabGroup
  ],
  templateUrl: './chords-tab-gallery.component.html',
  styleUrl: './chords-tab-gallery.component.css'
})
export class ChordsTabGalleryComponent {
  @Input({required: true}) tabs!: string[]
  @Input({required: true}) chords!: Record<string, Chord[]>
  @Input() chordOnClick?: (chord: Chord) => void;
  @Input() filterChordsPredicate?: (chord: Chord) => boolean;
}
