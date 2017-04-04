import {Component} from '@angular/core';
import {LocalStorageService} from 'ng2-webstorage';
import {UserData} from '../../model/account/user-data';
import {Router} from "@angular/router";
import {Subscription} from "rxjs/Rx";
import {AccountService} from "../../providers/account";

@Component({
  selector: 'sv-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})

export class Header {
  public isAuthenticated: boolean = false;
  public user: any;
  public loginSubscription: Subscription = null;
  public logoutSubscription: Subscription = null;
  constructor(
    public localStorage: LocalStorageService,
    public router: Router,
    public accountService: AccountService
  ) {
    if (this.localStorage.retrieve('isAuthenticated')) {
      this.isAuthenticated = true;
      this.user = this.localStorage.retrieve('user');
    }

    this.loginSubscription = this.accountService.loginStatus.subscribe((res) => {
      if(res) {
        if (this.localStorage.retrieve('isAuthenticated')) {
          this.isAuthenticated = true;
          this.user = this.localStorage.retrieve('user');
        }
      }
    });

    this.logoutSubscription = this.accountService.logoutStatus.subscribe((res) => {
      if(res) {
        this.isAuthenticated = false;
      }
    });
  }

  logout() {
    this.accountService.logout().then((res) => {
      this.router.navigate(['/login']);
      this.accountService.emitLogout();
    });
  }
}
