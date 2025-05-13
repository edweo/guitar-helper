import {Component, Input} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-top-bar',
  imports: [
    MatIconButton,
    MatToolbar,
    MatIcon
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {
  @Input({required: true}) title!: string
  @Input({required: true}) buttonIcon!: string
  @Input({required: true}) buttonClick!: () => void
}
