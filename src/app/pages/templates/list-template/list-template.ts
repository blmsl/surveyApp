import { AccountService } from './../../../providers/account';
import { Helper } from './../../../providers/helper';
import { ToastyConfig, ToastyService, ToastOptions } from 'ng2-toasty';
import { Subscription } from 'rxjs/Rx';
import { Template } from './../../../model/template/template-data';
import { TemplateService } from './../../../providers/template';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'sv-list-template',
  templateUrl: './list-template.html'
})

export class ListTemplatePage {
  pageTitle: string = 'All Templates';
  templates: Template[];
  editSubscription: Subscription = null;
  createSubscription: Subscription = null;
  constructor(
    public router: Router,
    public templateService: TemplateService,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    public helper: Helper,
    public accountService: AccountService
  ) {
    this.toastyConfig.position = 'top-right';
    this.toastyConfig.theme = 'default';
  }

  ngOnInit() {
    this.getTemplates();
  }

  ngAfterViewInit() {
    this.editSubscription = this.templateService.editStatus.subscribe((res) => {
      if(res) {
        this.editSuccess();
      }
    });

    this.createSubscription = this.templateService.createStatus.subscribe((res) => {
      if(res) {
        this.createSuccess();
      }
    })
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

  getTemplates() {
    this.templateService.getTemplates().subscribe((res: any) => {
      this.templates = res.data.templates;
    }, (error: any) => {
      this.helper.showError(error).then(res => {
        console.log('showError');
        this.router.navigate(['/login']);
        this.accountService.emitLogout();
      });
    })
  }

  ngOnDestroy() {
    this.createSubscription.unsubscribe();
    this.editSubscription.unsubscribe();
    this.templateService.createStatus.next(false);
    this.templateService.editStatus.next(false);
  }
}
