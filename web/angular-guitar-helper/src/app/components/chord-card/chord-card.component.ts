import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {MatIcon} from '@angular/material/icon';
import {FretNote} from '../../models/fret_note';
import {FretPushed} from '../../models/fret_pushed';
import {ChordAddition, ChordOpenClose} from '../../models/chord_open_close';
import {BarreFrets} from '../../models/barre_frets';
import {Chord} from '../../models/chord';

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
  styleUrl: './chord-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChordCardComponent {
  @Input({required: true}) chord!: Chord

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
    return this.chord.pushedFretNotes.get(fretNote)?.fingerNumber
  }

  protected readonly ChordAddition = ChordAddition;
}
