import {
  Component,
  inject,
  OnDestroy,
  signal,
  ViewChild
} from '@angular/core';
import {TopBarService} from '../../../../services/app/top-bar-service/top-bar.service';
import {PageBackButtonComponent} from '../../../../components/app/page-back-button/page-back-button.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MobileModeService} from '../../../../services/app/mobile-mode-service/mobile-mode.service';
import {PageFrameComponent} from '../../../../components/app/page-frame/page-frame.component';
import {ComponentType} from '@angular/cdk/portal';
import {IconButtonComponent} from '../../../../components/buttons/icon-button/icon-button.component';
import {
  ChordsCarouselComponent,
} from '../../../../components/page/chords-page/chords-carousel/chords-carousel.component';
import {NgStyle} from '@angular/common';
import {ChordsPracticeService} from '../../../../services/chords/chords-pratice-service/chords-practice.service';
import {
  ChordsPracticeTuneService
} from '../../../../services/chords/chords-practice-tune-service/chords-practice-tune.service';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {
  ChordsPracticeTuneOptionsComponent
} from '../../../../components/page/chords-page/chords-practice-tune-options/chords-practice-tune-options.component';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-chords-practice-start',
  imports: [
    MatSidenavModule,
    PageFrameComponent,
    ChordsCarouselComponent,
    NgStyle,
    MatIcon,
    MatButton,
    ChordsPracticeTuneOptionsComponent,
  ],
  templateUrl: './chords-practice-start.component.html',
  styleUrl: './chords-practice-start.component.scss'
})
export class ChordsPracticeStartComponent implements OnDestroy {
  @ViewChild('chordsCarousel') chordsCarousel!: ChordsCarouselComponent

  // Signals
  readonly tuneMenuOpened = signal(false)
  readonly widthCarousel = signal(0)

  // Services
  readonly topBarService = inject(TopBarService)
  readonly mobileModeService = inject(MobileModeService)
  readonly chordsPracticeService = inject(ChordsPracticeService)
  readonly chordsPracticeTuneService = inject(ChordsPracticeTuneService)
  private readonly bottomSheetService = inject(MatBottomSheet);

  // Variables
  private _bottomSheetOpened: MatBottomSheetRef | null = null;

  // Subscriptions
  private _bottomSheetSubscription: Subscription;

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

    if (!this.mobileModeService.isMobile()) this.tuneMenuOpened.set(true)

    this._bottomSheetSubscription =this.mobileModeService.isMobile$.subscribe((isMobile) => {
      // If we are on mobile, we want to close the tune menu if it is opened when switching to desktop mode
      if (!isMobile) {
        if (this._bottomSheetOpened) {
          this._bottomSheetOpened.dismiss();
          this._bottomSheetOpened = null;
        }
        this.tuneMenuOpened.set(true);
      }
    })
  }

  ngOnDestroy(): void {
    this.topBarService.resetAll()
    this._bottomSheetSubscription.unsubscribe()
  }

  toggleTuneNav = () => {
    if (this.mobileModeService.isMobile()) {
      this._bottomSheetOpened = this.bottomSheetService.open(ChordsPracticeTuneOptionsComponent);
    } else {
      this.tuneMenuOpened.set(!this.tuneMenuOpened())
    }
  }

  handleCarouselWidth(width: number) {
    this.widthCarousel.set(width)
  }

  nextChord = async () => {
    this.chordsCarousel.moveNextChord()
  }
}
