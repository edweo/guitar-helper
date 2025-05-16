import {Component, ElementRef, inject, Input, OnDestroy, ViewChild, ViewContainerRef} from '@angular/core';
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
export class TopBarComponent implements OnDestroy{
  @ViewChild('leftContent') leftContent!: ElementRef
  @ViewChild('rightContent') rightContent!: ElementRef

  // Services
  readonly topBarService = inject(TopBarService)

  // Subscriptions
  private leftContentSubscription!: Subscription
  private rightContentSubscription!: Subscription

  constructor() {

  }

  ngAfterViewInit() {
    // Left content Listener
    this.leftContentSubscription = this.topBarService.leftContent$.subscribe((content) => {
      console.log('content:', content)
      this.leftContent.nativeElement.innerHTML = '';
      if (content !== null) {
        for (const contentElement of content) {
          this.leftContent.nativeElement.append(contentElement.location.nativeElement)
        }
      }
    })

    // Right content Listener
    this.rightContentSubscription = this.topBarService.rightContent$.subscribe((content) => {
      this.rightContent.nativeElement.innerHTML = '';
      if (content !== null) {
        for (const contentElement of content) {
          this.rightContent.nativeElement.append(contentElement.location.nativeElement)
        }
      }
    })
  }

  ngOnDestroy() {
    this.leftContentSubscription.unsubscribe()
    this.rightContentSubscription.unsubscribe()
  }
}
