import { Template } from './../../../model/template/template-data';
import { TeacherService } from './../../../providers/teacher';
import { LocalStorageService } from 'ng2-webstorage';
import { Component } from '@angular/core';

@Component({
  selector: 'sv-teacher-survey',
  templateUrl: './teacher-survey.html'
})

export class TeacherSurvey {
  pageTitle: string = 'All Surveys';
  surveys: Template[] = [];

  constructor(
    public localStorageService: LocalStorageService,
    public teacherService: TeacherService
  ) {}

  ngOnInit() {
    this.getSurveys();
  }

  getSurveys() {
    let user = this.localStorageService.retrieve('user');
    this.teacherService.getSurveys(user.uid).subscribe((res: any) => {
      if(res.data.surveys) {
        this.surveys = res.data.surveys;
      }
    }, (error: any) => {
      console.log(error);
    })
  }
}
