import { Template } from '../../../../model/template/template-data';
import { TemplateService } from '../../../../providers/template';
import { Helper } from '../../../../providers/helper';
import { SurveyService } from '../../../../providers/survey';
import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import * as SurveyEditor from 'surveyjs-editor';

@Component({
  selector: 'sv-create-survey',
  templateUrl: './create-survey.html'
})

export class CreateSurveyPage {
  editor: SurveyEditor.SurveyEditor;
  title: string;
  sub: any;
  templateID: number;
  template: Template;
  constructor(
    public surveyService: SurveyService,
    public router: Router,
    public helper: Helper,
    public route: ActivatedRoute,
    public templateService: TemplateService
  ) { }

  ngOnInit() {
    let editorOptions = {
      showEmbededSurveyTab: true,
      generateValidJSON: true
    };
    this.editor = new SurveyEditor.SurveyEditor('surveyEditorContainer', editorOptions);
    this.editor.saveSurveyFunc = this.saveSurvey;
    this.sub = this.route.params.subscribe((params) => {
      if(params['id']) {
        this.templateID = +params['id'];
        this.getTemplate(this.templateID);
      }
    });
  }

  getTemplate(id: number) {
    this.templateService.getTemplate(id).subscribe((res: any) => {
      this.template = <Template>res.data.template;
      this.title = this.template.title;
      this.editor.text = this.template.content;
    }, (error: any) => {
      this.helper.showError(error);
    });
  }

  saveSurvey = () => {
    let input = {
      title: this.title,
      content: this.editor.text,
      isTemplate: 0,
      default: false,
      result: ''
    };
    this.surveyService.createSurvey(input).subscribe((res: any) => {
      this.surveyService.emitCreateSurvey();
      this.router.navigate(['/admin/survey/list']);
    }, (error: any) => {
      this.helper.showError(error);
    });
  }
}
