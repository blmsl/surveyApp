import { Subject, BehaviorSubject } from 'rxjs/Rx';
import { Helper } from './helper';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { ApiAdmin } from './api-admin';
import { Injectable } from '@angular/core';

@Injectable()

export class TemplateService {
  public editStatus: Subject<boolean> = new BehaviorSubject<boolean>(false);
  public createStatus: Subject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(public apiAdmin: ApiAdmin, public helper: Helper) {}

  createTemplate(input) {
    const endpoint = '/template/create';
    return this.apiAdmin.post(endpoint, input)
      .catch(this.helper.hanlderError)
      .map(res => res.json());
  }

  getTemplates() {
    const endpoint = '/template/list';
    return this.apiAdmin.get(endpoint)
      .catch(this.helper.hanlderError)
      .map(res => res.json());
  }

  getTemplate(id: number) {
    const endpoint = '/template/' + id;
    return this.apiAdmin.get(endpoint)
      .catch(this.helper.hanlderError)
      .map(res => res.json());
  }

  editTemplate(input, id) {
    const endpoint = '/template/edit/' + id;
    return this.apiAdmin.post(endpoint, input)
      .catch(this.helper.hanlderError)
      .map(res => res.json());
  }

  emitEditTemplate() {
    this.editStatus.next(true);
  }

  emitCreateTemplate() {
    this.createStatus.next(true);
  }

  saveDefaultTemplate(id) {
    const endpoint = '/template/setDefautl/' + id;
    return this.apiAdmin.post(endpoint)
      .catch(this.helper.hanlderError)
      .map(res => res.json());
  }
}
