import {Component} from '@angular/core';
import {PageFrameComponent} from '../../components/app/page-frame/page-frame.component';
import {environment} from '../../../environments/environment';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-about-page',
  imports: [
    PageFrameComponent,
    NgOptimizedImage,
  ],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css'
})
export class AboutPageComponent {

  protected readonly environment = environment;
}
