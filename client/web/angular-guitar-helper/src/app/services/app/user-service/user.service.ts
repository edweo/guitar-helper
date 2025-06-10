import {Injectable, signal} from '@angular/core';
import {AppUser} from '../../../types/AppUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly isLoggedIn = signal<boolean>(false);
  readonly user = signal<AppUser | undefined>(undefined)

  setIsLoggedIn(isLoggedIn: boolean): void {
    this.isLoggedIn.set(isLoggedIn);
  }

  setUser(user: AppUser | undefined): void {
    this.user.set(user);
  }
}
