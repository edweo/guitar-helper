import {Component, inject, Input} from '@angular/core';
import {MatListItem} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NavMenuService} from '../../services/nav-menu.service';

@Component({
  selector: 'app-nav-item',
  imports: [
    MatListItem,
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

  // Services
  readonly navMenuService: NavMenuService = inject(NavMenuService)
}
