import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy, OnInit,
  signal,
  ViewChild
} from '@angular/core';
import {TopBarService} from '../../../../services/top-bar-service/top-bar.service';
import {PageBackButtonComponent} from '../../../../components/page-back-button/page-back-button.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MobileModeService} from '../../../../services/mobile-mode-service/mobile-mode.service';
import {PageFrameComponent} from '../../../../components/page-frame/page-frame.component';
import {ComponentType} from '@angular/cdk/portal';
import {IconButtonComponent} from '../../../../components/icon-button/icon-button.component';
import {
  ChordsCarouselComponent,
} from '../../../../components/chords-carousel/chords-carousel.component';
import {MatProgressBar} from '@angular/material/progress-bar';
import {NgStyle} from '@angular/common';
import {SliderBoxComponent} from '../../../../components/slider-box/slider-box.component';
import {ChordsPracticeService} from '../../../../services/chords-pratice-service/chords-practice.service';
import {
  ChordsPracticeTuneService
} from '../../../../services/chords-practice-tune-service/chords-practice-tune.service';
import {Subscription} from 'rxjs';
import {
  ChordsTuneMenuGroupComponent
} from '../../../../components/chords-tune-menu-group/chords-tune-menu-group.component';

@Component({
  selector: 'app-chords-practice-start',
  imports: [
    MatSidenavModule,
    PageFrameComponent,
    ChordsCarouselComponent,
    NgStyle,
    SliderBoxComponent,
    ChordsTuneMenuGroupComponent,
  ],
  templateUrl: './chords-practice-start.component.html',
  styleUrl: './chords-practice-start.component.scss'
})
export class ChordsPracticeStartComponent implements OnDestroy, AfterViewInit {
  @ViewChild('chordsCarousel') chordsCarousel!: ChordsCarouselComponent

  // Tuning parameters
  // TODO create a service to handle tuning parameters

  // Signals
  readonly tuneMenuOpened = signal(false)
  readonly widthCarousel = signal(0)

  // Services
  readonly topBarService = inject(TopBarService)
  readonly mobileModeService = inject(MobileModeService)
  readonly chordsPracticeService = inject(ChordsPracticeService)
  readonly chordsPracticeTuneService = inject(ChordsPracticeTuneService)

  constructor() {
    this.topBarService.showTopBar()
    this.topBarService.setTopBarTitle('Practice')
    this.topBarService.setLeftContent([
      {component: PageBackButtonComponent}
    ])

    // TODO add counter maybe topbar right timer and/or toggle open/closed menu settings
    this.topBarService.setRightContent([
      {
        component: IconButtonComponent,
        init: (vcr, component: ComponentType<IconButtonComponent>) => {
          const btn = vcr.createComponent(component)
          btn.instance.matIcon = 'tune'
          btn.instance.onClick = this.toggleTuneNav
        }
      }
    ])

    if (!this.mobileModeService.isMobile()) this.tuneMenuOpened.set(true)

    // TODO subscription transiotion mobile to desktop and close/open tune menu
  }

  ngAfterViewInit(): void {
    this.chordsPracticeService.startPractice(async () => this.chordsCarousel.nextChord())
  }

  ngOnDestroy(): void {
    this.topBarService.resetAll()
  }

  toggleTuneNav = () => {
    this.tuneMenuOpened.set(!this.tuneMenuOpened())
  }

  handleCarouselWidth(width: number) {
    this.widthCarousel.set(width)
  }
}
