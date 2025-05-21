import {Component, inject, OnDestroy, signal} from '@angular/core';
import {TopBarService} from '../../../../services/top-bar-service/top-bar.service';
import {PageBackButtonComponent} from '../../../../components/page-back-button/page-back-button.component';
import {TextIconButtonComponent} from '../../../../components/text-icon-button/text-icon-button.component';
import {ComponentType} from '@angular/cdk/portal';
import {ChordsPracticeSetup} from '../../../../types/chords_practice_setup';
import {Chord} from '../../../../models/chord';
import {ChordCardComponent} from '../../../../components/chord-card/chord-card.component';
import {CHORDS_E} from '../../../../data/chords/chords_e';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';

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
  ],
  templateUrl: './chords-practice.component.html',
  styleUrl: './chords-practice.component.css'
})
export class ChordsPracticeComponent implements OnDestroy {


  private readonly isPreparingPractice = signal<boolean>(true)
  readonly setup = signal<ChordsPracticeSetup>({chords: new Set<Chord>(CHORDS_E)})

  lotsOfTabs = new Array(30).fill(0).map((_, index) => `Tab ${index}`);

  // Services
  readonly topBarService = inject(TopBarService)

  constructor() {
    this.topBarService.showTopBar()
    this.topBarService.setTopBarTitle('Practice')
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
          btn.instance.disabled = this.isPreparingPractice
        }
      }
    ])
  }

  ngOnDestroy(): void {
    this.topBarService.resetAll()
  }

  private _startPractice = () => {
    console.log('starting practice')
  }

  protected readonly CHORDS_E = CHORDS_E;
}
