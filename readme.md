# 🎓 SH-Academy - Learning Management System

A comprehensive Learning Management System (LMS) built with Node.js, Express, TypeScript, and MongoDB. This platform enables administrators to create and manage courses while students can enroll, take quizzes, submit assignments, and track their learning progress.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Database Models](#-database-models)
- [Authentication & Authorization](#-authentication--authorization)
- [Error Handling](#-error-handling)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 👨‍💼 Admin Features
- **Course Management**
  - Create, update, and delete courses
  - Add lessons with video content
  - Set course pricing and categories
  - Manage course visibility and publishing status
  
- **Assessment Creation**
  - Create quizzes with multiple-choice questions
  - Create assignments with due dates and scoring
  - Review and grade student submissions
  
- **User Management**
  - View all registered users
  - Block/unblock users
  - Monitor student enrollments per course

### 👨‍🎓 Student Features
- **Course Enrollment**
  - Browse available courses
  - Enroll in courses of interest
  - View enrolled courses dashboard
  
- **Learning Progress**
  - Track lesson completion
  - View progress percentage
  - Mark lessons as complete
  
- **Assessments**
  - Take quizzes and receive instant scores
  - Submit assignments
  - View feedback and grades

### 🔐 Authentication
- Secure user registration and login
- Role-based access control (Admin/Student)
- JWT-based authentication
- Password encryption with bcrypt

### 📧 Email Notifications
- Welcome email on successful registration
- Assignment submission confirmations
- Custom email templates

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB

### Authentication & Security
- **JWT (jsonwebtoken)** - Token-based authentication
- **bcrypt** - Password hashing
- **Zod** - Schema validation

### File Handling
- **Multer** - File upload middleware
- **Cloudinary** - Cloud-based image storage

### Email Service
- **Nodemailer** - Email sending

### Development Tools
- **ts-node-dev** - Development server with hot reload
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/sh-academy.git
cd sh-academy
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```
Edit `.env` file with your configuration (see [Environment Variables](#-environment-variables))

4. **Run the development server**
```bash
npm run dev
```

5. **Build for production**
```bash
npm run build
npm start
```

The server will start on `http://localhost:5000` (or your configured port)

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:
# ================================
# SERVER CONFIGURATION
# ================================
PORT=5000
NODE_ENV=development
# NODE_ENV options: development | production | test

# ================================
# DATABASE CONFIGURATION
# ================================
# MongoDB Connection String
# Local MongoDB: mongodb://localhost:27017/database_name
# MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority
DATABASE=mongodb://localhost:27017/sh-academy
# Or for MongoDB Atlas:
# DATABASE=mongodb+srv://username:password@cluster.mongodb.net/SH_Academy?retryWrites=true&w=majority&appName=Cluster0

# ================================
# BCRYPT CONFIGURATION
# ================================
# Salt rounds for password hashing (8-12 recommended)
BCRYPT_SALT=10

# ================================
# JWT CONFIGURATION
# ================================
# Access Token Configuration
JWT_ACCESS_TOKEN=your_super_secret_access_token_key_here_min_32_chars
JWT_ACCESS_EXPIRES=1d
# Expiration options: 1h, 24h, 1d, 7d, 30d

# Refresh Token Configuration
JWT_REFRESH_TOKEN=your_super_secret_refresh_token_key_here_min_32_chars
JWT_REFRESH_EXPIRES=30d
# Recommended: 7d, 30d, 90d

# ================================
# EMAIL CONFIGURATION (SMTP)
# ================================
# Gmail SMTP Settings
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
# SMTP_PORT options: 465 (SSL) | 587 (TLS)

# Your Gmail Address
SMTP_USER=your_email@gmail.com
SMTP_FROM=SH-Academy <noreply@sh-academy.com>

# Gmail App Password (NOT your regular password)
# Generate at: https://myaccount.google.com/apppasswords
SMTP_PASS=xxxx xxxx xxxx xxxx

# ================================
# CLOUDINARY CONFIGURATION
# ================================
# Get credentials from: https://cloudinary.com/console
CLUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# ================================
# REDIS CONFIGURATION
# ================================
# Redis Cloud or Local Redis Configuration
RedisUserName=default
RedisPassword=your_redis_password
RedisHost=your_redis_host.redis-cloud.com
RedisPort=6379

# Local Redis (if using locally instead of cloud)
# RedisHost=127.0.0.1
# RedisPort=6379
# RedisPassword= (leave empty for local)

# ================================
# FRONTEND CONFIGURATION
# ================================
# Frontend URL for CORS and redirects
FRONTEND_URL=http://localhost:3000

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: multipart/form-data

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Logout User
```http
POST /auth/logout
```

---

### Course Endpoints

#### Get All Courses
```http
GET /courses?page=1&limit=10&search=javascript&category=programming
```

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `search` - Search by title or category
- `category` - Filter by category
- `sort` - Sort field (e.g., createdAt, price)

#### Get Single Course
```http
GET /courses/:id
```

#### Create Course (Admin Only)
```http
POST /courses/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "JavaScript Fundamentals",
  "description": "Learn JavaScript from scratch",
  "instructor": "instructor_id",
  "category": "Programming",
  "price": 49.99,
  "level": "beginner",
  "lessons": [
    {
      "title": "Introduction to JavaScript",
      "content": "Lesson content here",
      "videoUrl": "https://example.com/video.mp4",
      "duration": 30
    }
  ]
}
```

#### Update Course (Admin Only)
```http
PUT /courses/update/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Course Title",
  "price": 59.99
}
```

#### Delete Course (Admin Only)
```http
DELETE /courses/delete/:id
Authorization: Bearer <token>
```

---

### Enrollment Endpoints

#### Enroll in Course (Student Only)
```http
POST /enrollments/enroll
Authorization: Bearer <token>
Content-Type: application/json

{
  "student": "student_id",
  "course": "course_id"
}
```

#### Get Student Enrollments
```http
GET /enrollments/student/:studentId
Authorization: Bearer <token>
```

#### Get Course Enrollments (Admin Only)
```http
GET /enrollments/course/:courseId
Authorization: Bearer <token>
```

#### Mark Lesson Complete (Student Only)
```http
POST /enrollments/complete/:enrollmentId
Authorization: Bearer <token>
Content-Type: application/json

{
  "lessonIndex": 0
}
```

---

### Quiz Endpoints

#### Create Quiz (Admin Only)
```http
POST /quizzes/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "course": "course_id",
  "lessonIndex": 0,
  "title": "JavaScript Basics Quiz",
  "questions": [
    {
      "question": "What is JavaScript?",
      "options": ["Programming Language", "Database", "Framework", "Library"],
      "correctIndex": 0
    }
  ]
}
```

#### Get Quiz
```http
GET /quizzes?courseId=course_id&lessonIndex=0
Authorization: Bearer <token>
```

#### Submit Quiz (Student Only)
```http
POST /quizzes/submit/:quizId
Authorization: Bearer <token>
Content-Type: application/json

{
  "studentId": "student_id",
  "answers": [0, 2, 1, 3]
}
```

---

### Assignment Endpoints

#### Create Assignment (Admin Only)
```http
POST /assignments/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "course": "course_id",
  "lessonIndex": 0,
  "title": "Build a Calculator",
  "description": "Create a simple calculator app",
  "dueDate": "2024-12-31T23:59:59Z",
  "maxScore": 100
}
```

#### Get Assignment
```http
GET /assignments?courseId=course_id&lessonIndex=0
Authorization: Bearer <token>
```

#### Submit Assignment (Student Only)
```http
POST /assignments/submit/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "student": "student_id",
  "content": "Assignment solution here...",
  "attachments": ["url1", "url2"]
}
```

#### Review Assignment (Admin Only)
```http
POST /assignments/review/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "studentId": "student_id",
  "score": 85,
  "feedback": "Great work!"
}
```

---

### User Endpoints

#### Get All Users (Admin Only)
```http
GET /users?page=1&limit=10&search=john
Authorization: Bearer <token>
```

#### Get Single User
```http
GET /users/get-single
Authorization: Bearer <token>
```

#### Update User Profile
```http
PUT /users/update
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Smith",
  "bio": "Passionate learner"
}
```

#### Block User (Admin Only)
```http
POST /users/block/:userId
Authorization: Bearer <token>
```

#### Unblock User (Admin Only)
```http
POST /users/un-block/:userId
Authorization: Bearer <token>
```

---

## 📁 Project Structure

```
sh-academy/
├── src/
│   ├── config/
│   │   ├── db.config.ts           # Database connection
│   │   ├── multer.config.ts       # File upload configuration
│   │   └── cloudinary.config.ts   # Cloud storage configuration
│   │
│   ├── middlewares/
│   │   ├── checkAuth.ts           # Authentication middleware
│   │   ├── validateRequest.ts     # Zod validation middleware
│   │   ├── parseFormData.ts       # Form data parser
│   │   ├── errorHandler.ts        # Global error handler
│   │   └── notFound.ts            # 404 handler
│   │
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.route.ts
│   │   │   └── auth.validation.ts
│   │   │
│   │   ├── user/
│   │   │   ├── user.controller.ts
│   │   │   ├── user.service.ts
│   │   │   ├── user.route.ts
│   │   │   ├── user.validation.ts
│   │   │   ├── user.model.ts
│   │   │   └── user.interface.ts
│   │   │
│   │   ├── course/
│   │   │   ├── course.controller.ts
│   │   │   ├── course.service.ts
│   │   │   ├── course.route.ts
│   │   │   ├── course.validation.ts
│   │   │   ├── course.model.ts
│   │   │   └── course.interface.ts
│   │   │
│   │   ├── enrollment/
│   │   │   ├── enrollment.controller.ts
│   │   │   ├── enrollment.service.ts
│   │   │   ├── enrollment.route.ts
│   │   │   ├── enrollment.validation.ts
│   │   │   └── enrollment.model.ts
│   │   │
│   │   ├── quiz/
│   │   │   ├── quiz.controller.ts
│   │   │   ├── quiz.service.ts
│   │   │   ├── quiz.route.ts
│   │   │   ├── quiz.validation.ts
│   │   │   └── quiz.model.ts
│   │   │
│   │   └── assignment/
│   │       ├── assignment.controller.ts
│   │       ├── assignment.service.ts
│   │       ├── assignment.route.ts
│   │       ├── assignment.validation.ts
│   │       └── assignment.model.ts
│   │
│   ├── utils/
│   │   ├── QueryBuilder.ts        # Query builder utility
│   │   ├── sendEmail.ts           # Email utility
│   │   ├── userToken.ts           # JWT utilities
│   │   └── asyncHandler.ts        # Async error wrapper
│   │
│   ├── errors/
│   │   ├── AppError.ts            # Custom error class
│   │   └── handleZodError.ts      # Zod error handler
│   │
│   ├── templates/
│   │   └── register-success.ejs
│   │       
│   │
│   ├── routes/
│   │   └── index.ts               # Route aggregator
│   │
│   ├── app.ts                      # Express app setup
│   └── server.ts                   # Server entry point
│
├── .env                            # Environment variables
├── .env.example                    # Environment template
├── .gitignore                      # Git ignore rules
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # Dependencies
└── README.md                       # Project documentation
```

## 💾 Database Models

### User Model
```typescript
{
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'student';
  profilePicture?: string;
  bio?: string;
  phone?: string;
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Course Model
```typescript
{
  title: string;
  description: string;
  instructor: ObjectId; // ref: User
  category: string;
  price: number;
  thumbnail?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  duration?: number;
  tags?: string[];
  isPublished: boolean;
  lessons: [
    {
      title: string;
      content: string;
      videoUrl?: string;
      duration?: number;
      order?: number;
    }
  ];
  createdAt: Date;
  updatedAt: Date;
}
```

### Enrollment Model
```typescript
{
  student: ObjectId; // ref: User
  course: ObjectId; // ref: Course
  enrolledAt: Date;
  completedLessons: number[];
  progressPercent: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Quiz Model
```typescript
{
  course: ObjectId; // ref: Course
  lessonIndex: number;
  title: string;
  description?: string;
  questions: [
    {
      question: string;
      options: string[];
      correctIndex: number;
    }
  ];
  results: [
    {
      student: ObjectId; // ref: User
      score: number;
      submittedAt: Date;
    }
  ];
  createdAt: Date;
  updatedAt: Date;
}
```

### Assignment Model
```typescript
{
  course: ObjectId; // ref: Course
  lessonIndex: number;
  title: string;
  description: string;
  dueDate?: Date;
  maxScore?: number;
  submissions: [
    {
      student: ObjectId; // ref: User
      content: string;
      attachments?: string[];
      submittedAt: Date;
      score?: number;
      feedback?: string;
    }
  ];
  createdAt: Date;
  updatedAt: Date;
}
```

## 🔐 Authentication & Authorization

### Authentication Flow

1. **Registration**
   - User submits registration form
   - Password is hashed using bcrypt
   - User data is saved to database
   - Welcome email is sent
   - JWT token is generated and returned

2. **Login**
   - User submits credentials
   - Email is verified
   - Password is compared with hashed password
   - JWT token is generated and returned

3. **Protected Routes**
   - Client sends JWT token in Authorization header
   - `checkAuth` middleware verifies token
   - User role is checked against allowed roles
   - Request proceeds if authorized

### Role-Based Access Control

The system implements role-based access control with two roles:

- **Admin**: Full access to all features
  - Create, update, delete courses
  - Create quizzes and assignments
  - Review student submissions
  - Manage users (block/unblock)
  - View all enrollments

- **Student**: Limited access
  - Browse and enroll in courses
  - Take quizzes and submit assignments
  - Track learning progress
  - Update own profile

### Middleware Usage

```typescript
// Public route - no authentication required
router.get('/courses', courseController.getAllCourses);

// Student-only route
router.post('/enroll', 
  checkAuth([ERole.student]), 
  enrollmentController.enrollStudent
);

// Admin-only route
router.post('/courses/create', 
  checkAuth([ERole.admin]), 
  courseController.createCourse
);

// Multiple roles allowed
router.get('/assignments', 
  checkAuth([ERole.admin, ERole.student]), 
  assignmentController.getAssignment
);
```

## ⚠️ Error Handling

### Custom Error Class

```typescript
class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true,
    stack = ''
  ) {
    super(message);
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
```

### Global Error Handler

The application uses a centralized error handling middleware that catches all errors and sends appropriate responses:

```typescript
app.use((err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Handle different error types
  if (err.name === 'ZodError') {
    // Handle validation errors
  }
  if (err.name === 'JsonWebTokenError') {
    // Handle JWT errors
  }
  if (err.code === 11000) {
    // Handle MongoDB duplicate key errors
  }

  res.status(statusCode).json({
    success: false,
    message,
    error: err
  });
});
```

### Validation Errors

Zod validation errors are automatically caught and formatted:

```json
{
  "success": false,
  "message": "Validation Error",
  "errors": [
    {
      "path": "body.email",
      "message": "Valid email is required"
    },
    {
      "path": "body.password",
      "message": "Password must be at least 6 characters"
    }
  ]
}
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Example Test

```typescript
describe('Auth Service', () => {
  it('should register a new user', async () => {
    const payload = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'student'
    };

    const result = await authServices.userRegister(payload);
    
    expect(result).toBeDefined();
    expect(result.email).toBe(payload.email);
    expect(result.password).not.toBe(payload.password); // Should be hashed
  });
});
```

## 🔄 Available Scripts

```bash
# Development
npm run dev              # Start development server with hot reload

# Production
npm run build           # Compile TypeScript to JavaScript
npm start               # Run compiled JavaScript

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint errors automatically
npm run format          # Format code with Prettier

# Testing
npm test                # Run tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Generate test coverage report
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Coding Standards

- Use TypeScript for type safety
- Follow existing code structure
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Use ESLint and Prettier configurations

### Pull Request Guidelines

- Ensure all tests pass
- Update README if needed
- Add description of changes
- Reference related issues
- Keep PRs focused and atomic

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Samio Hasan** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Express.js community
- MongoDB team
- TypeScript team
- All contributors

## 📞 Support

For support, email support@sh-academy.com or open an issue in the repository.

## 🚧 Roadmap

### Upcoming Features

- [ ] Real-time chat between students and instructors
- [ ] Video call integration for live classes
- [ ] Certificate generation upon course completion
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Social features (discussion forums, peer reviews)
- [ ] Gamification (badges, leaderboards)
- [ ] Multi-language support
- [ ] Dark mode UI

## 📊 Project Status

**Current Version:** 1.0.0  
**Status:** Active Development  
**Last Updated:** December 2024

---

<div align="center">

**[⬆ Back to Top](#-sh-academy---learning-management-system)**

Made with ❤️ by SH-Academy Team

</div>
