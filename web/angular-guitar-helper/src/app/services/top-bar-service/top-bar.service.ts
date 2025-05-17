import {ComponentRef, Injectable, signal} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {ComponentType} from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class TopBarService {

  readonly isTopBarShown = signal<boolean>(true)

  readonly title = signal<string | null>("Guitara")

  readonly leftContent = signal<ComponentType<any>[] | null>(null)
  readonly leftContent$ = toObservable(this.leftContent)

  readonly rightContent = signal<ComponentType<any>[] | null>(null)
  readonly rightContent$ = toObservable(this.rightContent)

  constructor() { }

  setLeftContent = (components: ComponentType<any>[] | null) => {
    this.leftContent.set(components)
  }

  setRightContent = (components: ComponentType<any>[] | null) => {
    this.rightContent.set(components)
  }

  setTopBarShown = (shown: boolean) => {
    this.isTopBarShown.set(shown)
  }

  setTopBarTitle = (title: string | null) => {
    this.title.set(title)
  }
}
