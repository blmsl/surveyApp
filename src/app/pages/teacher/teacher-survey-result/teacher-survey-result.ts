import { UserData } from './../../../model/account/user-data';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'ng2-webstorage';
import { TeacherService } from './../../../providers/teacher';
import { Component } from '@angular/core';
import * as Survey from 'survey-angular';

@Component({
  selector: 'sv-teacher-survey-result',
  templateUrl: './teacher-survey-result.html'
})

export class TeacherSurveyResult {
  surveyId: number = null;
  surveyResponse: any = [];
  surveyTitle: string = '';
  surveyContent: any = null;
  surveyQuestions: any = null;
  responseTotal: number = 0;
  user: UserData = null;
  teacherName: string = '';
  responseRowColumn: any = [
    [],
    [],
    [],
    [],
    []
  ];
  otherComment: any = [];

  constructor(
    public teacherService: TeacherService,
    public localStorageService: LocalStorageService,
    public router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.user = this.localStorageService.retrieve('user');
    this.getTeacherInfo();
    let sub = this.route.params.subscribe(params => {
      this.surveyId = +params['id'];
      let arr = [];
      this.getSurvey().subscribe((res) => {
        this.responseTotal = this.surveyResponse.length;
        this.surveyResponse.forEach((response) => {
          for (let p in response.question1) {
            if (response.question1.hasOwnProperty(p)) {
              if(this.responseRowColumn[+response.question1[p] -1][p]) {
                this.responseRowColumn[+response.question1[p] -1][p]++;
              } else {
                this.responseRowColumn[+response.question1[p] -1][p] = 1;
              }
            }
          }

          for (let p in response.question2) {
            if (response.question2.hasOwnProperty(p)) {
              if(this.responseRowColumn[+response.question2[p] -1][p]) {
                this.responseRowColumn[+response.question2[p] -1][p]++;
              } else {
                this.responseRowColumn[+response.question2[p] -1][p] = 1;
              }
            }
          }

          for (let p in response.question3) {
            if (response.question3.hasOwnProperty(p)) {
              if(this.responseRowColumn[+response.question3[p] -1][p]) {
                this.responseRowColumn[+response.question3[p] -1][p]++;
              } else {
                this.responseRowColumn[+response.question3[p] -1][p] = 1;
              }
            }
          }

          this.otherComment.push(response.question4);
        });
      }, (error) => {
        console.log(error);
      });
    });
  }

  getTeacherInfo() {
    this.teacherService.getTeacherInfo(this.user.uid).subscribe((res: any) => {
      if (res.data.teacher) {
        this.teacherName = res.data.teacher.fullname;
      }
    }, (error: any) => {
      console.log(error);
    });
  }

  getSurvey(): Observable<any> {
    let user = new Promise((resolve, reject) => {
      this.teacherService.getSurvey(this.surveyId).subscribe((res: any) => {
        this.surveyTitle = res.data.survey.title;
        this.surveyContent = JSON.parse(res.data.survey.content);
        this.surveyQuestions = this.surveyContent.pages[0].questions;
        if (res.data.survey.result) {
          let result = JSON.parse(res.data.survey.result);
          result.forEach(element => {
            this.surveyResponse.push(element.data);
          });
        }
        resolve(true);
      }, (error: any) => {
        reject(new Error('error'));
      });
    });

    return Observable.fromPromise(user);
  }
}
