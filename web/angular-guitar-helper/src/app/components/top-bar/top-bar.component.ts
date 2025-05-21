import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {TopBarService} from '../../services/top-bar-service/top-bar.service';
import {Subscription} from 'rxjs';
import {DynamicComponent} from '../../types/dynamic_component';
import {MenuButtonComponent} from '../menu-button/menu-button.component';
import {MobileModeService} from '../../services/mobile-mode-service/mobile-mode.service';

@Component({
  selector: 'app-top-bar',
  imports: [
    MatToolbar,
    MenuButtonComponent,
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent implements OnDestroy, AfterViewInit {
  @ViewChild('leftContent', { read: ViewContainerRef, static: true }) leftContent!: ViewContainerRef
  @ViewChild('rightContent', { read: ViewContainerRef, static: true }) rightContent!: ViewContainerRef

  // Services
  readonly topBarService = inject(TopBarService)
  readonly mobileModeService = inject(MobileModeService)

  // Subscriptions
  private leftContentSubscription!: Subscription
  private rightContentSubscription!: Subscription

  constructor() {}

  ngAfterViewInit() {
    // Left content Listener
    this.leftContentSubscription = this.topBarService.leftContent$.subscribe((components) => {
      this._replaceComponentOnSide(this.leftContent, components)
    })

    // Right content Listener
    this.rightContentSubscription = this.topBarService.rightContent$.subscribe((components) => {
      this._replaceComponentOnSide(this.rightContent, components)
    })
  }

  ngOnDestroy() {
    this.leftContentSubscription.unsubscribe()
    this.rightContentSubscription.unsubscribe()
  }

  private _replaceComponentOnSide(vcr: ViewContainerRef, components: DynamicComponent<any>[] | null) {
    vcr.clear()
    if (components !== null) {
      for (const dynamicComponent of components) {
        if (dynamicComponent.init !== undefined) {
          dynamicComponent.init(vcr, dynamicComponent.component)
        } else {
          vcr.createComponent(dynamicComponent.component)
        }
      }
    }
  }
}
