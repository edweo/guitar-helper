import {Component, inject} from '@angular/core';
import {ChordCardComponent} from '../../../../components/chord-card/chord-card.component';
import {TopBarService} from '../../../../services/top-bar-service/top-bar.service';
import {PageBackButtonComponent} from '../../../../components/page-back-button/page-back-button.component';
import {ChordsService} from '../../../../services/chords-service/chords.service';

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
    this.topBarService.setRightContent([PageBackButtonComponent])
  }
}
