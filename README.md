# Cohort Tools Project

## Overview
This project is a comprehensive tool for managing cohorts and students, developed as part of the BE MP "REST API" (Cohort Tools app). It is divided into two main parts: the client-side (frontend) and the server-side (backend).

## Repository Structure
- **Client**: The frontend part of the application, built with React, Vite, and Tailwind CSS.
- **Server**: The backend part, providing a REST API for managing the application data.

## Client Side
For detailed information about the client side, refer to the [client README](client/README.md).

### About
This is the client side of the Cohort Tools project. It is a React app that uses Vite as a bundler and Tailwind CSS for styling. It is a CRUD app that allows the user to create, read, update, and delete cohorts and students. The app relies on a REST API that handles the application data.

### Features
- User can create, view, edit, and delete cohorts.
- User can manage students within a cohort.
- User authentication and profile management.

### Pages
The application includes pages for managing cohorts and students, user authentication, and profile details.

### Getting Started
To get started with the client side:
1. Install dependencies with `npm install`.
2. Start the application with `npm run dev`.

## Server Side
For detailed information about the server side, refer to the [server README](server/README.md).

### API Documentation
The server provides a REST API to manage cohorts and students with the following routes:

#### Cohort Routes
- `GET /api/cohorts`: Returns all cohorts.
- `GET /api/cohorts/:cohortId`: Returns a specific cohort by ID.
- `POST /api/cohorts`: Creates a new cohort.
- `PUT /api/cohorts/:cohortId`: Updates a specific cohort by ID.
- `DELETE /api/cohorts/:cohortId`: Deletes a specific cohort by ID.

#### Student Routes
- `GET /api/students`: Returns all students.
- `GET /api/students/cohort/:cohortId`: Returns all students in a specific cohort.
- `GET /api/students/:studentId`: Returns a specific student by ID.
- `POST /api/students`: Creates a new student.
- `PUT /api/students/:studentId`: Updates a specific student by ID.
- `DELETE /api/students/:studentId`: Deletes a specific student by ID.

### Models
The data models for cohorts and students include fields such as cohort name, program, format, campus, student names, emails, and more.

## Technologies Used
- **Client**: React, Vite, React Router, Tailwind CSS
- **Server**: Node.js, Express and MongoDB
