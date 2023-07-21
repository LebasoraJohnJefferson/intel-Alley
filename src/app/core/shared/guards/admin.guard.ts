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
import { AdminService } from 'src/app/modules/admin/shared/services/admin.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: HotToastService,
    private _adminService:AdminService
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
        const admin = await new Promise<any>((resolve, reject) => {
          this._adminService.getAdmin().subscribe(
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
        if (admin) {
          return true; // Allow navigation
        } else {
          // User is not logged in or user data is invalid
          this.authService.logout('admin');
          this.toast.warning('login first');
          return this.router.createUrlTree(['/login'], {
            queryParams: { type: 'admin' },
          });
        }
      } catch (err) {
        // Handle errors from the getUser() call
        this.authService.logout('admin');
        this.toast.warning('login first');
        return this.router.createUrlTree(['/login'], {
          queryParams: { type: 'admin' },
        });
      }
    }
}