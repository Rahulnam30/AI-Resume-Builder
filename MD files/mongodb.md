# MongoDB Setup & Requirement Analysis

## Project Overview
The AI Resume Builder requires a dynamic backend to handle user authentication, resume data persistence, and template management. We will use MongoDB with Mongoose for Object Data Modeling (ODM).

## Database Configuration
- **Database Name**: `ai_resume_builder`
- **Connection String**: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/ai_resume_builder?retryWrites=true&w=majority` (Replace with actual credentials in `.env`)

---

## Data Hierarchy & Models

### 1. User Model (`User`)
**Purpose**: Manages authentication and user profile information.

**Schema Attributes**:
- `name`: String (required)
- `email`: String (required, unique, indexed)
- `password`: String (required, hashed)
- `role`: String (enum: ['user', 'admin'], default: 'user')
- `avatar`: String (URL to profile picture)
- `subscription`:
    - `plan`: String (enum: ['free', 'pro'], default: 'free')
    - `startDate`: Date
    - `endDate`: Date
    - `status`: String (active/inactive)
- `createdAt`: Date (default: Date.now)

### 2. Resume Model (`Resume`)
**Purpose**: Stores the detailed data for a user's resume.

**Schema Attributes**:
- `user`: ObjectId (ref: 'User', required)
- `title`: String (e.g., "My Tech Resume", default: "Untitled Resume")
- `templateId`: ObjectId (ref: 'Template', optional)
- `personalInfo`:
    - `fullName`: String
    - `email`: String
    - `phone`: String
    - `address`: String
    - `linkedin`: String
    - `portfolio`: String
- `summary`: String
- `education`: [{
    `school`: String,
    `degree`: String,
    `startDate`: Date,
    `endDate`: Date,
    `description`: String
}]
- `experience`: [{
    `company`: String,
    `position`: String,
    `startDate`: Date,
    `endDate`: Date,
    `current`: Boolean,
    `description`: String
}]
- `skills`: [String] (or an array of objects if categorized)
- `projects`: [{
    `name`: String,
    `link`: String,
    `description`: String,
    `technologies`: [String]
}]
- `isPublic`: Boolean (default: false)
- `updatedAt`: Date (default: Date.now)

### 3. Template Model (`Template`)
**Purpose**: Stores resume design templates managed by admins.

**Schema Attributes**:
- `name`: String (required)
- `thumbnail`: String (URL to preview image)
- `code`: String (HTML/CSS structure or JSON config for the renderer)
- `isPremium`: Boolean (default: false)
- `category`: String (e.g., "Professional", "Creative")
- `active`: Boolean (default: true)

---

## API Routes & Structure

The backend application structure should support these new requirements.

### Directory Structure
```
backend/
├── config/
│   └── db.js            # Database connection logic
├── models/
│   ├── User.js          # User Mongoose Schema
│   ├── Resume.js        # Resume Mongoose Schema
│   └── Template.js      # Template Mongoose Schema
├── routes/
│   ├── authRoutes.js    # /api/auth (Login, Register, Me)
│   ├── userRoutes.js    # /api/users (Profile update, Admin view)
│   ├── resumeRoutes.js  # /api/resumes (CRUD Resumes)
│   └── templateRoutes.js# /api/templates (Get templates, Admin create)
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── resumeController.js
│   └── templateController.js
├── middleware/
│   ├── authMiddleware.js # Token verification (JWT)
│   └── adminMiddleware.js# Admin role check
└── server.js            # Main entry point (updated)
```

### Route Definitions

#### Auth (`/api/auth`)
- `POST /register`: Register a new user.
- `POST /login`: Authenticate user and return JWT.
- `GET /me`: Get current user info (protected).

#### Resumes (`/api/resumes`)
- `POST /`: Create a new resume.
- `GET /`: Get all resumes for the logged-in user.
- `GET /:id`: Get specific resume details.
- `PUT /:id`: Update resume sections.
- `DELETE /:id`: Delete a resume.

#### Templates (`/api/templates`)
- `GET /`: List all active templates.
- `POST /`: Create new template (Admin only).
- `PUT /:id`: Update template (Admin only).

---

## Next Steps
1.  Install necessary dependencies: `mongoose`, `jsonwebtoken`, `bcryptjs`, `dotenv`.
2.  Set up `config/db.js` to connect to MongoDB.
3.  Create the Mongoose models in `backend/models/`.
4.  Implement Authentication (Controller + Routes).
5.  Implement Resume CRUD operations.
