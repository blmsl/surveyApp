import { LocalStorageService } from 'ng2-webstorage';
import { AccountService } from './account';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

@Injectable()

export class Helper {
  constructor(public localStorage: LocalStorageService) { }

  hanlderError(error: Response | any) {
    let msgErr: any;
    if (error instanceof Response) {
      let body = error.json() || '';
      msgErr = {
        message: body.data.message || 'Server error!',
        code: body.code
      };
    } else {
      msgErr = error.message || error.toString();
    }

    return Observable.throw(msgErr);
  }

  showError(error: any): Promise<any> {
    if (error.code == 400) {
      console.log('400');
      return new Promise((resolve, reject) => {
        this.logout();
      });
    } else {
      return new Promise(resolve => {
        console.log(error);
      })
    }
  }

  logout() {
    this.localStorage.clear('user');
    this.localStorage.clear('token');
    this.localStorage.clear('isAuthenticated');
  }
}
