import {inject, Injectable, OnDestroy, signal} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {toObservable} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class MobileModeService implements OnDestroy {
  readonly isMobile = signal(true);
  readonly isMobile$ = toObservable(this.isMobile)

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  constructor() {
    const media = inject(MediaMatcher);

    this._mobileQuery = media.matchMedia('(max-width: 640px)');
    this.isMobile.set(this._mobileQuery.matches);

    this._mobileQueryListener = () => {
      this.isMobile.set(this._mobileQuery.matches);
    }

    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy() {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
