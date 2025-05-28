import {Component, inject} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Location} from '@angular/common';

@Component({
  selector: 'app-page-back-button',
  imports: [
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './page-back-button.component.html',
  styleUrl: './page-back-button.component.css'
})
export class PageBackButtonComponent {

  private readonly location = inject(Location)

  buttonClick() {
    this.location.back()
  }
}
