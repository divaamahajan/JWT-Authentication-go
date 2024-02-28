# JWT Authentication System with React and Go

In this tutorial, we'll walk through the process of building a robust authentication system using React on the frontend and Go on the backend. Authentication is a fundamental aspect of web applications, ensuring secure access to user data and resources. By following this tutorial, you'll gain practical experience in implementing user registration, login, logout, and session management functionalities.
<p align="center">
  <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" alt="React" title="React" height="80"/>
  </a>


  <a href="https://golang.org/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/go/go-original.svg" alt="Golang" title="Golang" height="80"/>
  </a>

  <a href="https://www.mysql.com/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg" alt="MySQL" title="MySQL" height="80"/>
  </a>
</p>

## Technologies Used

Before we dive into the tutorial, let's take a quick look at the technologies we'll be using:

- **React**: A JavaScript library for building user interfaces.
- **Go**: An open-source programming language designed for building scalable and reliable software.
- **JSON Web Tokens (JWT)**: A compact, URL-safe means of representing claims to be transferred between two parties.
- **HTTP APIs**: We'll be creating HTTP APIs using Go to handle authentication requests.
- **RESTful Services**: Our backend will follow RESTful principles for creating clean and scalable APIs.
- **MySQL**: A popular open-source relational database management system.

![Technologies Used](images/technologies.png)


## Initial Setup

To begin, let's set up the initial structure of our application. We'll create separate directories for the frontend and backend code. Here's a high-level overview:

- **Frontend**:
  - Initialize a new React app using `create-react-app`.
  - Set up basic routing using `react-router-dom`.
  - Create components for login, register, and home pages.

- **Backend**:
  - Use Go to build the server-side logic.
  - Set up routing and API endpoints for user authentication.
  - Connect to a MySQL database for storing user data.

## Authentication Flow

The authentication flow will include the following steps:

1. **User Registration**:
   - Users can register with a unique email and password combination.
   - Upon successful registration, users are redirected to the sign-in form.

2. **User Login**:
   - Users can sign in with their registered email and password.
   - Upon successful login, users are directed to the main page where their name is displayed.
   - A logout button is available for users to log out of the system.

3. **Session Management**:
   - HTTP-only cookies are used for authentication.
   - Logging in generates a cookie indicating the user is logged in.
   - Logging out removes the authentication cookie from the browser.

## Prerequisites

Before proceeding, ensure you have the following prerequisites:

- Basic understanding of Go programming.
- Node.js and npm installed for React development.
- MySQL and MySQL Workbench for database management.

## Installation

Let's start by setting up the development environment:

1. **Install Go**: Download and install Go from the official website.

2. **Install MySQL**: Install MySQL and MySQL Workbench for database management.

3. **Create React App**: Generate a new React app using `npx create-react-app` with TypeScript template for type safety.

4. **Install Dependencies**: Install necessary dependencies such as `react-router-dom` for routing in the React app.

## Connecting to Database

We'll use the GORM library to connect our Go application to a MySQL database. Here's how to set it up:

```go
// Import GORM and MySQL driver
import (
    "gorm.io/gorm"
    "gorm.io/driver/mysql"
)

// Connect to MySQL database
func ConnectDB() (*gorm.DB, error) {
    // Database configuration
    dsn := "user:password@tcp(localhost:3306)/dbname?charset=utf8mb4&parseTime=True&loc=Local"
    
    // Connect to MySQL database
    db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
    if err != nil {
        return nil, err
    }
    
    return db, nil
}
```

Ensure to replace `user`, `password`, and `dbname` with your MySQL credentials and database name.

## Folder Structure

Organize your project folders as follows:

```
- backend
  - database
  - controllers
  - routes
- frontend
  - src
    - components
    - pages
```

This structure helps maintain a clear separation of concerns and facilitates easier code navigation.

## Code Organization

Separate your code into different modules for better organization and maintainability:

- **Database**: Handle database connection and schema definitions.
- **Controllers**: Implement business logic, such as registering users and authenticating users.
- **Routes**: Define URL endpoints and link them to controller functions for request handling.

## Register Functionality

Let's start by implementing the register functionality:

1. **Register Function**: Define a controller function to handle POST requests to `/api/register`.
2. **Data Validation**: Validate user input and ensure uniqueness of email addresses.
3. **Password Hashing**: Use bcrypt to hash user passwords before storing them in the database.

## Setting Up Routes

Define routes to map URL paths to controller functions:

```go
// Define routes for user authentication
func SetupRoutes() *gin.Engine {
    // Create a new Gin router instance
    router := gin.Default()

    // Register endpoints for user authentication
    router.POST("/api/register", controllers.Register)
    router.POST("/api/login", controllers.Login)
    router.GET("/api/user", controllers.GetUser)

    return router
}
```

## Error Handling

Handle errors gracefully throughout the application to provide a smooth user experience:

```go
// Handle errors in controller functions
func HandleError(c *gin.Context, err error) {
    // Log error
    log.Println("Error:", err.Error())
    
    // Return error response
    c.JSON(http.StatusInternalServerError, gin.H{
        "error": err.Error(),
    })
}
```

## JSON Responses

Return JSON responses for communicating data between the frontend and backend:

```go
// Return JSON response with data
func SendResponse(c *gin.Context, status int, data interface{}) {
    c.JSON(status, gin.H{
        "data": data,
    })
}
```

## Middleware

Utilize middleware functions for common tasks like authentication and request parsing:

```go
// Middleware function

 for authentication
func AuthMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        // Check if user is authenticated
        // Perform authentication logic here
        // Example: Check JWT token in request headers
        // If authenticated, proceed to next handler
        // If not authenticated, return unauthorized error
    }
}
```

## Future Considerations

Here are some suggestions for extending the functionality of your authentication system:

- Implement user profile management features.
- Enhance security measures with encryption for sensitive data transmission.
- Test thoroughly to ensure reliability and stability of the authentication system.

## Channel Content

This tutorial is part of a series covering frontend and backend frameworks. Check out other tutorials on the channel for different technology combinations and in-depth guides on web development.

## Conclusion

By following this tutorial, you've learned how to build a robust authentication system using React and Go. Authentication is a critical aspect of web development, and mastering it opens up endless possibilities for creating secure and user-friendly applications. Remember to continuously explore and experiment with new techniques to stay ahead in your web development journey. Happy coding!
