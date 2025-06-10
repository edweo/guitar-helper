import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {TopBarService} from '../../../../services/app/top-bar-service/top-bar.service';
import {PageBackButtonComponent} from '../../../../components/app/page-back-button/page-back-button.component';
import {TextIconButtonComponent} from '../../../../components/buttons/text-icon-button/text-icon-button.component';
import {ComponentType} from '@angular/cdk/portal';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {MatButtonToggle, MatButtonToggleChange, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {MatChip, MatChipSet} from '@angular/material/chips';
import {PageFrameComponent} from '../../../../components/app/page-frame/page-frame.component';
import {Router} from '@angular/router';
import {ChordsPracticeService} from '../../../../services/chords/chords-pratice-service/chords-practice.service';
import {ChordsGalleryComponent} from '../../../../components/page/chords-page/chords-gallery/chords-gallery.component';
import {
  Chord,
  ChordsDefaultAPIService,
} from '../../../../../../generated-sources/openapi/chords-service-openapi';
import {UserService} from '../../../../services/app/user-service/user.service';
import {
  ChordsTabGalleryComponent
} from '../../../../components/page/chords-page/chords-tab-gallery/chords-tab-gallery.component';
import {convertDefaultChords} from '../../../../utilities/chords_converter';

enum GalleryChordsOption {
  DEFAULT = 'default',
  USER = 'user'
}

@Component({
  selector: 'app-chords-practice',
  imports: [
    MatGridList,
    MatGridTile,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatChipSet,
    MatChip,
    PageFrameComponent,
    ChordsGalleryComponent,
    ChordsTabGalleryComponent,
  ],
  templateUrl: './chords-practice.component.html',
  styleUrl: './chords-practice.component.css'
})
export class ChordsPracticeComponent implements OnDestroy, OnInit {
  protected readonly GalleryChordsOption = GalleryChordsOption;

  // Constants
  readonly MAX_CHORDS_PRACTICE= 20
  readonly MIN_CHORDS_REQUIRED= 3

  // Signals
  private readonly isInsufficientChordsSelected = signal<boolean>(true)
  readonly selectedChordsGallery = signal<GalleryChordsOption>(GalleryChordsOption.DEFAULT)
  readonly selectedChords = signal<Set<Chord>>(new Set())
  readonly defaultChords = signal<Record<string, Chord[]> | null>(null)
  readonly userChords = signal<Record<string, Chord[]> | null>(null)

  // Services
  readonly topBarService = inject(TopBarService)
  private readonly chordsPracticeService = inject(ChordsPracticeService)
  private readonly router = inject(Router);
  private readonly chordsDefaultAPIService = inject(ChordsDefaultAPIService);
  readonly userService = inject(UserService)

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

  ngOnInit() {
    // Fetch default chords from the API
    this.chordsDefaultAPIService.listChords().subscribe({
      next: (response) => {
        this.defaultChords.set(convertDefaultChords(response));
      },
      error: (error) => {
        // TODO handle error appropriately, e.g., show a notification
        // console.error('Error fetching default chords:', error);
      }
    });
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

  protected readonly Array = Array;
  protected readonly Object = Object;
}
