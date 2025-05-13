import {Component, Input} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {MatIcon} from '@angular/material/icon';
import {FretNote} from '../../../models/fret_note';
import {ClosedNotes} from '../../../models/closed_notes';
import {FretPushed} from '../../../models/fret_pushed';

interface Tile {
  col: number;
  row: number;
  text: string;
}

@Component({
  selector: 'app-chord-card',
  imports: [
    MatCard,
    MatGridList,
    MatGridTile,
    MatIcon,
  ],
  templateUrl: './chord-card.component.html',
  styleUrl: './chord-card.component.css'
})
export class ChordCardComponent {
  @Input({required: true}) title!: string
  @Input() closedNotes: ClosedNotes | undefined = undefined
  @Input({required: true}) pushedFretsNotes!: Map<FretNote, FretPushed>

  tiles: Tile[] = this.generateTiles()

  generateTiles(): Tile[] {
    const tiles: Tile[] = []
    let tileNum = 1
    for (let col = 1; col <= 5; col++) {
      for (let row = 1; row <= 5; row++) {
        tiles.push({col, row, text: tileNum.toString()})
        tileNum++
      }
    }
    return tiles
  }

  allFrets = () => Object.values(FretNote)

  getFret = (fret: string) => FretNote[fret as keyof typeof FretNote]

  getPushedFretNumber(fretNote: FretNote) {
    return this.pushedFretsNotes.get(fretNote)?.number
  }
}
