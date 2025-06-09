import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  QueryList,
  ViewChildren, ViewContainerRef
} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {
  Chord,
  GuitarPositionPushed,
  GuitarStringState
} from '../../../../../../generated-sources/openapi/chords-service-openapi';
import {OpenMutedStringComponent} from '../open-muted-string/open-muted-string.component';

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
  ],
  templateUrl: './chord-card.component.html',
  styleUrl: './chord-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChordCardComponent implements AfterViewInit {
  @Input({required: true}) chord!: Chord

  tiles: Tile[] = this.generateTiles()

  // HTML element references
  @ViewChildren('openMutedStringElement', {read: ViewContainerRef}) openMutedStringsRefs!: QueryList<ViewContainerRef>
  openMutedStringsTable = new Map<GuitarStringState.GuitarStringEnum, ViewContainerRef>()

  ngAfterViewInit() {
    this._initOpenMutedStrings()

    // TODO Init pushed frets table

    // TODO Init barre frets table
  }

  _initOpenMutedStrings() {
    this.openMutedStringsRefs.forEach((item: ViewContainerRef) => {
      const stringClass: GuitarStringState.GuitarStringEnum = item.element.nativeElement.classList[0]
      this.openMutedStringsTable.set(stringClass, item)
    })
    this.chord.mutedOpenStrings.forEach(state => {
      const elementRef = this.openMutedStringsTable.get(state.guitarString!)
      if (elementRef !== undefined) {
        const componentRef = elementRef.createComponent(OpenMutedStringComponent)
        if (state.openCloseState === GuitarStringState.OpenCloseStateEnum._0) {
          componentRef.instance.state = GuitarStringState.OpenCloseStateEnum._0
        } else {
          componentRef.instance.state = GuitarStringState.OpenCloseStateEnum._1
        }
      }
    })
  }

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

  allFrets = () => Object.values(GuitarPositionPushed.FretEnum)

  // getFret = (fret: string) => FretNote[fret as keyof typeof FretNote]

  // getPushedFretNumber(fretNote: FretNote) {
  //   return this.chord.pushedFretNotes.get(fretNote)?.fingerNumber
  // }

  protected readonly GuitarStringState = GuitarStringState;
  protected readonly Object = Object;
}
