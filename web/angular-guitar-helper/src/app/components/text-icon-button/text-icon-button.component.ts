import {Component, Input} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-text-icon-button',
  imports: [
    MatIcon,
    MatButton
  ],
  templateUrl: './text-icon-button.component.html',
  styleUrl: './text-icon-button.component.css'
})
export class TextIconButtonComponent {
  @Input() matIcon?: string
  @Input({required: true}) text!: string
  @Input({required: true}) onClick!: () => void
}
