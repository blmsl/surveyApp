import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs/Rx";
import { AccountService } from "../../providers/account";
import { UserData } from "../../model/account/user-data";
import { LocalStorageService } from "ng2-webstorage";
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Component({
  selector: 'sv-home',
  templateUrl: './home.html'
})

export class HomePage implements OnInit {
  public loginSubscription: Subscription = null;
  public logoutSubscription: Subscription = null;
  public user: any;
  constructor(
    public accountService: AccountService,
    public localStorage: LocalStorageService,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
  ) {
    this.toastyConfig.theme = 'default';
    this.toastyConfig.position = 'top-right';
  }

  ngOnInit() {
    this.logoutSubscription = this.accountService.logoutStatus.subscribe((res) => {
      this.loginSubscription.unsubscribe();
    });
  }

  ngAfterViewInit() {
    this.loginSubscription = this.accountService.loginStatus.subscribe((res) => {
      console.log('loginSubscription');
      if (res) {
        console.log(res);
        this.user = <UserData>this.localStorage.retrieve('user');
        if (this.localStorage.retrieve('isAuthenticated')) {
          this.user = this.localStorage.retrieve('user');
          this.showSuccess();
        }
      }
    });
  }

  ngAfterViewChecked() {

  }

  showSuccess() {
    let toastOptions: ToastOptions = {
      title: "Success!",
      msg: "Welcome" + this.user.username,
      showClose: true,
      timeout: 5000,
      theme: 'default'
    };
    // Add see all possible types in one shot
    this.toastyService.success(toastOptions);
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
    this.accountService.loginStatus.next(false);
  }
}
