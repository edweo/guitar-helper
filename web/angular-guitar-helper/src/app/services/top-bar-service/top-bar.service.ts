import {ComponentRef, Injectable, signal} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class TopBarService {

  readonly isTopBarShown = signal<boolean>(true)

  readonly title = signal<string | null>("Guitara")

  readonly leftContent = signal<ComponentRef<any>[] | null>(null)
  readonly leftContent$ = toObservable(this.leftContent)

  readonly rightContent = signal<ComponentRef<any>[] | null>(null)
  readonly rightContent$ = toObservable(this.rightContent)

  constructor() { }

  setLeftContent = (components: ComponentRef<any>[] | null) => {
    this.leftContent.set(components)
  }

  setRightContent = (components: ComponentRef<any>[] | null) => {
    this.rightContent.set(components)
  }

  setTopBarShown = (shown: boolean) => {
    this.isTopBarShown.set(shown)
  }

  setTopBarTitle = (title: string | null) => {
    this.title.set(title)
  }
}
