import {Injectable} from '@angular/core';
import {Http, Headers, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {LocalStorageService} from 'ng2-webstorage';

@Injectable()

export class Api {
  private headers: Headers;
  public url: string = 'http://survey.app/api/v1';

  constructor(public http: Http, public localStorage: LocalStorageService) {

  }

  auth(requestUrl, body?, options?) {
    let token = this.localStorage.retrieve('token');
    this.headers.set('Authorization', 'Bearer' + token);
  }

  get(requestUrl, options?) {
    const endpoint = this.url + requestUrl;
    if(options) {
      let params = new URLSearchParams();
      params.setAll(options);
      return this.http.get(endpoint, { search: params });
    } else {
      return this.http.get(endpoint);
    }
  }

  post(requestUrl, body, options?) {
    const endpoint = this.url + requestUrl;
    return this.http.post(endpoint, body);
  }
}
