import {
  Component,
  inject,
  OnDestroy,
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
  ChordsCarouselComponent, ChordsDisplaySequence,
} from '../../../../components/chords-carousel/chords-carousel.component';
import {NgStyle} from '@angular/common';
import {SliderBoxComponent} from '../../../../components/slider-box/slider-box.component';
import {ChordsPracticeService} from '../../../../services/chords-pratice-service/chords-practice.service';
import {
  ChordsPracticeTuneService
} from '../../../../services/chords-practice-tune-service/chords-practice-tune.service';
import {
  ChordsTuneMenuGroupComponent
} from '../../../../components/chords-tune-menu-group/chords-tune-menu-group.component';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {ChordCardComponent} from '../../../../components/chord-card/chord-card.component';
import {
  ChordsPracticeTuneOptionsComponent
} from '../../../../components/chords-practice-tune-options/chords-practice-tune-options.component';

@Component({
  selector: 'app-chords-practice-start',
  imports: [
    MatSidenavModule,
    PageFrameComponent,
    ChordsCarouselComponent,
    NgStyle,
    SliderBoxComponent,
    ChordsTuneMenuGroupComponent,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatIcon,
    MatButton,
    ChordCardComponent,
    ChordsPracticeTuneOptionsComponent,
  ],
  templateUrl: './chords-practice-start.component.html',
  styleUrl: './chords-practice-start.component.scss'
})
export class ChordsPracticeStartComponent implements OnDestroy {
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

    this.chordsPracticeService.pausePractice()

    // TODO subscription transiotion mobile to desktop and close/open tune menu
    if (!this.mobileModeService.isMobile()) this.tuneMenuOpened.set(true)
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

  nextChord = async () => {
    this.chordsCarousel.nextChord()
  }

  protected readonly ChordsDisplaySequence = ChordsDisplaySequence;
}
