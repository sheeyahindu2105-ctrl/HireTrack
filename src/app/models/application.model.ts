export interface Application {

  // Unique application ID
  id: number;

  // Company information
  company: string;

  // Job / internship role
  role: string;

  // Job location
  location: string;

  // Application type
  type:
    | 'Internship'
    | 'Full-time';

  // Current application status
  status:
    | 'Applied'
    | 'Interview'
    | 'Selected'
    | 'Rejected';

  // Date when application was submitted
  appliedDate: string;

  // Interview information
  interviewDate?: string;

  interviewTime?: string;

  interviewMode?:
    | 'Online'
    | 'Offline';

  interviewNotes?: string;

}