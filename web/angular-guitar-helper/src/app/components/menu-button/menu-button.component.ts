import {Component, inject, Input} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {NavMenuService} from '../../services/nav-menu-service/nav-menu.service';

@Component({
  selector: 'app-menu-button',
  imports: [
    MatIconButton,
    MatIcon
  ],
  templateUrl: './menu-button.component.html',
  styleUrl: './menu-button.component.css'
})
export class MenuButtonComponent {

  // Services
  private readonly navMenuService = inject(NavMenuService)

  buttonClick = () => {
    this.navMenuService.toggleNavMenu()
  }
}
