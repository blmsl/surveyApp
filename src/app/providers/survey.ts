import { Subject, BehaviorSubject } from 'rxjs/Rx';
import { Helper } from './helper';
import { ApiAdmin } from './api-admin';
import { Injectable } from '@angular/core';

@Injectable()

export class SurveyService {
  public editStatus: Subject<boolean> = new BehaviorSubject<boolean>(false);
  public createStatus: Subject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(public apiAdmin: ApiAdmin, public helper: Helper) {}

  createSurvey(input) {
    const endpoint = '/survey/create';
    return this.apiAdmin.post(endpoint, input)
      .catch(this.helper.hanlderError)
      .map(res => res.json());
  }

  getSurveys() {
    const endpoint = '/survey/list';
    return this.apiAdmin.get(endpoint)
      .catch(this.helper.hanlderError)
      .map(res => res.json());
  }

  getSurvey(id: number) {
    const endpoint = '/survey/' + id;
    return this.apiAdmin.get(endpoint)
      .catch(this.helper.hanlderError)
      .map(res => res.json());
  }

  editSurvey(input, id) {
    const endpoint = '/survey/edit/' + id;
    return this.apiAdmin.post(endpoint, input)
      .catch(this.helper.hanlderError)
      .map(res => res.json());
  }

  emitEditSurvey() {
    this.editStatus.next(true);
  }

  emitCreateSurvey() {
    this.createStatus.next(true);
  }
}
