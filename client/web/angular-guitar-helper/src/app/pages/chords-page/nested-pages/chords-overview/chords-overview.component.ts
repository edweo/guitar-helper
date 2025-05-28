import {Component, inject, OnDestroy, signal, WritableSignal} from '@angular/core';
import {ChordCardComponent} from '../../../../components/page/chords-page/chord-card/chord-card.component';
import {TopBarService} from '../../../../services/app/top-bar-service/top-bar.service';
import {PageBackButtonComponent} from '../../../../components/app/page-back-button/page-back-button.component';
import {ChordsService} from '../../../../services/chords/chords-service/chords.service';
import {ChordsSelectionButtonComponent} from './components/chords-selection-button/chords-selection-button.component';
import {ComponentType} from '@angular/cdk/portal';
import {ChordGroup} from '../../../../types/chord_group';
import {ChordsSelectionMenuItem} from './types/chords_selection_menu_item';
import {Observable, Subscription} from 'rxjs';
import {PageFrameComponent} from '../../../../components/app/page-frame/page-frame.component';

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
  readonly currentChordGroup: WritableSignal<ChordGroup | undefined> = signal(undefined)
  private readonly chordMenuItemsGroupDefault: WritableSignal<ChordsSelectionMenuItem[]> = signal([])
  private readonly chordMenuItemsGroupCustom: WritableSignal<ChordsSelectionMenuItem[]> = signal([])

  // Services
  readonly chordsService = inject(ChordsService)
  readonly topBarService = inject(TopBarService)

  // Subscriptions
  private readonly subKeysChordsGroupDefault!: Subscription
  private readonly subKeysChordsGroupCustom!: Subscription

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

    this.subKeysChordsGroupDefault = this._subscribeMenuItems(this.chordsService.keysChordGroupsDefault$, this.chordMenuItemsGroupDefault)
    this.subKeysChordsGroupCustom = this._subscribeMenuItems(this.chordsService.keysChordGroupsCustom$, this.chordMenuItemsGroupCustom)
  }

  ngOnDestroy(): void {
    this.topBarService.resetAll()
    this.subKeysChordsGroupDefault.unsubscribe()
    this.subKeysChordsGroupCustom.unsubscribe()
  }

  private _changeCurrentChordGroup = (groupName: string) => {
    this.currentChordGroup.set(this.chordsService.getChordGroupDefault(groupName)!.asReadonly()())
    this.topBarService.setTopBarTitle('Group: ' + groupName)
  }

  private _subscribeMenuItems(
    menuItemsObs: Observable<string[]>,
    chordsMenuSignal: WritableSignal<ChordsSelectionMenuItem[]>
  ): Subscription {
    return menuItemsObs.subscribe(menuItems => {
      const newMenuItems: ChordsSelectionMenuItem[] = []
      menuItems.forEach(menuItem => {
        newMenuItems.push({
          text: menuItem,
          onClick: () => this._changeCurrentChordGroup(menuItem)
        })
      })
      chordsMenuSignal.set(newMenuItems)
    })
  }
}
