# Resume Builder - Complete File Structure & Descriptions

---

## User Module - File Structure

```
frontend/src/components/user/
├── UserPage.jsx
├── UserPage.css
└── components/
    ├── Sidebar/
    │   ├── UserSidebar.jsx
    │   └── UserSidebar.css
    ├── Dashboard/
    │   ├── Dashboard.jsx
    │   ├── Dashboard.css
    │   ├── StatCard.jsx
    │   ├── RecentResumes.jsx
    │   └── QuickActions.jsx
    ├── ResumeBuilder/
    │   ├── ResumeBuilder.jsx
    │   ├── ResumeBuilder.css
    │   ├── ModeSelection.jsx
    │   ├── ResumeUpload.jsx
    │   ├── FormTabs.jsx
    │   ├── AISuggestions.jsx
    │   └── forms/
    │       ├── PersonalInfoForm.jsx
    │       ├── ExperienceForm.jsx
    │       ├── EducationForm.jsx
    │       ├── SkillsForm.jsx
    │       ├── ProjectsForm.jsx
    │       └── CertificationsForm.jsx
    ├── Templates/
    │   ├── TemplatesPage.jsx
    │   ├── TemplatesPage.css
    │   ├── TemplateCard.jsx
    │   └── TemplateCategories.jsx
    ├── Preview/
    │   ├── LivePreview.jsx
    │   ├── LivePreview.css
    │   ├── FullPreview.jsx
    │   └── ResumeDocument.jsx
    ├── ATSChecker/
    │   ├── ATSChecker.jsx
    │   ├── ATSChecker.css
    │   ├── ATSUpload.jsx
    │   ├── JobDescriptionInput.jsx
    │   └── ATSTips.jsx
    ├── MyResumes/
    │   ├── MyResumes.jsx
    │   ├── MyResumes.css
    │   ├── ResumeCard.jsx
    │   └── ResumeSearch.jsx
    └── Profile/
        ├── EditProfile.jsx
        ├── EditProfile.css
        ├── AvatarUpload.jsx
        └── DangerZone.jsx
```

### User Files - Descriptions

| File Path | Description |
|-----------|-------------|
| `user/UserPage.jsx` | Main user layout with sidebar and page routing |
| `user/UserPage.css` | Global user page styles |
| `user/components/Sidebar/UserSidebar.jsx` | Collapsible sidebar with navigation items |
| `user/components/Sidebar/UserSidebar.css` | Sidebar styling (collapsed/expanded states) |
| `user/components/Dashboard/Dashboard.jsx` | Dashboard page with stats and quick actions |
| `user/components/Dashboard/Dashboard.css` | Dashboard layout and card styles |
| `user/components/Dashboard/StatCard.jsx` | Reusable stat card (resumes, downloads, etc.) |
| `user/components/Dashboard/RecentResumes.jsx` | List of recently created/edited resumes |
| `user/components/Dashboard/QuickActions.jsx` | Quick action buttons (create, browse, check) |
| `user/components/ResumeBuilder/ResumeBuilder.jsx` | Main resume builder container |
| `user/components/ResumeBuilder/ResumeBuilder.css` | Builder layout and form styles |
| `user/components/ResumeBuilder/ModeSelection.jsx` | Create new / Edit existing selection cards |
| `user/components/ResumeBuilder/ResumeUpload.jsx` | Drag & drop resume upload component |
| `user/components/ResumeBuilder/FormTabs.jsx` | Tab navigation for form sections |
| `user/components/ResumeBuilder/AISuggestions.jsx` | AI-powered summary suggestions |
| `user/components/ResumeBuilder/forms/PersonalInfoForm.jsx` | Name, email, phone, location, summary form |
| `user/components/ResumeBuilder/forms/ExperienceForm.jsx` | Work experience entries (add/remove) |
| `user/components/ResumeBuilder/forms/EducationForm.jsx` | Education entries (add/remove) |
| `user/components/ResumeBuilder/forms/SkillsForm.jsx` | Technical & soft skills with suggestions |
| `user/components/ResumeBuilder/forms/ProjectsForm.jsx` | Project entries (add/remove) |
| `user/components/ResumeBuilder/forms/CertificationsForm.jsx` | Certification entries (add/remove) |
| `user/components/Templates/TemplatesPage.jsx` | Full templates browsing page |
| `user/components/Templates/TemplatesPage.css` | Templates grid and card styles |
| `user/components/Templates/TemplateCard.jsx` | Individual template card with preview |
| `user/components/Templates/TemplateCategories.jsx` | Category filter tabs |
| `user/components/Preview/LivePreview.jsx` | Side preview while editing |
| `user/components/Preview/LivePreview.css` | Preview panel styles |
| `user/components/Preview/FullPreview.jsx` | Full page preview with toolbar |
| `user/components/Preview/ResumeDocument.jsx` | Resume paper/document component |
| `user/components/ATSChecker/ATSChecker.jsx` | ATS score checker page |
| `user/components/ATSChecker/ATSChecker.css` | ATS checker styles |
| `user/components/ATSChecker/ATSUpload.jsx` | Resume upload for ATS analysis |
| `user/components/ATSChecker/JobDescriptionInput.jsx` | Job description textarea |
| `user/components/ATSChecker/ATSTips.jsx` | ATS optimization tips list |
| `user/components/MyResumes/MyResumes.jsx` | Saved resumes list page |
| `user/components/MyResumes/MyResumes.css` | Resumes list styles |
| `user/components/MyResumes/ResumeCard.jsx` | Individual resume card with actions |
| `user/components/MyResumes/ResumeSearch.jsx` | Search and filter component |
| `user/components/Profile/EditProfile.jsx` | Profile settings page |
| `user/components/Profile/EditProfile.css` | Profile page styles |
| `user/components/Profile/AvatarUpload.jsx` | Avatar upload/change component |
| `user/components/Profile/DangerZone.jsx` | Account deletion section |

### User Features

| Feature | Description |
|---------|-------------|
| Dashboard | Overview stats, recent resumes, quick actions |
| AI Resume Builder | Create/edit resume with AI suggestions |
| Templates | Browse 8 ATS-optimized templates |
| ATS Score Checker | Upload & analyze resume ATS compatibility |
| My Resumes | View, edit, download, delete saved resumes |
| Edit Profile | Account settings, avatar, danger zone |
| Live Preview | Real-time resume preview |
| Collapsible Sidebar | Navigation with icons |

---

## Admin Module - File Structure

```
frontend/src/components/admin/
├── AdminPage.jsx
├── AdminPage.css
└── components/
    ├── Sidebar/
    │   ├── AdminSidebar.jsx
    │   └── AdminSidebar.css
    ├── Dashboard/
    │   ├── AdminDashboard.jsx
    │   ├── AdminDashboard.css
    │   ├── StatsOverview.jsx
    │   ├── UserGrowthChart.jsx
    │   ├── ResumeStatsChart.jsx
    │   └── RecentActivity.jsx
    ├── UserManagement/
    │   ├── UserManagement.jsx
    │   ├── UserManagement.css
    │   ├── UserTable.jsx
    │   ├── UserFilters.jsx
    │   ├── UserModal.jsx
    │   └── UserActions.jsx
    ├── TemplateManagement/
    │   ├── TemplateManagement.jsx
    │   ├── TemplateManagement.css
    │   ├── TemplateTable.jsx
    │   ├── TemplateForm.jsx
    │   └── TemplatePreview.jsx
    ├── ResumeReports/
    │   ├── ResumeReports.jsx
    │   ├── ResumeReports.css
    │   ├── ResumeTable.jsx
    │   ├── ResumeFilters.jsx
    │   └── ExportOptions.jsx
    ├── Subscriptions/
    │   ├── SubscriptionPlans.jsx
    │   ├── SubscriptionPlans.css
    │   ├── PlanCard.jsx
    │   └── PlanForm.jsx
    ├── Settings/
    │   ├── SystemSettings.jsx
    │   ├── SystemSettings.css
    │   ├── GeneralSettings.jsx
    │   ├── EmailSettings.jsx
    │   └── SecuritySettings.jsx
    └── ActivityLogs/
        ├── ActivityLogs.jsx
        ├── ActivityLogs.css
        ├── LogTable.jsx
        └── LogFilters.jsx
```

### Admin Files - Descriptions

| File Path | Description |
|-----------|-------------|
| `admin/AdminPage.jsx` | Main admin layout with sidebar and routing |
| `admin/AdminPage.css` | Global admin page styles |
| `admin/components/Sidebar/AdminSidebar.jsx` | Admin navigation sidebar |
| `admin/components/Sidebar/AdminSidebar.css` | Admin sidebar styles |
| `admin/components/Dashboard/AdminDashboard.jsx` | Admin dashboard with analytics |
| `admin/components/Dashboard/AdminDashboard.css` | Dashboard layout styles |
| `admin/components/Dashboard/StatsOverview.jsx` | Key metrics cards (users, resumes, etc.) |
| `admin/components/Dashboard/UserGrowthChart.jsx` | User registration chart |
| `admin/components/Dashboard/ResumeStatsChart.jsx` | Resume creation statistics chart |
| `admin/components/Dashboard/RecentActivity.jsx` | Recent user activity feed |
| `admin/components/UserManagement/UserManagement.jsx` | User management page |
| `admin/components/UserManagement/UserManagement.css` | User management styles |
| `admin/components/UserManagement/UserTable.jsx` | Users table with pagination |
| `admin/components/UserManagement/UserFilters.jsx` | Search, filter, sort users |
| `admin/components/UserManagement/UserModal.jsx` | Edit user modal |
| `admin/components/UserManagement/UserActions.jsx` | Ban, delete, change role actions |
| `admin/components/TemplateManagement/TemplateManagement.jsx` | Template management page |
| `admin/components/TemplateManagement/TemplateManagement.css` | Template management styles |
| `admin/components/TemplateManagement/TemplateTable.jsx` | Templates table |
| `admin/components/TemplateManagement/TemplateForm.jsx` | Add/edit template form |
| `admin/components/TemplateManagement/TemplatePreview.jsx` | Template preview modal |
| `admin/components/ResumeReports/ResumeReports.jsx` | Resume reports page |
| `admin/components/ResumeReports/ResumeReports.css` | Reports page styles |
| `admin/components/ResumeReports/ResumeTable.jsx` | All resumes table |
| `admin/components/ResumeReports/ResumeFilters.jsx` | Filter by date, user, template |
| `admin/components/ResumeReports/ExportOptions.jsx` | Export to CSV/Excel |
| `admin/components/Subscriptions/SubscriptionPlans.jsx` | Subscription plans page |
| `admin/components/Subscriptions/SubscriptionPlans.css` | Plans page styles |
| `admin/components/Subscriptions/PlanCard.jsx` | Individual plan card |
| `admin/components/Subscriptions/PlanForm.jsx` | Add/edit plan form |
| `admin/components/Settings/SystemSettings.jsx` | System settings page |
| `admin/components/Settings/SystemSettings.css` | Settings page styles |
| `admin/components/Settings/GeneralSettings.jsx` | App name, logo, general config |
| `admin/components/Settings/EmailSettings.jsx` | SMTP, email templates config |
| `admin/components/Settings/SecuritySettings.jsx` | Password policy, 2FA settings |
| `admin/components/ActivityLogs/ActivityLogs.jsx` | Activity logs page |
| `admin/components/ActivityLogs/ActivityLogs.css` | Logs page styles |
| `admin/components/ActivityLogs/LogTable.jsx` | Activity logs table |
| `admin/components/ActivityLogs/LogFilters.jsx` | Filter by action, user, date |

### Admin Features

| Feature | Description |
|---------|-------------|
| Admin Dashboard | Analytics, charts, key metrics |
| User Management | View, edit, ban, delete users |
| Template Management | Add, edit, delete resume templates |
| Resume Reports | View all resumes, export data |
| Subscription Plans | Manage pricing tiers |
| System Settings | App config, email, security |
| Activity Logs | Track user actions |

---

## Additional Files Required

```
frontend/src/
├── components/
│   ├── AdminRoute.jsx
│   └── common/
│       ├── Button.jsx
│       ├── Modal.jsx
│       ├── Table.jsx
│       ├── Pagination.jsx
│       ├── SearchInput.jsx
│       ├── LoadingSpinner.jsx
│       └── ConfirmDialog.jsx
├── context/
│   └── AdminContext.jsx
├── hooks/
│   ├── useResumes.js
│   ├── useTemplates.js
│   └── useUsers.js
├── services/
│   ├── api.js
│   ├── authService.js
│   ├── resumeService.js
│   ├── templateService.js
│   └── userService.js
└── utils/
    ├── constants.js
    ├── helpers.js
    └── validators.js
```

### Additional Files - Descriptions

| File Path | Description |
|-----------|-------------|
| `components/AdminRoute.jsx` | Protected route for admin (checks role) |
| `components/common/Button.jsx` | Reusable button component |
| `components/common/Modal.jsx` | Reusable modal component |
| `components/common/Table.jsx` | Reusable table component |
| `components/common/Pagination.jsx` | Pagination component |
| `components/common/SearchInput.jsx` | Search input with icon |
| `components/common/LoadingSpinner.jsx` | Loading spinner component |
| `components/common/ConfirmDialog.jsx` | Confirmation dialog |
| `context/AdminContext.jsx` | Admin state management |
| `hooks/useResumes.js` | Resume CRUD operations hook |
| `hooks/useTemplates.js` | Template operations hook |
| `hooks/useUsers.js` | User operations hook (admin) |
| `services/api.js` | Axios instance with interceptors |
| `services/authService.js` | Login, register, logout API calls |
| `services/resumeService.js` | Resume CRUD API calls |
| `services/templateService.js` | Template API calls |
| `services/userService.js` | User API calls |
| `utils/constants.js` | App constants (API URL, etc.) |
| `utils/helpers.js` | Helper functions |
| `utils/validators.js` | Form validation functions |

---

## Backend Files Required

```
backend/
├── index.js
├── .env
├── package.json
├── config/
│   └── db.js
├── models/
│   ├── User.js
│   ├── Resume.js
│   ├── Template.js
│   └── ActivityLog.js
├── routes/
│   ├── auth.js
│   ├── users.js
│   ├── resumes.js
│   ├── templates.js
│   └── admin.js
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── resumeController.js
│   ├── templateController.js
│   └── adminController.js
├── middleware/
│   ├── auth.js
│   ├── admin.js
│   └── errorHandler.js
└── utils/
    ├── generateToken.js
    └── helpers.js
```

### Backend Files - Descriptions

| File Path | Description |
|-----------|-------------|
| `backend/index.js` | Express app entry point |
| `backend/.env` | Environment variables |
| `backend/config/db.js` | MongoDB connection |
| `backend/models/User.js` | User schema (name, email, password, role) |
| `backend/models/Resume.js` | Resume schema (user, data, template) |
| `backend/models/Template.js` | Template schema (name, category, atsScore) |
| `backend/models/ActivityLog.js` | Activity log schema |
| `backend/routes/auth.js` | Auth routes (login, register, logout) |
| `backend/routes/users.js` | User routes (profile, update) |
| `backend/routes/resumes.js` | Resume CRUD routes |
| `backend/routes/templates.js` | Template routes |
| `backend/routes/admin.js` | Admin routes (users, stats, logs) |
| `backend/controllers/authController.js` | Auth logic |
| `backend/controllers/userController.js` | User logic |
| `backend/controllers/resumeController.js` | Resume logic |
| `backend/controllers/templateController.js` | Template logic |
| `backend/controllers/adminController.js` | Admin logic |
| `backend/middleware/auth.js` | JWT authentication middleware |
| `backend/middleware/admin.js` | Admin role check middleware |
| `backend/middleware/errorHandler.js` | Global error handler |
| `backend/utils/generateToken.js` | JWT token generation |
| `backend/utils/helpers.js` | Utility functions |

---

## Routes to Add in App.jsx

| Route | Component | Protection |
|-------|-----------|------------|
| `/admin` | AdminPage | AdminRoute |
| `/admin/users` | UserManagement | AdminRoute |
| `/admin/templates` | TemplateManagement | AdminRoute |
| `/admin/reports` | ResumeReports | AdminRoute |
| `/admin/subscriptions` | SubscriptionPlans | AdminRoute |
| `/admin/settings` | SystemSettings | AdminRoute |
| `/admin/logs` | ActivityLogs | AdminRoute |
