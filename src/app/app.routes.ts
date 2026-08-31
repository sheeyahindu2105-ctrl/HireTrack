import { Routes } from '@angular/router';

import { Dashboard } from './components/dashboard/dashboard';
import { Applications } from './components/applications/applications';
import { ApplicationForm } from './components/application-form/application-form';
import { Interviews } from './components/interviews/interviews';

export const routes: Routes = [

  // Dashboard
  {
    path: '',
    component: Dashboard
  },

  // Applications list
  {
    path: 'applications',
    component: Applications
  },

  // Add application
  {
    path: 'applications/new',
    component: ApplicationForm
  },

  // Edit application
  {
    path: 'applications/:id/edit',
    component: ApplicationForm
  },

  // Interviews
  {
    path: 'interviews',
    component: Interviews
  },

  // Unknown route
  {
    path: '**',
    redirectTo: ''
  }

];