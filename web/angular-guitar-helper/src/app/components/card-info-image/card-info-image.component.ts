import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent, MatCardFooter, MatCardImage} from '@angular/material/card';
import {NgOptimizedImage, NgStyle} from '@angular/common';
import {MatRipple} from '@angular/material/core';

@Component({
  selector: 'app-card-info-image',
  imports: [
    MatCard,
    MatCardContent,
    MatCardFooter,
    MatCardImage,
    MatRipple,
    NgStyle,
  ],
  templateUrl: './card-info-image.component.html',
  styleUrl: './card-info-image.component.css'
})
export class CardInfoImageComponent {

  @Input({required: true}) title!: string
  @Input({required: true}) desc!: string
  @Input({required: true}) imgSrc!: string

  @Input() width?: number = 256
  @Input() height?: number = 256
  @Input() heightTextArea?: number
  @Input() onClick?: () => void

  _onClick() {
    if (this.onClick !== undefined) this.onClick()
  }
}
