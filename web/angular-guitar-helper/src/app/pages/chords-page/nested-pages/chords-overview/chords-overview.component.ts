import {Component, inject} from '@angular/core';
import {ChordCardComponent} from '../../../../components/chord-card/chord-card.component';
import {TopBarService} from '../../../../services/top-bar-service/top-bar.service';
import {PageBackButtonComponent} from '../../../../components/page-back-button/page-back-button.component';
import {ChordsService} from '../../../../services/chords-service/chords.service';
import {ChordsSelectionButtonComponent} from './components/chords-selection-button/chords-selection-button.component';
import {ComponentType} from '@angular/cdk/portal';

@Component({
  selector: 'app-chords-overview',
  imports: [
    ChordCardComponent,
  ],
  templateUrl: './chords-overview.component.html',
  styleUrl: './chords-overview.component.css'
})
export class ChordsOverviewComponent {
  // Services
  readonly chordsService = inject(ChordsService)
  private readonly topBarService = inject(TopBarService)

  constructor() {
    this.topBarService.setTopBarShown(true)

    this.topBarService.setRightContent([
      {component: PageBackButtonComponent},
      {
        component: ChordsSelectionButtonComponent,
        init: (vcr, component: ComponentType<ChordsSelectionButtonComponent>) => {
          const created = vcr.createComponent(component)
          created.instance.text = 'Chords'
          created.instance.matIcon = 'library_books'
          created.instance.menuItems = [
            // TODO add menu items for each chrod group and actions when clicking to change the diplayed hords gallery
            {matIcon: 'dialpad', text: 'redial', onClick: this.click},
          ]
        }
      }
    ])
  }

  click = () => {
    console.log('clicking button!')
  }
}
