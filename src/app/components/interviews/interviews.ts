import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import type { Application } from '../../models/application.model';
import { ApplicationService } from '../../services/application';

@Component({
  selector: 'app-interviews',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './interviews.html',
  styleUrl: './interviews.css'
})
export class Interviews implements OnInit {

  private applicationService =
    inject(ApplicationService);

  applications: Application[] = [];


  // =====================================================
  // INITIALIZE
  // =====================================================

  ngOnInit(): void {

    this.applicationService.applications$
      .subscribe(
        (applications: Application[]) => {

          this.applications =
            applications
              .filter(
                (application: Application) =>
                  application.status === 'Interview'
              )
              .sort(
                (a: Application, b: Application) =>
                  (a.interviewDate ?? '').localeCompare(
                    b.interviewDate ?? ''
                  )
              );

        }
      );

  }


  // =====================================================
  // TOTAL INTERVIEWS
  // =====================================================

  get totalInterviews(): number {

    return this.applications.length;

  }


  // =====================================================
  // SCHEDULED INTERVIEWS
  // =====================================================

  get scheduledInterviews(): number {

    return this.applications.filter(
      (application: Application) =>
        !!application.interviewDate
    ).length;

  }


  // =====================================================
  // UNSCHEDULED INTERVIEWS
  // =====================================================

  get unscheduledInterviews(): number {

    return this.applications.filter(
      (application: Application) =>
        !application.interviewDate
    ).length;

  }

}