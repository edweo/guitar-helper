import {
  AfterViewInit,
  Component,
  inject,
  Input,
  OnDestroy,
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
import {Chord} from '../../../../models/chord';
import {ChordsCarouselComponent} from '../../../../components/chords-carousel/chords-carousel.component';
import {MatProgressBar} from '@angular/material/progress-bar';
import {NgStyle} from '@angular/common';
import {SliderBoxComponent} from '../../../../components/slider-box/slider-box.component';

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
export class ChordsPracticeStartComponent implements OnDestroy, AfterViewInit {
  @ViewChild('chordsCarousel') chordsCarousel!: ChordsCarouselComponent

  @Input({required: true}) setup: ChordsPracticeSetup = {
    name: 'Test',
    chords: new Set<Chord>(CHORDS_E)
  }


  // Signals
  readonly displayChords = signal(Array.from(this.setup.chords))
  readonly tuneMenuOpened = signal(false)
  readonly progressBar = signal(0)

  // Tuning parameters
  readonly widthProgressBar = signal(0)
  readonly previousChordsCount = signal(1)
  readonly nextChordsCount = signal(1)

  // Services
  readonly topBarService = inject(TopBarService)
  readonly mobileModeService = inject(MobileModeService)

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

    // TODO change to two nested settimeout
    setInterval(() => {
      this.increaseProgressBar(5)
    }, 100)
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
}
