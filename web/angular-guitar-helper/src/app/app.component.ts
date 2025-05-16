import {Component, inject, OnDestroy, ViewChild, ViewContainerRef} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatDrawer, MatDrawerMode, MatSidenavModule} from '@angular/material/sidenav';
import {MatNavList} from '@angular/material/list';
import {NavItemComponent} from './components/nav-item/nav-item.component';
import {TopBarComponent} from './components/top-bar/top-bar.component';
import {NavMenuService} from './services/nav-menu-service/nav-menu.service';
import {PageFrameComponent} from './components/page-frame/page-frame.component';
import {Subscription} from 'rxjs';
import {MobileModeService} from './services/mobile-mode-service/mobile-mode.service';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {NgStyle} from '@angular/common';
import {TopBarService} from './services/top-bar-service/top-bar.service';
import {MenuButtonComponent} from './components/menu-button/menu-button.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatNavList,
    TopBarComponent,
    NavItemComponent,
    PageFrameComponent,
    MatIcon,
    MatIconButton,
    NgStyle,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnDestroy {
  @ViewChild('sidenav') sidenav!: MatDrawer;

  title = 'Guitara';
  navMenuOpened!: boolean
  navItemsTextShown: boolean = true
  navMenuMode!: MatDrawerMode


  // Services
  readonly navMenuService: NavMenuService = inject(NavMenuService)
  readonly mobileModeService: MobileModeService = inject(MobileModeService)
  readonly topBarService: TopBarService = inject(TopBarService)
  private readonly vcr = inject(ViewContainerRef);

  // Subscriptions RxJS
  private navMenuSubscription!: Subscription
  private mobileModeSubscription!: Subscription

  constructor() {
    this.navMenuSubscription = this.navMenuService.navMenuOpened$.subscribe((opened) => {
      this.navMenuOpened = opened
    })

    this.mobileModeSubscription = this.mobileModeService.isMobile$.subscribe((isMobile) => {
      this.transformNavMenu(isMobile)
    })

    this.transformNavMenu(this.mobileModeService.isMobile().valueOf())
  }

  ngOnDestroy(): void {
    this.navMenuSubscription.unsubscribe()
    this.mobileModeSubscription.unsubscribe()
  }

  toggleNavItemsTextShown = () => {
    this.navItemsTextShown = !this.navItemsTextShown
  }

  transformNavMenu(isMobile: boolean) {
    if (isMobile) {
      this.navMenuService.closeNavMenu()
      this.navMenuMode = 'over'
      this.navItemsTextShown = true
      this.navMenuSubscription = this.navMenuService.navMenuOpened$.subscribe((opened) => {
        this.navMenuOpened = opened
      })
      const menuButton = this.vcr.createComponent(MenuButtonComponent)
      this.topBarService.setLeftContent([menuButton])
    } else {
      this.navMenuMode = 'side'
      this.navMenuService.openNavMenu()
      this.navMenuSubscription.unsubscribe()
      this.topBarService.setLeftContent(null)
    }
  }
}
