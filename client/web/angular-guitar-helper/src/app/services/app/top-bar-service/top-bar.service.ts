import {Injectable, signal} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {DynamicComponent} from '../../../types/dynamic_component';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TopBarService {
  readonly isTopBarShown = signal<boolean>(false)
  readonly title = signal<string | null>(environment.appName)

  readonly leftContent = signal<DynamicComponent<any>[] | null>(null)
  readonly leftContent$ = toObservable(this.leftContent)

  readonly rightContent = signal<DynamicComponent<any>[] | null>(null)
  readonly rightContent$ = toObservable(this.rightContent)

  setLeftContent = (components: DynamicComponent<any>[] | null) => {
    this.leftContent.set(components)
  }

  setRightContent = (components: DynamicComponent<any>[] | null) => {
    this.rightContent.set(components)
  }

  setTopBarTitle = (title: string | null) => {
    this.title.set(title)
  }

  showTopBar = () => {
    this.isTopBarShown.set(true)
  }

  hideTopBar = () => {
    this.isTopBarShown.set(false)
  }

  resetAll = () => {
    this.setTopBarTitle(environment.appName)
    this.setLeftContent(null)
    this.setRightContent(null)
    this.hideTopBar()
  }
}
