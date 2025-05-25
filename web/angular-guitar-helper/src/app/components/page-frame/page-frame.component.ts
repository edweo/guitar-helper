import {Component, Input} from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-page-frame',
  imports: [
    NgStyle
  ],
  templateUrl: './page-frame.component.html',
  styleUrl: './page-frame.component.css'
})
export class PageFrameComponent {
  @Input({}) padding? = true
}
