import { LocalStorageService } from 'ng2-webstorage';
import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

@Injectable()

export class ApiAdmin {
  public url: string = 'http://survey.app/api/v1';

  constructor(public http: Http, public localStorage: LocalStorageService) {

  }

  get(requestUrl, options?) {
    const endpoint = this.url + requestUrl;
    let headers = new Headers();
    headers.append('Authorization', 'Bearer {' + this.localStorage.retrieve('token') + '}');
    if (options) {
      let params = new URLSearchParams();
      params.setAll(options);
      return this.http.get(endpoint, { search: params, headers: headers });
    } else {
      return this.http.get(endpoint, { headers: headers });
    }
  }

  post(requestUrl, body, options?) {
    const endpoint = this.url + requestUrl;
    let headers = new Headers();
    headers.append('Authorization', 'Bearer {' + this.localStorage.retrieve('token') + '}');
    return this.http.post(endpoint, body, { headers: headers });
  }
}
