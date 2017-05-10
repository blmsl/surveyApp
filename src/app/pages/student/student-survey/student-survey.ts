import { ToastyService, ToastyConfig, ToastOptions } from 'ng2-toasty';
import { Subscription } from 'rxjs/Rx';
import { Template } from './../../../model/template/template-data';
import { LocalStorageService } from 'ng2-webstorage';
import { StudentService } from './../../../providers/student';
import { Component } from '@angular/core';

@Component({
  selector: 'sv-student-survey',
  templateUrl: './student-survey.html'
})

export class StudentSurvey {
  pageTitle: string = 'All Surveys';
  surveys: Template[] = null;
  submitSurveySubscription: Subscription = null;
  listSurveySubmitted: any = [];

  constructor(
    public studentService: StudentService,
    public localStorageService: LocalStorageService,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
  ) { }

  ngOnInit() {
    this.getSurveys();
  }

  ngAfterViewInit() {
    this.submitSurveySubscription = this.studentService.submitSurveyStatus.subscribe((res) => {
      if (res) {
        this.submitSuccess();
      }
    })
  }

  submitSuccess() {
    let toastOptions: ToastOptions = {
      title: 'Success!',
      msg: 'Updated Successfully',
      showClose: true,
      timeout: 5000,
      theme: 'default'
    };
    // Add see all possible types in one shot
    this.toastyService.success(toastOptions);
  }

  getSurveys() {
    let user = this.localStorageService.retrieve('user');
    this.studentService.getSurveys(user.uid).subscribe((res: any) => {
      if (res) {
        if (res.data.surveys) {
          this.surveys = res.data.surveys;
          this.surveys.forEach((survey: Template, index) => {
            if (survey.result) {
              let surveyResults = JSON.parse(survey.result);
              if (surveyResults) {
                this.listSurveySubmitted[index] = false;
                surveyResults.forEach(result => {
                  if (user.uid == result.user_id) {
                    this.listSurveySubmitted[index] = true;
                  }
                });
              }
            } else {
              this.listSurveySubmitted[index] = false;
            }
          });
          console.log(this.listSurveySubmitted);
        }
      }
    }, (error: any) => {
      console.log(error);
    })
  }
}
