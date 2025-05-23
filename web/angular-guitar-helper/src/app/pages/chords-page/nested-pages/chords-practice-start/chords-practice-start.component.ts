import {Component, inject, OnDestroy} from '@angular/core';
import {TopBarService} from '../../../../services/top-bar-service/top-bar.service';
import {PageBackButtonComponent} from '../../../../components/page-back-button/page-back-button.component';
import {TextIconButtonComponent} from '../../../../components/text-icon-button/text-icon-button.component';
import {ComponentType} from '@angular/cdk/portal';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MobileModeService} from '../../../../services/mobile-mode-service/mobile-mode.service';

@Component({
  selector: 'app-chords-practice-start',
  imports: [
    MatSidenavModule
  ],
  templateUrl: './chords-practice-start.component.html',
  styleUrl: './chords-practice-start.component.css'
})
export class ChordsPracticeStartComponent implements OnDestroy {

  // Services
  readonly topBarService = inject(TopBarService)
  readonly mobileModeService = inject(MobileModeService)

  constructor() {
    this.topBarService.showTopBar()
    this.topBarService.setTopBarTitle('Practice')
    this.topBarService.setLeftContent([
      {component: PageBackButtonComponent}
    ])

    // TODO add counter maybe topbar right timer and/or toggle opne/closed menu settings

    // this.topBarService.setRightContent([
    //   {
    //     component: TextIconButtonComponent,
    //     init: (vcr, component: ComponentType<TextIconButtonComponent>) => {
    //       const btn = vcr.createComponent(component)
    //       btn.instance.matIcon = 'tune'
    //       btn.instance.text = 'Configure'
    //       btn.instance.onClick = this.placeholder
    //     }
    //   }
    // ])
  }

  placeholder = () => {

  }

  ngOnDestroy(): void {
    this.topBarService.resetAll()
  }
}
