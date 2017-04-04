import { Helper } from './helper';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ng2-webstorage';
import { Http } from '@angular/http';
import { Api } from './api';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class AccountService {
  public loginStatus: Subject<boolean> = new BehaviorSubject<boolean>(false);
  public logoutStatus: Subject<boolean> = new Subject();
  constructor(
    public http: Http,
    public localStorage: LocalStorageService,
    public api: Api,
    public helper: Helper,
  ) {

  }

  login(user): Observable<any> {
    const endpoint = '/login';
    return this.http.post(this.api.url + endpoint, user)
      .map(res => res.json())
      .catch(this.helper.hanlderError);
  }

  logout(): Promise<any> {
    return new Promise(resolve => {
      this.localStorage.clear('user');
      this.localStorage.clear('token');
      this.localStorage.clear('isAuthenticated');
    });
  }

  emitLogin() {
    this.loginStatus.next(true);
  }

  emitLogout() {
    this.logoutStatus.next(true);
  }
}
