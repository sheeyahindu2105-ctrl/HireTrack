import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import type { Application } from '../models/application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  // =====================================================
  // INITIAL APPLICATION DATA
  // =====================================================

  private readonly initialApplications: Application[] = [

    {
      id: 1,
      company: 'Google',
      role: 'Frontend Developer',
      location: 'Bangalore',
      type: 'Full-time',
      status: 'Applied',
      appliedDate: '2026-08-25'
    },

    {
      id: 2,
      company: 'Microsoft',
      role: 'Software Engineer Intern',
      location: 'Hyderabad',
      type: 'Internship',
      status: 'Interview',
      appliedDate: '2026-08-22',
      interviewDate: '2026-09-02',
      interviewTime: '11:00',
      interviewMode: 'Online',
      interviewNotes: 'Prepare Angular, TypeScript and project discussion.'
    },

    {
      id: 3,
      company: 'TCS',
      role: 'Frontend Developer',
      location: 'Ahmedabad',
      type: 'Full-time',
      status: 'Selected',
      appliedDate: '2026-08-20'
    },

    {
      id: 4,
      company: 'Infosys',
      role: 'Angular Developer Intern',
      location: 'Pune',
      type: 'Internship',
      status: 'Interview',
      appliedDate: '2026-08-18',
      interviewDate: '2026-09-05',
      interviewTime: '15:30',
      interviewMode: 'Offline',
      interviewNotes: 'Revise Angular components, services and RxJS.'
    }

  ];


  // =====================================================
  // APPLICATION STORAGE
  // =====================================================

  private applications: Application[] = [];


  // =====================================================
  // APPLICATIONS SUBJECT
  // =====================================================

  private applicationsSubject =
    new BehaviorSubject<Application[]>([]);


  // Public observable
  applications$ =
    this.applicationsSubject.asObservable();


  // =====================================================
  // CONSTRUCTOR
  // =====================================================

  constructor() {

    this.loadApplications();

  }


  // =====================================================
  // LOAD APPLICATIONS
  // =====================================================

  private loadApplications(): void {

    const storedData =
      localStorage.getItem('hiretrack_applications');


    if (storedData) {

      try {

        const parsedData =
          JSON.parse(storedData);


        if (Array.isArray(parsedData)) {

          this.applications =
            parsedData as Application[];

        } else {

          this.applications =
            [...this.initialApplications];

        }

      } catch {

        this.applications =
          [...this.initialApplications];

      }

    } else {

      this.applications =
        [...this.initialApplications];

    }


    this.emitApplications();

  }


  // =====================================================
  // GET ALL APPLICATIONS
  // =====================================================

  getApplications(): Application[] {

    return [
      ...this.applications
    ];

  }


  // =====================================================
  // GET APPLICATION BY ID
  // =====================================================

  getApplicationById(
    id: number
  ): Application | undefined {

    return this.applications.find(
      application =>
        application.id === id
    );

  }


  // =====================================================
  // ADD APPLICATION
  // =====================================================

  addApplication(
    application: Application
  ): void {

    this.applications = [
      ...this.applications,
      application
    ];

    this.saveApplications();

    this.emitApplications();

  }


  // =====================================================
  // UPDATE APPLICATION
  // =====================================================

  updateApplication(
    updatedApplication: Application
  ): void {

    this.applications =
      this.applications.map(
        application =>
          application.id === updatedApplication.id
            ? updatedApplication
            : application
      );


    this.saveApplications();

    this.emitApplications();

  }


  // =====================================================
  // DELETE APPLICATION
  // =====================================================

  deleteApplication(
    id: number
  ): void {

    this.applications =
      this.applications.filter(
        application =>
          application.id !== id
      );


    this.saveApplications();

    this.emitApplications();

  }


  // =====================================================
  // SAVE TO LOCAL STORAGE
  // =====================================================

  private saveApplications(): void {

    localStorage.setItem(
      'hiretrack_applications',
      JSON.stringify(this.applications)
    );

  }


  // =====================================================
  // EMIT UPDATED APPLICATIONS
  // =====================================================

  private emitApplications(): void {

    this.applicationsSubject.next([
      ...this.applications
    ]);

  }

}