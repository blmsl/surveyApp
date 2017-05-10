import { LocalStorageService } from 'ng2-webstorage';
import { AccountService } from './account';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()

export class AuthGuard implements CanActivate {
  constructor(
    public accountService: AccountService,
    public router: Router,
    public localStorageService: LocalStorageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url: string = state.url;
    return this.checkLogin('');
  }

  checkLogin(url: string): boolean {
    if(this.localStorageService.retrieve('user')) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
