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

@Component({
  selector: 'app-top-bar',
  imports: [
    MatToolbar,
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent implements OnDestroy, AfterViewInit {
  @ViewChild('leftContent', { read: ViewContainerRef, static: true }) leftContent!: ViewContainerRef
  @ViewChild('rightContent', { read: ViewContainerRef, static: true }) rightContent!: ViewContainerRef

  // Services
  readonly topBarService = inject(TopBarService)
  private readonly vcr = inject(ViewContainerRef)

  // Subscriptions
  private leftContentSubscription!: Subscription
  private rightContentSubscription!: Subscription

  constructor() {}

  ngAfterViewInit() {
    // Left content Listener
    this.leftContentSubscription = this.topBarService.leftContent$.subscribe((content) => {
      console.log('content:', content)
      this.leftContent.clear()
      if (content !== null) {
        for (const contentElement of content) {
          this.leftContent.createComponent(contentElement)
        }
      }
    })

    // Right content Listener
    this.rightContentSubscription = this.topBarService.rightContent$.subscribe((content) => {
      this.rightContent.clear()
      if (content !== null) {
        for (const contentElement of content) {
          this.rightContent.createComponent(contentElement)
        }
      }
    })
  }

  ngOnDestroy() {
    this.leftContentSubscription.unsubscribe()
    this.rightContentSubscription.unsubscribe()
  }
}
