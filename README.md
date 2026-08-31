# HireTrack 📋

A modern Angular-based Job & Internship Application Tracker that helps users manage their job applications, interviews, and application status in one place.

🔗 **Live Demo:** https://hiretrack-app.netlify.app/

🔗 **GitHub Repository:** https://github.com/sheeyahindu2105-ctrl/HireTrack

---

## 🚀 Features

- 📊 Dashboard with application statistics
- 📝 Add new job and internship applications
- ✏️ Edit existing applications
- 🗑️ Delete applications
- 🔎 Search applications by company, role, or location
- 🎯 Filter applications by status
- 💼 Filter applications by job type
- 📅 Track upcoming interviews
- ⏰ Store interview date and time
- 💻 Track online/offline interviews
- 📌 Track application status
- 📱 Responsive and clean user interface
- 🌐 Deployed using Netlify

---

## 📊 Dashboard

The dashboard provides a quick overview of:

- Total Applications
- Applied Applications
- Interviews
- Selected Applications
- Upcoming Interviews
- Recent Applications

---

## 💼 Application Management

Users can manage all their job and internship applications from one place.

Each application contains information such as:

- Company
- Job Role
- Location
- Application Type
- Application Status
- Applied Date
- Interview Details

---

## 🎤 Interview Tracking

HireTrack provides a dedicated interview section where users can:

- View upcoming interviews
- Track interview date and time
- See interview mode
- Review interview-related information
- Manage interview details

---

## 🛠️ Tech Stack

### Frontend

- Angular
- TypeScript
- HTML5
- CSS3

### Tools

- Git
- GitHub
- Visual Studio Code
- Netlify

---

## 📁 Project Structure

```text
frontend/
│
├── public/
│
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── application-form/
│   │   │   ├── applications/
│   │   │   ├── dashboard/
│   │   │   ├── interviews/
│   │   │   └── navbar/
│   │   │
│   │   ├── models/
│   │   │   └── application.model.ts
│   │   │
│   │   └── services/
│   │       └── application.ts
│   │
│   ├── app.ts
│   ├── app.html
│   ├── app.routes.ts
│   └── styles.css
│
├── angular.json
├── package.json
└── README.md