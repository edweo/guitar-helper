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
import {GuitarPositionPushedComponent} from '../guitar-position-pushed/guitar-position-pushed.component';

@Component({
  selector: 'app-chord-card',
  imports: [
    MatCard,
    MatGridList,
    MatGridTile,
    GuitarPositionPushedComponent,
  ],
  templateUrl: './chord-card.component.html',
  styleUrl: './chord-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChordCardComponent implements AfterViewInit {
  @Input({required: true}) chord!: Chord

  // HTML element references
  @ViewChildren('openMutedStringElement', {read: ViewContainerRef}) openMutedStringsRefs!: QueryList<ViewContainerRef>
  openMutedStringsTable = new Map<GuitarStringState.GuitarStringEnum, ViewContainerRef>()
  @ViewChildren('positionPushedElement', {read: ViewContainerRef}) positionPushedRefs!: QueryList<ViewContainerRef>
  positionsPushedTable = new Map<string, ViewContainerRef>()

  ngAfterViewInit() {
    this._initOpenMutedStrings()

    // TODO Init pushed frets table
    this._initPositionPushedStrings()

    // TODO Init barre frets table
  }

  _initPositionPushedStrings() {
    // Create a map of positions pushed to their ViewContainerRefs
    this.positionPushedRefs.forEach((item: ViewContainerRef) => {
      const fret = item.element.nativeElement.classList[0] as GuitarPositionPushed.FretEnum
      const string = item.element.nativeElement.classList[1] as GuitarPositionPushed.StringEnum
      const key = this._positionPushedKey(fret, string)
      this.positionsPushedTable.set(key, item)
    })

    // Set pushed frets according to chord configuration
    this.chord.positionsPushed.forEach((state: GuitarPositionPushed) => {
      const elementRef = this.positionsPushedTable.get(this._positionPushedKey(state.fret!, state.string!))
      if (elementRef !== undefined) {
        const componentRef = elementRef.createComponent(GuitarPositionPushedComponent)
        componentRef.instance.finger = state.finger!
      }
    })
  }

  _positionPushedKey(fret: GuitarPositionPushed.FretEnum, string: GuitarPositionPushed.StringEnum): string {
    return `${fret}-${string}`;
  }

  _initOpenMutedStrings() {
    // Create a map of open muted strings to their ViewContainerRefs
    this.openMutedStringsRefs.forEach((item: ViewContainerRef) => {
      const stringClass: GuitarStringState.GuitarStringEnum = item.element.nativeElement.classList[0]
      this.openMutedStringsTable.set(stringClass, item)
    })

    // Set muted or open strings according to chord configuration
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

  protected readonly GuitarStringState = GuitarStringState;
  protected readonly Object = Object;
  protected readonly Array = Array;
  protected readonly GuitarPositionPushed = GuitarPositionPushed;
}
