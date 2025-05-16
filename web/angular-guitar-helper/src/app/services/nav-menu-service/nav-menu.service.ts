import {Injectable, signal, WritableSignal} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavMenuService {
  // Create a BehaviorSubject to hold the state of the nav menu
  private navMenuOpenedSubject = new BehaviorSubject<boolean>(false);

  // Expose the observable part of the navMenuOpened
  navMenuOpened$ = this.navMenuOpenedSubject.asObservable();

  // Method to toggle the nav menu
   toggleNavMenu() {
    this.navMenuOpenedSubject.next(!this.navMenuOpenedSubject.value);
  }

  // Method to close the nav menu
  closeNavMenu() {
    this.navMenuOpenedSubject.next(false);
  }

  // Method to open the nav menu (optional)
  openNavMenu() {
    this.navMenuOpenedSubject.next(true);
  }
}
