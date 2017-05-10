import { Helper } from '../../../../providers/helper';
import { Template } from '../../../../model/template/template-data';
import { Router } from '@angular/router';
import { SurveyService } from '../../../../providers/survey';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as SurveyEditor from 'surveyjs-editor';

@Component({
  selector: 'sv-edit-survey',
  templateUrl: './edit-survey.html'
})

export class EditSurveyPage {
  sub: any;
  id: number;
  title: string;
  editor: SurveyEditor.SurveyEditor;
  survey: Template;
  constructor(
    public route: ActivatedRoute,
    public surveyService: SurveyService,
    public router: Router,
    public helper: Helper
  ) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getSurvey(this.id);
    });
  }

  getSurvey(id: number) {
    this.surveyService.getSurvey(id).subscribe((res: any) => {
      this.survey = <Template>res.data.survey;
      this.title = this.survey.title;
      let editorOptions = { showEmbededSurveyTab: true };
      this.editor = new SurveyEditor.SurveyEditor('surveyEditorContainer', editorOptions);
      this.editor.saveSurveyFunc = this.saveSurvey;
      this.editor.text = this.survey.content;
    }, (error: any) => {
      this.helper.showError(error);
    });
  }

  saveSurvey = () => {
    let input = {
      title: this.title,
      content: this.editor.text,
      isTemplate: 0
    };
    this.surveyService.editSurvey(input, this.id).subscribe((res: any) => {
      this.surveyService.emitEditSurvey();
      this.router.navigate(['/admin/survey/list']);
    }, (error: any) => {
      this.helper.showError(error);
    });
  }
}
