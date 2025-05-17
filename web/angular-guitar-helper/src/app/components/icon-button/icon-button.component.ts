import {Component, Input} from '@angular/core';
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-icon-button',
  imports: [
    MatIcon,
    MatIconButton
  ],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.css'
})
export class IconButtonComponent {
  @Input({required: true}) matIcon!: string
  @Input({required: true}) onClick!: () => void
}
