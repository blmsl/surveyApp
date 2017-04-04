import { Component } from '@angular/core';

declare const SurveyEditor: any;

@Component({
  selector: 'sv-editor',
  templateUrl: 'editor.html'
})

export class Editor {
  ngOnInit() {
    var editorOptions = {showEmbededSurveyTab: true}; //see examples below
    var editor = new SurveyEditor.SurveyEditor("surveyEditorContainer", editorOptions);
    //set function on save callback
    editor.saveSurveyFunc = function () { alert('ok'); };
    editor.showOptions = true;
  }
}
