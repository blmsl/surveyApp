import { Helper } from '../../../../providers/helper';
import { TemplateService } from '../../../../providers/template';
import { Template } from '../../../../model/template/template-data';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import * as Survey from 'survey-angular';

@Component({
  selector: 'sv-view-template',
  templateUrl: './view-template.html'
})

export class ViewTemplatePage {
  title: string;
  template: Template;
  sub: any;
  id: number;
  templateJSON: any;

  constructor(
    public route: ActivatedRoute,
    public templateService: TemplateService,
    public helper: Helper
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.getTemplate(this.id);
    });
  }

  getTemplate(id: number) {
    this.templateService.getTemplate(id).subscribe((res: any) => {
      this.template = <Template>res.data.template;
      this.title = this.template.title;
      this.templateJSON = JSON.parse(this.template.content);
      console.log(this.templateJSON);
      let surveyModel = new Survey.ReactSurveyModel(this.templateJSON);
      Survey.SurveyNG.render('templateView', { model: surveyModel });
    }, (error: any) => {
      this.helper.showError(error);
    });
  }
}
