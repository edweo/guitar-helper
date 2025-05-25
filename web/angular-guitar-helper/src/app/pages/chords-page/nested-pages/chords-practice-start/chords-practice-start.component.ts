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
import {NgStyle} from '@angular/common';
import {ChordsCarouselComponent} from '../../../../components/chords-carousel/chords-carousel.component';

@Component({
  selector: 'app-chords-practice-start',
  imports: [
    MatSidenavModule,
    PageFrameComponent,
    NgStyle,
    ChordsCarouselComponent,
  ],
  templateUrl: './chords-practice-start.component.html',
  styleUrl: './chords-practice-start.component.css'
})
export class ChordsPracticeStartComponent implements OnDestroy, AfterViewInit {
  @ViewChild('chordsCarousel') chordsCarousel!: ChordsCarouselComponent

  @Input({required: true}) setup: ChordsPracticeSetup = {
    name: 'Test',
    chords: new Set<Chord>(CHORDS_E)
  }

  testNum = signal(1)

  // Signals
  readonly displayChords = signal(Array.from(this.setup.chords))
  readonly tuneMenuOpened = signal(false)
  readonly progressBar = signal(0)

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
    setInterval(() => {
      this.increaseProgressBar(5)
      this.chordsCarousel.nextChord()
    }, 2000)
  }

  ngOnDestroy(): void {
    this.topBarService.resetAll()
  }

  toggleTuneNav = () => {
    this.tuneMenuOpened.set(!this.tuneMenuOpened())
  }

  increaseProgressBar = (percent: number) => {
    if (this.progressBar() >= 100) return
    const newPercent = this.progressBar() + percent
    if (newPercent > 100) this.progressBar.set(100)
    else this.progressBar.set(newPercent)
  }

  increase = () => {
    const newNum = this.testNum() + 1
    this.testNum.set(newNum)
  }

  decrease = () => {
    const newNum = this.testNum() - 1
    this.testNum.set(newNum)
  }
}
