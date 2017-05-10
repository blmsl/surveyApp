import { TemplateService } from '../../../../providers/template';
import { AccountService } from '../../../../providers/account';
import { Helper } from '../../../../providers/helper';
import { ToastyService, ToastyConfig, ToastOptions } from 'ng2-toasty';
import { Subscription } from 'rxjs/Rx';
import { Template } from '../../../../model/template/template-data';
import { SurveyService } from '../../../../providers/survey';
import { Router } from '@angular/router';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'sv-list-survey',
  templateUrl: './list-survey.html'
})

export class ListSurveyPage {
  pageTitle: string = 'All Surveys';
  surveys: Template[];
  editSubscription: Subscription = null;
  createSubscription: Subscription = null;
  createType: string = '';
  submitted: boolean = false;
  templates: Template[];
  templateID: number;
  @ViewChild('closeModal') closeModal: ElementRef;
  constructor(
    public router: Router,
    public surveyService: SurveyService,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    public helper: Helper,
    public accountService: AccountService,
    public templateService: TemplateService
  ) {
    this.toastyConfig.position = 'top-right';
    this.toastyConfig.theme = 'default';
  }

  ngOnInit() {
    this.getSurveys();
  }

  ngAfterViewInit() {
    this.editSubscription = this.surveyService.editStatus.subscribe((res) => {
      if(res) {
        this.editSuccess();
      }
    });

    this.createSubscription = this.surveyService.createStatus.subscribe((res) => {
      if(res) {
        this.createSuccess();
      }
    })
  }

  createSurvey() {
    this.submitted = true;
    if(!this.createType) {
      return;
    }
    if(this.createType == 'survey') {
      this.closeModal.nativeElement.click();
      this.router.navigate(['/admin/survey/create']);
    } else {
      this.templateService.getTemplates().subscribe((res: any) => {
        this.templates = res.data.templates;
      }, (error: any) => {
        this.helper.showError(error).then(() => {
          console.log('error');
        });
      });
    }
  }

  createSurveyFromTemplate() {
    if(this.templateID) {
      this.router.navigate(['/admin/survey/create', {id: this.templateID}]);
    }
  }

  editSuccess() {
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

  createSuccess() {
    let toastOptions: ToastOptions = {
      title: 'Success!',
      msg: 'Created Successfully',
      showClose: true,
      timeout: 5000,
      theme: 'default'
    };

    this.toastyService.success(toastOptions);
  }

  getSurveys() {
    this.surveyService.getSurveys().subscribe((res: any) => {
      this.surveys = res.data.surveys;
    }, (error: any) => {
      this.helper.showError(error).then(res => {
        this.router.navigate(['/login']);
        this.accountService.emitLogout();
      });
    })
  }

  ngOnDestroy() {
    this.createSubscription.unsubscribe();
    this.editSubscription.unsubscribe();
    this.surveyService.createStatus.next(false);
    this.surveyService.editStatus.next(false);
  }
}
