import {computed, Injectable, signal} from '@angular/core';
import {AppUser} from '../../../types/AppUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly user = signal<AppUser | undefined>(undefined)
  readonly isLoggedIn = computed<boolean>(() => this.user() !== undefined);

  setUser(user: AppUser | undefined): void {
    this.user.set(user);
  }
}
