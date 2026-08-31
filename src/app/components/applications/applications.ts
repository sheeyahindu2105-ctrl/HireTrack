import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import type { Application } from '../../models/application.model';
import { ApplicationService } from '../../services/application';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './applications.html',
  styleUrl: './applications.css'
})
export class Applications implements OnInit {

  private applicationService = inject(ApplicationService);

  applications: Application[] = [];

  searchTerm = '';
  selectedStatus = 'All';
  selectedType = 'All';


  ngOnInit(): void {

    this.applicationService.applications$
      .subscribe((applications: Application[]) => {

        this.applications = applications;

      });

  }


  // Filtered applications
  get filteredApplications(): Application[] {

    const search =
      this.searchTerm
        .trim()
        .toLowerCase();

    return this.applications.filter(
      (application: Application) => {

        const matchesSearch =
          !search ||
          application.company
            .toLowerCase()
            .includes(search) ||

          application.role
            .toLowerCase()
            .includes(search) ||

          application.location
            .toLowerCase()
            .includes(search);


        const matchesStatus =
          this.selectedStatus === 'All' ||
          application.status === this.selectedStatus;


        const matchesType =
          this.selectedType === 'All' ||
          application.type === this.selectedType;


        return (
          matchesSearch &&
          matchesStatus &&
          matchesType
        );

      }
    );

  }


  // Edit application
  editApplication(id: number): void {

    // Route: /applications/:id/edit
    // Example: /applications/5/edit

    window.location.href =
      `/applications/${id}/edit`;

  }


  // Delete application
  deleteApplication(id: number): void {

    const confirmed = window.confirm(
      'Are you sure you want to delete this application?'
    );

    if (!confirmed) {
      return;
    }

    this.applicationService.deleteApplication(id);

  }


  // Clear filters
  clearFilters(): void {

    this.searchTerm = '';

    this.selectedStatus = 'All';

    this.selectedType = 'All';

  }


  // Status badge class
  getStatusClass(
    status: Application['status']
  ): string {

    switch (status) {

      case 'Applied':
        return 'status-applied';

      case 'Interview':
        return 'status-interview';

      case 'Selected':
        return 'status-selected';

      case 'Rejected':
        return 'status-rejected';

      default:
        return '';

    }

  }

}