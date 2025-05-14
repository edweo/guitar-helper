import {Component} from '@angular/core';
import {ChordCardComponent} from '../../components/chord-card/chord-card.component';
import {CHORDS_E} from '../../constants/chords/chords_e';
import {CHORDS_F} from '../../constants/chords/chords_f';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardImage} from '@angular/material/card';
import { NgOptimizedImage } from '@angular/common';
import {MatRipple} from '@angular/material/core';
import {CardInfoImageComponent} from '../../components/card-info-image/card-info-image.component';
import {ChordsMainPageComponent} from './sub-pages/chords-main-page/chords-main-page.component';

@Component({
  selector: 'app-chords-page',
  imports: [
    ChordCardComponent,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardFooter,
    NgOptimizedImage,
    MatCardHeader,
    MatRipple,
    MatCardImage,
    CardInfoImageComponent,
    ChordsMainPageComponent,
  ],
  templateUrl: './chords-page.component.html',
  styleUrl: './chords-page.component.css'
})
export class ChordsPageComponent {
  protected readonly CHORDS_E = CHORDS_E;
  protected readonly CHORDS_F = CHORDS_F;

  practiceChordCardClick() {
    console.log('open practice chords')
  }
}
