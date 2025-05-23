import {Component, inject, OnDestroy} from '@angular/core';
import {TopBarService} from '../../../../services/top-bar-service/top-bar.service';
import {PageBackButtonComponent} from '../../../../components/page-back-button/page-back-button.component';

@Component({
  selector: 'app-chords-practice-start',
  imports: [],
  templateUrl: './chords-practice-start.component.html',
  styleUrl: './chords-practice-start.component.css'
})
export class ChordsPracticeStartComponent implements OnDestroy {

  // Services
  readonly topBarService = inject(TopBarService)

  constructor() {
    this.topBarService.showTopBar()
    this.topBarService.setTopBarTitle('Practice')
    this.topBarService.setLeftContent([
      {component: PageBackButtonComponent}
    ])
  }

  ngOnDestroy(): void {
    this.topBarService.resetAll()
  }
}
