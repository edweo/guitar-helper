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

  protected readonly isMobile = signal(true);

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;
  private navMenuSubscription!: Subscription

  constructor() {
    this.navMenuSubscription = this.navMenuService.navMenuOpened$.subscribe((opened) => {
      this.navMenuOpened = opened
    })

    const media = inject(MediaMatcher);

    this._mobileQuery = media.matchMedia('(max-width: 640px)');
    this.transformNavMenu(this._mobileQuery.matches)
    this.isMobile.set(this._mobileQuery.matches);

    this._mobileQueryListener = () => {
      const newIsMobile = this._mobileQuery.matches
      this.transformNavMenu(newIsMobile)
      this.isMobile.set(newIsMobile);
    }
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
    this.navMenuSubscription.unsubscribe()
  }

  topBarButtonClick = () => {
    if (this.isMobile()) {
      console.log('tolgge button mobile')
      console.log(this.navMenuOpened)
      this.navMenuService.toggleNavMenu()
    } else {
      console.log('tolgge button window')
      console.log(this.navMenuOpened)
    }
  }

  transformNavMenu(isMobile: boolean) {
    if (isMobile === this.isMobile()) return

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
