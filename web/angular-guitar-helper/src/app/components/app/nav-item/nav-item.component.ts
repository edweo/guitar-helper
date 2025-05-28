import {Component, inject, Input} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NavMenuService} from '../../../services/app/nav-menu-service/nav-menu.service';

@Component({
  selector: 'app-nav-item',
  imports: [
    MatIcon,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.css'
})
export class NavItemComponent {
  @Input({required: true}) title!: string
  @Input({required: true}) route!: string
  @Input({required: true}) matIcon!: string
  @Input() textShown = true

  // Services
  readonly navMenuService: NavMenuService = inject(NavMenuService)
}
