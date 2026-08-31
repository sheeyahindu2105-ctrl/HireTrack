import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute,
  Router
} from '@angular/router';

import type { Application } from '../../models/application.model';
import { ApplicationService } from '../../services/application';


@Component({
  selector: 'app-application-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './application-form.html',
  styleUrl: './application-form.css'
})
export class ApplicationForm implements OnInit {

  private formBuilder = inject(FormBuilder);
  private applicationService = inject(ApplicationService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isEditMode = false;
  applicationId: number | null = null;


  // =====================================================
  // APPLICATION FORM
  // =====================================================

  applicationForm = this.formBuilder.group({

    company: [
      '',
      Validators.required
    ],

    role: [
      '',
      Validators.required
    ],

    location: [
      '',
      Validators.required
    ],

    type: [
      'Internship' as Application['type'],
      Validators.required
    ],

    status: [
      'Applied' as Application['status'],
      Validators.required
    ],

    appliedDate: [
      this.getTodayDate(),
      Validators.required
    ],

    // Interview Details

    interviewDate: [
      ''
    ],

    interviewTime: [
      ''
    ],

    interviewMode: [
      'Online' as Application['interviewMode']
    ],

    interviewNotes: [
      ''
    ]

  });


  // =====================================================
  // INITIALIZATION
  // =====================================================

  ngOnInit(): void {

    const idParam =
      this.route.snapshot.paramMap.get('id');


    // ---------------------------------------------------
    // ADD MODE
    // ---------------------------------------------------

    if (!idParam) {
      return;
    }


    // ---------------------------------------------------
    // GET APPLICATION ID
    // ---------------------------------------------------

    const id = Number(idParam);


    if (Number.isNaN(id)) {

      this.router.navigate([
        '/applications'
      ]);

      return;
    }


    // ---------------------------------------------------
    // FIND APPLICATION
    // ---------------------------------------------------

    const application =
      this.applicationService.getApplicationById(id);


    // Application not found

    if (!application) {

      this.router.navigate([
        '/applications'
      ]);

      return;
    }


    // ---------------------------------------------------
    // EDIT MODE
    // ---------------------------------------------------

    this.isEditMode = true;
    this.applicationId = id;


    // ---------------------------------------------------
    // LOAD EXISTING DATA
    // ---------------------------------------------------

    this.applicationForm.patchValue({

      company:
        application.company,

      role:
        application.role,

      location:
        application.location,

      type:
        application.type,

      status:
        application.status,

      appliedDate:
        application.appliedDate,

      interviewDate:
        application.interviewDate ?? '',

      interviewTime:
        application.interviewTime ?? '',

      interviewMode:
        application.interviewMode ?? 'Online',

      interviewNotes:
        application.interviewNotes ?? ''

    });

  }


  // =====================================================
  // SUBMIT APPLICATION
  // =====================================================

  submitApplication(): void {

    // ---------------------------------------------------
    // VALIDATE FORM
    // ---------------------------------------------------

    if (this.applicationForm.invalid) {

      this.applicationForm.markAllAsTouched();

      return;
    }


    const formValue =
      this.applicationForm.getRawValue();


    // ===================================================
    // INTERVIEW DATA
    // ===================================================

    const isInterview =
      formValue.status === 'Interview';


    const interviewDate =
      isInterview
        ? formValue.interviewDate ?? ''
        : '';


    const interviewTime =
      isInterview
        ? formValue.interviewTime ?? ''
        : '';


    const interviewMode =
      isInterview
        ? formValue.interviewMode as Application['interviewMode']
        : undefined;


    const interviewNotes =
      isInterview
        ? formValue.interviewNotes?.trim() ?? ''
        : '';


    // ===================================================
    // EDIT APPLICATION
    // ===================================================

    if (
      this.isEditMode &&
      this.applicationId !== null
    ) {

      const updatedApplication: Application = {

        id:
          this.applicationId,

        company:
          formValue.company?.trim() ?? '',

        role:
          formValue.role?.trim() ?? '',

        location:
          formValue.location?.trim() ?? '',

        type:
          formValue.type as Application['type'],

        status:
          formValue.status as Application['status'],

        appliedDate:
          formValue.appliedDate ?? '',

        interviewDate:
          interviewDate,

        interviewTime:
          interviewTime,

        interviewMode:
          interviewMode,

        interviewNotes:
          interviewNotes

      };


      this.applicationService.updateApplication(
        updatedApplication
      );

    }


    // ===================================================
    // ADD NEW APPLICATION
    // ===================================================

    else {

      const applications =
        this.applicationService.getApplications();


      // Generate next ID

      const newId =
        applications.length > 0
          ? Math.max(
              ...applications.map(
                application => application.id
              )
            ) + 1
          : 1;


      const newApplication: Application = {

        id:
          newId,

        company:
          formValue.company?.trim() ?? '',

        role:
          formValue.role?.trim() ?? '',

        location:
          formValue.location?.trim() ?? '',

        type:
          formValue.type as Application['type'],

        status:
          formValue.status as Application['status'],

        appliedDate:
          formValue.appliedDate ?? '',

        interviewDate:
          interviewDate,

        interviewTime:
          interviewTime,

        interviewMode:
          interviewMode,

        interviewNotes:
          interviewNotes

      };


      this.applicationService.addApplication(
        newApplication
      );

    }


    // ===================================================
    // REDIRECT
    // ===================================================

    this.router.navigate([
      '/applications'
    ]);

  }


  // =====================================================
  // CANCEL
  // =====================================================

  cancel(): void {

    this.router.navigate([
      '/applications'
    ]);

  }


  // =====================================================
  // TODAY'S DATE
  // =====================================================

  private getTodayDate(): string {

    const today =
      new Date();


    const year =
      today.getFullYear();


    const month =
      String(
        today.getMonth() + 1
      ).padStart(2, '0');


    const day =
      String(
        today.getDate()
      ).padStart(2, '0');


    return `${year}-${month}-${day}`;

  }

}