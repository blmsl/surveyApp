import { ApiAdmin } from './api-admin';
import { Injectable } from '@angular/core';
import { Helper } from './helper';

@Injectable()

export class TeacherService {
  constructor(
    public apiAdmin: ApiAdmin,
    public helper: Helper
  ) {}

  getSurveys(id: number) {
    const endpoint = '/staff/getTeacherSurveys/' + id;

    return this.apiAdmin.get(endpoint)
      .map(res => res.json())
      .catch(this.helper.hanlderError);
  }

  getSurvey(id: number) {
    const endpoint = '/staff/getSurvey/' + id;

    return this.apiAdmin.get(endpoint)
      .map(res => res.json())
      .catch(this.helper.hanlderError);
  }

  getTeacherInfo(id: number) {
    const endpoint = '/staff/getTeacherInfo/' + id;

    return this.apiAdmin.get(endpoint)
      .map(res => res.json())
      .catch(this.helper.hanlderError);
  }
}
