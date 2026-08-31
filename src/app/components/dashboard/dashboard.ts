import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import type { Application } from '../../models/application.model';
import { ApplicationService } from '../../services/application';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  private applicationService =
    inject(ApplicationService);

  applications: Application[] = [];

  upcomingInterviews: Application[] = [];


  // =====================================================
  // INITIALIZE
  // =====================================================

  ngOnInit(): void {

    this.applicationService.applications$
      .subscribe(
        (applications: Application[]) => {

          this.applications = applications;

          this.updateUpcomingInterviews();

        }
      );

  }


  // =====================================================
  // TOTAL APPLICATIONS
  // =====================================================

  get totalApplications(): number {

    return this.applications.length;

  }


  // =====================================================
  // APPLIED
  // =====================================================

  get applied(): number {

    return this.applications.filter(
      (application: Application) =>
        application.status === 'Applied'
    ).length;

  }


  // =====================================================
  // INTERVIEWS
  // =====================================================

  get interviews(): number {

    return this.applications.filter(
      (application: Application) =>
        application.status === 'Interview'
    ).length;

  }


  // =====================================================
  // SELECTED
  // =====================================================

  get selected(): number {

    return this.applications.filter(
      (application: Application) =>
        application.status === 'Selected'
    ).length;

  }


  // =====================================================
  // UPCOMING INTERVIEWS
  // =====================================================

  private updateUpcomingInterviews(): void {

    this.upcomingInterviews =
      this.applications
        .filter(
          (application: Application) =>
            application.status === 'Interview'
        )
        .sort(
          (
            first: Application,
            second: Application
          ) => {

            const firstDate =
              first.interviewDate ?? '';

            const secondDate =
              second.interviewDate ?? '';

            return firstDate.localeCompare(
              secondDate
            );

          }
        )
        .slice(0, 5);

  }

}