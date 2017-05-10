import { Helper } from '.././../../../providers/helper';
import { SurveyService } from '../../../../providers/survey';
import { Template } from '../../../../model/template/template-data';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import * as Survey from 'survey-angular';

@Component({
  selector: 'sv-view-survey',
  templateUrl: './view-survey.html'
})

export class ViewSurveyPage {
  title: string;
  survey: Template;
  sub: any;
  id: number;
  surveyJSON: any;

  constructor(
    public route: ActivatedRoute,
    public surveyService: SurveyService,
    public helper: Helper
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.getSurvey(this.id);
    });
  }

  getSurvey(id: number) {
    this.surveyService.getSurvey(id).subscribe((res: any) => {
      this.survey = <Template>res.data.survey;
      this.title = this.survey.title;
      this.surveyJSON = JSON.parse(this.survey.content);
      let surveyModel = new Survey.ReactSurveyModel(this.surveyJSON);
      Survey.SurveyNG.render('surveyView', { model: surveyModel });
    }, (error: any) => {
      this.helper.showError(error);
    });
  }
}
