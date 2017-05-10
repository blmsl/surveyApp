import { Helper } from '../../../../providers/helper';
import { TemplateService } from '../../../../providers/template';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import * as SurveyEditor from 'surveyjs-editor';

@Component({
  selector: 'sv-create-template',
  templateUrl: './create-template.html'
})

export class CreateTemplatePage {
  editor: SurveyEditor.SurveyEditor;
  title: string;
  constructor(
    public templateService: TemplateService,
    public router: Router,
    public helper: Helper
  ) { }

  ngOnInit() {
    let editorOptions = {
      showEmbededSurveyTab: true,
      generateValidJSON: true
    };
    this.editor = new SurveyEditor.SurveyEditor('surveyEditorContainer', editorOptions);
    this.editor.saveSurveyFunc = this.saveSurvey;
  }

  saveSurvey = () => {
    let input = {
      title: this.title,
      content: this.editor.text,
      isTemplate: 1,
      default: false,
      result: ''
    };
    this.templateService.createTemplate(input).subscribe((res: any) => {
      this.templateService.emitCreateTemplate();
      this.router.navigate(['/admin/template/list']);
    }, (error: any) => {
      this.helper.showError(error);
    });
  }
}
