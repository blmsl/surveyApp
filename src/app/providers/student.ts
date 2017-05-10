import { Subject, BehaviorSubject } from 'rxjs/Rx';
import { Helper } from './helper';
import { ApiAdmin } from './api-admin';
import { Injectable } from '@angular/core';

@Injectable()

export class StudentService {
  public submitSurveyStatus: Subject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(public apiAdmin: ApiAdmin, public helper: Helper) {}

  getSurveys(id: number) {
    const endpoint = '/student/getStudentSurveys/' + id;
    return this.apiAdmin.get(endpoint)
      .catch(this.helper.hanlderError)
      .map(res => res.json());
  }

  getSurvey(id: number) {
    const endpoint = '/student/getSurvey/' + id;
    return this.apiAdmin.get(endpoint)
      .catch(this.helper.hanlderError)
      .map(res => res.json());
  }

  submitSurvey(input, id) {
    const endpoint = '/student/submitSurvey/' + id;
    return this.apiAdmin.post(endpoint, input)
      .catch(this.helper.hanlderError)
      .map(res => res.json());
  }

  emitSubmitSurvey() {
    this.submitSurveyStatus.next(true);
  }
}
