import {Component, inject, OnDestroy, signal} from '@angular/core';
import {TopBarService} from '../../../../services/top-bar-service/top-bar.service';
import {PageBackButtonComponent} from '../../../../components/page-back-button/page-back-button.component';
import {TextIconButtonComponent} from '../../../../components/text-icon-button/text-icon-button.component';
import {ComponentType} from '@angular/cdk/portal';
import {Chord} from '../../../../models/chord';
import {ChordCardComponent} from '../../../../components/chord-card/chord-card.component';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {MatButtonToggle, MatButtonToggleChange, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {MatChip, MatChipSet} from '@angular/material/chips';
import {ChordsService} from '../../../../services/chords-service/chords.service';
import {PageFrameComponent} from '../../../../components/page-frame/page-frame.component';
import {Router} from '@angular/router';
import {ChordsPracticeService} from '../../../../services/chords-pratice-service/chords-practice.service';
import {ChordsGalleryComponent} from '../../../../components/chords-gallery/chords-gallery.component';

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
    ChordsGalleryComponent,
  ],
  templateUrl: './chords-practice.component.html',
  styleUrl: './chords-practice.component.css'
})
export class ChordsPracticeComponent implements OnDestroy {
  protected readonly GalleryChordsOption = GalleryChordsOption;

  // Constants
  readonly MAX_CHORDS_PRACTICE= 20
  readonly MIN_CHORDS_REQUIRED= 3

  // Signals
  private readonly isInsufficientChordsSelected = signal<boolean>(true)
  readonly selectedChordsGallery = signal<GalleryChordsOption>(GalleryChordsOption.DEFAULT)
  readonly selectedChords = signal<Set<Chord>>(new Set())

  // Services
  readonly topBarService = inject(TopBarService)
  readonly chordsService = inject(ChordsService)
  private readonly chordsPracticeService = inject(ChordsPracticeService)
  private readonly router = inject(Router);

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
    // Navigate to the practice page with the selected chords
    this.chordsPracticeService.setChords(Array.from(this.selectedChords()));
    this.router.navigate(['/chords/practice/start'])
  }

  addChordToSelection = (chord: Chord) => {
    this.selectedChords.update(current => {
      const newSet = current
      newSet.add(chord)
      if (newSet.size >= this.MIN_CHORDS_REQUIRED) this.isInsufficientChordsSelected.set(false)
      return current
    })
  }

  removeChordFromSelection = (chord: Chord) => {
    this.selectedChords.update(current => {
      const newSet = current
      newSet.delete(chord)
      if (newSet.size < this.MIN_CHORDS_REQUIRED) this.isInsufficientChordsSelected.set(true)
      return current
    })
  }

  predicateIsChordNotSelected = (chord: Chord): boolean => {
    return !this.selectedChords().has(chord);
  }

  // TODO delete this test function
  testFunc = () => {
    console.log('test button')
  }

  protected readonly Array = Array;
}
