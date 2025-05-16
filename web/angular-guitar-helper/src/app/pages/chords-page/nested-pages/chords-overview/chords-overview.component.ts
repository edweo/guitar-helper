import {Component, inject, ViewContainerRef} from '@angular/core';
import {CHORDS_E} from '../../../../constants/chords/chords_e';
import {CHORDS_F} from '../../../../constants/chords/chords_f';
import {ChordCardComponent} from '../../../../components/chord-card/chord-card.component';
import {MatIconButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatIcon} from '@angular/material/icon';
import {NgStyle} from '@angular/common';
import {TopBarService} from '../../../../services/top-bar-service/top-bar.service';
import {PageBackButtonComponent} from '../../../../components/page-back-button/page-back-button.component';

@Component({
  selector: 'app-chords-overview',
  imports: [
    ChordCardComponent,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    NgStyle
  ],
  templateUrl: './chords-overview.component.html',
  styleUrl: './chords-overview.component.css'
})
export class ChordsOverviewComponent {
  topBarHeight: number = 56

  readonly CHORDS_E = CHORDS_E;
  readonly CHORDS_F = CHORDS_F;

  // Services
  private readonly topBarService = inject(TopBarService)
  private readonly vcr = inject(ViewContainerRef);

  constructor() {
    this.topBarService.setTopBarShown(true)
    const backButton = this.vcr.createComponent(PageBackButtonComponent)
    this.topBarService.setRightContent([backButton])
  }

}
