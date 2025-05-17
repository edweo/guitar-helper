import {Component, inject, ViewContainerRef} from '@angular/core';
import {CHORDS_E} from '../../../../constants/chords/chords_e';
import {CHORDS_F} from '../../../../constants/chords/chords_f';
import {ChordCardComponent} from '../../../../components/chord-card/chord-card.component';
import {TopBarService} from '../../../../services/top-bar-service/top-bar.service';
import {PageBackButtonComponent} from '../../../../components/page-back-button/page-back-button.component';

@Component({
  selector: 'app-chords-overview',
  imports: [
    ChordCardComponent,
  ],
  templateUrl: './chords-overview.component.html',
  styleUrl: './chords-overview.component.css'
})
export class ChordsOverviewComponent {
  readonly CHORDS_E = CHORDS_E;
  readonly CHORDS_F = CHORDS_F;

  // Services
  private readonly topBarService = inject(TopBarService)

  constructor() {
    this.topBarService.setTopBarShown(true)
    this.topBarService.setRightContent([PageBackButtonComponent])
  }
}
