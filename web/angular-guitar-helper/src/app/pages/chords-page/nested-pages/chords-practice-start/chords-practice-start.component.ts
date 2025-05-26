import {
  AfterViewInit,
  Component,
  inject,
  Input,
  OnDestroy, OnInit,
  signal,
  ViewChild
} from '@angular/core';
import {TopBarService} from '../../../../services/top-bar-service/top-bar.service';
import {PageBackButtonComponent} from '../../../../components/page-back-button/page-back-button.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MobileModeService} from '../../../../services/mobile-mode-service/mobile-mode.service';
import {PageFrameComponent} from '../../../../components/page-frame/page-frame.component';
import {ChordsPracticeSetup} from '../../../../types/chords_practice_setup';
import {ComponentType} from '@angular/cdk/portal';
import {IconButtonComponent} from '../../../../components/icon-button/icon-button.component';
import {CHORDS_E} from '../../../../data/chords/chords_e';
import {
  ChordsCarouselComponent,
  ChordsDisplaySequence
} from '../../../../components/chords-carousel/chords-carousel.component';
import {MatProgressBar} from '@angular/material/progress-bar';
import {NgStyle} from '@angular/common';
import {SliderBoxComponent} from '../../../../components/slider-box/slider-box.component';
import {ActivatedRoute} from '@angular/router';
import {ChordsPracticeService} from '../../../../services/chords-pratice-service/chords-practice.service';

@Component({
  selector: 'app-chords-practice-start',
  imports: [
    MatSidenavModule,
    PageFrameComponent,
    ChordsCarouselComponent,
    MatProgressBar,
    NgStyle,
    SliderBoxComponent,
  ],
  templateUrl: './chords-practice-start.component.html',
  styleUrl: './chords-practice-start.component.scss'
})
export class ChordsPracticeStartComponent implements OnDestroy, AfterViewInit, OnInit {
  @ViewChild('chordsCarousel') chordsCarousel!: ChordsCarouselComponent

  // Signals
  readonly tuneMenuOpened = signal(false)
  readonly progressBar = signal(0)

  // Tuning parameters
  // TODO create a service to handle tuning parameters
  readonly widthProgressBar = signal(0)
  readonly previousChordsCount = signal(1)
  readonly nextChordsCount = signal(1)

  // Services
  readonly topBarService = inject(TopBarService)
  readonly mobileModeService = inject(MobileModeService)
  readonly chordsPracticeService = inject(ChordsPracticeService)

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

  ngOnInit(): void {
    console.log('SETUP', this.chordsPracticeService.practiceSetup().chords)
  }

  ngAfterViewInit(): void {

    // TODO change to two nested settimeout
    setInterval(() => {
      this.increaseProgressBar(10)
    }, 350)
  }

  ngOnDestroy(): void {
    this.topBarService.resetAll()
  }

  toggleTuneNav = () => {
    this.tuneMenuOpened.set(!this.tuneMenuOpened())
  }

  increaseProgressBar = (percent: number) => {
    if (this.progressBar() >= 100) {
      this.chordsCarousel.nextChord()
      this.progressBar.set(0)
      return
    }

    const newPercent = this.progressBar() + percent
    if (newPercent > 100) this.progressBar.set(100)
    else this.progressBar.set(newPercent)
  }

  handleCarouselWidth(width: number) {
    this.widthProgressBar.set(width)
  }

  handlePreviousChordTune = (value: number) => {
    this.previousChordsCount.set(value)
  }

  handleNextChordTune = (value: number) => {
    this.nextChordsCount.set(value)
  }
  protected readonly ChordsDisplaySequence = ChordsDisplaySequence;
}
