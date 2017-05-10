import { Helper } from '../../../../providers/helper';
import { Template } from '../../../../model/template/template-data';
import { Router, ActivatedRoute } from '@angular/router';
import { TemplateService } from '../../../../providers/template';
import { Component } from '@angular/core';
import * as SurveyEditor from 'surveyjs-editor';

@Component({
  selector: 'sv-edit-template',
  templateUrl: './edit-template.html'
})

export class EditTemplatePage {
  sub: any;
  id: number;
  title: string;
  editor: SurveyEditor.SurveyEditor;
  template: Template;
  constructor(
    public route: ActivatedRoute,
    public templateService: TemplateService,
    public router: Router,
    public helper: Helper
  ) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getTemplate(this.id);
    });
  }

  getTemplate(id: number) {
    this.templateService.getTemplate(id).subscribe((res: any) => {
      this.template = <Template>res.data.template;
      this.title = this.template.title;
      let editorOptions = { showEmbededSurveyTab: true };
      this.editor = new SurveyEditor.SurveyEditor('surveyEditorContainer', editorOptions);
      this.editor.saveSurveyFunc = this.saveSurvey;
      this.editor.text = this.template.content;
    }, (error: any) => {
      this.helper.showError(error);
    });
  }

  saveSurvey = () => {
    let input = {
      title: this.title,
      content: this.editor.text,
      isTemplate: 1
    };
    this.templateService.editTemplate(input, this.id).subscribe((res: any) => {
      this.templateService.emitEditTemplate();
      this.router.navigate(['/admin/template/list']);
    }, (error: any) => {
      this.helper.showError(error);
    });
  }
}
