import { Observable } from 'rxjs/Observable';
import { Helper } from './helper';
import { ApiAdmin } from './api-admin';
import { Injectable } from '@angular/core';

@Injectable()

export class GenerateSurveyService {
  constructor(public apiAdmin: ApiAdmin, public helper: Helper) {}

  generateSurvey(input: any): Observable<any> {
    const endpoint = '/generate/survey';
    return this.apiAdmin.post(endpoint, input)
      .catch(this.helper.hanlderError)
      .map(res => res.json());
  }
}
