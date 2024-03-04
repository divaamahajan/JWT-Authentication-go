# JWT Authentication Project

This repository contains the code for a JWT authentication project with both frontend and backend components.

- **Frontend (React):** [Frontend Repository](https://github.com/divaamahajan/JWT-Authentication-go/tree/main/Frontend)
- **Backend (Go):** [Backend Repository](https://github.com/divaamahajan/JWT-Authentication-go/tree/main/Backend)
- **Full Project:** [GitHub Repository](https://github.com/divaamahajan/JWT-Authentication-go)

## Introduction

This guide explores building a robust authentication system in Golang, leveraging the Fiber framework for HTTP handling, GORM for database interactions, bcrypt for password hashing, and JWT for token-based authentication. By the end, you'll understand how to implement user registration, login, user details retrieval, and logout functionalities.

### Repository: [GitHub Repository](https://github.com/divaamahajan/JWT-Authentication-go)

## Architecture Overview

Key components:

- **Server:** Utilizes the Fiber framework for HTTP requests handling.
- **Routes:** Define endpoints (/register, /login, /user, /logout) directed to controller actions.
- **Auth Controllers:** Implement controller functions (Register, Login, User, Logout) for authentication tasks.

Each component collaborates to provide a comprehensive authentication system, ensuring secure user interaction.

## Prerequisites

Ensure you have installed:

1. **Go:** [Download Go](https://golang.org/dl/)
2. **MySQL** (or other supported database): [Download MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
3. **MySQL Workbench** (optional, for database management): [Download MySQL Workbench](https://www.mysql.com/products/workbench/)
4. **Postman** (optional, for API testing): [Download Postman](https://www.postman.com/downloads/)

## Getting Started

1. **Initialize Your Project:** Create required directories and files.
2. **Install Dependencies:** Install necessary packages using `go get`.
3. **Define User Model:** Create a `User` model in `models/user.go`.
4. **Configure Database Connection:** Establish connection to the MySQL database.
5. **Setting Up a Test Route:** Create a test route to verify application setup.
6. **Setting Up Main Application Logic:** Connect to DB and initialize Fiber app.
7. **Implement Functionality:**
   - **Registration:** Implement user registration functionality.
   - **Login:** Implement user login functionality.
   - **User Retrieval:** Implement retrieval of user information functionality.
   - **Logout:** Implement user logout functionality.

## Frontend Setup (React)

Follow these steps to set up the frontend React application:

1. **Installing React:** Create a new React application using `create-react-app`.
2. **Starting the Application:** Navigate to the project directory, install Bootstrap and React Router, then start the development server.
3. **Setting Up Bootstrap:** Add Bootstrap link to `public/index.html`.
4. **Adding Sign-In and Sign-Up Forms:** Choose suitable Bootstrap templates and convert them to JSX syntax.
5. **Creating Navigation Menu:** Choose a navbar template, convert it to JSX, and create necessary CSS.
6. **Creating Pages for Routing:** Create separate pages for home, login, and registration.
7. **Setting Up Routes:** Add routes in the navbar and set up routes in `App.js`.
8. **Handling User Registration and Login:** Implement registration and login functionality in corresponding components.
9. **Getting User on Home Page:** Fetch user data for the home page and render accordingly.
10. **Implementing Logout:** Create logout functionality in the navbar.

## Testing, Debugging, and Optimization

Thoroughly test the authentication flow, use browser developer tools for debugging, and continuously optimize the user experience with appropriate feedback messages and error handling.

By following these steps, you can successfully implement user authentication in your React application, enhancing security and user experience.
