import {Component, inject} from '@angular/core';
import {CardInfoImageComponent} from "../../../../components/card-info-image/card-info-image.component";
import {Router} from '@angular/router';
import {TopBarService} from '../../../../services/top-bar-service/top-bar.service';

@Component({
  selector: 'app-chords-main-page',
  imports: [
    CardInfoImageComponent
  ],
  templateUrl: './chords-main-page.component.html',
  styleUrl: './chords-main-page.component.css'
})
export class ChordsMainPageComponent {

  // Services
  private readonly topBarService = inject(TopBarService)
  private readonly router: Router = inject(Router)

  constructor() {
    this.topBarService.hideTopBar()
  }

  navigateToChordsOverview = () => {
    this.router.navigate(['chords/overview'])
  }

  navigateToChordsPractice= () => {
    this.router.navigate(['chords/practice'])
  }
}
