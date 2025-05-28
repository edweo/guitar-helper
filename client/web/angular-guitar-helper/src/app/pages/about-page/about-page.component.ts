import {Component, inject} from '@angular/core';
import {TextIconButtonComponent} from '../../components/buttons/text-icon-button/text-icon-button.component';
import {Chord, ChordsApiService} from '../../../../generated-sources/openapi/chords-service-openapi';
import {HttpContext} from '@angular/common/http';

@Component({
  selector: 'app-about-page',
  imports: [
    TextIconButtonComponent
  ],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css'
})
export class AboutPageComponent {

  private readonly chordsApiService = inject(ChordsApiService)

  onClickBack = () => {

    this.chordsApiService.listChords('body',).subscribe((data: Chord[]) => {
      console.log('Chords fetched successfully:', data);
    })
  }
}
