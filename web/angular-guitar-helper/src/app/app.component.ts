import {Component, inject, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import {MatNavList} from '@angular/material/list';
import {NavItemComponent} from './components/nav-item/nav-item.component';
import {TopBarComponent} from './components/top-bar/top-bar.component';
import {NavMenuService} from './services/nav-menu-service/nav-menu.service';
import {PageFrameComponent} from './components/page-frame/page-frame.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavModule, MatNavList, TopBarComponent, NavItemComponent, PageFrameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild('sidenav') sidenav!: MatDrawer;
  title = 'Guitara';

  navMenuOpened: boolean = false

  // Services
  readonly navMenuService: NavMenuService = inject(NavMenuService)

  ngOnInit() {
    this.navMenuService.navMenuOpened$.subscribe((opened) => {
      this.navMenuOpened = opened
    })
  }
}
