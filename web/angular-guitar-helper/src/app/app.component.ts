import {Component, inject, signal, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatDrawer, MatDrawerMode, MatSidenavModule} from '@angular/material/sidenav';
import {MatNavList} from '@angular/material/list';
import {NavItemComponent} from './components/nav-item/nav-item.component';
import {TopBarComponent} from './components/top-bar/top-bar.component';
import {NavMenuService} from './services/nav-menu-service/nav-menu.service';
import {PageFrameComponent} from './components/page-frame/page-frame.component';
import {MediaMatcher} from '@angular/cdk/layout';
import {Subscription} from 'rxjs';
import {MobileModeService} from './services/mobile-mode-service/mobile-mode.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavModule, MatNavList, TopBarComponent, NavItemComponent, PageFrameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild('sidenav') sidenav!: MatDrawer;
  title = 'Guitara';

  navMenuOpened!: boolean
  navMenuMode!: MatDrawerMode

  // Services
  readonly navMenuService: NavMenuService = inject(NavMenuService)
  readonly mobileModeService: MobileModeService = inject(MobileModeService)

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

  topBarButtonClick = () => {
    if (this.mobileModeService.isMobile()) {
      console.log('tolgge button mobile')
      console.log(this.navMenuOpened)
      this.navMenuService.toggleNavMenu()
    } else {
      console.log('tolgge button window')
      console.log(this.navMenuOpened)
    }
  }

  transformNavMenu(isMobile: boolean) {
    if (isMobile) {
      this.navMenuMode = 'over'
      this.navMenuSubscription = this.navMenuService.navMenuOpened$.subscribe((opened) => {
        this.navMenuOpened = opened
      })
      this.navMenuService.closeNavMenu()
    } else {
      this.navMenuMode = 'side'
      this.navMenuService.openNavMenu()
      this.navMenuSubscription.unsubscribe()
    }
  }
}
