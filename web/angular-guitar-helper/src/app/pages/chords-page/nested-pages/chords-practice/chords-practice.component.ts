import {Component, inject, OnDestroy, signal} from '@angular/core';
import {TopBarService} from '../../../../services/top-bar-service/top-bar.service';
import {PageBackButtonComponent} from '../../../../components/page-back-button/page-back-button.component';
import {TextIconButtonComponent} from '../../../../components/text-icon-button/text-icon-button.component';
import {ComponentType} from '@angular/cdk/portal';
import {ChordsPracticeSetup} from '../../../../types/chords_practice_setup';
import {Chord} from '../../../../models/chord';
import {ChordCardComponent} from '../../../../components/chord-card/chord-card.component';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {MatButtonToggle, MatButtonToggleChange, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {MatChip, MatChipSet} from '@angular/material/chips';
import {ChordsService} from '../../../../services/chords-service/chords.service';
import {CHORDS_SKELETON} from '../../../../data/chords/chords_skeleton';
import {PageFrameComponent} from '../../../../components/page-frame/page-frame.component';

enum GalleryChordsOption {
  DEFAULT = 'default',
  CUSTOM = 'custom'
}

@Component({
  selector: 'app-chords-practice',
  imports: [
    ChordCardComponent,
    MatTabGroup,
    MatTab,
    MatGridList,
    MatGridTile,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatChipSet,
    MatChip,
    TextIconButtonComponent,
    PageFrameComponent,
  ],
  templateUrl: './chords-practice.component.html',
  styleUrl: './chords-practice.component.css'
})
export class ChordsPracticeComponent implements OnDestroy {
  private readonly isInsufficientChordsSelected = signal<boolean>(true)
  readonly setup = signal<ChordsPracticeSetup>({chords: new Set<Chord>()})
  readonly MAX_CHORDS_PRACTICE= 20
  readonly MIN_CHORDS_REQUIRED= 3
  selectedChordsGallery = signal<GalleryChordsOption>(GalleryChordsOption.DEFAULT)

  // Services
  readonly topBarService = inject(TopBarService)
  readonly chordsService = inject(ChordsService)

  constructor() {
    this.topBarService.showTopBar()
    this.topBarService.setTopBarTitle('Practice Setup')
    this.topBarService.setLeftContent([
      {component: PageBackButtonComponent}
    ])
    this.topBarService.setRightContent([
      {
        component: TextIconButtonComponent,
        init: (vcr, component: ComponentType<TextIconButtonComponent>) => {
          const btn = vcr.createComponent(component)
          btn.instance.matIcon = 'play_arrow'
          btn.instance.text = 'Start'
          btn.instance.onClick = this._startPractice
          btn.instance.disabled = this.isInsufficientChordsSelected
        }
      }
    ])
  }

  ngOnDestroy(): void {
    this.topBarService.resetAll()
  }

  handleChordsGalleryChange = (event: MatButtonToggleChange) => {
    this.selectedChordsGallery.set(event.value)
  }

  private _startPractice = () => {
    console.log('starting practice')
  }

  addChordToSelection = (chord: Chord) => {
    this.setup.update(current => {
      const newSet = new Set(current.chords)
      newSet.add(chord)
      if (newSet.size >= this.MIN_CHORDS_REQUIRED) this.isInsufficientChordsSelected.set(false)
      return {chords: newSet}
    })
  }

  removeChordFromSelection = (chord: Chord) => {
    this.setup.update(current => {
      const newSet = new Set(current.chords)
      newSet.delete(chord)
      if (newSet.size < this.MIN_CHORDS_REQUIRED) this.isInsufficientChordsSelected.set(true)
      return {chords: newSet}
    })
  }

  testFunc = () => {
    console.log('test button')
  }

  protected readonly GalleryChordsOption = GalleryChordsOption;
}
