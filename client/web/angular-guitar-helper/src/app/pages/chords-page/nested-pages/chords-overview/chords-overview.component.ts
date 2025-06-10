import {Component, inject, OnDestroy, signal, WritableSignal} from '@angular/core';
import {ChordCardComponent} from '../../../../components/page/chords-page/chord-card/chord-card.component';
import {TopBarService} from '../../../../services/app/top-bar-service/top-bar.service';
import {PageBackButtonComponent} from '../../../../components/app/page-back-button/page-back-button.component';
import {ChordsSelectionButtonComponent} from './components/chords-selection-button/chords-selection-button.component';
import {ComponentType} from '@angular/cdk/portal';
import {ChordsSelectionMenuItem} from './types/chords_selection_menu_item';
import {PageFrameComponent} from '../../../../components/app/page-frame/page-frame.component';
import {Chord} from '../../../../../../generated-sources/openapi/chords-service-openapi';

@Component({
  selector: 'app-chords-overview',
  imports: [
    ChordCardComponent,
    PageFrameComponent,
  ],
  templateUrl: './chords-overview.component.html',
  styleUrl: './chords-overview.component.css'
})
export class ChordsOverviewComponent implements OnDestroy {
  readonly currentChordGroup: WritableSignal<Chord[] | undefined> = signal(undefined)
  private readonly chordMenuItemsGroupDefault: WritableSignal<ChordsSelectionMenuItem[]> = signal([])
  private readonly chordMenuItemsGroupCustom: WritableSignal<ChordsSelectionMenuItem[]> = signal([])

  // Services
  readonly topBarService = inject(TopBarService)

  constructor() {
    this.topBarService.showTopBar()
    this.topBarService.setLeftContent([
      {component: PageBackButtonComponent},
    ])
    this.topBarService.setRightContent([
      {
        component: ChordsSelectionButtonComponent,
        init: (vcr, component: ComponentType<ChordsSelectionButtonComponent>) => {
          const created = vcr.createComponent(component)
          created.instance.text = 'Chords'
          created.instance.matIcon = 'library_books'
          created.instance.menuItemsCustom = this.chordMenuItemsGroupCustom
          created.instance.menuItemsDefault = this.chordMenuItemsGroupDefault
        }
      }
    ])
  }

  ngOnDestroy(): void {
    this.topBarService.resetAll()
  }
}
