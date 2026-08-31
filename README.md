# HireTrack 💼

HireTrack is a modern Angular web application designed to help users
track and manage their job and internship applications in one place.

---

## 🚀 Features

### Dashboard
- Total applications count
- Applied applications count
- Interview count
- Selected applications count
- Upcoming interviews
- Recent applications

### Application Management
- Add new applications
- Edit existing applications
- Delete applications
- Search applications
- Filter by application status
- Filter by application type

### Interview Management
- Track interview applications
- Add interview date
- Add interview time
- Select interview mode
- Add interview preparation notes
- View upcoming interviews

### Data Persistence
- Application data is stored using browser LocalStorage
- Data remains available after refreshing the browser

### Responsive Design
- Desktop-friendly interface
- Mobile-responsive navbar
- Responsive dashboard cards
- Responsive application and interview sections

---

## 🛠️ Technologies Used

- Angular
- TypeScript
- HTML5
- CSS3
- Bootstrap
- RxJS
- LocalStorage

---

## 📁 Project Structure

```text
src/
└── app/
    ├── components/
    │   ├── application-card/
    │   ├── application-form/
    │   ├── applications/
    │   ├── dashboard/
    │   ├── interviews/
    │   └── navbar/
    │
    ├── models/
    │   └── application.model.ts
    │
    ├── services/
    │   └── application.ts
    │
    ├── app.config.ts
    ├── app.routes.ts
    └── app.ts