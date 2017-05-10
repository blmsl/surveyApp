import { element } from 'protractor';
import { UserData } from './../../../model/account/user-data';
import { LocalStorageService } from 'ng2-webstorage';
import { StudentService } from './../../../providers/student';
import { Template } from './../../../model/template/template-data';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as Survey from 'survey-angular';

Survey.defaultBootstrapCss.navigationButton = "btn btn-primary";
Survey.Survey.cssType = "bootstrap";

@Component({
  selector: 'sv-student-complet-survey',
  templateUrl: './student-complete-survey.html'
})

export class StudentCompleteSurvey {
  sub: any;
  id: number;
  survey: Template = null;
  title: string = '';
  surveyJSON: any;
  user: UserData
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public studentService: StudentService,
    public localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getSurvey();
    });
    this.user = this.localStorageService.retrieve('user');
  }

  onComplete(s) {
    let data = {
      user_id: this.user.uid,
      data: s.data
    };
    this.studentService.submitSurvey(data, this.id).subscribe((res: any) => {
      if (res) {
        this.router.navigate(['']);
        this.studentService.emitSubmitSurvey();
        console.log(res);
      }
    }, (error: any) => {
      console.log(error);
    });
  }

  getSurvey() {
    this.studentService.getSurvey(this.id).subscribe((res: any) => {
      if (res.data.survey) {
        this.survey = <Template>res.data.survey;
        this.title = this.survey.title;
        this.surveyJSON = JSON.parse(this.survey.content);
        if (this.survey.result) {
          let result = JSON.parse(this.survey.result);
          let userSubmitted = false;
          let data = null;
          result.forEach(element => {
            if (element.user_id == this.user.uid) {
              userSubmitted = true;
              data = element.data;
            }
          });
          if (userSubmitted) {
            let surveyModel = new Survey.ReactSurveyModel(this.surveyJSON);
            surveyModel.mode = 'display';
            surveyModel.data = data;
            Survey.SurveyNG.render('studentView', { model: surveyModel });
          } else {
            let surveyModel = new Survey.ReactSurveyModel(this.surveyJSON);
            Survey.SurveyNG.render('studentView', {
              model: surveyModel,
              onComplete: this.onComplete.bind(this)
            });
          }
        } else {
          let surveyModel = new Survey.ReactSurveyModel(this.surveyJSON);
          Survey.SurveyNG.render('studentView', {
            model: surveyModel,
            onComplete: this.onComplete.bind(this)
          });
        }
      }
    }, (error: any) => {
      console.log(error);
    });
  }
}
