import {inject, Injectable, OnDestroy} from '@angular/core';
import {TopBarService} from '../services/top-bar-service/top-bar.service';

@Injectable()
export abstract class TopBarLifecycleComponent implements OnDestroy {
  private readonly topBarService = inject(TopBarService)

  abstract setTopBarContent(topBarService: TopBarService): void

  protected constructor() {
    this.topBarService.showTopBar()
    this.setTopBarContent(this.topBarService)
  }

  ngOnDestroy(): void {
    this.topBarService.resetAll()
  }
}
