import {Component, Inject, ViewContainerRef} from '@angular/core';
import {UserLogin} from "../../../model/account/user-login";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {validateEmailFactory} from "../../../directives/email-validate";
import {AccountService} from "../../../providers/account";
import {LocalStorageService} from "ng2-webstorage";
import {Router} from "@angular/router";

@Component({
  selector: 'sv-login',
  templateUrl: './login.html',
  styleUrls: ['login.scss']
})

export class LoginPage {
  public user: UserLogin = {
    username: '',
    password: ''
  };
  public loginForm: FormGroup;
  public submitted: boolean = false;
  public alert: string;

  constructor(
    @Inject(FormBuilder) public fb: FormBuilder,
    public accountService: AccountService,
    public localStorage: LocalStorageService,
    public router: Router
  ) {
    this.loginForm = fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    if (this.localStorage.retrieve('isAuthenticated')) {
      this.router.navigate(['']);
    }
  }

  login() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.accountService.login(this.user).subscribe((res: any) => {
        this.localStorage.store('user', res.data);
        this.localStorage.store('token', res.token);
        this.localStorage.store('isAuthenticated', true);
        this.accountService.emitLogin();
        this.router.navigate(['']);
      }, (err: any) => {
        if(err.code == 401) {
          this.alert = err.message;
        }
      });
    }
  }
}
