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
import { UsersService } from 'src/app/modules/alumnus/shared/services/users.service';

@Injectable({
  providedIn: 'root',
})
export class AlumnusGuard  {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: HotToastService,
    private _userService:UsersService
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    // | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    // | boolean
    // | UrlTree 
    
    {
      try {
        // Wait for the getUser() observable and convert it to a promise
        const user = await new Promise<any>((resolve, reject) => {
          this._userService.getUser().subscribe(
            {
              next:(data) => {
                resolve(data);
              },
              error:(error) => {
                reject(error);
              }
            }
          );
        });
        
        // Check if the user data is valid (e.g., logged in)
        if (user && user.isLoggedIn) {
          return true; // Allow navigation
        } else {
          // User is not logged in or user data is invalid
          this.authService.logout('student');
          this.toast.warning('login first');
          return this.router.createUrlTree(['/login'], {
            queryParams: { type: 'student' },
          });
        }
      } catch (err) {
        // Handle errors from the getUser() call
        this.authService.logout('student');
        this.toast.warning('login first');
        return this.router.createUrlTree(['/login'], {
          queryParams: { type: 'student' },
        });
      }
    }
    // if (this.authService.isLoggedIn('admin') == true) return true;

    // this.authService.logout('admin')

    // this.router.navigate([`/login`], {
    //   queryParams: { type: 'admin' },
    // });
    // this.toast.info('Please login');
    // return false;

  }
