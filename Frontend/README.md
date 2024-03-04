# JWT Authentication in React + Go

Implementing JWT Authentication in a React Application with a Go Backend: A Step-by-Step Guide
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Introduction

In today's web development landscape, implementing user authentication is a fundamental aspect of building secure and user-friendly applications. In this guide, we'll walk through the process of setting up user authentication in a React application, covering everything from installation to handling login, registration, and logout functionalities.

### Prerequisites:

Before we dive into the implementation, make sure you have the following:

1. **Node.js Installed**: Ensure you have Node.js installed on your system to run the React application.
2. **Go Backend**: The backend for this application is built in Go. You can follow the steps outlined in this guide:

   [JWT Authentication in Go: A Step-by-Step Guide](https://partnerpens.hashnode.dev/jwt-authentication-in-go)

### Step 1: Installing React

To create a React application, open your terminal and run the following command:

```bash
npx create-react-app my-react-auth-app
```

Replace `my-react-auth-app` with your preferred application name. This command sets up a new React project with the TypeScript template included.

### Step 2: Starting the Application

Navigate to the project directory:

```bash
cd my-react-auth-app

npm install bootstrap
npm install react-router-dom
```

Start the development server:

```bash
npm start
```

This command runs the React application on [`localhost:3000`](http://localhost:3000).

### Step 3: Setting Up Bootstrap

Add the following link to the `<head>` section of your `public/index.html` file and update the `title` to the desired title of your app:

```xml
<title>User Authentication App</title>
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
  crossorigin="anonymous"
/>
```

### Step 4: Adding Bootstrap Template for Sign-In Form

1. Choose a suitable Bootstrap template from [Bootstrap examples](https://getbootstrap.com/docs/5.3/examples/). For this guide, we'll use the [sign-in form](https://getbootstrap.com/docs/5.3/examples/sign-in/).
2. Right-click on the page source and copy its HTML structure.
3. Copy the HTML structure into a new file `components/SignIn.js`.
4. Convert the HTML to JSX syntax:

   - Replace `class` with `className`.
   - Close self-closing tags (e.g., `<input>`) by adding a `/` before `>`.

5. Create `components/sign-in.css` from [sign-in.css](https://getbootstrap.com/docs/5.3/examples/sign-in/sign-in.css) and import it to `SignIn.js`.

After pasting the HTML structure into `SignIn.js` and converting it to JSX, the component will look like this:

```jsx
// src/components/SignIn.js

import React from "react";
import "./sign-in.css";

const SignIn = ({ onSubmit, responseMessage, setResponseMessage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    onSubmit(userData); // Pass user data to onSubmit function
  };
  return (
    <main className="form-signin w-100 m-auto">
      <form>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            value={email}
            onChange={handleEmailChange}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button className="btn btn-primary w-100 py-2" type="submit">
          Sign in
        </button>
        {responseMessage && (
          <p className="mt-5 mb-3 text-body-secondary">{responseMessage}</p>
        )}
      </form>
    </main>
  );
};

export default SignIn;
```

### Step 5: Adding Bootstrap Template for Sign-Up Form

You can replicate `SignIn.js` and convert it into `SignUp.js`

The `SignUp.js` component will look like this:

```jsx
import React, { useState } from "react";
import "./sign-in.css";

const SignUp = ({ onSubmit, responseMessage, setResponseMessage }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }
    if (!isValidEmail(email)) {
      alert("Invalid Email Address");
      return;
    }
    // Send data to register page
    const userData = {
      name: name,
      email: email,
      password: password,
    };
    onSubmit(userData); // Pass user data to onSubmit function
  };

  const isValidEmail = (email) => {
    // Email validation logic here (e.g., regex)
    // Return true if valid, false otherwise
    return /\S+@\S+\.\S+/.test(email);
  };

  return (
    <main className="form-signin w-100 m-auto">
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Please Register</h1>

        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Your Name"
            value={name}
            onChange={handleNameChange}
            required
          />
          <label htmlFor="name">Name</label>
        </div>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="name@example.com"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <label htmlFor="email">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
        </div>
        <button className="btn btn-primary w-100 py-2" type="submit">
          Register
        </button>
        {responseMessage && (
          <p className="mt-5 mb-3 text-body-secondary">{responseMessage}</p>
        )}
      </form>
    </main>
  );
};

export default SignUp;
```

### Step 6: Creating Navigation Menu

1. Select a navigation menu template from Bootstrap examples. For this guide, we'll use a simple navbar from [Bootstrap navbar-fixed](https://getbootstrap.com/docs/5.3/examples/navbar-fixed/).
2. Copy the HTML structure of the navbar.
3. Paste the HTML structure into a new file `components/Navbar.js`.
4. Convert the HTML to JSX syntax, similar to the process done for the sign-in form.
5. Create `components/navbar-fixed.css` from [navbar-fixed.css](https://getbootstrap.com/docs/5.3/examples/navbar-fixed/navbar-fixed.css) and import it to `Navbar.js`.

After pasting the HTML structure into `Navbar.js` and converting it to JSX, the component will look like this:

```jsx
// src/components/Navbar.js

import React from "react";
import "./navbar-fixed.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Home
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div>
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Login
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Register
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
```

### Step 7: Creating Pages for Routing

Inside the `src` directory, create a new directory called `pages`. This directory will contain our different page components.

1. #### Home Page (`HomePage.js`)

```javascript
// src/pages/HomePage.js

import React from "react";

const HomePage = () => {
  return (
    <div>
      <h2>Home Page</h2>
      {/* Add your home page content here */}
    </div>
  );
};

export default HomePage;
```

2. #### Login Page (`LoginPage.js`)

   We will import our component `SignIn.js` in the login Page

```javascript
// src/pages/LoginPage.js

import React from "react";
import SignIn from "../components/SignIn";

const LoginPage = () => {
  const handleSubmit = (userData) => {
    console.log("Submitting user data:", userData);
    // Add logic to send user data to login page
  };

  return (
    <div>
      <SignIn onSubmit={handleSubmit} />
    </div>
  );
};

export default LoginPage;
```

3. #### Registration Page (`RegisterPage.js`)

   We will import our component `SignUp.js` in the Registration Page

```javascript
// RegisterPage.js
import React from "react";
import SignUp from "../components/SignUp";

const RegisterPage = () => {
  const handleSubmit = (userData) => {
    console.log("Submitting user data:", userData);
    // Add logic to send user data to register page
  };

  return (
    <div>
      <SignUp onSubmit={handleSubmit} />
    </div>
  );
};

export default RegisterPage;
```

### **Step 8: Setting Up Routes**

1. First let us add routes in our `Navbar.js`

2. Now, let's set up routes for our different pages in the `App.js` file:

```javascript
// src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
```

So far below is the look of our react app

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1709337180208/ba477559-e35b-47a8-8a62-0998283c83e5.png align="center")

### Step 9: Handling User Registration

1. **Set Up State Variables**: Set up state variables for `userName`, `email`, `password`, and `responseMessage` using the `useState` hook.
2. **Handle Form Submission**: Create a `handleSubmit` function to handle form submission. This function sets the user input data into state variables and calls the `register` function.
3. **Define Register Function**: Define an `async` function named `register`. Inside this function, perform a `fetch` request to the registration endpoint ([`http://localhost:8000/api/register`](http://localhost:8000/api/register)). Handle the response accordingly. If the registration is successful, set the response message to the success message. If there's an error, set the response message to the error message.

```javascript
// src/pages/RegisterPage.js
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import SignUp from "../components/SignUp";

const RegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (userData) => {
    console.log("Submitting user data:", userData);
    setUserName(userData.name);
    setEmail(userData.email);
    setPassword(userData.password);
    register();
  };

  const register = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
          email: email,
          password: password,
        }),
      });
      const responseData = await response.json();
      if (response.ok) {
        console.log("Registration successful");
        setResponseMessage(responseData.message);
        setRedirect(true); // Set redirect state to true upon successful registration
      } else {
        console.error("Registration failed");
        setResponseMessage(responseData.error || "Registration failed");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setResponseMessage("Error registering user");
    }
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <SignUp
        onSubmit={handleSubmit}
        responseMessage={responseMessage}
        setResponseMessage={setResponseMessage}
      />
    </div>
  );
};

export default RegisterPage;
```

### Step 10: Handling User Login

1. **Set Up State Variables**: Use the `useState` hook to set up state variables for `email`, `password`, and `responseMessage`.
2. **Handle Form Submission**: Define a `handleSubmit` function to handle form submission. This function sets the user input data into state variables and calls the `login` function.
3. **Define Login Function**: Create an asynchronous `login` function to handle the login process. Inside this function, perform a `fetch` request to the login endpoint ([`http://localhost:8000/api/login`](http://localhost:8000/api/login)). Handle the response accordingly. If the login is successful, set the response message to the success message. If there's an error, set the response message to the error message.

```javascript
// src/pages/LoginPage.js
// src/pages/LoginPage.js
import React, { useState } from "react";
import SignIn from "../components/SignIn";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (userData) => {
    console.log("Submitting user data:", userData);
    setEmail(userData.email);
    setPassword(userData.password);
    login();
  };

  const login = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const responseData = await response.json();
      if (response.ok) {
        console.log("Login successful");
        setResponseMessage(responseData.message);
        setRedirect(true); // Set redirect state to true upon successful registration
      } else {
        console.error("Login failed");
        setResponseMessage(responseData.error || "Login failed");
      }
    } catch (error) {
      console.error("Error Authenticating user:", error);
      setResponseMessage("Error Authenticating user");
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <SignIn
        onSubmit={handleSubmit}
        responseMessage={responseMessage}
        setResponseMessage={setResponseMessage}
      />
    </div>
  );
};

export default LoginPage;
```

If you're seeing cookies in the "Application" tab of your browser's developer tools after successful login, it indicates that your server is setting cookies upon successful authentication.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1709578539536/588f977f-9cc9-4ebe-a5f0-8f2110b06652.png align="center")

### Step 11: Getting User on Home Page

1. **State Initialization**:

   - Initialize state variables using the `useState` hook:
     - `userName`: For storing the user's name.

2. **UseEffect Hook**:

   - Utilize the `useEffect` hook to perform side effects.
   - Inside the effect, define an asynchronous function `fetchUserData`.
   - Make a GET request to [`http://localhost:8000/api/user`](http://localhost:8000/api/user) to fetch user data.
   - If the response is successful (HTTP status 200), extract the user's name from the response data and update the `userName` state.
   - Handle errors that occur during the fetch operation.

3. **Conditional Rendering**:

   - If `userName` is falsy (meaning the user is not logged in), redirect the user to the login page using `<Navigate to="/login" />`.

4. **Return JSX**:

   - Return JSX containing:
     - A welcome message displaying the user's name (`userName`).

```javascript
// App.js

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";

function App() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const responseData = await response.json();
        if (response.ok) {
          console.log(
            "Received User Data",
            responseData,
            "name",
            responseData.name
          );
          setUserName(responseData.name);
        } else {
          console.error("User Data not received");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  return (
    <div>
      <Navbar userName={userName} />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage userName={userName} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
```

Render user on Home Page

```javascript
import React from "react";

const HomePage = ({ userName }) => {
  console.log("Home Page userName", userName);

  return (
    <div>
      <h2>{userName ? "Welcome, " + userName : "You are not Logged In"}</h2>
      {/* Add your home page content here */}
    </div>
  );
};

export default HomePage;
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1709582503407/b00a07b1-3893-42a9-8397-d786c4696e4d.png align="center")

### Step 12: Implementing Logout

- Create a logout function that sends a POST request to `/api/logout` to clear the user session on the server side.

  1. **Logout Function**:

     - Define an asynchronous function named `logout` which will handle the logout functionality.
     - Inside the `logout` function:
       - Use `try-catch` block to handle potential errors.
       - Make a POST request to [`http://localhost:8000/api/logout`](http://localhost:8000/api/logout) to log the user out.
       - Check if the response is successful (HTTP status 200).
       - Log messages indicating whether the logout was successful or failed.

  2. **Navbar JSX**:

     - Return JSX containing a navigation bar (`<nav>` element) with the following structure:
       - A container (`<div>` element with class `"container-fluid"`) holding the navbar content.
       - A home link (`<a>` element with class `"navbar-brand"`) pointing to `"/"`.
       - A list of navigation links (`<ul>` element with classes `"navbar-nav me-auto mb-2 mb-md-0"`).
       - Conditional rendering of navigation links based on the `userName` prop:
         - If `userName` exists:
           - Render "Login" and "Register" links (`<li>` elements with corresponding `<a>` elements).
         - If `userName` does not exist:
           - Render a "Logout" link (`<li>` element with an `<a>` element).
             - Attach the `logout` function to the `onClick` event of the "Logout" link.

  ```javascript
  import React from "react";
  import "./navbar-fixed.css";

  function Navbar({ userName }) {
    const logout = async () => {
      // Add async keyword here
      try {
        const response = await fetch(`http://localhost:8000/api/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (response.ok) {
          console.log("Logout successful");
        } else {
          console.error("Logout failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    return (
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark mb ">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Home
          </a>
          <div>
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              {userName ? (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/login">
                      Login
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/register">
                      Register
                    </a>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <a className="nav-link" href="/login" onClick={logout}>
                    Logout
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }

  export default Navbar;
  ```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1709582194541/7cdd9360-4f72-45ab-a9a6-99c1c1351d55.png align="center")

### Step 13: Testing and Debugging

- Thoroughly test the authentication flow, including login, registration, logout, and navigation.
- Use browser developer tools to inspect network requests and troubleshoot any issues.
- Ensure proper error handling and validation mechanisms are in place.

### Step 14: Optimizing User Experience

- Enhance the user interface and experience with appropriate feedback messages, loading indicators, and error alerts.
- Continuously iterate and improve the authentication flow based on user feedback and testing results.

By following these steps, you can successfully set up user authentication in your React application, allowing users to securely log in, register, and navigate through different pages based on their authentication status. Building a robust authentication system not only enhances the security of your application but also improves the overall user experience.
