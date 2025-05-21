import {Component, inject, OnDestroy, signal, WritableSignal} from '@angular/core';
import {ChordCardComponent} from '../../../../components/chord-card/chord-card.component';
import {TopBarService} from '../../../../services/top-bar-service/top-bar.service';
import {PageBackButtonComponent} from '../../../../components/page-back-button/page-back-button.component';
import {ChordsService} from '../../../../services/chords-service/chords.service';
import {ChordsSelectionButtonComponent} from './components/chords-selection-button/chords-selection-button.component';
import {ComponentType} from '@angular/cdk/portal';
import {ChordGroup} from '../../../../types/chord_group';
import {DefaultChordGroups} from '../../../../types/default_chord_groups';
import {ChordsSelectionMenuItem} from './types/chords_selection_menu_item';

@Component({
  selector: 'app-chords-overview',
  imports: [
    ChordCardComponent,
  ],
  templateUrl: './chords-overview.component.html',
  styleUrl: './chords-overview.component.css'
})
export class ChordsOverviewComponent implements OnDestroy {
  readonly currentChordGroup: WritableSignal<ChordGroup | undefined> = signal(undefined)

  // Services
  readonly chordsService = inject(ChordsService)
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

          const menuItems: ChordsSelectionMenuItem[] = []

          // Add default chord values in menu
          Object.values(DefaultChordGroups).forEach(defaultMenuItem => {
            menuItems.push({
              text: defaultMenuItem,
              onClick: () => this._changeCurrentChordGroup(defaultMenuItem)
            })
          })

          // TODO Add custom menu item values

          created.instance.menuItems = menuItems
        }
      }
    ])

    this._changeCurrentChordGroup(DefaultChordGroups.CHORDS_A)
  }

  ngOnDestroy(): void {
    this.topBarService.resetAll()
  }

  private _changeCurrentChordGroup = (groupName: string) => {
    this.currentChordGroup.set(this.chordsService.getChordGroup(groupName)!.asReadonly()())
    this.topBarService.setTopBarTitle('Group: ' + groupName)
  }
}
