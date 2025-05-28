import {Component, Input, OnInit} from '@angular/core';
import {ChordCardComponent} from '../chord-card/chord-card.component';
import {Chord} from '../../../../types/chord/chord';
import {NgClass, NgStyle} from '@angular/common';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-chords-gallery-reorder',
  imports: [
    ChordCardComponent,
    NgStyle,
    NgClass,
    CdkDropList,
    CdkDrag
  ],
  templateUrl: './chords-gallery-reorder.component.html',
  styleUrl: './chords-gallery-reorder.component.css'
})
export class ChordsGalleryReorderComponent implements OnInit {
  @Input({required: true}) chords!: Chord[]
  @Input() chordOnClick?: (chord: Chord) => void
  @Input() filterChordsPredicate?: (chord: Chord) => boolean
  @Input() wrapChords = false

  reorderedItems!: Chord[]

  ngOnInit(): void {
    this.reorderedItems = [...this.chords];
  }

  getItems: () => Chord[] = () => {
    return [...this.reorderedItems]
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.reorderedItems, event.previousIndex, event.currentIndex);
  }
}
