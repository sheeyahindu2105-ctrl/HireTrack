import { Routes } from '@angular/router';

import { Dashboard } from './components/dashboard/dashboard';
import { Applications } from './components/applications/applications';
import { ApplicationForm } from './components/application-form/application-form';
import { Interviews } from './components/interviews/interviews';

export const routes: Routes = [

  {
    path: '',
    component: Dashboard
  },

  {
    path: 'applications',
    component: Applications
  },

  {
    path: 'applications/new',
    component: ApplicationForm
  },

  {
    path: 'applications/:id/edit',
    component: ApplicationForm
  },

  {
    path: 'interviews',
    component: Interviews
  },

  {
    path: '**',
    redirectTo: ''
  }

];