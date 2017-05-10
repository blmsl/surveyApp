import { Helper } from '.././../../providers/helper';
import { TemplateService } from '.././../../providers/template';
import { Template } from '.././../../model/template/template-data';
import { GenerateSurveyService } from '.././../../providers/generate-survey';
import { LocalStorageService } from 'ng2-webstorage';
import { Component } from '@angular/core';

@Component({
  selector: 'sv-generate-survey-dynamic',
  templateUrl: './generate-survey-dynamic.html'
})

export class GenerateSurveyDynamicPage {
  public fileData: any = null;
  public templates: Template[] = [];
  public templateId: number = 0;
  constructor(
    public localStorage: LocalStorageService,
    public generateSurveyService: GenerateSurveyService,
    public templateService: TemplateService,
    public helper: Helper
  ) {

  }

  ngOnInit() {
  }

  changeFile(event) {
    this.fileData = event.target.files;
  }

  onSubmit() {
    let formData = new FormData();
    for(let i = 0; i < this.fileData.length; i++) {
      let file:File = this.fileData[i];
      formData.append('file[]', file, file.name);
    }
    this.generateSurveyService.generateSurvey(formData)
      .subscribe((res) => {
        console.log(res);
      }, (error) => {
        console.log(error);
      })
  }
}
