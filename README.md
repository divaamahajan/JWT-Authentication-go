## Introduction

In this comprehensive guide, we'll walk through building a robust In this extensive tutorial, we'll delve into crafting a resilient authentication system in Golang, harnessing the power of:

* The **Fiber framework** for streamlined HTTP handling,

* **GORM** to proficiently manage our database interactions,
    
* **bcrypt** for robust password hashing, and
    
* **JWT** for secure token-based authentication.
    

By the conclusion of this blog, you'll possess a comprehensive grasp on how to seamlessly implement essential functionalities including:

* User registration,
    
* User login,
    
* Retrieving logged-in user details, and
    
* Effortlessly managing user logout sessions.
    

## Architecture Overview

In this architecture:

* **Server**: Utilizes the Fiber framework to handle HTTP requests.
    
* **Routes**: Define endpoints (/register, /login, /user, /logout) which are directed to corresponding controller actions.
    
* **Auth Controllers**: Implement controller functions (Register, Login, User, Logout) responsible for handling specific authentication tasks.
    
* **Functionalities**:
    
    * Register: Handles user registration, including validation and storing user data.
        
    * Login: Manages user authentication, verifying credentials and generating JWT tokens.
        
    * User: Retrieves user details, typically used for profile viewing or authentication verification.
        
    * Logout: Clears user session, usually by invalidating the JWT token.
        
        ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1709265853410/fde8144e-685e-4ef0-9f0a-4324bf56ee8d.png align="center")
        

Each component works together to provide a comprehensive authentication system, ensuring secure user access and interaction with the application.

## Prerequisites

Before we begin, ensure you have the following installed on your system:

1. **Go:** [Download Go](https://golang.org/dl/)
    
2. **MySQL** (or any other supported database):
    
    * [Download MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
        
    * *Note*: Make sure to choose the appropriate version for your operating system.
        
3. **MySQL Workbench** (optional, for database management)
    
    * [Download MySQL Workbench](https://www.mysql.com/products/workbench/)
        
    * MySQL Workbench is a unified visual tool for database architects, developers, and DBAs.
        
4. **Postman** (optional, for API testing)
    
    * [Download Postman](https://www.postman.com/downloads/)
        
    * Postman is a collaboration platform for API development. It's useful for testing APIs and generating API documentation.
        

## Step 1: Initialize Your Project

1. **Initialize your project as a Go module**: Execute the following command in your project directory:
    
    ```bash
    go mod init <module-name>
    ```
    
    Replace `<module-name>` with your project's name. For instance, if your project is named JWT-Authentication-go, the command would be:
    
    ```bash
    go mod init JWT-Authentication-go
    ```
    
    This command creates two essential files:
    
    * **go.mod**: This file defines your project's module, including its name and dependencies.
        
    * **go.sum**: This file contains cryptographic checksums of dependencies, ensuring their integrity and security.
        
    
    These files enable you to manage dependencies with Go modules, ensuring reproducibility and reliable builds across environments.
    
2. **Folder Structure**: Create the following directories in your project, `go.sum` and `go.mod` should be already created:
    
    ```go
    JWT-Authentication-go
    ├── controllers
    │   └── authController.go
    ├── database
    │   └── connection.go
    ├── models
    │   └── user.go
    ├── routes
    │   └── routes.go
    ├── go.mod
    └── go.sum
    └── main.go
    ```
    

## Step 2: Install Dependencies

Install the required packages using `go get`:

```bash
go get github.com/gofiber/fiber/v2
go get -u gorm.io/gorm
go get -u gorm.io/driver/mysql
go get golang.org/x/crypto/bcrypt
go get github.com/golang-jwt/jwt/v5
```

### Explanation of the code:

These commands are used to install necessary Go packages for developing a web application:

1. [`github.com/gofiber/fiber/v2`](http://github.com/gofiber/fiber/v2) - Installs the Fiber web framework for building efficient web applications in Go.
    
2. [`gorm.io/gorm`](http://gorm.io/gorm) - Installs the GORM library, an ORM (Object Relational Mapping) library for Go, used for interacting with databases.
    
3. [`gorm.io/driver/mysql`](http://gorm.io/driver/mysql) - Installs the MySQL driver for GORM, enabling GORM to work with MySQL databases.
    
4. [`golang.org/x/crypto/bcrypt`](http://golang.org/x/crypto/bcrypt) - Installs the bcrypt package from the Go Crypto library, commonly used for secure password hashing.
    
5. [`github.com/golang-jwt/jwt/v5`](http://github.com/golang-jwt/jwt/v5) - Installs the JWT (JSON Web Tokens) library for Go, used for handling authentication and authorization through token-based authentication.
    

## Step 3: Define User Model

**GORM** models are Go structs representing database tables. They enable seamless CRUD (Create, Read, Update, Delete) operations in Go, eliminating the need for direct SQL queries. This promotes cleaner, more maintainable code and simplifies database interactions in your applications.

You can check the models at : [models repository](Backend/models/user.go)

### Explanation of the code:

The code defines a struct named `User` with fields representing user data.

* Each field has a json tag indicating how it should be serialized/deserialized to/from JSON format.
    
* The `Password` field is excluded (`json:"-"`) from JSON encoding to prevent it from being exposed. It's stored as a byte slice (`[]byte`) for security, containing the hashed password.
    
* The `ID` field is marked as the primary key and set to auto-increment by GORM (`gorm:"primaryKey;autoIncrement"`) to manage database interactions more efficiently.
    

## Step 4: Configure Database Connection

Before proceeding, ensure you have set up a MySQL account, established a connection, and created a database schema. If you're unsure how to do this, you can follow the steps outlined in this guide:

[Creating Your First MySQL Database with MySQL Workbench](https://partnerpens.hashnode.dev/mysql-database-with-mysql-workbench) (Steps 1-3)

After setting up your MySQL environment, proceed by establishing a connection between your Go application and the database using the GORM library. Start by creating a dedicated `database` package in `database directory` and implement the connection function using GORM.

You can check the connection setup at : [database repository](Backend/database/connection.go)

Make sure to replace `user`, `password`, and `dbname` with your actual MySQL credentials and database name. This function establishes a connection to the MySQL database using GORM.

Also ensure to replace `JWT-Authentication-go` with the actual module name with which you initiated the project in Step 1.

### Explanation of the code:

* Variable `DB` creates a reference to a `GORM database` connection that can be used throughout your application to perform database CRUD operations.
    
* `AutoMigrate` automatically creates or updates database tables based on the provided Go structs (models).
    
    `db.AutoMigrate(&models.User{})` ensures that the `User` model's corresponding table in the database (`userdb`) is created or updated to match the struct's fields.
    
    This means any changes to the struct will be reflected in the database schema without manual intervention.
    

## Step 5: Setting Up a Test Route to Verify Application Setup

In this step, we will create a test route to ensure that our application setup is functioning correctly. The test route will simply return a "Hello world!!" message when accessed.

1. **Define the Test Route Function in the Controller:** Inside the `controllers/authController.go` file, create a new function named `Hello` that returns the string "Hello world!!".

You can find the test route handeler function at : [controllers repository](Backend/controllers/authController.go)

    ```go
    // controllers/authController.

    // Hello returns a simple "Hello world!!" message
    func Hello(c *fiber.Ctx) error {
      // implementations for Hello
    }
    ```
2. **Update the Routes to Include the Test Route:** Open the `routes/routes.go` file and import the `controllers` package. Then, add a new route for the `/` endpoint that calls the `Hello` function from the `controllers` package.
    You can find the test route defination at : [routes repository](Backend/routes/routes.go)

    ```go
        // Test route to verify application setup
        app.Get("/", controllers.Hello)
    ```
    

### Explanation of the code:

In the `routes/routes.go` file, the route for the root endpoint `/`, invokes the route handler function `Hello` from `controllers/authController.go` file returns the string "Hello world!!" when called.

## Step 6: Setting Up Main Application Logic

Now let's connect to the DB and check if our Table is created
You can find how to connect to the DB at : [main function](Backend/main.go)

### Explanation of the code:

The `main()` function serves as the entry point of the application.

* It begins by attempting to connect to the database using `database.ConnectDB()`.
    
    * If the connection fails, it panics with an error message.
        
    * If the database connection is successful, it prints a success message.
        
* Next, it initializes a new instance of the `Fiber` app.
    
    * The app uses the CORS middleware to allow cross-origin requests
        
    * It sets up routes by calling `routes.SetupRoutes(app)`.
        
* Finally, it starts the server on port `8000` using `app.Listen(":8000")`.
    
    * If starting the server fails, it panics with an error message.
        

### **Test your server and connection setup**

1. On command line to to you root directory and run
    

```bash
go run main.go
```

Your server is now running at [http://localhost:8000/](http://localhost:8000/)

2. You may see below screenshot on the screen
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1709256091643/5d73896f-b6f9-4e4b-86e7-5866e9bdc0d8.png align="center")

That shows that your connection to database was successful

3. You may also check the same in mySQL workbench that your `user` table is now created.
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1709262009505/f2bdfa03-a100-46c0-b0cb-70f33e15f39c.png align="center")

* 4. If you completed Step5, you can now see the following at [http://localhost:8000/](http://localhost:8000/) if your routes are working correctly.
        

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1709255368772/3e1a9a1e-7d4e-4c21-b547-02f972266873.png align="center")

## Step 7: Implement Registration Functionality

1. Create a `controllers` package and implement the registration function:
    
You can find how to implement the registration function at : [controllers repository](Backend/controllers/authController.go)

```go
// controllers/authController.go

func Register(c *fiber.Ctx) error {
	// implement registration request
}
```

2. Add the new registration router in routes package in [routes repository](Backend/routes/routes.go). Your `SetupRoutes` function will be updated with below route.

    ```go
    // routes/routes.go
        app.Post("/api/register", controllers.Register)
    ```
    

### Explanation of the code:

* **Input Parsing**: The `Register` function parses the request body into a map of strings using Fiber's `BodyParser`, facilitating easy access to request data.
    
* **Database Interaction**: It checks for existing user emails in the database using GORM's `Where` method, returning an error if a user with the same email already exists.
    
* **Password Hashing**: Passwords are securely hashed using `bcrypt.GenerateFromPassword`, enhancing security by preventing plaintext storage.
    
* **User Creation**: After hashing the password, a new `models.User` object is created and inserted into the database using GORM's `Create` method.
    
* **Error Handling**: Errors are handled to return appropriate HTTP status codes and JSON-formatted error messages, ensuring informative responses to clients.
    
* **Response**: Upon successful registration, a JSON response confirming the registration is returned to the client.
    

### Test Registration via Postman

1. **Open Postman:** Launch Postman.
    
2. **Set Request Details:**
    
    * Method: `POST`
        
    * URL: [`http://localhost:8000/api/register`](http://localhost:8000/api/register)
        
    * Body: radio button `raw`, type `JSON`
        
        * Include `name`, `email`, and `password` fields
            
3. **Send Request:** Click "Send".
    
4. **Check Response:** Verify the response:
    
    * Successful registration: Status code `200 OK` with a success message.
        
    * Errors: Appropriate status code and error message.
        
    
    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1709262152008/fefcc6bd-b991-4f25-927b-8183cf9b82de.png align="center")
    
5. **Verify Registration:** Check the database in mySQL workbenchor make additional requests to confirm the registration.
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1709262042581/3ee8e682-1d7d-4465-b918-db36fccc1195.png align="center")

These steps allow you to efficiently test the registration functionality using Postman, ensuring proper communication between the client and server.

## Step 8: Implement Login Functionality

Now you have created a user, let's log that user in.

1. Add the login function in the `controllers` package:
    
You can find how to implement the Login function at : [controllers repository](Backend/controllers/authController.go)

```go
// controllers/authController.go
func Login(c *fiber.Ctx) error {
  // Implementation of  Login request
}
```

2. Add the new login router in routes package in [routes repository](Backend/routes/routes.go). Your `SetupRoutes` function will be updated with below route.
    
    ```go
    // routes/routes.go
        app.Post("/api/login", controllers.Login)
    ```
    

### Explanation of the code:

* **Input Parsing**: The `Login` function parses the request body into a map of strings using Fiber's `BodyParser`, extracting email and password data.
    
* **User Retrieval**: It retrieves the user corresponding to the provided email from the database using GORM's `Where` method.
    
* **Password Verification**: The function verifies the password by comparing the hashed password stored in the database with the password provided in the request using `bcrypt.CompareHashAndPassword`.
    
* **JWT Token Generation**: If the password is correct, it generates a JWT (JSON Web Token) using the user's ID as the subject (`"sub"`) and sets the expiration time (`"exp"`).
    
* **Setting JWT Token in Cookie**: Set the JWT token in an HTTP cookie named `"jwt"`. The cookie is set to expire in 24 hours and is HTTP-only and secure to enhance security.
    
* **Response**: Finally, a JSON response confirming the successful login is returned to the client.
    

### Test Login via Postman

1. **Set Request Details and send:**
    
    * Method: `POST`
        
    * URL: [`http://localhost:8000/api/login/`](http://localhost:8000/api/register)
        
    * Body: radio button `raw`, type `JSON`
        
        * Include `name`, `email`, and `password` fields
            
2. **Check Response:** Verify the response:
    
    * Successful login: Status code `200 OK` with a success message.
        
    * Errors: Appropriate status code and error message.
        
    
    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1709262441448/f7161a65-d3e6-49d8-a54b-21fada9149b1.png align="center")
    
    * **Check for cookies created**
        
    
    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1709263005796/4deca06a-7ba2-468f-86eb-5cbcaeb206df.png align="center")
    

These steps allow you to efficiently test the login functionality using Postman, ensuring proper communication between the client and server.

## Step 9: Implement User Retrieval Functionality

Now we check if we are successfully logged in

1. Create a function to retrieve user information from the JWT token:
    
You can find how to implement the User Retrieval function at : [controllers repository](Backend/controllers/authController.go)

```go
// controllers/authController.go
func User(c *fiber.Ctx) error {
  //  Implementing Request to get user...
}
```

2. Add the new get user router in routes package in [routes repository](Backend/routes/routes.go). Your `SetupRoutes` function will be updated with below route.
    
    ```go
    // routes/routes.go
        app.Get("/api/user", controllers.User)
    ```
### Explanation of the code:

* **JWT Token Retrieval**: The `User` function retrieves the JWT token from the HTTP cookies using `c.Cookies("jwt")` .
    
* **JWT Token Parsing**: It parses the JWT token using the `jwt.ParseWithClaims()` function, where the claims are stored in a `jwt.MapClaims` struct. The `secretKey` is used for verifying the token signature.
    
* **Claims Extraction**: It extracts the claims from the parsed JWT token. The user ID is extracted from `"sub"` claim.
    
* **User Retrieval**: The function retrieves the user from the database based on the extracted user ID.
    
* **Response**: Finally, the user data is returned as a JSON response to the client.
    

### Test Logged in User via Postman

1. **Set Request Details and Send:**
    
    * Method: `GET`
        
    * URL: [`http://localhost:8000/api/user/`](http://localhost:8000/api/register)
        
        Body: `none`
        
2. **Send Request:** Click "Send".
    
3. **Check Response:** Verify the response:
    
    * Successful login: Status code `200 OK` with a success message.
        
    * Errors: Appropriate status code and error message.
        
        ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1709263343453/5f9f1267-6841-4a3b-b0fe-b3289d6f8249.png align="center")
        
    * **Check for cookies retrieved**
        
        ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1709263370704/254b3b22-ba5c-488b-9a07-dfc6704fb98d.png align="center")
        

These steps allow you to efficiently test the logged in User's details functionality using Postman, ensuring proper communication between the client and server.

## Step 10: Implement Logout Functionality

1. Create a function to logout and remove the JWT token cookie:
    
You can find how to implement the logout function at : [controllers repository](Backend/controllers/authController.go)

```go
// controllers/authController.go
func Logout(c *fiber.Ctx) error {
  // Implemntation of logout request
}
```

2. Add the new logout router in routes package in [routes repository](Backend/routes/routes.go). Your `SetupRoutes` function will be updated with below route.
    
    ```go
    // routes/routes.go
        app.Post("/logout", controllers.Logout)
    ```
    

### Explanation of the code:

* **JWT Token Expiry**: The `Logout` function expires the JWT token cookie by setting its value to an empty string and its expiry time to a past date, effectively invalidating the token.
    
* **HTTP Cookie Update**: It updates the HTTP cookie named "jwt" with the expired token information, ensuring that the client's session is terminated.
    
* **Response**: Upon successful logout, a JSON response with a message indicating "Logout successful" is sent back to the client.
    

### Test Logging out via Postman

1. **Set Request Details and Send:**
    
    * Method: `GET`
        
    * URL: [`http://localhost:8000/api/logout/`](http://localhost:8000/api/register)
        
        Body: `none`
        
2. **Send Request:** Click "Send".
    
3. **Check Response:** Verify the response:
    
    * Successful login: Status code `200 OK` with a success message.
        
    * Errors: Appropriate status code and error message.
        
        ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1709263803795/4fdd25a7-ed13-409f-863c-31dc1ec5d0b0.png align="center")
        
    * **Check for /api/user if the user is still available**
        
        ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1709263930197/7ee6160e-96d1-4430-b66d-4b1a6e7dca39.png align="center")
        

These steps allow you to efficiently test the logging out functionality using Postman, ensuring proper communication between the client and server.

# Conclusion

Congratulations! You've successfully implemented user authentication in Golang using the Fiber framework. Test your endpoints using Postman or any other API testing tool to ensure everything works as expected.