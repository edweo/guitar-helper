import {Component, inject} from '@angular/core';
import {CardInfoImageComponent} from "../../../../components/card-info-image/card-info-image.component";
import {Router} from '@angular/router';

@Component({
  selector: 'app-chords-main-page',
  imports: [
    CardInfoImageComponent
  ],
  templateUrl: './chords-main-page.component.html',
  styleUrl: './chords-main-page.component.css'
})
export class ChordsMainPageComponent {

  private router: Router = inject(Router)

  navigateToChordsOverview = () => {
    this.router.navigate(['chords/overview'])
  }

  navigateToChordsPractice= () => {
    this.router.navigate(['chords/practice'])
  }
}
