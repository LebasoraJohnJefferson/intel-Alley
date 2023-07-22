import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { UsersService } from 'src/app/modules/alumni/shared/services/users.service';

@Injectable({
  providedIn: 'root',
})
export class AlumniGuard {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: HotToastService,
    private _userService: UsersService
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): // | Observable<boolean | UrlTree>
  Promise<boolean | UrlTree> {
    // | UrlTree // | boolean
    try {
      // Wait for the getUser() observable and convert it to a promise
      const user = await new Promise<any>((resolve, reject) => {
        this._userService.getUser().subscribe({
          next: (data) => {
            resolve(data);
          },
          error: (error) => {
            reject(error);
          },
        });
      });

      // Check if the user data is valid (e.g., logged in)
      if (user) {
        return true; // Allow navigation
      } else {
        // User is not logged in or user data is invalid
        this.authService.logout('alumni');
        this.toast.info('Please login');
        return this.router.createUrlTree(['/login'], {
          queryParams: { type: 'alumni' },
        });
      }
    } catch (err) {
      // Handle errors from the getUser() call
      this.authService.logout('alumni');
      this.toast.info('Please login');
      return this.router.createUrlTree(['/login'], {
        queryParams: { type: 'alumni' },
      });
    }
  }
}
